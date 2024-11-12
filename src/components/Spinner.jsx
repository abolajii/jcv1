import styled from "styled-components";

const Spinner = styled.div`
  border: 2px solid #9ea9a7;
  border-top: 2px solid #4b8f92;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
