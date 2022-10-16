import { RectEntity } from "react-simple-game-engine/lib";

export class ToolEntity<Props = any> extends RectEntity<Props> {
  target: RectEntity = null;
}
