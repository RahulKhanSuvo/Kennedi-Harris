/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import { PlusCircle, Activity, ArrowLeft, Home, Image } from "lucide-react";
import {
  useHome,
  useCreateHome,
  useUpdateHome,
  useDeleteHome,
} from "@/hooks/useHome";
import { Button } from "@/components/ui/button";
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div>
          <h2 className="font-display text-4xl uppercase tracking-tight text-white flex items-center gap-2">
            <Home className="text-kh-pink" size={32} />
            Home Section
          </h2>
          <p className="font-condensed text-xs tracking-wider text-zinc-500 uppercase mt-0.5">
            Manage the hero banner images and key season stats
          </p>
        </div>

        {!isLoading && (
          <div className="flex items-center gap-3 font-mono">
            {isEditing && activeRecord && (
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="w-full sm:w-auto rounded-xl border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white cursor-pointer font-condensed uppercase text-xs tracking-wider px-4 py-2 flex items-center justify-center gap-2"
              >
                <ArrowLeft size={12} />
                Back to View
              </Button>
            )}
            {!activeRecord && !isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center justify-center gap-2 border-none cursor-pointer"
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
        /* Immersive Split-Pane Home Dashboard Skeleton (Full Height) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[580px] w-full animate-pulse">
          {/* Left Column: Details & Stats Config Matrix Block (5 Columns) */}
          <div className="col-span-12 lg:col-span-5 bg-zinc-950/20 border border-white/5 rounded-2xl p-6 xl:p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Profile/Identity Record Header */}
              <div className="flex items-center gap-3 pb-6 border-b border-white/5">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-zinc-900 rounded w-2/3" />
                  <div className="h-2.5 bg-zinc-900 rounded w-1/3" />
                </div>
              </div>

              {/* Data Rows Placeholder Stack */}
              <div className="space-y-4">
                {[1, 2, 3].map((row) => (
                  <div
                    key={row}
                    className="p-4 bg-zinc-900/30 rounded-xl border border-white/5 space-y-2"
                  >
                    <div className="h-2 bg-zinc-900 rounded w-1/4" />
                    <div className="h-3.5 bg-zinc-900 rounded w-3/4" />
                  </div>
                ))}
              </div>

              {/* Stats Counters Grid Block */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[1, 2, 3].map((stat) => (
                  <div
                    key={stat}
                    className="p-3 bg-zinc-900/20 rounded-xl border border-white/5 text-center space-y-2"
                  >
                    <div className="h-3.5 bg-zinc-900 rounded w-2/3 mx-auto" />
                    <div className="h-2 bg-zinc-900/60 rounded w-1/2 mx-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom action bar track */}
            <div className="flex gap-3 pt-4 border-t border-white/5">
              <div className="h-9 bg-zinc-900 rounded-xl w-24" />
              <div className="h-9 bg-zinc-900 rounded-xl w-20" />
            </div>
          </div>

          {/* Right Column: Hero Banner Aspect Preview Screen (7 Columns) */}
          <div className="col-span-12 lg:col-span-7 bg-zinc-950/40 p-6 xl:p-8 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6">
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="h-3 bg-zinc-900 rounded w-1/3" />
                <div className="h-4 bg-zinc-900 rounded w-12" />
              </div>

              {/* Massive Aspect Ratio Banner Canvas Area */}
              <div className="w-full flex-1 min-h-[280px] lg:min-h-0 rounded-xl bg-zinc-950 border border-white/5 flex flex-col items-center justify-center gap-2 p-6">
                <Image size={32} className="text-zinc-900 animate-pulse" />
                <div className="h-2 bg-zinc-900/40 rounded w-40 mt-1" />
              </div>
            </div>

            <div className="h-3 bg-zinc-900/30 rounded w-1/4" />
          </div>
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
