import { BoundaryPrefab } from "./boundary.entity";
import { Generator } from "./generator.entity";

type Props = {
  boundaryOffsets: (0 | 1)[];
};

export class BoudaryGeneratorEntity extends Generator<Props> {
  onBootstrapCompleted() {
    super.onBootstrapCompleted();
    const { boundaryOffsets } = this.props;
    this.generateTile(BoundaryPrefab, boundaryOffsets);
  }
}
