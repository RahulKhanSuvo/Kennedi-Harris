/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Edit2, Trash2, Database } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DatabaseHistoryTableProps {
  abouts: any[];
  onEdit: (about: any) => void;
  onDelete: (id: string) => void;
}

export function DatabaseHistoryTable({
  abouts,
  onEdit,
  onDelete,
}: DatabaseHistoryTableProps) {
  return (
    <Card className="bg-kh-dark-2 border-white/5 shadow-2xl p-5 rounded-2xl h-full flex flex-col">
      <CardHeader className="px-2 pt-2 pb-4">
        <CardTitle className="font-display text-xl uppercase tracking-wider text-white flex items-center gap-2">
          <Database size={16} className="text-zinc-500" />
          Node Logs
        </CardTitle>
        <CardDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5">
          Select, modify or purge indices
        </CardDescription>
      </CardHeader>

      <div className="flex-1 overflow-y-auto max-h-[420px] border-t border-white/5 scrollbar-thin scrollbar-thumb-white/5">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="font-condensed font-bold uppercase tracking-wider text-[10px] text-zinc-400">
                Metrics
              </TableHead>
              <TableHead className="font-condensed font-bold uppercase tracking-wider text-[10px] text-zinc-400">
                Status
              </TableHead>
              <TableHead className="text-right font-condensed font-bold uppercase tracking-wider text-[10px] text-zinc-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {abouts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-12 font-mono text-[10px] uppercase tracking-widest text-zinc-600"
                >
                  SYSTEM_DB_EMPTY
                </TableCell>
              </TableRow>
            ) : (
              abouts.map((about) => (
                <TableRow
                  key={about._id}
                  className="border-b border-white/[0.03] transition-colors hover:bg-white/[0.01]"
                >
                  <TableCell className="py-3.5 pl-2">
                    <p className="font-condensed font-black text-white text-xs uppercase tracking-wide">
                      GMS // {about.totalGamePlayed}
                    </p>
                    <p className="font-mono text-[9px] text-zinc-500 mt-0.5 tracking-wider">
                      RWD // {about.totalMajorReward}
                    </p>
                  </TableCell>
                  <TableCell className="py-3.5">
                    {about.isActive ? (
                      <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                        ACTIVE
                      </Badge>
                    ) : (
                      <Badge className="bg-neutral-900 text-zinc-600 border border-white/5 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md">
                        STAGED
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right py-3.5 pr-2">
                    <div className="flex justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => onEdit(about)}
                        className="w-7 h-7 rounded-lg bg-neutral-900/60 border border-white/5 text-zinc-400 hover:text-white hover:border-white/10 cursor-pointer"
                      >
                        <Edit2 size={11} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => onDelete(about._id)}
                        className="w-7 h-7 rounded-lg bg-neutral-900/60 border border-white/5 text-zinc-500 hover:text-red-400 hover:border-red-500/20 cursor-pointer"
                      >
                        <Trash2 size={11} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
