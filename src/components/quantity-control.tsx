import styled from "styled-components";
import { valueToAlpha } from "utils";

const Root = styled.div`
  display: flex;
  align-items: center;

  span {
    display: block;

    color: #000;
  }

  span:first-child,
  span:last-child {
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 1.2rem;
  }

  span:nth-child(2) {
    font-size: 1.5rem;
    line-height: 1.5rem;
    margin: 0 30px;
  }
`;

type QuantityControlProps = {
  onUp: () => void;
  onDown: () => void;
  qty: number;
};

export function QuantityControl({ qty, onUp, onDown }: QuantityControlProps) {
  return (
    <Root>
      <span onClick={onDown}>&mdash;</span>
      <span>{valueToAlpha(qty)}</span>
      <span onClick={onUp}>&#9547;</span>
    </Root>
  );
}
