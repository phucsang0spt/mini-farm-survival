import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const Root = styled.button`
  background: #957f5b;
  border-radius: 4px;
  border: 1px solid #b79962;
  padding: 5px 12px;
  font-size: 1rem;
  line-height: 1rem;
  color: #dcdcdc;
  font-weight: bold;

  &:disabled {
    color: #393939;
  }
`;

type PanelButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
};

export function PanelButton({ children, ...props }: PanelButtonProps) {
  return <Root {...props}>{children}</Root>;
}
