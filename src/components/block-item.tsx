import { useLongPress } from "react-simple-game-engine/lib/utilities";
import styled, { css } from "styled-components";

const Root = styled.div<{
  dark: boolean;
  size: "medium" | "default" | "small" | "large";
  rounded: boolean;
  background: boolean;
  sprite: string;
  primary: boolean;
  secondary: boolean;
  highlight: boolean;
  hasVolume: boolean;
}>`
  ${({ size }) =>
    size === "large"
      ? css`
          width: 62px;
          height: 62px;
          padding: 5px;
        `
      : size === "default"
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

  ${({ background, dark, highlight, primary, secondary }) =>
    background &&
    (primary
      ? css`
          border: 1px solid #957f5b;
          background-color: #b79962;

          ${highlight &&
          css`
            border: 1px solid #f1d9b4;
          `}

          ${dark &&
          css`
            &::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: #0000003b;
            }
          `}
        `
      : secondary
      ? css`
          border: 1px solid #957f5b;
          background-color: #c8ae7d;

          ${highlight &&
          css`
            border: 1px solid #f1d9b4;
          `}

          ${dark &&
          css`
            &::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: #0000003b;
            }
          `}
        `
      : css`
          border: 1px solid #0000005b;
          background-color: #ffffff4f;

          ${highlight &&
          css`
            border: 1px solid #e2e2e2;
          `}

          ${dark &&
          css`
            &::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: #0000003b;
            }
          `}
        `)}

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
`;

type BlockItemProps = {
  background?: boolean;
  sprite: string;
  dark?: boolean;
  highlight?: boolean;
  size?: "medium" | "default" | "small" | "large";
  rounded?: boolean;
  volume?: number;
  onPress?: () => void;
  onLongPress?: () => void;
  primary?: boolean;
  secondary?: boolean;
};

export function BlockItem({
  primary = false,
  secondary = false,
  onPress,
  onLongPress,
  rounded = false,
  background = true,
  size = "default",
  sprite,
  dark = false,
  highlight = false,
  volume,
}: BlockItemProps) {
  return (
    <Root
      highlight={highlight}
      secondary={secondary}
      primary={primary}
      hasVolume={!!volume}
      sprite={sprite}
      background={background}
      // extract props for on press and long press
      {...useLongPress(onLongPress, 500, { onPress })}
      rounded={rounded}
      size={size}
      dark={dark}
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
