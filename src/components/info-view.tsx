import styled from "styled-components";
import { paginatedList } from "utils";
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

type InfoViewProps = {
  item: Item | null;
};

export function InfoView({ item }: InfoViewProps) {
  return (
    <Root>
      <Title>{item ? item.label : "Choose item to view"}</Title>
      <BlockItem size="large" sprite={item?.sprite || ""} />
      {item && (
        <PropertyStack
          infos={Object.keys(item.format || {})
            .map((k) =>
              k === "shape"
                ? null
                : {
                    label: k.toUpperCase(),
                    value: (item.format as any)[k],
                  }
            )
            .filter(Boolean)}
        />
      )}
    </Root>
  );
}

const PropertyStackRoot = styled.table`
  margin-top: 5px;

  td[data-tag="main-col"] {
    &:first-child {
      padding-right: 10px;
    }
  }

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
  infos: { label: string; value: string }[];
};
function PropertyStack({ infos }: PropertyStackProps) {
  const rows = paginatedList(infos, 2);
  return (
    <PropertyStackRoot>
      <tbody>
        <tr>
          {Array.from({ length: 2 }).map((_, colIndex) => (
            <td key={colIndex} data-tag="main-col">
              <table>
                <tbody>
                  {rows.map((cols, rowIndex) => (
                    <tr key={rowIndex}>
                      {cols[colIndex] ? (
                        <>
                          <td>{cols[colIndex].label}:</td>
                          <td data-tag="value-col">{cols[colIndex].value}</td>
                        </>
                      ) : (
                        <>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          ))}
        </tr>
      </tbody>
    </PropertyStackRoot>
  );
}
