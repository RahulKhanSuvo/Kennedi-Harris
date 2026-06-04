/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import type { GameScheduleData } from "@/types";
import useSchedule, {
  useCreateSchedule,
  useUpdateSchedule,
  useDeleteSchedule,
} from "@/hooks/useSchedule";
import {
  ScheduleHeader,
  ScheduleTable,
  ScheduleFormDialog,
  ScheduleDeleteDialog,
  ScheduleEmptyState,
  ScheduleLoadingSkeleton,
  ScheduleErrorState,
} from "@/components/schedule";
import type { ScheduleFormValues } from "@/components/schedule";

export function SchedulePage() {
  const { data: response, isLoading, isError } = useSchedule();
  const createMutation = useCreateSchedule();
  const updateMutation = useUpdateSchedule();
  const deleteMutation = useDeleteSchedule();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] =
    useState<GameScheduleData | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const schedules = response?.data ?? [];

  // --- Handlers ---

  const handleOpenCreate = () => {
    setEditingSchedule(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (schedule: GameScheduleData) => {
    setEditingSchedule(schedule);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (values: ScheduleFormValues, isEdit: boolean) => {
    const formData = new FormData();
    formData.append("date", new Date(values.date).toISOString());
    formData.append("matchName", values.matchName);
    formData.append("address", values.address);

    if (isEdit && editingSchedule) {
      updateMutation.mutate(
        { id: editingSchedule._id, formData },
        {
          onSuccess: () => {
            toast.success("Game schedule updated successfully!");
            setIsFormOpen(false);
            setEditingSchedule(null);
          },
          onError: (err: any) => {
            toast.error(
              err.response?.data?.message || "Failed to update schedule",
            );
          },
        },
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Game added to the schedule!");
          setIsFormOpen(false);
        },
        onError: (err: any) => {
          toast.error(
            err.response?.data?.message || "Failed to create schedule",
          );
        },
      });
    }
  };

  const handleConfirmDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteMutation.mutate(deleteId, {
      onSuccess: () => {
        toast.success("Game removed from the schedule!");
        setIsDeleteOpen(false);
        setDeleteId(null);
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to delete schedule");
      },
    });
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  // --- Render ---

  return (
    <div className="space-y-8">
      <ScheduleHeader onCreateClick={handleOpenCreate} isLoading={isLoading} />

      {isLoading ? (
        <ScheduleLoadingSkeleton />
      ) : isError ? (
        <ScheduleErrorState />
      ) : schedules.length === 0 ? (
        <ScheduleEmptyState onCreateClick={handleOpenCreate} />
      ) : (
        <ScheduleTable
          schedules={schedules}
          onEdit={handleOpenEdit}
          onDelete={handleConfirmDelete}
        />
      )}

      <ScheduleFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        editingSchedule={editingSchedule}
        isPending={isPending}
        onSubmit={handleFormSubmit}
      />

      <ScheduleDeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}
