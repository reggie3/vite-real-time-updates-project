import useGetTodos from "../../hooks/useGetTodos";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, CardContent, CardHeader, LinearProgress } from "@mui/material";
import { Todo } from "@/schema";
import CompletionStatusCell from "./CompletionStatusCell";

const columns: GridColDef<Todo>[] = [
  { field: "title", headerName: "Title" },
  { field: "description", headerName: "Description" },
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

  return (
    <Card>
      <CardHeader title="Todos" />
      <CardContent>
        <DataGrid
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          rows={rows.reverse()}
          columns={columns}
          loading={isLoading}
          density="compact"
          slots={{ loadingOverlay: LinearProgress }}
          pageSizeOptions={[5]}
        />
      </CardContent>
    </Card>
  );
};

export default TodoGrid;
