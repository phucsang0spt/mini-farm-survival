import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const Root = styled.button`
  border: 1px solid #39c;
  border-radius: 0;
  width: unset;
  height: unset;
  padding: 5px;
  line-height: 0px;
  background-color: #fff;
  cursor: pointer;

  + button {
    margin-left: 15px;
  }
`;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

export function Button({ children, ...props }: ButtonProps) {
  return <Root {...props}>{children}</Root>;
}
