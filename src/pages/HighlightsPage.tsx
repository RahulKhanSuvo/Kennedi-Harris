/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { toast } from "sonner";
import {
  Video,
  PlusCircle,
  Trash2,
  Edit2,
  VideoOff,
  Plus,
  Loader2,
  ExternalLink,
} from "lucide-react";
import {
  useAllHighlights,
  useCreateHighlight,
  useUpdateHighlight,
  useDeleteHighlight,
} from "@/hooks/useHighlights";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const feedVideoSchema = zod.object({
  video_type: zod.string().min(1, "Type is required"),
  video_name: zod.string().min(1, "Name is required"),
  videos: zod.any().optional(), // File
});

const highlightSchema = zod.object({
  title: zod.string().min(1, "Title is required"),
  MainVideo_url: zod.any().refine((val) => {
    return val instanceof File || (typeof val === "string" && val.length > 0);
  }, "Main video is required"),
  feedVideos: zod.array(feedVideoSchema),
});

type HighlightFormValues = zod.infer<typeof highlightSchema>;

export default function HighlightsPage() {
  const { data: highlights = [], isLoading, isError } = useAllHighlights();
  const createMutation = useCreateHighlight();
  const updateMutation = useUpdateHighlight();
  const deleteMutation = useDeleteHighlight();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const isEdit = !!selectedHighlight;

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HighlightFormValues>({
    resolver: zodResolver(highlightSchema),
    defaultValues: {
      title: "",
      MainVideo_url: "",
      feedVideos: [],
    },
  });

  const watchMainVideo = watch("MainVideo_url");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "feedVideos",
  });

  const handleOpenForm = (highlight: any = null) => {
    setSelectedHighlight(highlight);
    if (highlight) {
      reset({
        title: highlight.title || "Highlight Reel",
        MainVideo_url: highlight.MainVideo_url || "",
        feedVideos: (highlight.videos || highlight.feedVideos || []).map(
          (v: any) => ({
            video_type: v.video_type || "tiktok",
            video_name: v.video_name || v.title || "",
            videos: undefined, // existing file is string on server, keep file input empty
          }),
        ),
      });
    } else {
      reset({
        title: "",
        MainVideo_url: "",
        feedVideos: [
          { video_type: "tiktok", video_name: "", videos: undefined },
        ],
      });
    }
    setIsOpen(true);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setValue(`feedVideos.${index}.videos`, file);
    }
  };

  const onSubmit = async (values: HighlightFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title);

    if (values.MainVideo_url instanceof File) {
      formData.append("MainVideo_url", values.MainVideo_url);
    } else if (typeof values.MainVideo_url === "string") {
      formData.append("MainVideo_url", values.MainVideo_url);
    }

    values.feedVideos.forEach((fv) => {
      // Append matching Server indices:
      formData.append("video_type", fv.video_type);
      formData.append("video_name", fv.video_name);
      if (fv.videos instanceof File) {
        formData.append("feedVideos", fv.videos);
        formData.append("videos", fv.videos); // append under both for compatibility
      }
    });

    if (isEdit && selectedHighlight) {
      updateMutation.mutate(
        { id: selectedHighlight._id, formData },
        {
          onSuccess: () => {
            toast.success("Highlight package updated successfully!");
            setIsOpen(false);
          },
          onError: (err: any) => {
            toast.error(
              err.response?.data?.message || "Failed to update highlight",
            );
          },
        },
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Highlight package created successfully!");
          setIsOpen(false);
        },
        onError: (err: any) => {
          toast.error(
            err.response?.data?.message || "Failed to create highlight",
          );
        },
      });
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteMutation.mutate(deleteId, {
      onSuccess: () => {
        toast.success("Highlight package deleted!");
        setIsDeleteOpen(false);
        setDeleteId(null);
      },
      onError: (err: any) => {
        toast.error(
          err.response?.data?.message || "Failed to delete highlight",
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
            <Video className="text-kh-pink" />
            Highlights Section
          </h2>
          <p className="font-condensed text-xs tracking-wider text-zinc-500 uppercase mt-1">
            Manage main stream video reels and feed snippets
          </p>
        </div>

        <Button
          onClick={() => handleOpenForm(null)}
          className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-2 border-none cursor-pointer"
        >
          <PlusCircle size={14} />
          Create Highlight Package
        </Button>
      </div>

      {/* Main Table */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-14 bg-[#0c0c14] border border-white/5 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="p-8 text-center bg-red-950/20 border border-red-500/10 rounded-2xl">
          <p className="text-red-400 font-condensed uppercase tracking-wider text-sm">
            Failed to retrieve highlight data nodes.
          </p>
        </div>
      ) : highlights.length === 0 ? (
        <div className="text-center p-12 bg-neutral-900/10 border border-dashed border-white/10 rounded-2xl space-y-4">
          <VideoOff size={48} className="mx-auto text-zinc-600 animate-pulse" />
          <h3 className="font-display text-xl uppercase tracking-wide">
            No Highlights Available
          </h3>
          <p className="text-sm text-zinc-500 max-w-sm mx-auto font-condensed uppercase tracking-wider">
            Create highlight streams containing active video rolls.
          </p>
          <Button
            onClick={() => handleOpenForm(null)}
            className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl border-none cursor-pointer"
          >
            Deploy Highlight Reel
          </Button>
        </div>
      ) : (
        <Card className="bg-[#0c0c14] border-white/5 overflow-hidden rounded-2xl shadow-xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Main Video URL</TableHead>
                <TableHead>Feed Clips</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {highlights.map((highlight) => (
                <TableRow key={highlight._id}>
                  <TableCell className="font-bold">
                    {highlight.title || "Highlight Reel"}
                  </TableCell>
                  <TableCell className="font-mono text-xs max-w-xs truncate text-zinc-400">
                    <a
                      href={highlight.MainVideo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-kh-pink flex items-center gap-1.5"
                    >
                      {highlight.MainVideo_url}
                      <ExternalLink size={12} />
                    </a>
                  </TableCell>
                  <TableCell>
                    <span className="bg-neutral-900 border border-white/5 text-zinc-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {(highlight.videos || highlight.feedVideos || []).length}{" "}
                      Clips
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => handleOpenForm(highlight)}
                        className="text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <Edit2 size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => confirmDelete(highlight._id)}
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
      )}

      {/* Form Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl bg-[#0c0c14] border-white/5 text-white max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase tracking-wide text-white">
              {isEdit ? "Modify Highlight Reel" : "Deploy Highlight Package"}
            </DialogTitle>
            <DialogDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500">
              Update stream attributes and compile individual clips
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Highlight Package Title</Label>
                <Input
                  id="title"
                  {...register("title")}
                  disabled={isPending}
                  placeholder="e.g. Season Highlights"
                />
                {errors.title && (
                  <span className="text-red-400 text-xs">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label>Main Video File Upload</Label>
                <div className="relative h-9 rounded-md border border-white/10 bg-neutral-900/50 flex items-center px-3 cursor-pointer">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (file) {
                        setValue("MainVideo_url", file);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={isPending}
                  />
                  <span className="text-zinc-400 text-xs truncate">
                    {watchMainVideo instanceof File
                      ? watchMainVideo.name
                      : typeof watchMainVideo === "string" && watchMainVideo
                        ? watchMainVideo.split("/").pop()
                        : "Select main video file..."}
                  </span>
                </div>
                {errors.MainVideo_url && (
                  <span className="text-red-400 text-xs">
                    {(errors.MainVideo_url as any).message}
                  </span>
                )}
              </div>
            </div>

            {/* Dynamic field array for feedVideos */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <Label>Video Feed Clips</Label>
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      video_type: "tiktok",
                      video_name: "",
                      videos: undefined,
                    })
                  }
                  className="bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-zinc-300 font-condensed font-bold uppercase tracking-wider text-[10px] px-2 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={12} />
                  Add Clip Row
                </Button>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-xl bg-neutral-950/40 border border-white/5 items-end relative"
                  >
                    <div className="md:col-span-3 space-y-1">
                      <Label>Platform Type</Label>
                      <Select
                        defaultValue={field.video_type}
                        onValueChange={(val) =>
                          setValue(`feedVideos.${index}.video_type`, val)
                        }
                      >
                        <SelectTrigger className="bg-neutral-900 border-white/10 text-xs text-white">
                          <SelectValue placeholder="Platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="raw">Raw Mp4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-4 space-y-1">
                      <Label>Clip Name</Label>
                      <Input
                        placeholder="e.g. Crossover Compilation"
                        {...register(`feedVideos.${index}.video_name`)}
                        className="bg-neutral-900 border-white/10"
                      />
                    </div>

                    <div className="md:col-span-4 space-y-1">
                      <Label>Video File Upload</Label>
                      <div className="relative h-9 rounded-md border border-white/10 bg-neutral-900/50 flex items-center px-3 cursor-pointer">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileChange(e, index)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <span className="text-zinc-500 text-xs truncate">
                          {control._formValues.feedVideos?.[index]?.videos
                            ?.name || "Select MP4..."}
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-1 flex justify-center pb-1">
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-zinc-500 hover:text-red-400 p-2 cursor-pointer bg-transparent border-none hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="mt-8 border-t border-white/5 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
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
                {isEdit ? "Update Highlight" : "Create Highlight"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-[#0c0c14] border-white/5 text-white rounded-xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-xl uppercase tracking-wider">
              Confirm Delete
            </DialogTitle>
            <DialogDescription className="font-condensed text-xs uppercase tracking-wider text-zinc-500">
              Are you sure you want to delete this Highlight package? This
              action cannot be undone.
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
              {deleteMutation.isPending ? "Deleting..." : "Delete Reel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
