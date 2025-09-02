import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const DataTable = React.memo(function DataTable({
  data,
  onUpdate,
  onDelete,
  onEdit,
}) {
  const [selectedTodo, setSelectedTodo] = React.useState(null);
  const [editTodo, setEditTodo] = React.useState(null);

  const table = useReactTable({
    data: React.useMemo(
      () =>
        data.map((todo) => ({
          ...todo,
          onUpdate,
          onDelete,
          onEdit,
        })),
      [data, onUpdate, onDelete, onEdit]
    ),
    columns: [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => row.original.title,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => row.original.description,
      },
      {
        accessorKey: "completed",
        header: "Status",
        cell: ({ row }) =>
          row.original.completed ? (
            <span className="text-green-600">✔ Done</span>
          ) : (
            <span className="text-gray-500">⏳ Pending</span>
          ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => row.original.onUpdate(row.original)}
            >
              Check
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditTodo(row.original)}
                >
                  Edit
                </Button>
              </DialogTrigger>
              {editTodo && editTodo.id === row.original.id && (
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Todo</DialogTitle>
                    <DialogDescription>
                      Update the fields and save changes.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    className="flex flex-col gap-4 mt-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      onEdit(editTodo);
                      setEditTodo(null);
                    }}
                  >
                    <Input
                      placeholder="Title"
                      value={editTodo.title}
                      onChange={(e) =>
                        setEditTodo({ ...editTodo, title: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Description"
                      value={editTodo.description}
                      onChange={(e) =>
                        setEditTodo({
                          ...editTodo,
                          description: e.target.value,
                        })
                      }
                    />
                    <Button type="submit">Save</Button>
                  </form>
                </DialogContent>
              )}
            </Dialog>

            <Dialog
              open={selectedTodo?.id === row.original.id}
              onOpenChange={(isOpen) => {
                if (!isOpen) setSelectedTodo(null);
              }}
            >
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setSelectedTodo(row.original)}
                >
                  Details
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Todo Details</DialogTitle>
                  <DialogDescription>Informasi lengkap todo.</DialogDescription>
                </DialogHeader>

                <div className="space-y-2">
                  <p>
                    <strong>Title:</strong> {row.original.title}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {row.original.description || "-"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {row.original.completed ? "✔ Done" : "⏳ Pending"}
                  </p>
                </div>

                <DialogFooter className="mt-4">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      row.original.onDelete(row.original.id);
                      setSelectedTodo(null);
                    }}
                  >
                    Delete
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Yakin mau hapus?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Data ini akan dihapus permanen dan tidak bisa dikembalikan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => row.original.onDelete(row.original.id)}
                  >
                    Ya, hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ),
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No todos found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
});
