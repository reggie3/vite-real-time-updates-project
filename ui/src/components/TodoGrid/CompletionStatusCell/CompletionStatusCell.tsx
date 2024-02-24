import { useAddTodo } from "../../../hooks";
import { Todo } from "@/schema";
import { Button } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";

const CompletionStatusCell: React.FC<GridRenderCellParams<Todo>> = (props) => {
  const { mutate } = useAddTodo();

  const toggleStatus = () => {
    const updatedTask = { ...props.row, completed: !props.row.completed };
    mutate(updatedTask);
  };
  return (
    <Button variant="text" onClick={toggleStatus}>
      {props.value ? "✅" : "❌"}
    </Button>
  );
};

export default CompletionStatusCell;
