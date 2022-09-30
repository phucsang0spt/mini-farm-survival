import { ReactElement } from "react";
import styled, { css } from "styled-components";
import { paginatedList, valueToAlpha } from "utils";
import { BlockItem } from "./block-item";

const Root = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > div {
    + div {
      margin-top: 15px;
    }
  }
`;

const Title = styled.span`
  font-size: 20px;
  line-height: 20px;
  color: #393939;
  margin-bottom: 10px;
`;

const ExtendEl = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export type InfoViewItem = Omit<Item, "format"> & {
  info: { label: string; value: string }[];
};

type InfoViewProps = {
  item?: InfoViewItem | null;
  extendEl?: ReactElement;
};

export function InfoView({ item, extendEl }: InfoViewProps) {
  return (
    <Root>
      <Title>{item ? item.label : "Choose item to view"}</Title>
      <BlockItem size="large" sprite={item?.sprite || ""} />
      {item && <PropertyStack infos={item.info} />}
      {extendEl && <ExtendEl>{extendEl}</ExtendEl>}
    </Root>
  );
}

const PropertyStackRoot = styled.table<{
  isOnlyOneInfo: boolean;
}>`
  margin-top: 5px;

  ${({ isOnlyOneInfo }) =>
    !isOnlyOneInfo &&
    css`
      td[data-tag="main-col"] {
        &:first-child {
          padding-right: 10px;
        }
      }
    `}

  td[data-tag="value-col"] {
    max-width: 42px;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }

  td {
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: bold;
    color: #393939;

    table {
      td {
        &:first-child {
          text-align: right;
        }
        padding-top: 2px;
        padding-bottom: 2px;
      }
    }
  }
`;

type PropertyStackProps = {
  infos: { label: string; value: string | number }[];
};
function PropertyStack({ infos }: PropertyStackProps) {
  const rows = paginatedList(infos, 2);

  const isOnlyOneInfo = infos.length === 1;
  return (
    <PropertyStackRoot isOnlyOneInfo={isOnlyOneInfo}>
      <tbody>
        <tr>
          {Array.from({ length: isOnlyOneInfo ? 1 : 2 }).map((_, colIndex) => (
            <td key={colIndex} data-tag="main-col">
              <table>
                <tbody>
                  {rows.map((cols, rowIndex) => {
                    const col = cols[colIndex];
                    return (
                      <tr key={rowIndex}>
                        {col ? (
                          <>
                            <td>{col.label}:</td>
                            <td data-tag="value-col">
                              {typeof col.value === "number"
                                ? valueToAlpha(col.value as number)
                                : col.value}
                            </td>
                          </>
                        ) : (
                          <>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </td>
          ))}
        </tr>
      </tbody>
    </PropertyStackRoot>
  );
}
