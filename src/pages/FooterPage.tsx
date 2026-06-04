/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { toast } from "sonner";
import {
  LayoutTemplate,
  Edit2,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  Globe,
  Plus,
  Trash2,
  Loader2,
  PlusCircle,
} from "lucide-react";
import {
  useFooter,
  useCreateFooter,
  useUpdateFooter,
  useDeleteFooter,
} from "@/hooks/useFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schemas
const socialLinkSchema = zod.object({
  platform: zod.string().min(1, "Platform is required"),
  url: zod.string().url("Must be a valid URL"),
});

const footerFormSchema = zod.object({
  officialInquiries: zod.object({
    email: zod.string().email("Must be a valid email address"),
    phone: zod.string().min(1, "Phone is required"),
    location: zod.string().min(1, "Location is required"),
  }),
  socialLinks: zod.array(socialLinkSchema),
  copyrightText: zod.string().min(1, "Copyright text is required"),
});

type FooterFormValues = zod.infer<typeof footerFormSchema>;

const PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "Twitter" },
  { value: "youtube", label: "YouTube" },
  { value: "facebook", label: "Facebook" },
];

export default function FooterPage() {
  const { data: activeFooter, isLoading, isError } = useFooter();
  const createMutation = useCreateFooter();
  const updateMutation = useUpdateFooter();
  const deleteMutation = useDeleteFooter();

  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FooterFormValues>({
    resolver: zodResolver(footerFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const handleStartEdit = () => {
    if (activeFooter) {
      reset({
        officialInquiries: {
          email: activeFooter.officialInquiries?.email || "",
          phone: activeFooter.officialInquiries?.phone || "",
          location: activeFooter.officialInquiries?.location || "",
        },
        socialLinks: (activeFooter.socialLinks || []).map((l: any) => ({
          platform: l.platform || "instagram",
          url: l.url || "",
        })),
        copyrightText: activeFooter.copyrightText || "",
      });
    } else {
      reset({
        officialInquiries: { email: "", phone: "", location: "" },
        socialLinks: [{ platform: "instagram", url: "" }],
        copyrightText: `© ${new Date().getFullYear()} Kennedi Harris. All Rights Reserved.`,
      });
    }
    setIsEditMode(true);
  };

  const onSubmit = async (values: FooterFormValues) => {
    if (activeFooter) {
      updateMutation.mutate(
        { id: activeFooter._id, data: values },
        {
          onSuccess: () => {
            toast.success("Footer settings updated successfully!");
            setIsEditMode(false);
          },
          onError: (err: any) => {
            toast.error(
              err.response?.data?.message || "Failed to update footer",
            );
          },
        },
      );
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          toast.success("Footer settings created successfully!");
          setIsEditMode(false);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to create footer");
        },
      });
    }
  };

  const handleDelete = () => {
    if (!activeFooter) return;
    if (
      confirm("Are you sure you want to delete this footer configurations?")
    ) {
      deleteMutation.mutate(activeFooter._id, {
        onSuccess: () => {
          toast.success("Footer settings deleted!");
          setIsEditMode(false);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to delete footer");
        },
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div>
          <h2 className="font-display text-4xl uppercase tracking-tight text-white flex items-center gap-2">
            <LayoutTemplate className="text-kh-pink" />
            Footer Section
          </h2>
          <p className="font-condensed text-xs tracking-wider text-zinc-500 uppercase mt-1">
            Configure copyright copyrights, social handles, and official address
            blocks
          </p>
        </div>

        {!isLoading && (
          <div className="flex gap-2">
            {isEditMode ? (
              <Button
                onClick={() => setIsEditMode(false)}
                variant="outline"
                className="font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <X size={14} />
                Cancel
              </Button>
            ) : (
              <Button
                onClick={handleStartEdit}
                className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-2 border-none cursor-pointer"
              >
                {activeFooter ? (
                  <>
                    <Edit2 size={14} />
                    Modify Footer
                  </>
                ) : (
                  <>
                    <PlusCircle size={14} />
                    Configure Node
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-64 bg-[#0c0c14] border border-white/5 rounded-2xl"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="p-8 text-center bg-red-950/20 border border-red-500/10 rounded-2xl">
          <p className="text-red-400 font-condensed uppercase tracking-wider text-sm">
            Failed to retrieve footer configurations.
          </p>
        </div>
      ) : !isEditMode && !activeFooter ? (
        /* Empty State */
        <div className="text-center p-12 bg-neutral-900/10 border border-dashed border-white/10 rounded-2xl space-y-4">
          <LayoutTemplate
            size={48}
            className="mx-auto text-zinc-600 animate-pulse"
          />
          <h3 className="font-display text-xl uppercase tracking-wide">
            No Footer Configured
          </h3>
          <p className="text-sm text-zinc-500 max-w-sm mx-auto font-condensed uppercase tracking-wider">
            Create an entry to populate copyright texts and social media
            channels.
          </p>
          <Button
            onClick={handleStartEdit}
            className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl border-none cursor-pointer"
          >
            Create Footer Configurations
          </Button>
        </div>
      ) : isEditMode ? (
        /* Edit Mode Form */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left side: Inquiries and Copyright */}
            <div className="lg:col-span-6 space-y-6">
              <Card className="bg-[#0c0c14] border-white/5 p-6 rounded-2xl">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="font-display text-xl uppercase tracking-wider text-white">
                    Official Inquiries
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="inquiries-email">Inquiry Email</Label>
                    <Input
                      id="inquiries-email"
                      {...register("officialInquiries.email")}
                      disabled={isPending}
                      placeholder="inquiries@kennediharris.com"
                    />
                    {errors.officialInquiries?.email && (
                      <span className="text-red-400 text-xs">
                        {errors.officialInquiries.email.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="inquiries-phone">Inquiry Phone</Label>
                    <Input
                      id="inquiries-phone"
                      {...register("officialInquiries.phone")}
                      disabled={isPending}
                      placeholder="+1 (555) 012-3456"
                    />
                    {errors.officialInquiries?.phone && (
                      <span className="text-red-400 text-xs">
                        {errors.officialInquiries.phone.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="inquiries-location">Location</Label>
                    <Input
                      id="inquiries-location"
                      {...register("officialInquiries.location")}
                      disabled={isPending}
                      placeholder="Chicago, IL"
                    />
                    {errors.officialInquiries?.location && (
                      <span className="text-red-400 text-xs">
                        {errors.officialInquiries.location.message}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Copyright Text */}
              <Card className="bg-[#0c0c14] border-white/5 p-6 rounded-2xl">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="font-display text-xl uppercase tracking-wider text-white">
                    Copyright Line
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Textarea
                    id="copyrightText"
                    {...register("copyrightText")}
                    disabled={isPending}
                    placeholder="© 2026 Kennedi Harris. All Rights Reserved."
                    className="min-h-[100px]"
                  />
                  {errors.copyrightText && (
                    <span className="text-red-400 text-xs block mt-1">
                      {errors.copyrightText.message}
                    </span>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right side: Social links array */}
            <Card className="lg:col-span-6 bg-[#0c0c14] border-white/5 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
                  <CardTitle className="font-display text-xl uppercase tracking-wider text-white">
                    Social Links
                  </CardTitle>
                  <Button
                    type="button"
                    onClick={() => append({ platform: "instagram", url: "" })}
                    className="bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-zinc-300 font-condensed font-bold uppercase tracking-wider text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={12} />
                    Add Platform
                  </Button>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-end">
                      <div className="w-[140px] space-y-1">
                        <Label>Platform</Label>
                        <Select
                          defaultValue={field.platform}
                          onValueChange={(val) =>
                            setValue(`socialLinks.${index}.platform`, val)
                          }
                        >
                          <SelectTrigger className="bg-neutral-900 border-white/10 text-xs text-white">
                            <SelectValue placeholder="Platform" />
                          </SelectTrigger>
                          <SelectContent>
                            {PLATFORMS.map((p) => (
                              <SelectItem key={p.value} value={p.value}>
                                {p.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex-1 space-y-1">
                        <Label>Social Handle URL</Label>
                        <Input
                          placeholder="https://instagram.com/user"
                          {...register(`socialLinks.${index}.url`)}
                          className="bg-neutral-900 border-white/10"
                        />
                        {errors.socialLinks?.[index]?.url && (
                          <span className="text-red-400 text-[10px] block">
                            {errors.socialLinks[index].url?.message}
                          </span>
                        )}
                      </div>

                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-zinc-500 hover:text-red-400 p-2.5 cursor-pointer bg-transparent border-none hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </div>

              <div className="flex gap-3 justify-end border-t border-white/5 pt-6 mt-8">
                {activeFooter && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isPending}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-condensed font-bold uppercase tracking-wider text-xs py-2 px-4 rounded-xl cursor-pointer"
                  >
                    Delete Configs
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-6 py-2 rounded-xl flex items-center gap-2 border-none cursor-pointer"
                >
                  {isPending && <Loader2 size={12} className="animate-spin" />}
                  <Save size={14} />
                  Save Configurations
                </Button>
              </div>
            </Card>
          </div>
        </form>
      ) : (
        /* View Mode (Read-only cards) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inquiry + Copyright details */}
          <div className="lg:col-span-6 space-y-6">
            <Card className="bg-[#0c0c14] border-white/5 shadow-xl p-6 rounded-2xl">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="font-display text-2xl uppercase tracking-wider text-white">
                  Official Address & Contacts
                </CardTitle>
                <CardDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500">
                  Address details shown in web footer
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/30 border border-white/[0.02]">
                  <Mail size={16} className="text-kh-pink" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                      Inquiry Email
                    </p>
                    <p className="text-sm font-bold text-white">
                      {activeFooter!.officialInquiries?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/30 border border-white/[0.02]">
                  <Phone size={16} className="text-kh-pink" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                      Inquiry Phone
                    </p>
                    <p className="text-sm font-bold text-white">
                      {activeFooter!.officialInquiries?.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/30 border border-white/[0.02]">
                  <MapPin size={16} className="text-kh-pink" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-sm font-bold text-white">
                      {activeFooter!.officialInquiries?.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Copyright Text Preview */}
            <Card className="bg-[#0c0c14] border-white/5 shadow-xl p-6 rounded-2xl">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="font-display text-2xl uppercase tracking-wider text-white">
                  Copyright Text
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm font-mono text-zinc-400 bg-neutral-900/30 border border-white/[0.02] p-4 rounded-xl">
                  {activeFooter!.copyrightText}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Social Links Cards */}
          <div className="lg:col-span-6">
            <Card className="bg-[#0c0c14] border-white/5 shadow-xl p-6 rounded-2xl h-full flex flex-col justify-between">
              <div>
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="font-display text-2xl uppercase tracking-wider text-white">
                    Social Networks
                  </CardTitle>
                  <CardDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500">
                    Active links mapped to header and footer icons
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  {(activeFooter!.socialLinks || []).length === 0 ? (
                    <div className="p-6 text-center text-zinc-500 font-condensed uppercase tracking-wider">
                      No social links configured.
                    </div>
                  ) : (
                    (activeFooter!.socialLinks || []).map(
                      (link: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/30 border border-white/[0.02]"
                        >
                          <div className="flex items-center gap-3">
                            <Globe size={16} className="text-kh-pink" />
                            <span className="font-condensed text-sm font-bold uppercase tracking-wider text-zinc-300">
                              {link.platform}
                            </span>
                          </div>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-sky-400 hover:underline max-w-[240px] truncate"
                          >
                            {link.url}
                          </a>
                        </div>
                      ),
                    )
                  )}
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
