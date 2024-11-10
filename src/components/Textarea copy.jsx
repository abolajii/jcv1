/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

import { getUserSuggestions } from "../api/requests";
import styled from "styled-components";
import usePostStore from "../store/usePostStore";

const Container = styled.div`
  outline: none;
  font-size: 15px;
  min-height: 40px;
  max-height: 60px;
  line-height: 1;
  overflow-y: scroll;
  width: ${(props) => props.width}px;
  position: relative;

  &:empty:before {
    content: attr(placeholder);
    color: #aaa;
    font-size: 13px;
  }

  @media screen and (max-width: 768px) {
    input,
    select,
    textarea {
      font-size: 14px !important;
    }
  }
`;

const SuggestionBox = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 999;

  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 0;
  transform: translateY(-10px);
  visibility: hidden;

  &.show {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }
`;

const SuggestionItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }

  .name {
    font-size: 14px;
  }

  .username {
    font-size: 12px;
    color: #28a69e;
  }
`;

const Image = styled.div`
  height: 40px;
  width: 40px;
  margin-right: 6px;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Textarea = ({ width, setMentionedUsers, setText }) => {
  const containerRef = useRef(null);
  const [isMentioning, setIsMentioning] = useState(false);
  const { setContent, content, postSent, hasComment } = usePostStore();
  const [suggestions, setSuggestions] = useState([]);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [mentionText, setMentionText] = useState("");
  const mentionedUsers = useRef([]); // Keep track of mentioned users
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postSent || hasComment) {
      if (containerRef.current) {
        containerRef.current.innerText = "";
      }
    }
  }, [postSent, hasComment]);

  // useEffect(() => {
  //   // Prevent automatic focus on page mount
  //   if (loading) {
  //     if (containerRef.current) {
  //       containerRef.current.blur(); // Ensure it does not get focused automatically
  //     }
  //   } else {
  //     if (containerRef.current) {
  //       containerRef.current.focus(); // Ensure it does not get focused automatically
  //     }
  //   }
  // }, [loading]);

  const formatTextWithMentions = (text) => {
    return text?.replace(/@(\w+)/g, (_, name) => {
      return `<span style='color: #28a69e; font-weight: normal;'>@${name}</span>`;
    });
  };

  const handleInput = (e) => {
    const text = e.target.innerText;
    setContent(text);
    setText(text);

    const caretPos = window
      .getSelection()
      .getRangeAt(0)
      .getBoundingClientRect();
    const mentionMatch = text.match(/@(\w*)$/);

    if (mentionMatch) {
      setIsMentioning(true);
      setMentionText(mentionMatch[1]);
      setMentionPosition({
        top: caretPos.bottom + 5,
      });

      // Check if the mention text matches any username in suggestions
      const exactMatch = suggestions.find(
        (user) => user.username === mentionMatch[1]
      );

      if (
        exactMatch &&
        !mentionedUsers.current.some((u) => u._id === exactMatch._id)
      ) {
        mentionedUsers.current.push({
          id: exactMatch._id,
          username: exactMatch.username,
        });
        setMentionedUsers([...mentionedUsers.current]);
        setIsMentioning(false); // Hide suggestions after auto-adding
        setSuggestions([]);
      }
    } else {
      setIsMentioning(false);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (mentionText) {
      const fetchUsers = async () => {
        try {
          const response = await getUserSuggestions(mentionText);
          setSuggestions(response);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      const debounceFetch = setTimeout(fetchUsers, 100); // Debounce API call
      return () => clearTimeout(debounceFetch);
    } else {
      setSuggestions([]);
    }
  }, [mentionText]);

  useEffect(() => {
    if (containerRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(containerRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [content]);

  const handleSuggestionClick = (user) => {
    const newContent = content.replace(/@(\w*)$/, `@${user.username}`);
    setContent(newContent);
    setText(newContent);
    setIsMentioning(false);
    setSuggestions([]);

    // Add user to the mentioned users list if not already added
    if (!mentionedUsers.current.some((u) => u._id === user._id)) {
      mentionedUsers.current.push({ id: user._id, username: user.username });
      setMentionedUsers([...mentionedUsers.current]); // Update state with the new list
    }
  };

  const handleFocusClick = () => {
    // Focus the container only when clicked
    if (containerRef.current) {
      containerRef.current.focus();
    }
    setLoading(false);
  };

  return (
    <>
      <Container
        contentEditable
        placeholder="Share your thought"
        ref={containerRef}
        onInput={handleInput}
        onClick={handleFocusClick} // Focus only when clicked
        dangerouslySetInnerHTML={{ __html: formatTextWithMentions(content) }}
        suppressContentEditableWarning
        width={width}
      />
      <SuggestionBox
        top={mentionPosition.top}
        left={mentionPosition.left}
        className={
          isMentioning && mentionText && suggestions.length > 0 ? "show" : ""
        }
      >
        {suggestions.map((user) => (
          <SuggestionItem
            key={user._id}
            className="flex"
            onClick={() => handleSuggestionClick(user)}
          >
            <div>
              <Image>
                <img src={user.profilePic} alt="dp" />
              </Image>
            </div>
            <div>
              <div className="name">{user.name}</div>
              <div className="username">@{user.username}</div>
            </div>
          </SuggestionItem>
        ))}
      </SuggestionBox>
    </>
  );
};

export default Textarea;
