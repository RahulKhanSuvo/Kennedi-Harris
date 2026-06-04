/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import { PlusCircle, Activity, ArrowLeft, Home } from "lucide-react";
import {
  useHome,
  useCreateHome,
  useUpdateHome,
  useDeleteHome,
} from "@/hooks/useHome";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import HomeDetailsView from "@/components/home/HomeDetailsView";
import HomeForm from "@/components/home/HomeForm";

export default function HomePage() {
  const { data: activeRecord, isLoading, isError } = useHome();
  const createMutation = useCreateHome();
  const updateMutation = useUpdateHome();
  const deleteMutation = useDeleteHome();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const onSubmit = async (formData: FormData) => {
    if (activeRecord) {
      updateMutation.mutate(
        { id: activeRecord._id, formData },
        {
          onSuccess: () => {
            toast.success("Home record updated successfully!");
            setIsEditing(false);
          },
          onError: (err: any) => {
            toast.error(
              err.response?.data?.message || "Failed to update home record",
            );
          },
        },
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Home record created successfully!");
          setIsEditing(false);
        },
        onError: (err: any) => {
          toast.error(
            err.response?.data?.message || "Failed to create home record",
          );
        },
      });
    }
  };

  const handleDelete = () => {
    if (!activeRecord) return;
    deleteMutation.mutate(activeRecord._id, {
      onSuccess: () => {
        toast.success("Home record deleted successfully!");
        setIsDeleteOpen(false);
        setIsEditing(false);
      },
      onError: (err: any) => {
        toast.error(
          err.response?.data?.message || "Failed to delete home record",
        );
      },
    });
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div>
          <h2 className="font-display text-4xl uppercase tracking-tight text-white flex items-center gap-2">
            <Home className="text-kh-pink" />
            Home Section
          </h2>
          <p className="font-condensed text-xs tracking-wider text-zinc-500 uppercase mt-1">
            Manage the hero banner images and key season stats
          </p>
        </div>

        {!isLoading && (
          <div className="flex items-center gap-3">
            {isEditing && activeRecord && (
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="rounded-xl border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white cursor-pointer font-condensed uppercase text-xs tracking-wider px-4 py-2 flex items-center gap-2"
              >
                <ArrowLeft size={12} />
                Back to View
              </Button>
            )}
            {!activeRecord && !isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-2 border-none cursor-pointer"
              >
                <PlusCircle size={14} />
                Create Record
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <Card
              key={i}
              className="bg-kh-dark-2 border-white/5 animate-pulse h-64"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="p-8 text-center bg-red-950/20 border border-red-500/10 rounded-2xl">
          <p className="text-red-400 font-condensed uppercase tracking-wider text-sm">
            Failed to retrieve home configuration node.
          </p>
        </div>
      ) : isEditing ? (
        <HomeForm
          key={activeRecord?._id || "new"}
          activeRecord={activeRecord || null}
          onSubmit={onSubmit}
          onCancel={() => setIsEditing(false)}
          isPending={isPending}
        />
      ) : !activeRecord ? (
        <div className="text-center p-12 bg-neutral-900/10 border border-dashed border-white/10 rounded-2xl space-y-4">
          <Activity size={48} className="mx-auto text-zinc-600 animate-pulse" />
          <h3 className="font-display text-xl uppercase tracking-wide">
            No Active Home Record
          </h3>
          <p className="text-sm text-zinc-500 max-w-sm mx-auto font-condensed uppercase tracking-wider">
            Create an entry to populate the athlete homepage banner and
            statistics.
          </p>
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl border-none cursor-pointer"
          >
            Create Banner Record
          </Button>
        </div>
      ) : (
        <HomeDetailsView
          activeRecord={activeRecord}
          onEditClick={() => setIsEditing(true)}
          onDeleteClick={() => setIsDeleteOpen(true)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-kh-dark-2 border-white/5 text-white rounded-xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-xl uppercase tracking-wider">
              Confirm Delete
            </DialogTitle>
            <DialogDescription className="font-condensed text-xs uppercase tracking-wider text-zinc-500">
              Are you sure you want to delete this Home record? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              disabled={deleteMutation.isPending}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="bg-red-500 text-white font-condensed font-bold uppercase tracking-wider text-xs py-2 px-4 rounded-xl cursor-pointer"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Node"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
