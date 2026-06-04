import { Edit2, Trash2, CalendarDays, MapPin } from "lucide-react";
import type { GameScheduleData } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ScheduleTableProps {
  schedules: GameScheduleData[];
  onEdit: (schedule: GameScheduleData) => void;
  onDelete: (id: string) => void;
}

export function ScheduleTable({
  schedules,
  onEdit,
  onDelete,
}: ScheduleTableProps) {
  return (
    <Card className="bg-kh-dark-2 border-white/5 overflow-hidden rounded-2xl shadow-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Matchup</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow key={schedule._id}>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-kh-pink/10 flex items-center justify-center">
                    <CalendarDays size={14} className="text-kh-pink" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">
                      {schedule.date}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-condensed uppercase tracking-wider">
                      {schedule.date}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-bold text-white">
                  {schedule.matchName}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <MapPin size={12} className="text-kh-pink/60" />
                  <span className="text-sm">{schedule.address}</span>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    schedule.isActive
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      : "bg-neutral-900 border border-white/5 text-zinc-500"
                  }`}
                >
                  {schedule.isActive ? "Active" : "Inactive"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => onEdit(schedule)}
                    className="text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <Edit2 size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => onDelete(schedule._id)}
                    className="text-zinc-400 hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
