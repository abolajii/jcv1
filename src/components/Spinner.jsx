import styled from "styled-components";

const Spinner = styled.div`
  border: 2px solid rgba(191, 153, 251, 0.4);
  border-top: 2px solid #abe4dd;
  border-radius: 50%;
  width: 13px;
  height: 13px;
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
