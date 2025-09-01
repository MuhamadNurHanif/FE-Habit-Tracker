import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useTodos } from "@/hooks/useTodos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

export default function Dashboard() {
  const { todosQuery, create, update, remove } = useTodos();
  const { register, handleSubmit, reset } = useForm();

  if (todosQuery.isLoading)
    return <p className="p-4">Loading habit tracker...</p>;
  if (todosQuery.isError)
    return <p className="p-4 text-red-500">Failed to load habit tracker.</p>;

  const todos = todosQuery.data ?? [];

  const onSubmit = (data) => {
    create.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="p-6">
          {/* Pop-up Add Todo */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Todo</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Data</DialogTitle>
                <DialogDescription>
                  Fill in the form below to create a new todo.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 mt-4"
              >
                <Input
                  placeholder="Title"
                  {...register("title", { required: true })}
                />
                <Input placeholder="Description" {...register("description")} />
                <Button type="submit" disabled={create.isPending}>
                  Save
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Todo List */}
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable
              data={todos}
              onUpdate={(todo) =>
                update.mutate({ id: todo.id, completed: !todo.completed })
              }
              onDelete={(id) => remove.mutate(id)}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
