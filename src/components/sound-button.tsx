import { Button } from "./button";

import music from "assets/images/music-on.png";
import musicOff from "assets/images/music-off.png";

import vol from "assets/images/vol-on.png";
import volOff from "assets/images/vol-off.png";

type SoundButtonProps = {
  type: "music" | "vol";
  on: boolean;
  onToggle: (isOn: boolean) => void;
};

const sounds = {
  music,
  musicOff,
  vol,
  volOff,
};
export function SoundButton({ type, on, onToggle }: SoundButtonProps) {
  return (
    <Button
      onClick={() => onToggle(on ? false : true)}
      src={sounds[`${type}${on ? "" : "Off"}`]}
    />
  );
}
