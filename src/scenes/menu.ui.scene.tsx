import styled from "styled-components";
import background from "assets/images/menu-background.png";
import play from "assets/images/play.png";
import title from "assets/images/menu-title.png";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("${background}");

  > * {
    translate: 0 -50px;
  }

  img:last-child {
    margin-top: 30px;
  }
`;

export type MenuUIProps = {
  onStart: () => void;
};

export function MenuUI({ onStart }: MenuUIProps) {
  return (
    <Root>
      <img src={title} alt="" />
      <img src={play} onClick={onStart} alt="" />
    </Root>
  );
}
