import { useEffect, useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
/* eslint-disable react/prop-types */
import { GiHamburgerMenu } from "react-icons/gi";
import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";
import { userStory } from "./api/requests";

const UserAvi = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 4px;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;

  img {
    border-radius: 5px;
  }
`;

const OtherStory = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
  max-width: calc(100vw - 90px);

  .avi {
    flex: 0 0 auto;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background-color: #f4f4f4;
  }
`;

const AddIcon = styled(AiOutlinePlus)`
  position: absolute;
  bottom: -3px;
  right: -5px;
  color: white;
  background-color: #36bbba;
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;
  height: 15px;
  width: 15px;
  &:hover {
    background-color: #28a69e;
  }
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px; /* Adjust as needed */
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 10px;
  background-color: rgba(232, 239, 239, 1);
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  z-index: 5;

  .box {
    border: 1px solid #28a69e;
    height: 28px;
    width: 28px;
    border-radius: 3px;
    background-color: #ccf3f0;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
const Top = ({ toggleSidebar, setIsOpen }) => {
  const { user } = useAuthStore();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await userStory();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStories();
  }, []);

  return (
    <Header>
      <div className="flex gap-md justify-between w-100">
        <div className="box center">
          <GiHamburgerMenu size={19} color="#36bbba" onClick={toggleSidebar} />
        </div>

        <OtherStory className="flex-1 flex">
          {/* Additional elements here */}
        </OtherStory>
        <UserAvi onClick={() => setIsOpen(true)}>
          <img src={user?.profilePic} alt="User avatar" />
          <AddIcon size={13} color="#fff" />
        </UserAvi>
      </div>
    </Header>
  );
};

export default Top;
