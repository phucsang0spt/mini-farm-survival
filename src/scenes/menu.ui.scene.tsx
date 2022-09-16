import styled from "styled-components";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 90px;
    height: 40px;
    background: #39c;
    color: #fff;
    border: 1px solid #fff;
    padding: 5px 10px;
    font-size: 14px;
    line-height: 14px;
    text-transform: uppercase;
    cursor: pointer;
  }
`;

export type MenuUIProps = {
  onStart: () => void;
};

export function MenuUI({ onStart }: MenuUIProps) {
  return (
    <Root>
      <button onClick={onStart}>Start</button>
    </Root>
  );
}
