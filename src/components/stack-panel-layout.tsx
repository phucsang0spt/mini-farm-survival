import { ReactElement, useMemo, useState } from "react";
import styled from "styled-components";

import { Panel } from "./panel";
import { ItemGrid, ItemGridProps } from "./item-grid";
import { BlockItem } from "./block-item";
import { Projector } from "./projector";

const Root = styled.div`
  display: flex;
  height: 300px;

  > div {
    height: 100%;

    &:first-child {
      margin-right: 5px;
    }

    &:nth-child(2) {
      border-top: 2px solid #00000000;
      border-bottom: 2px solid #00000000;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    &:last-child {
      margin-left: 2px;
      flex-grow: 1;
      flex-shrink: 1;
      padding-right: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
`;

const TabStack = styled.div<{
  active: string | number;
  amountTab: number;
}>`
  width: 30px;
  height: 100%;
  background-color: #9f7f48;
  border-right: 1px solid #9f7f48;

  > div {
    width: 30px;
    height: calc(100% / ${({ amountTab }) => amountTab});
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 5px solid #907341;
    transition: border-right 50ms ease-in-out;

    &:first-child {
      border-bottom: 1px solid #907341;
    }

    background-color: #9f7f48;
    &[data-active="true"] {
      border-right: 1px solid #907341;
    }
  }
`;

export type StackPanelLayoutProps<TabCode extends string | number> = {
  tabs: {
    code: TabCode;
    sprite: string;
    hook: ItemGridProps & {
      projector: ReactElement;
    };
  }[];
  defaultActive: TabCode;
};

export function StackPanelLayout<TabCode extends string | number>({
  defaultActive,
  tabs,
}: StackPanelLayoutProps<TabCode>) {
  const [activeTab, setActiveTab] = useState<TabCode>(defaultActive);

  const tab = useMemo(() => {
    return tabs.find((tab) => tab.code === activeTab);
  }, [activeTab, tabs]);

  const { projector, ...itemGridProps } = tab.hook;

  return (
    <Panel spacing={false} maxWidth={500}>
      <Root>
        <div>
          <TabStack amountTab={tabs.length}  active={activeTab}>
            {tabs.map((tab) => (
              <div
                key={tab.code}
                data-active={activeTab === tab.code}
                onClick={() => setActiveTab(tab.code)}
              >
                <BlockItem
                  size="small"
                  background={false}
                  sprite={tab.sprite}
                />
              </div>
            ))}
          </TabStack>
        </div>
        <div>
          <ItemGrid {...itemGridProps} />
        </div>
        <div>
          <Projector>{projector}</Projector>
        </div>
      </Root>
    </Panel>
  );
}
