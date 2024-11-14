import { formatDate } from "./utils";
import group from "./group.png";
import styled from "styled-components";
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import usePostStore from "./store/usePostStore";

const Container = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
  padding: 9px;
  border-radius: 5px;
  position: relative;
  align-items: center;
  border-bottom: 1px solid rgba(54, 187, 186, 0.2);
  background: rgba(54, 187, 186, 0.07);

  flex: 1;
  &:hover {
    background: #d0dbdb;
  }

  strong {
    margin-right: 3px;
  }

  &.active {
    background: #b2e8e8;
  }
`;

const Box = styled.div`
  position: relative;
  height: 50px;
  width: 50px;
  background: #a8c7c7;
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
  bottom: 0;
  right: 0;
  height: 8px;
  width: 8px;
  background-color: ${(props) => props.statusColor || "#4caf50"};
  border: 2px solid white;
  border-radius: 50%;
`;

const MessageText = styled.p`
  font-size: 13px;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  margin: 0; /* Ensure no margin disrupts text */
`;

const NameText = styled.p`
  font-weight: 550;
  font-size: 15px;
`;

const TimeText = styled.p`
  font-size: 13px;
  color: #4e4949;
`;

const AlertBox = styled.div`
  background-color: rgb(27, 157, 135);
  height: 8px;
  width: 8px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 12px;
  color: #161515;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatItem = ({
  name,
  message,
  lastMessageSender,
  time,
  alertCount,
  status,
  profilePic,
  isGroup,
  id,
  isSelected,
  groupMembers,
}) => {
  const navigate = useNavigate();
  const { setSelectedUser } = usePostStore();

  return (
    <Container
      className={isSelected ? "active" : ""}
      onClick={() => {
        navigate("/conversation/" + id);
        setSelectedUser({ name, profilePic, groupMembers });
      }}
    >
      <Box>
        {profilePic ? (
          <img src={profilePic} alt="User Avatar" />
        ) : (
          <img src={group} alt="Group Icon" />
        )}
        {status && <StatusIcon />}
      </Box>

      <div className="flex flex-col gap-1 flex-1">
        <div className="flex justify-between">
          <NameText>{name}</NameText>
          <TimeText>{time ? formatDate(time) : ""}</TimeText>
        </div>
        <div className="flex justify-between align-center">
          <MessageText>
            {isGroup && lastMessageSender ? (
              <>
                <strong>{lastMessageSender}: </strong>
                <span>{message}</span>
              </>
            ) : (
              message
            )}
          </MessageText>
          {/* {alertCount > 0 && <AlertBox>{alertCount}</AlertBox>} */}
        </div>
      </div>
    </Container>
  );
};

export default ChatItem;
