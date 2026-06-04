import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ScheduleDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
}

export function ScheduleDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending,
}: ScheduleDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-kh-dark-2 border-white/5 text-white rounded-xl max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display text-xl uppercase tracking-wider">
            Confirm Delete
          </DialogTitle>
          <DialogDescription className="font-condensed text-xs uppercase tracking-wider text-zinc-500">
            Are you sure you want to remove this game from the schedule? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
            className="bg-red-500 text-white font-condensed font-bold uppercase tracking-wider text-xs py-2 px-4 rounded-xl cursor-pointer"
          >
            {isPending ? "Deleting..." : "Delete Game"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
