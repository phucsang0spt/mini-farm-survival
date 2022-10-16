import {
  Animator,
  AvatarAnimationSprite,
  AvatarSprite,
  LogicComponent,
  Prefab,
  RectEntity,
  Saver,
} from "react-simple-game-engine/lib";
import {
  Avatar,
  Configuration,
  EntityPrepare,
} from "react-simple-game-engine/lib/export-types";
import { msToTimer } from "utils";
import { ChickenGeneratorEntity } from "./chicken.generator.entity";
import { FarmerEntity } from "./farmer.entity";

type Props = {
  chickSprite: Avatar;
  highlightSprite: Avatar;
};

enum ChickenState {
  BABY,
  ADULT,
}

export class ChickenEntity extends RectEntity<Props> {
  private growTime = 5 * 60; //second
  private highlightAnimation: AvatarAnimationSprite;
  private bornTime: number;
  private expectedAdultTime: number;
  protected onPrepare(): EntityPrepare<this> {
    this.highlightAnimation = new LogicComponent([
      AvatarAnimationSprite,
      {
        source: this.props.highlightSprite,
        size: {
          width: 19,
          height: 20,
        },
        width: 23,
        height: 24,
        x: 0,
        y: 0,
      },
    ]).output();

    return {
      sprite: new LogicComponent([
        AvatarSprite,
        {
          source: this.props.chickSprite,
          animation: new LogicComponent([
            Animator,
            {
              activeKey: ChickenState.BABY,
              states: {
                [ChickenState.BABY]: new LogicComponent([
                  AvatarAnimationSprite,
                  {
                    x: 0,
                    y: 30 + 3,
                    width: 27,
                    height: 27,
                    maxFrame: 3,
                    distancePerFrame: 1,
                  },
                ]).output(),
                [ChickenState.ADULT]: new LogicComponent([
                  AvatarAnimationSprite,
                  {
                    x: 0,
                    y: 0,
                    width: 30,
                    height: 30,
                  },
                ]).output(),
              },
            },
          ]),
        },
      ]),
      bodyOptions: {
        isStatic: true,
      },
    };
  }

  private remainAdultTime() {
    const diff = this.expectedAdultTime - new Date().getTime();
    return msToTimer(diff < 0 ? 0 : diff);
  }

  onDraw() {
    if (this.sprite.animator.state === ChickenState.ADULT) {
      const highlightSprite = this.props.highlightSprite;
      this.renderer.drawHandle(
        {
          x: this.position.x,
          y: this.position.y - highlightSprite.height / 2 - this.height / 2,
        },
        () => {
          this.highlightAnimation.draw();
        }
      );
    } else {
      this.renderer.drawHandle(
        {
          x: this.position.x,
          y: this.position.y - this.height / 2,
        },
        (renderer) => {
          renderer.textAlign(renderer.CENTER, renderer.BOTTOM);
          renderer.fill(255);
          renderer.textStyle(renderer.BOLD);
          renderer.text(this.remainAdultTime(), 0, 0);
        }
      );
    }
  }

  onMouseRelease() {
    if (this.sprite.animator.state === ChickenState.ADULT) {
      const { realMouseX, realMouseY } = this.renderer;
      if (
        this.edge.left <= realMouseX &&
        realMouseX <= this.edge.right &&
        this.edge.top <= realMouseY &&
        realMouseY <= this.edge.bottom
      ) {
        this.worldManagement.getEntity(FarmerEntity).addItem("raw-chicken", 1);
        this.worldManagement
          .getEntity(ChickenGeneratorEntity)
          .removeChicken(this.name);
      }
    }
  }

  onActive() {
    this.onTimer(
      this.growTime * 1000,
      //invoke
      () => {
        this.sprite.animator.state = ChickenState.ADULT;
      },
      {
        once: true,
        startFrom: this.renderer.constrainMax(
          // can't not born in future
          Saver.get(`chicken::${this.name}-born-time`, Number),
          new Date().getTime()
        ),
        onRegisterDone: (time) => {
          Saver.set(`chicken::${this.name}-born-time`, time);
          this.bornTime = time;
          this.expectedAdultTime = this.bornTime + this.growTime * 1000;
        },
      }
    );
  }
}

export class ChickenPrefab extends Prefab<ChickenEntity> {
  constructor(config: Configuration<ChickenEntity>) {
    super([ChickenEntity, config]);
  }
}
