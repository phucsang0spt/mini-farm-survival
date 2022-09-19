import styled, { css } from "styled-components";

const Root = styled.img<{
  size: number;
}>`
  ${({ size }) => css`
    width: ${size}px;
    height: ${size}px;
  `}

  object-fit: cover;
`;

type ButtonProps = {
  src: string;
  size?: "default" | "small";
  onClick?: () => void;
};

export function Button({ onClick, size = "default", src }: ButtonProps) {
  return (
    <Root
      onClick={onClick}
      size={size === "default" ? 30 : 20}
      alt=""
      src={src}
    />
  );
}
