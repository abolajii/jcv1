import { useEffect, useState } from "react";

import { AiOutlineRise } from "react-icons/ai";
import People from "./People";
import Spinner from "../components/Spinner";
import { getSuggestedUsers } from "../api/requests";
import project from "./project.jpg";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  .top {
    margin-top: 10px;
    margin-left: 10px;
  }
`;

const ImageBackground = styled.div`
  height: 200px;
  background-image: url(${project});
  background-size: cover;
  background-position: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Soft shadow for image
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%; // Adjust to control how high the shadow reaches
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0)
    ); // Darker gradient at bottom
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: #fff;
  z-index: 1;
  font-size: 14px;
  /* line-height: 1.5; */

  h1 {
    font-size: 14px;
    font-weight: bold;
  }

  p {
    font-size: 12px;
    font-weight: 300;
  }

  .text-sm {
    font-size: 10px;
    margin-left: 3px;
  }
`;

const Discover = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const response = await getSuggestedUsers();
        setUsers(response.data.suggestions);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuggestion();
  }, [setIsLoading]);

  if (isLoading) {
    return (
      <Container>
        <div className="top">
          <Spinner />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <ImageBackground>
        <TextOverlay>
          <h1>#HouseHaven</h1>
          <p>Find your next home</p>
          <div className="flex align-center">
            <AiOutlineRise size={10} />
            <p className="text-sm">Incoming Project</p>
          </div>
        </TextOverlay>
      </ImageBackground>
      {users.length === 0 && !isLoading && (
        <p className="text-sm pt-2 pl-1">
          Sadly no more connects. Share with friends🫰
        </p>
      )}
      {users.map((user) => (
        <People
          setIsLoading={setIsLoading}
          key={user._id}
          user={user}
          setUsers={setUsers}
        />
      ))}
    </Container>
  );
};

export default Discover;
