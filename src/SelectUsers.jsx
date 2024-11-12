/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components";

import Input from "./Input";
import React from "react";
import UserItem from "./UserItem";
import { truncateWords } from "./utils/index";

const Container = styled.div`
  padding: 0px 10px;
`;

// Keyframe for Top fading in and sliding into place
const fadeInSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px); /* Start above and invisible */
  }
  to {
    opacity: 1;
    transform: translateY(0); /* Fade in and come to position */
  }
`;

// Keyframe for Top fading out and sliding out of place
const fadeOutSlideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0); /* Start visible in its position */
  }
  to {
    opacity: 0;
    transform: translateY(-10px); /* Fade out and move above */
  }
`;

// Keyframe for Bottom sliding down (when Top comes in)
const slideDown = keyframes`
  from {
    transform: translateY(0); /* Start from the original position */
  }
  to {
    transform: translateY(10px); /* Move down to make space for Top */
  }
`;

// Keyframe for Bottom sliding up (when Top goes out)
const slideUp = keyframes`
  from {
    transform: translateY(10px); /* Start from the pushed-down position */
  }
  to {
    transform: translateY(0); /* Slide back to the original position */
  }
`;

// Scale-in animation from 0 to 1
const scaleUp = keyframes`
  0% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(1);
  }
`;

// Scale-out animation from 1 to 0
const scaleDown = keyframes`
  0% {
    transform: scale(.9);
  }
  100% {
    transform: scale(0.6);
    opacity: 0;
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Space between users */
  max-width: 100%;
  height: 100%;
  padding: 10px 5px;

  overflow-x: auto;
  /* scroll-snap-type: x mandatory; */
  scrollbar-width: none; /* Hide scrollbar in Firefox */
  -ms-overflow-style: none; /* Hide scrollbar in IE/Edge */
  /* padding: 20px 0px; */
  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar in Chrome/Safari */
  }
`;

const Top = styled.div`
  background: 1px solid rgba(54, 187, 186, 0.2);

  border-radius: 5px;

  width: 100%;
  max-width: calc(80px * 5);
  align-items: center;
  display: ${(props) =>
    props.show ? "flex" : "none"}; /* Only show when toggled */
  animation: ${(props) => (props.show ? fadeInSlideIn : fadeOutSlideOut)} 1s
    ease forwards;
`;

const Bottom = styled.div`
  height: 500px;
  height: ${(props) => (props.show ? "400px" : "500px")};
  transition: height 0.5s ease;
  overflow-y: scroll;

  animation: ${(props) => (props.show ? slideDown : slideUp)} 1s ease forwards;

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar in Chrome/Safari */
  }
`;

const ScaleUp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the name and image horizontally */
  gap: 5px; /* Add space between image and name */

  .image {
    height: 50px;
    width: 50px;
    background-color: #c0baba;
    border-radius: 50%;
  }

  .name {
    font-size: 12px;
    text-align: center; /* Ensure text is centered */
  }

  &.scale-up {
    animation: ${scaleUp} 0.5s ease forwards;
  }

  &.scale-down {
    animation: ${scaleDown} 0.5s ease forwards;
  }
`;

const UserGroup = styled.div`
  padding-bottom: 20px;
  padding: 9px 8px;
`;

const GroupTitle = styled.h3`
  font-weight: 500;
  /* margin-bottom: 5px; */
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
  padding-left: 2px;
  padding-top: 2px;
  background-color: #d8efef;
`;

const MenuItem = styled.div`
  /* padding: 10px; */
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #a58ca933;
  background-color: rgba(195, 235, 235, 0.3);
  /* background-color: #eaf5f2; */

  padding: 10px;

  .no-results {
    font-size: 11px;
  }
`;

const Box = styled.div`
  position: relative;
  height: 55px;
  width: 55px;
  background: #d9d9ff;
  border-radius: 50%;
  cursor: pointer;

  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const StatusIcon = styled.div`
  position: absolute;
  top: -10px;
  right: 1px;
  height: 24px;
  width: 24px;
  background-color: #98e0f0;
  border-radius: 50%;
  color: #000000;
  font-size: 14px;
`;

// const users = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
//   { id: 13, name: "Baba" },
//   { id: 11, name: "Bayo" },
//   { id: 3, name: "Charlie" },
//   { id: 4, name: "David" },
//   { id: 5, name: "Eve" },
//   { id: 6, name: "Frank" },
//   { id: 7, name: "Grace" },
//   { id: 8, name: "Hannah" },
//   { id: 9, name: "Ivy" },
//   { id: 10, name: "Jack" },
//   { id: 12, name: "Adeem" },
// ];

const groupUsersByAlphabet = (users) => {
  const groupedUsers = {};

  users.forEach((user) => {
    const firstLetter = user.name[0].toUpperCase();
    if (!groupedUsers[firstLetter]) {
      groupedUsers[firstLetter] = [];
    }
    groupedUsers[firstLetter].push(user);
  });

  // Sort each group alphabetically by name
  for (const letter in groupedUsers) {
    groupedUsers[letter].sort((a, b) => a.name.localeCompare(b.name));
  }

  return groupedUsers;
};

const SelectUsers = ({ selectedUsers, setSelectedUsers, users }) => {
  const [showTop, setShowTop] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const [removedUser, setRemovedUser] = React.useState(null);
  const [deselectedUser, setDeselectedUser] = React.useState(null);
  const [isAddingUser, setIsAddingUser] = React.useState(false);

  const topContainerRef = React.useRef(null);

  // Scroll to the latest user when a new one is added
  React.useEffect(() => {
    if (isAddingUser && topContainerRef.current) {
      topContainerRef.current.scrollTo({
        left: topContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [selectedUsers, isAddingUser]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Step 3: Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedUsers = groupUsersByAlphabet(filteredUsers); // Use filtered users to group

  // Handle user selection
  const handleUserSelect = (user) => {
    if (!showTop) {
      setShowTop(true);
    }
    if (selectedUsers.includes(user)) {
      setDeselectedUser(user);
      setTimeout(() => {
        setSelectedUsers((prevSelected) =>
          prevSelected.filter((u) => u !== user)
        );
        setDeselectedUser(null);
      }, 500);
    } else {
      setSelectedUsers((prevSelected) => [...prevSelected, user]);
      setIsAddingUser(true); // Mark that a user is being added
    }
    setRemovedUser(null);
  };

  React.useEffect(() => {
    if (selectedUsers.length === 0) {
      setShowTop(false);
    }
  }, [selectedUsers]);

  return (
    <Container>
      <Input onChange={handleSearchChange} />
      <Top show={showTop}>
        <ScrollContainer ref={topContainerRef}>
          {selectedUsers.map((user) => {
            // console.log(user);
            return (
              <ScaleUp
                key={user._id}
                className={
                  removedUser?._id === user._id ||
                  deselectedUser?._id === user._id
                    ? "scale-down"
                    : "scale-up"
                }
              >
                <Box>
                  <img src={user.profilePic} alt="image" />
                  <StatusIcon className="center">x</StatusIcon>
                </Box>
              </ScaleUp>
            );
          })}
        </ScrollContainer>
      </Top>
      <Bottom show={showTop}>
        {Object.keys(groupedUsers)
          .sort()
          .map((letter) => {
            return (
              <UserGroup key={letter}>
                <GroupTitle>{letter}</GroupTitle>
                <MenuItem>
                  {groupedUsers[letter].map((user) => (
                    <UserItem
                      key={user._id}
                      onClick={handleUserSelect}
                      user={user}
                      isSelected={selectedUsers.includes(user)} // Pass whether the user is selected
                    />
                  ))}
                </MenuItem>
              </UserGroup>
            );
          })}
        {filteredUsers.length === 0 && (
          <UserGroup>
            <MenuItem>
              <p className="no-results">No results found</p>
            </MenuItem>
          </UserGroup>
        )}
      </Bottom>
    </Container>
  );
};

export default SelectUsers;
