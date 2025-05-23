import React, { useCallback, useState } from "react";
import {
  DataGrid,
  Column,
  ColumnChooser,
  ColumnChooserSearch,
  ColumnChooserSelection,
  Position,
  FilterRow,
  HeaderFilter,
  FilterPanel,
  FilterBuilderPopup,
  Search,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
import { SelectBox, type SelectBoxTypes } from "devextreme-react/select-box";
import { CheckBox, type CheckBoxTypes } from "devextreme-react/check-box";
import { employees } from "./data.ts";

const columnChooserModes: {
  key: "select" | "dragAndDrop";
  name: string;
}[] = [
  {
    key: "dragAndDrop",
    name: "Drag and drop",
  },
  {
    key: "select",
    name: "Select",
  },
];

const searchEditorOptions = { placeholder: "Search column" };
const columnChooserModeLabel = { "aria-label": "Column Chooser Mode" };

const App = () => {
  const [mode, setMode] = useState(columnChooserModes[1].key);
  const [searchEnabled, setSearchEnabled] = useState(true);
  const [allowSelectAll, setAllowSelectAll] = useState(true);
  const [selectByClick, setSelectByClick] = useState(true);
  const [recursive, setRecursive] = useState(true);

  const isDragMode = mode === columnChooserModes[0].key;

  const onModeValueChanged = useCallback(
    (e: SelectBoxTypes.ValueChangedEvent) => {
      setMode(e.value);
    },
    []
  );

  const onSearchEnabledValueChanged = useCallback(
    (e: CheckBoxTypes.ValueChangedEvent) => {
      setSearchEnabled(e.value);
    },
    []
  );

  const onAllowSelectAllValueChanged = useCallback(
    (e: CheckBoxTypes.ValueChangedEvent) => {
      setAllowSelectAll(e.value);
    },
    []
  );

  const onSelectByClickValueChanged = useCallback(
    (e: CheckBoxTypes.ValueChangedEvent) => {
      setSelectByClick(e.value);
    },
    []
  );

  const onRecursiveValueChanged = useCallback(
    (e: CheckBoxTypes.ValueChangedEvent) => {
      setRecursive(e.value);
    },
    []
  );

  return (
    <div>
      <DataGrid
        id="employees"
        dataSource={employees}
        keyExpr="ID"
        columnAutoWidth={true}
        width="100%"
        showBorders={true}
        rowAlternationEnabled={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
        showColumnLines={true}
        showRowLines={false}
        hoverStateEnabled={false}
        onCellPrepared={(e) => {
          if (e.rowType === "header" && e.column && e.cellElement) {
            const sortIcon = e.cellElement.querySelector(".dx-sort");
            const filterIcon = e.cellElement.querySelector(".dx-header-filter");

            if (sortIcon) sortIcon.setAttribute("title", "Sort this column");
            if (filterIcon)
              filterIcon.setAttribute("title", "Filter this column");
          }
        }}
      >
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Grouping autoExpandAll={false} />
        <Paging defaultPageSize={10} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={[10, 25, 50]}
          showInfo={true}
        />

        <FilterRow visible={true} />
        <FilterPanel visible={true} />
        <HeaderFilter visible>
          <Search enabled={true} timeout={700} mode="equals" />
        </HeaderFilter>
        <Column dataField="FirstName" allowHiding={false} />
        <Column dataField="LastName" />
        <Column dataField="Position" />
        <Column dataField="City" />
        <Column dataField="State" />
        <Column dataField="BirthDate" />

        <Column caption="Contacts">
          <Column dataField="MobilePhone" allowHiding={false} />
          <Column dataField="Email" />
          <Column dataField="Skype" visible={false} />
        </Column>

        <Column dataField="HireDate" dataType="date" />

        <ColumnChooser height="340px" enabled={true} mode={mode}>
          <Position
            my="right top"
            at="right bottom"
            of=".dx-datagrid-column-chooser-button"
          />

          <ColumnChooserSearch
            enabled={searchEnabled}
            editorOptions={searchEditorOptions}
          />

          <ColumnChooserSelection
            allowSelectAll={allowSelectAll}
            selectByClick={selectByClick}
            recursive={recursive}
          />
        </ColumnChooser>
      </DataGrid>

      <div className="caption">Options</div>

      <div className="selectboxes-container">
        <div className="option">
          <span>Column chooser mode</span>
          &nbsp;
          <SelectBox
            items={columnChooserModes}
            value={mode}
            valueExpr="key"
            inputAttr={columnChooserModeLabel}
            displayExpr="name"
            onValueChanged={onModeValueChanged}
          />
        </div>
      </div>

      <div className="checkboxes-container">
        <div className="option">
          <CheckBox
            id="searchEnabled"
            defaultValue={searchEnabled}
            text="Search enabled"
            onValueChanged={onSearchEnabledValueChanged}
          />
        </div>
        <div className="option">
          <CheckBox
            id="allowSelectAll"
            defaultValue={allowSelectAll}
            text="Allow select all"
            onValueChanged={onAllowSelectAllValueChanged}
            disabled={isDragMode}
          />
        </div>
        <div className="option">
          <CheckBox
            id="selectByClick"
            defaultValue={selectByClick}
            text="Select by click"
            onValueChanged={onSelectByClickValueChanged}
            disabled={isDragMode}
          />
        </div>
        <div className="option">
          <CheckBox
            id="recursive"
            defaultValue={recursive}
            text="Recursive"
            onValueChanged={onRecursiveValueChanged}
            disabled={isDragMode}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
