import useGetTodos from "../../hooks/useGetTodos";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowModesModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Card, CardContent, CardHeader, LinearProgress } from "@mui/material";
import { Todo } from "../../schema";
import CompletionStatusCell from "./CompletionStatusCell";

const columns: GridColDef<Todo>[] = [
  { field: "title", headerName: "Title" },
  { field: "description", headerName: "Description", editable: true },
  { field: "assignee", headerName: "Assignee" },
  { field: "location", headerName: "Location" },
  { field: "cost", headerName: "Cost" },
  { field: "creator", headerName: "Creator" },
  {
    field: "completed",
    type: "boolean",
    renderCell: CompletionStatusCell,
  },
  { field: "updatedAt", headerName: "Updated At" },
];

const TodoGrid = () => {
  const { isLoading, data: todos } = useGetTodos();

  const rows = todos
    ? [...todos]?.sort((a: Todo, b: Todo) =>
        a.createdAt > b.createdAt ? 1 : -1
      )
    : [];

  const processRowUpdate = (
    newRow: GridValidRowModel,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _oldRow: GridValidRowModel
  ) => {
    console.log("processRowUpdate", newRow);
    const updatedRow = { ...newRow, isNew: false };
    // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    console.log("handleRowModesModelChange", newRowModesModel);
    // setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    console.log("handleRowEditStop", params);
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  return (
    <Card>
      <CardHeader title="Todos" />
      <CardContent>
        <DataGrid
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          rows={rows.reverse()}
          // @ts-expect-error Type 'GridColDef<Todo>[]' is not assignable to type 'readonly GridColDef<GridValidRowModel>[]'.
          columns={columns}
          loading={isLoading}
          density="compact"
          slots={{ loadingOverlay: LinearProgress }}
          pageSizeOptions={[5]}
          autoHeight={true}
        />
      </CardContent>
    </Card>
  );
};

export default TodoGrid;
