import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  TextField,
} from "@mui/material";
import { titleCase } from "title-case";
import { useAddTodo } from "../../hooks";
import { Todo } from "@/schema";
import { useEffect } from "react";

const TodoForm = () => {
  const { reset, handleSubmit, control } = useForm<Todo>();

  const { mutate, isPending, isSuccess } = useAddTodo();

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  const onSubmit: SubmitHandler<Todo> = (data) => {
    mutate(data);
  };

  return (
    <Card>
      <CardHeader title="Add Todo" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            justifyContent={"space-between"}
          >
            {/* register your input into the hook by invoking the "register" function */}
            <Box display={"flex"} flexDirection={"row"} gap={2}>
              <Controller
                control={control}
                name="title"
                defaultValue={""}
                render={({ field: params }) => (
                  <TextField {...params} label={titleCase(params.name)} />
                )}
              />

              <Controller
                control={control}
                name="description"
                defaultValue={""}
                render={({ field: params }) => (
                  <TextField
                    {...params}
                    label={titleCase(params.name)}
                    sx={{ flex: 1 }}
                  />
                )}
              />
            </Box>
            <Box display={"flex"} flexDirection={"row"} gap={2}>
              <Controller
                control={control}
                name="assignee"
                defaultValue={""}
                render={({ field: params }) => (
                  <TextField {...params} label={titleCase(params.name)} />
                )}
              />
              <Controller
                control={control}
                name="location"
                defaultValue={""}
                render={({ field: params }) => (
                  <TextField {...params} label={titleCase(params.name)} />
                )}
              />
              <Controller
                control={control}
                name="cost"
                defaultValue={0}
                render={({ field: params }) => (
                  <TextField
                    {...params}
                    label={titleCase(params.name)}
                    type="number"
                    onChange={(e) =>
                      params.onChange(
                        parseInt(
                          (e.target as HTMLInputElement).valueAsNumber.toFixed(
                            2
                          )
                        )
                      )
                    }
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                )}
              />
              <Controller
                control={control}
                name="creator"
                defaultValue={""}
                render={({ field: params }) => (
                  <TextField {...params} label={titleCase(params.name)} />
                )}
              />
              <Controller
                control={control}
                defaultValue={false}
                name="completed"
                render={({ field: params }) => (
                  <FormControlLabel
                    control={<Checkbox {...params} />}
                    label={titleCase(params.name)}
                  />
                )}
              />
            </Box>
            {/* 
      {/* include validation with required or other standard HTML validation rules
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
            {/* {errors.exampleRequired && <span>This field is required</span>} */}

            <Button type="submit">Save</Button>
          </Box>
        </form>
        <LinearProgress sx={{ visibility: isPending ? "visible" : "hidden" }} />
      </CardContent>
    </Card>
  );
};

export default TodoForm;
