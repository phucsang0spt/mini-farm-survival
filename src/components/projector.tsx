import styled from "styled-components";

const Root = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid #9f7f48;
  box-shadow: 0 0 4px 2px #00000021 inset;
  background-color: #d9c092;
  border-radius: 2px;
`;

export function Projector() {
  return <Root />;
}
