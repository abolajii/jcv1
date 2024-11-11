/* eslint-disable react/prop-types */
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { createGroupConversation, getMutualFollow } from "./api/requests";
import styled, { keyframes } from "styled-components";

import { IoMdCamera } from "react-icons/io";
import React from "react";
import SelectUsers from "./SelectUsers";
import Spinner from "./components/Spinner";
import { truncateWords } from "./utils";

const GroupModal = ({ isOpen, setIsClosing, isClosing, setIsOpen }) => {
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [groupName, setGroupName] = React.useState("");
  const [file, setFile] = React.useState(null);

  const [loading, setLoading] = React.useState(true);
  const [clicked, setClicked] = React.useState(false);

  React.useEffect(() => {
    const fetchMutualFollow = async () => {
      try {
        const response = await getMutualFollow();
        console.log(response);
        setUsers(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchMutualFollow();
  }, []);

  //
  const [isSecondSectionActive, setIsSecondSectionActive] =
    React.useState(false);

  const handleNext = () => {
    setIsSecondSectionActive(true);
  };

  const handleBack = () => {
    setIsSecondSectionActive(false);
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const closeModal = () => {
    setIsClosing(true);
    setSelectedUsers([]);
    // setSearchTerm("");
    setIsSecondSectionActive(false);
    setFile(null);
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const handleBackgroundClick = () => {
    closeModal();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      if (selectedFile.size <= maxSize) {
        setFile(selectedFile);
      } else {
        alert("File size should be less than 5MB");
      }
    } else {
      alert("Please select a valid image file.");
    }
  };

  const createGroupChat = async () => {
    setClicked(true);
    const userIds = selectedUsers.map((u) => u._id);

    const formData = new FormData();

    userIds.forEach((userId) => {
      formData.append("participants", userId);
    });

    formData.append("groupName", groupName);
    formData.append("file", file);

    try {
      const response = await createGroupConversation(formData);
      console.log(response);
      setClicked(false);
      closeModal();
    } catch (error) {
      console.log(error);
      setClicked(false);
    }
  };

  return (
    isOpen && (
      <ModalBackground
        className={isClosing ? "fade-out" : "fade-in"}
        onClick={handleBackgroundClick}
      >
        {loading ? (
          <Inner className="pt-4 pl-4">
            <Spinner />
          </Inner>
        ) : (
          <Inner
            className={isClosing ? "slide-out" : "slide-in"}
            onClick={(e) => e.stopPropagation()}
          >
            <SectionOne isActive={!isSecondSectionActive}>
              <One>
                <Top>
                  <div></div>
                  <div className="flex flex-col center">
                    <div className="member">Add members</div>
                    <p className="total">
                      {selectedUsers.length} / {users.length}
                    </p>
                  </div>
                  <div className="btn">
                    <button
                      disabled={selectedUsers.length === 0}
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </Top>
                <SelectUsers
                  selectedUsers={selectedUsers}
                  users={users}
                  setSelectedUsers={setSelectedUsers}
                />
              </One>
            </SectionOne>
            <SectionTwo isActive={isSecondSectionActive}>
              <Two>
                <Top>
                  <button onClick={handleBack} className="center">
                    <MdChevronLeft
                      size={24}
                      color={"#36bbba"}
                      className="pointer"
                    />
                  </button>

                  <div className="flex flex-col center">
                    <div className="member">New group</div>
                  </div>
                  <div className="btn">
                    <button onClick={createGroupChat}>
                      {clicked ? <Spinner /> : "Create"}
                    </button>
                  </div>
                </Top>
                <MenuItem>
                  <div className="flex gap-sm align-center">
                    <div>
                      <Camera className="center">
                        {file ? (
                          <Image>
                            <img
                              src={URL.createObjectURL(file)}
                              alt="Preview"
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          </Image>
                        ) : (
                          <IoMdCamera size={30} color="#4f7574" />
                        )}
                        <input
                          type="file"
                          accept="image/*" // Allow only image files
                          onChange={handleFileChange}
                        />
                      </Camera>
                    </div>
                    <div
                      style={{
                        flex: 1,
                      }}
                    >
                      <Input
                        placeholder="Group name (Optional)"
                        value={groupName}
                        onChange={handleGroupNameChange}
                      />
                    </div>
                  </div>
                </MenuItem>
                <MenuItem>
                  <DetailItem>
                    <div className="item"> Messages settings</div>
                    <div className="center">
                      <MdChevronRight size={20} />
                    </div>
                  </DetailItem>
                  <DetailItem>
                    <div className="item"> Group settings</div>
                    <div className="center">
                      <MdChevronRight size={20} />
                    </div>
                  </DetailItem>
                </MenuItem>

                <p className="pl-2 pt-2 title">Members</p>

                <div className="flex gap-sm mt-4">
                  {selectedUsers.map((user) => {
                    // console.log(user);
                    return (
                      <div key={user._id}>
                        <Box>
                          <img src={user.profilePic} alt="image" />
                          <div className="name">
                            {truncateWords(user.name, 200)}
                          </div>
                        </Box>
                      </div>
                    );
                  })}
                </div>
              </Two>
            </SectionTwo>
          </Inner>
        )}
      </ModalBackground>
    )
  );
};

export default GroupModal;

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
  .name {
    font-size: 9px;
    text-align: center;
    margin-top: -3px;
  }
`;

// Keyframes for modal background fade-in and fade-out
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(54, 187, 186, 0.4);

  padding: 13px 4px;
  cursor: pointer;

  .item {
    font-size: 13px;
  }
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  font-size: 13px;
  padding: 3px 0;
  outline: none;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #c1acba;

  border-bottom: 1px solid rgba(54, 187, 186, 0.4);

  /* Add border-bottom here */
`;

const MenuItem = styled.div`
  background-color: rgba(195, 235, 235, 0.5);

  padding: 9px;
  margin-top: 40px;
  border-radius: 6px;
  /* display: flex; */
`;

const Camera = styled.div`
  height: 55px;
  width: 55px;
  background: 1px solid rgba(54, 187, 186, 0.7);

  border-radius: 50%;
  position: relative;
  input {
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
  }
`;

const Image = styled.div`
  height: 55px;
  width: 55px;
  border-radius: 50%;

  img {
    height: 100%;
    width: 100%;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;

  &.fade-in {
    animation: ${fadeIn} 0.5s ease forwards;
  }

  &.fade-out {
    animation: ${fadeOut} 0.5s ease forwards;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px); /* Modal slides from top */
  }
  to {
    opacity: 1;
    transform: translateY(0); /* Modal reaches its final position */
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0); /* Modal at its position */
  }
  to {
    opacity: 0;
    transform: translateY(-50px); /* Modal slides up */
  }
`;

const Inner = styled.div`
  width: 350px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #bedede;
  position: relative;
  height: 630px;
  overflow: hidden;

  &.slide-in {
    animation: ${slideIn} 0.5s ease forwards;
  }

  &.slide-out {
    animation: ${slideOut} 0.5s ease forwards;
  }
`;

const One = styled.div``;

const Top = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(54, 187, 186, 0.2);

  .member,
  .btn {
    font-size: 12px;
  }

  .total {
    font-size: 9px;
  }
`;

const Section = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
  top: 0;
  left: 0;
`;

const SectionOne = styled(Section)`
  transform: ${({ isActive }) =>
    isActive ? "translateX(0)" : "translateX(-100%)"};
`;

const SectionTwo = styled(Section)`
  transform: ${({ isActive }) =>
    isActive ? "translateX(0)" : "translateX(100%)"};
`;

const Two = styled(One)`
  padding: 10px;
  .title {
    font-size: 13px;
    font-weight: 500;
  }
`;
