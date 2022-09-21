import { useLongPress } from "react-simple-game-engine/lib/utilities";
import styled, { css } from "styled-components";

const Root = styled.div<{
  highlight: boolean;
  size: "medium" | "default" | "small";
  rounded: boolean;
  background: boolean;
  sprite: string;
  hasVolume: boolean;
}>`
  ${({ size }) =>
    size === "default"
      ? css`
          width: 32px;
          height: 32px;
          padding: 2px;
        `
      : size === "small"
      ? css`
          width: 22px;
          height: 22px;
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

  ${({ background }) =>
    background &&
    css`
      border: 1px solid #0000005b;
      background-color: #ffffff4f;
    `}

  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${({ hasVolume }) =>
    hasVolume &&
    css`
      padding: 1px 2px 0px 2px;
    `}

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-grow: 1;
    flex-shrink: 1;

    > div {
      width: 100%;
      height: 100%;
      background-image: url("${({ sprite }) => sprite}");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      ${({ rounded }) =>
        rounded
          ? css`
              border-radius: 100%;
            `
          : css`
              border-radius: 2px;
            `}
    }
  }

  span {
    font-size: 0.8rem;
    line-height: 0.8rem;
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
  background?: boolean;
  sprite: string;
  highlight?: boolean;
  size?: "medium" | "default" | "small";
  rounded?: boolean;
  volume?: number;
  onPress?: () => void;
  onLongPress?: () => void;
};

export function BlockItem({
  onPress,
  onLongPress,
  rounded = false,
  background = true,
  size = "default",
  sprite,
  highlight = false,
  volume,
}: BlockItemProps) {
  return (
    <Root
      hasVolume={!!volume}
      sprite={sprite}
      background={background}
      // extract props for on press and long press
      {...useLongPress(onLongPress, 500, { onPress })}
      rounded={rounded}
      size={size}
      highlight={highlight}
    >
      {sprite && (
        <div>
          <div />
        </div>
      )}
      {volume != null ? <span>{volume}</span> : null}
    </Root>
  );
}
