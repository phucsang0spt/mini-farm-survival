import { useLongPress } from "react-simple-game-engine/lib/utilities";
import styled, { css } from "styled-components";

const Root = styled.div<{
  highlight: boolean;
  size: "medium" | "default";
  rounded: boolean;
}>`
  ${({ size }) =>
    size === "default"
      ? css`
          width: 32px;
          height: 32px;
          padding: 2px;
        `
      : css`
          width: 52px;
          height: 52px;
          padding: 5px;
        `}

  ${({ rounded }) =>
    rounded
      ? css`
          border-radius: 100%;
        `
      : css`
          border-radius: 2px;
        `}

        position:relative;
  overflow: hidden;
  border: 1px solid #0000005b;
  background-color: #ffffff4f;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  span {
    font-size: 0.9rem;
    line-height: 0.9rem;
    position: absolute;
    bottom: -2px;
    right: -2px;
    color: #000;
    z-index: 2;
  }

  ${({ highlight }) =>
    highlight &&
    css`
      background-color: #5e9fc070;
    `}
`;

type BlockItemProps = {
  sprite: string;
  highlight?: boolean;
  size?: "medium" | "default";
  rounded?: boolean;
  volumn?: number;
  onPress?: () => void;
  onLongPress?: () => void;
};

export function BlockItem({
  onPress,
  onLongPress,
  rounded = false,
  size = "default",
  sprite,
  highlight = false,
  volumn,
}: BlockItemProps) {
  return (
    <Root
      // extract props for on press and long press
      {...useLongPress(onLongPress, 600, { onPress })}
      rounded={rounded}
      size={size}
      highlight={highlight}
    >
      {sprite && <img src={sprite} alt="" />}
      {volumn != null ? <span>{volumn}</span> : null}
    </Root>
  );
}
