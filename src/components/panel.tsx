import { Control } from "react-simple-game-engine/lib/utilities";
import styled, { css } from "styled-components";

import close from "assets/images/close.png";

import { Button } from "./button";
import { ReactNode } from "react";

const Root = styled.div<{
  width: number;
  maxWidth: number;
  spacing: boolean;
}>`
  width: ${({ width }) => width}px;
  max-width: ${({ maxWidth }) => maxWidth}px;
  min-width: 300px;
  background-color: #b79962;
  border: 2px solid #9f7f48;
  position: relative;
  border-radius: 4px;

  ${({ spacing }) =>
    spacing &&
    css`
      padding: 10px;
    `}
`;

type PanelProps = {
  close: () => void;
  children: ReactNode;
  maxWidth?: number;
  spacing?: boolean;
};

export function Panel({
  spacing = true,
  maxWidth = 400,
  close: closeModal,
  children,
}: PanelProps) {
  return (
    <Root
      spacing={spacing}
      maxWidth={maxWidth}
      width={Renderer.scaler.screenSizeUI.width}
    >
      <Control top={0} right={0} xAxisOriginCenter yAxisOriginCenter>
        <Button size="small" onClick={closeModal} src={close} />
      </Control>
      <div>{children}</div>
    </Root>
  );
}
