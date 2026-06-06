import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Loader2 } from "lucide-react";
import type { GameScheduleData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const scheduleFormSchema = zod.object({
  date: zod.string().min(1, "Date and time are required"),
  matchName: zod.string().min(1, "Match name is required"),
  address: zod.string().min(1, "Venue address is required"),
});

type ScheduleFormValues = zod.infer<typeof scheduleFormSchema>;

interface ScheduleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingSchedule: GameScheduleData | null;
  isPending: boolean;
  onSubmit: (values: ScheduleFormValues, isEdit: boolean) => void;
}

/**
 * Converts an ISO date string to the local datetime-local input format
 */

export function ScheduleFormDialog({
  open,
  onOpenChange,
  editingSchedule,
  isPending,
  onSubmit,
}: ScheduleFormDialogProps) {
  const isEdit = !!editingSchedule;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    values: editingSchedule
      ? {
          date: editingSchedule.date,
          matchName: editingSchedule.matchName,
          address: editingSchedule.address,
        }
      : {
          date: "",
          matchName: "",
          address: "",
        },
  });

  const handleFormSubmit = (values: ScheduleFormValues) => {
    onSubmit(values, isEdit);
    // reset({
    //   date: "",
    //   matchName: "",
    //   address: "",
    // });
  };

  const handleClose = () => {
    reset({
      date: "",
      matchName: "",
      address: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg bg-kh-dark-2 border-white/5 text-white rounded">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase tracking-wide text-white">
            {isEdit ? "Update Game" : "Schedule New Game"}
          </DialogTitle>
          <DialogDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500">
            {isEdit
              ? "Modify game details and venue information"
              : "Set up a new game entry with date, matchup, and location"}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-5 py-4"
        >
          <div className="space-y-2">
            <Label htmlFor="schedule-date">Game Date & Time</Label>
            <Input
              id="schedule-date"
              type="text"
              {...register("date")}
              placeholder="Month Day - Time"
              disabled={isPending}
              className="bg-neutral-900 border-white/10"
            />
            {errors.date && (
              <span className="text-red-400 text-xs">
                {errors.date.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="schedule-match">Match Name</Label>
            <Input
              id="schedule-match"
              {...register("matchName")}
              disabled={isPending}
              placeholder="e.g. Kennedi Harris vs. Rival Academy"
            />
            {errors.matchName && (
              <span className="text-red-400 text-xs">
                {errors.matchName.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="schedule-address">Venue / Address</Label>
            <Input
              id="schedule-address"
              {...register("address")}
              disabled={isPending}
              placeholder="e.g. Toyota Center, Houston, TX"
            />
            {errors.address && (
              <span className="text-red-400 text-xs">
                {errors.address.message}
              </span>
            )}
          </div>

          <DialogFooter className="mt-6 border-t border-white/5 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-2 border-none cursor-pointer"
            >
              {isPending && <Loader2 size={12} className="animate-spin" />}
              {isEdit ? "Update Game" : "Create Game"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export type { ScheduleFormValues };
