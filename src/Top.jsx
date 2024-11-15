import { useEffect, useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
/* eslint-disable react/prop-types */
import { GiHamburgerMenu } from "react-icons/gi";
import Reuseable from "./Reuseable";
import StoryAvi from "./StoryAvi";
import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";
import useStoryStore from "./store/useStoryStore";
import { userStory } from "./api/requests";

const UserAvi = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 4px;
  background-color: #d5cccc;
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

  /* .avi {
    flex: 0 0 auto;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background-color: #e0e0e0;
  } */

  .text-xs {
    font-size: 9px;
    text-align: center;
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
  height: 70px;
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 10px;
  background-color: #f3f8f8;
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
  const { allStories, setAllStories, selectStory } = useStoryStore();
  //   const [isOpen, setIsOpen] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await userStory();
        setAllStories(response.stories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStories();
  }, [setAllStories]);

  return (
    <Header>
      <Reuseable isOpen={openModal} setIsOpen={setOpenModal} />
      <div className="flex gap-md justify-between w-100 align-center">
        <div className="box center">
          <GiHamburgerMenu size={19} color="#36bbba" onClick={toggleSidebar} />
        </div>

        <OtherStory className="flex-1 flex">
          {/* Additional elements here */}
          {allStories.map((s, i) => {
            return (
              <StoryAvi
                key={i}
                segments={s.stories.length || 0}
                imageSrc={s.user.profilePic}
                setOpenModal={setOpenModal}
                onClick={() => {
                  setOpenModal(true);
                  selectStory(s);
                }}
              />
            );
          })}
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
