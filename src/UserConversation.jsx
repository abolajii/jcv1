import { BiSolidMessageSquareDetail } from "react-icons/bi";
import ChatItem from "./ChatItem";
import React from "react";
import { RiPushpinFill } from "react-icons/ri";
import { Spinner } from "./components";
import { getUserConversation } from "./api/requests";
import styled from "styled-components";

const Container = styled.div``;

const ChatMenu = styled.div`
  .mute {
    color: #444444;
    margin-left: 6px;
    font-size: 16px;
  }

  .small {
    font-size: 13px;
    margin-bottom: 9px;
  }
`;

const Scrollable = styled.div`
  height: calc(100svh - 163px);
  overflow-y: scroll;
`;

const UserConversation = () => {
  const [loading, setLoading] = React.useState(true);
  const [conversations, setConversations] = React.useState([]);

  const pinnedMessages = conversations.filter((chat) => chat.pinned);
  const allMessages = conversations.filter((chat) => !chat.pinned);

  React.useEffect(() => {
    const fetchMutualFollow = async () => {
      try {
        const response = await getUserConversation();
        setConversations(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchMutualFollow();
  }, []);

  if (loading) {
    return (
      <Container>
        <ChatMenu>
          <div className="pl-2 pt-2">
            <Spinner />
          </div>
        </ChatMenu>
      </Container>
    );
  }
  return (
    <Container>
      <ChatMenu>
        {pinnedMessages.length > 0 && (
          <>
            <div className="flex align-center small">
              <RiPushpinFill color="#a9a9a9" size={22} />
              <p className="mute">Pinned</p>
            </div>
            {pinnedMessages.map((chat) => (
              <ChatItem
                key={chat.id}
                id={chat.id}
                name={chat.name}
                message={chat.message}
                time={chat.time}
                alertCount={chat.alertCount}
                profilePic={chat.profilePic}
                status={chat.status}
                isGroup={chat.isGroup}
                groupMembers={chat.groupMembers}
                lastMessageSender={chat.lastMessageSender} // Send the lastMessageSender for group chats
              />
            ))}
          </>
        )}
        {/* Pinned Messages Section */}
        {/* <div className="flex align-center small">
          <RiPushpinFill color="#a9a9a9" />
          <p className="mute">Pinned</p>
        </div> */}
        {/*

        {/* {pinnedMessages.length > 0 ? (
          pinnedMessages.map((chat) => (
            <ChatItem
              key={chat.id}
              id={chat.id}
              name={chat.name}
              message={chat.message}
              time={chat.time}
              alertCount={chat.alertCount}
              avatar={chat.avatar}
              status={chat.status}
              isGroup={chat.isGroup}
              lastMessageSender={chat.lastMessageSender} // Send the lastMessageSender for group chats
            />
          ))
        ) : (
          <p className="mute">No pinned messages</p>
        )} */}

        {/* All Messages Section */}
        <div className="flex align-center small pl-1 pt-1">
          <BiSolidMessageSquareDetail color="#a9a9a9" size={20} />
          <p className="mute">All Messages</p>
        </div>

        <Scrollable>
          {allMessages.length > 0 ? (
            allMessages.map((chat) => (
              <ChatItem
                key={chat.id}
                id={chat.id}
                name={chat.name}
                isGroup={chat.isGroup}
                message={chat.message}
                time={chat.time}
                alertCount={chat.alertCount}
                profilePic={chat.profilePic}
                groupMembers={chat.groupMembers}
                //   isSelected={conversation?.id === chat.id}
                status={chat.status}
                lastMessageSender={chat.lastMessageSender} // Send the lastMessageSender for group chats
              />
            ))
          ) : (
            <p className="mute text-sm mt-4">No messages</p>
          )}
        </Scrollable>
      </ChatMenu>
    </Container>
  );
};

export default UserConversation;
