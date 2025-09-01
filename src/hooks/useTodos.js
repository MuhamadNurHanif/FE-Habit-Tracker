import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, createTodo, updateTodo, deleteTodo } from "@/services/api";
import { toast } from "sonner";

export function useTodos() {
  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const create = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      toast.success("Todo created successfully!");
    },
    onError: () => toast.error("Failed to create todo"),
  });

  const update = useMutation({
    mutationFn: updateTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(["todos"]);
      const prev = queryClient.getQueryData(["todos"]);
      queryClient.setQueryData(["todos"], (old) =>
        old.map((t) => (t.id === newTodo.id ? { ...t, ...newTodo } : t))
      );
      return { prev };
    },
    onError: (_err, _newTodo, ctx) => {
      queryClient.setQueryData(["todos"], ctx.prev);
      toast.error("Failed to update todo");
    },
    onSuccess: () => toast.success("Todo updated!"),
    onSettled: () => queryClient.invalidateQueries(["todos"]),
  });

  const remove = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      toast.success("Todo deleted");
    },
    onError: () => toast.error("Failed to delete todo"),
  });

  return { todosQuery, create, update, remove };
}