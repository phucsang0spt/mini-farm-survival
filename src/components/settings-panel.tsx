import styled from "styled-components";

const Root = styled.div<{
  width: number;
}>`
  width: ${({ width }) => width};
  max-width: 400px;
  background-color: #b79962;
  border: 2px solid #9f7f48;
  padding: 20px;
`;

export function SettingsPanel() {
  return <Root width={Renderer.scaler.screenSizeUI.width}></Root>;
}
