/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { toast } from "sonner";
import {
  Sparkles,
  Edit2,
  Trash2,
  PlusCircle,
  FileImage,
  Loader2,
  Trophy,
  Activity,
} from "lucide-react";
import {
  useHome,
  useCreateHome,
  useUpdateHome,
  useDeleteHome,
} from "@/hooks/useHome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const homeSchema = zod.object({
  PPG: zod.string().min(1, "Points Per Game stat is required"),
  RPG: zod.string().min(1, "Rebounds Per Game stat is required"),
  BPG: zod.string().min(1, "Blocks Per Game stat is required"),
  DOUBLE_DOUBLES: zod.string().min(1, "Double-doubles count is required"),
  REBOUNDS: zod.string().min(1, "Rebounds count is required"),
});

type HomeFormValues = zod.infer<typeof homeSchema>;

export default function HomePage() {
  const { data: activeRecord, isLoading, isError } = useHome();
  const createMutation = useCreateHome();
  const updateMutation = useUpdateHome();
  const deleteMutation = useDeleteHome();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // File states for inputs
  const [firstImgFile, setFirstImgFile] = useState<File | null>(null);
  const [secondImgFile, setSecondImgFile] = useState<File | null>(null);

  // Previews
  const [firstImgPreview, setFirstImgPreview] = useState<string | null>(null);
  const [secondImgPreview, setSecondImgPreview] = useState<string | null>(null);

  const isEdit = !!activeRecord;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HomeFormValues>({
    resolver: zodResolver(homeSchema),
  });

  const handleOpenForm = () => {
    if (activeRecord) {
      reset({
        PPG: activeRecord.PPG || "",
        RPG: activeRecord.RPG || "",
        BPG: activeRecord.BPG || "",
        DOUBLE_DOUBLES: activeRecord.DOUBLE_DOUBLES || "",
        REBOUNDS: activeRecord.REBOUNDS || "",
      });
      setFirstImgPreview(activeRecord.frist_img || null);
      setSecondImgPreview(activeRecord.second_img || null);
    } else {
      reset({
        PPG: "",
        RPG: "",
        BPG: "",
        DOUBLE_DOUBLES: "",
        REBOUNDS: "",
      });
      setFirstImgPreview(null);
      setSecondImgPreview(null);
    }
    setFirstImgFile(null);
    setSecondImgFile(null);
    setIsOpen(true);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "first" | "second",
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (type === "first") {
        setFirstImgFile(file);
        setFirstImgPreview(URL.createObjectURL(file));
      } else {
        setSecondImgFile(file);
        setSecondImgPreview(URL.createObjectURL(file));
      }
    }
  };

  const onSubmit = async (values: HomeFormValues) => {
    const formData = new FormData();
    formData.append("PPG", values.PPG);
    formData.append("RPG", values.RPG);
    formData.append("BPG", values.BPG);
    formData.append("DOUBLE_DOUBLES", values.DOUBLE_DOUBLES);
    formData.append("REBOUNDS", values.REBOUNDS);

    if (firstImgFile) {
      formData.append("frist_img", firstImgFile);
    }
    if (secondImgFile) {
      formData.append("second_img", secondImgFile);
    }

    if (isEdit && activeRecord) {
      updateMutation.mutate(
        { id: activeRecord._id, formData },
        {
          onSuccess: () => {
            toast.success("Home record updated successfully!");
            setIsOpen(false);
          },
          onError: (err: any) => {
            toast.error(
              err.response?.data?.message || "Failed to update home record",
            );
          },
        },
      );
    } else {
      if (!firstImgFile || !secondImgFile) {
        toast.error("Both images are required when creating a new record");
        return;
      }
      createMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Home record created successfully!");
          setIsOpen(false);
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
            <Sparkles className="text-kh-pink" />
            Home Section
          </h2>
          <p className="font-condensed text-xs tracking-wider text-zinc-500 uppercase mt-1">
            Manage the hero banner images and key season stats
          </p>
        </div>

        {!isLoading && !activeRecord && (
          <Button
            onClick={handleOpenForm}
            className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-2 border-none cursor-pointer"
          >
            <PlusCircle size={14} />
            Create Record
          </Button>
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
            onClick={handleOpenForm}
            className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl border-none cursor-pointer"
          >
            Create Banner Record
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Stats Details */}
          <Card className="lg:col-span-5 bg-[#0c0c14] border-white/5 shadow-xl p-6 relative overflow-hidden rounded-2xl flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <Trophy size={120} className="text-white" />
            </div>

            <div>
              <CardHeader className="p-0 mb-6">
                <CardTitle className="font-display text-2xl uppercase tracking-wider text-white">
                  Athlete Statistics
                </CardTitle>
                <CardDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500">
                  Active Homepage season details
                </CardDescription>
              </CardHeader>

              <div className="space-y-4">
                {[
                  {
                    label: "Points Per Game (PPG)",
                    val: activeRecord.PPG,
                    color: "text-kh-pink",
                  },
                  {
                    label: "Rebounds Per Game (RPG)",
                    val: activeRecord.RPG,
                    color: "text-white",
                  },
                  {
                    label: "Blocks Per Game (BPG)",
                    val: activeRecord.BPG,
                    color: "text-white",
                  },
                  {
                    label: "Double Doubles",
                    val: activeRecord.DOUBLE_DOUBLES,
                    color: "text-white",
                  },
                  {
                    label: "Total Rebounds",
                    val: activeRecord.REBOUNDS,
                    color: "text-white",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 rounded-lg bg-neutral-900/30 border border-white/[0.02]"
                  >
                    <span className="font-condensed text-xs font-bold uppercase tracking-wider text-zinc-400">
                      {item.label}
                    </span>
                    <span
                      className={`font-display text-xl uppercase tracking-wider ${item.color}`}
                    >
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                onClick={handleOpenForm}
                className="flex-1 bg-white hover:bg-zinc-200 text-black font-condensed font-bold uppercase tracking-wider text-xs py-2 rounded-xl flex items-center justify-center gap-2 border-none cursor-pointer"
              >
                <Edit2 size={12} />
                Edit Profile
              </Button>
              <Button
                variant="destructive"
                onClick={() => setIsDeleteOpen(true)}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-condensed font-bold uppercase tracking-wider text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-2 border border-red-500/20 cursor-pointer"
              >
                <Trash2 size={12} />
                Delete
              </Button>
            </div>
          </Card>

          {/* Image Previews */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Primary Showcase Image", url: activeRecord.frist_img },
              { title: "Secondary Stat Image", url: activeRecord.second_img },
            ].map((img, idx) => (
              <Card
                key={idx}
                className="bg-[#0c0c14] border-white/5 overflow-hidden flex flex-col h-full rounded-2xl"
              >
                <CardHeader className="p-4 border-b border-white/5">
                  <CardTitle className="font-display text-lg uppercase tracking-wide text-white">
                    {img.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex-1 flex items-center justify-center bg-neutral-950/20 min-h-[300px]">
                  {img.url ? (
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full max-h-[350px] object-cover rounded-xl border border-white/5 shadow-inner"
                    />
                  ) : (
                    <div className="text-zinc-600 flex flex-col items-center gap-2">
                      <FileImage size={40} />
                      <span className="font-condensed text-xs uppercase tracking-wider">
                        No Image Uploaded
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl bg-[#0c0c14] border-white/5 text-white max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase tracking-wide text-white">
              {isEdit ? "Modify Home Configuration" : "Deploy New Home Node"}
            </DialogTitle>
            <DialogDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500">
              Configure homepage files and career indexes
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
            {/* Image Uploads */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Image 1 */}
              <div className="space-y-2">
                <Label>Primary Showcase Image</Label>
                <div className="relative border border-dashed border-white/10 hover:border-kh-pink/30 rounded-xl p-4 bg-neutral-950/30 flex flex-col items-center justify-center text-center cursor-pointer min-h-[160px]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "first")}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {firstImgPreview ? (
                    <img
                      src={firstImgPreview}
                      alt="Primary Preview"
                      className="w-full h-[128px] object-cover rounded-lg border border-white/5"
                    />
                  ) : (
                    <div className="space-y-1">
                      <FileImage size={24} className="mx-auto text-zinc-500" />
                      <p className="font-condensed text-xs uppercase text-zinc-400">
                        Select Image
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Image 2 */}
              <div className="space-y-2">
                <Label>Secondary Stat Image</Label>
                <div className="relative border border-dashed border-white/10 hover:border-kh-pink/30 rounded-xl p-4 bg-neutral-950/30 flex flex-col items-center justify-center text-center cursor-pointer min-h-[160px]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "second")}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {secondImgPreview ? (
                    <img
                      src={secondImgPreview}
                      alt="Secondary Preview"
                      className="w-full h-[128px] object-cover rounded-lg border border-white/5"
                    />
                  ) : (
                    <div className="space-y-1">
                      <FileImage size={24} className="mx-auto text-zinc-500" />
                      <p className="font-condensed text-xs uppercase text-zinc-400">
                        Select Image
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <Label htmlFor="PPG">Points Per Game (PPG)</Label>
                <Input
                  id="PPG"
                  {...register("PPG")}
                  disabled={isPending}
                  placeholder="e.g. 24.5"
                />
                {errors.PPG && (
                  <span className="text-red-400 text-xs">
                    {errors.PPG.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="RPG">Rebounds Per Game (RPG)</Label>
                <Input
                  id="RPG"
                  {...register("RPG")}
                  disabled={isPending}
                  placeholder="e.g. 8.2"
                />
                {errors.RPG && (
                  <span className="text-red-400 text-xs">
                    {errors.RPG.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="BPG">Blocks Per Game (BPG)</Label>
                <Input
                  id="BPG"
                  {...register("BPG")}
                  disabled={isPending}
                  placeholder="e.g. 2.1"
                />
                {errors.BPG && (
                  <span className="text-red-400 text-xs">
                    {errors.BPG.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="DOUBLE_DOUBLES">Double Doubles</Label>
                <Input
                  id="DOUBLE_DOUBLES"
                  {...register("DOUBLE_DOUBLES")}
                  disabled={isPending}
                  placeholder="e.g. 15"
                />
                {errors.DOUBLE_DOUBLES && (
                  <span className="text-red-400 text-xs">
                    {errors.DOUBLE_DOUBLES.message}
                  </span>
                )}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="REBOUNDS">Total Rebounds</Label>
                <Input
                  id="REBOUNDS"
                  {...register("REBOUNDS")}
                  disabled={isPending}
                  placeholder="e.g. 280"
                />
                {errors.REBOUNDS && (
                  <span className="text-red-400 text-xs">
                    {errors.REBOUNDS.message}
                  </span>
                )}
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
                {isEdit ? "Update Node" : "Publish Node"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-[#0c0c14] border-white/5 text-white rounded-xl max-w-sm">
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
