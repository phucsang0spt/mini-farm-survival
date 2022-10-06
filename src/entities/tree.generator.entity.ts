import { Generator } from "./generator.entity";
import { TreePrefab } from "./tree.entity";

type Props = {
  treeOffsets: (0 | 1)[];
  bigTreeOffsets: (0 | 1)[];
};

export class TreeGeneratorEntity extends Generator<Props> {
  onBootstrapCompleted() {
    super.onBootstrapCompleted();
    const { treeOffsets, bigTreeOffsets } = this.props;
    this.generateTile(TreePrefab, treeOffsets);
    this.generateTile(TreePrefab, bigTreeOffsets, { type: "big" });
  }
}
