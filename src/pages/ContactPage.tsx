/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { toast } from "sonner";
import {
  Phone,
  Edit2,
  Save,
  X,
  Mail,
  MapPin,
  Calendar,
  Camera,
  Loader2,
  PlusCircle,
} from "lucide-react";
import {
  useContact,
  useCreateContact,
  useUpdateContact,
  useDeleteContact,
} from "@/hooks/useContact";
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

// Schemas
const contactDetailsSchema = zod.object({
  email: zod.string().email("Must be a valid email address"),
  phone: zod.string().min(1, "Phone number is required"),
  location: zod.string().min(1, "Location is required"),
});

const getInTouchSchema = zod.object({
  email: zod.string().email("Must be a valid email address"),
  phone: zod.string().min(1, "Phone number is required"),
  location: zod.string().min(1, "Location is required"),
  bookingEmail: zod.string().email("Must be a valid booking email"),
  mediaEmail: zod.string().email("Must be a valid media email"),
});

const contactFormSchema = zod.object({
  directReachout: contactDetailsSchema,
  getInTouch: getInTouchSchema,
});

type ContactFormValues = zod.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { data: activeContact, isLoading, isError } = useContact();
  const createMutation = useCreateContact();
  const updateMutation = useUpdateContact();
  const deleteMutation = useDeleteContact();

  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const handleStartEdit = () => {
    if (activeContact) {
      reset({
        directReachout: {
          email: activeContact.directReachout?.email || "",
          phone: activeContact.directReachout?.phone || "",
          location: activeContact.directReachout?.location || "",
        },
        getInTouch: {
          email: activeContact.getInTouch?.email || "",
          phone: activeContact.getInTouch?.phone || "",
          location: activeContact.getInTouch?.location || "",
          bookingEmail: activeContact.getInTouch?.bookingEmail || "",
          mediaEmail: activeContact.getInTouch?.mediaEmail || "",
        },
      });
    } else {
      reset({
        directReachout: { email: "", phone: "", location: "" },
        getInTouch: {
          email: "",
          phone: "",
          location: "",
          bookingEmail: "",
          mediaEmail: "",
        },
      });
    }
    setIsEditMode(true);
  };

  const onSubmit = async (values: ContactFormValues) => {
    if (activeContact) {
      updateMutation.mutate(
        { id: activeContact._id, data: values },
        {
          onSuccess: () => {
            toast.success("Contact configurations saved!");
            setIsEditMode(false);
          },
          onError: (err: any) => {
            toast.error(
              err.response?.data?.message || "Failed to update contact",
            );
          },
        },
      );
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          toast.success("Contact configurations created!");
          setIsEditMode(false);
        },
        onError: (err: any) => {
          toast.error(
            err.response?.data?.message || "Failed to create contact",
          );
        },
      });
    }
  };

  const handleReset = () => {
    if (activeContact) {
      deleteMutation.mutate(activeContact._id, {
        onSuccess: () => {
          toast.success("Contact configurations reset!");
          setIsEditMode(false);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to reset contact");
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
            <Phone className="text-kh-pink" />
            Contact Section
          </h2>
          <p className="font-condensed text-xs tracking-wider text-zinc-500 uppercase mt-1">
            Manage inquiries, bookings, and location matrices
          </p>
        </div>

        {!isLoading && (
          <div className="flex gap-2">
            {isEditMode ? (
              <>
                <Button
                  onClick={() => setIsEditMode(false)}
                  variant="outline"
                  className="font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <X size={14} />
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={handleStartEdit}
                className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-2 border-none cursor-pointer"
              >
                {activeContact ? (
                  <>
                    <Edit2 size={14} />
                    Modify Details
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <Card
              key={i}
              className="bg-[#0c0c14] border-white/5 animate-pulse h-64"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="p-8 text-center bg-red-950/20 border border-red-500/10 rounded-2xl">
          <p className="text-red-400 font-condensed uppercase tracking-wider text-sm">
            Failed to retrieve contact coordinates.
          </p>
        </div>
      ) : !isEditMode && !activeContact ? (
        /* Empty State */
        <div className="text-center p-12 bg-neutral-900/10 border border-dashed border-white/10 rounded-2xl space-y-4">
          <Phone size={48} className="mx-auto text-zinc-600 animate-pulse" />
          <h3 className="font-display text-xl uppercase tracking-wide">
            No Contact Setup Found
          </h3>
          <p className="text-sm text-zinc-500 max-w-sm mx-auto font-condensed uppercase tracking-wider">
            Create an entry to populate booking and reachout information.
          </p>
          <Button
            onClick={handleStartEdit}
            className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl border-none cursor-pointer"
          >
            Create Settings
          </Button>
        </div>
      ) : isEditMode ? (
        /* Edit Mode Form */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Group 1: Direct Reachout */}
            <Card className="bg-kh-dark-2 border-white/5 p-6 rounded-2xl">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="font-display text-xl uppercase tracking-wider text-white">
                  Direct Reachout
                </CardTitle>
                <CardDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500">
                  Primary agent contacts
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="direct-email">Agency Email</Label>
                  <Input
                    id="direct-email"
                    {...register("directReachout.email")}
                    disabled={isPending}
                    placeholder="agent@example.com"
                  />
                  {errors.directReachout?.email && (
                    <span className="text-red-400 text-xs">
                      {errors.directReachout.email.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="direct-phone">Agency Phone</Label>
                  <Input
                    id="direct-phone"
                    {...register("directReachout.phone")}
                    disabled={isPending}
                    placeholder="+1 (555) 019-2834"
                  />
                  {errors.directReachout?.phone && (
                    <span className="text-red-400 text-xs">
                      {errors.directReachout.phone.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="direct-location">Primary Location</Label>
                  <Input
                    id="direct-location"
                    {...register("directReachout.location")}
                    disabled={isPending}
                    placeholder="Los Angeles, CA"
                  />
                  {errors.directReachout?.location && (
                    <span className="text-red-400 text-xs">
                      {errors.directReachout.location.message}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Group 2: Get In Touch */}
            <Card className="bg-kh-dark-2 border-white/5 p-6 rounded-2xl">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="font-display text-xl uppercase tracking-wider text-white">
                  Get In Touch
                </CardTitle>
                <CardDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500">
                  General and corporate booking pipelines
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="touch-email">General Email</Label>
                  <Input
                    id="touch-email"
                    {...register("getInTouch.email")}
                    disabled={isPending}
                    placeholder="info@kennediharris.com"
                  />
                  {errors.getInTouch?.email && (
                    <span className="text-red-400 text-xs">
                      {errors.getInTouch.email.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="touch-phone">General Phone</Label>
                  <Input
                    id="touch-phone"
                    {...register("getInTouch.phone")}
                    disabled={isPending}
                    placeholder="+1 (555) 012-3456"
                  />
                  {errors.getInTouch?.phone && (
                    <span className="text-red-400 text-xs">
                      {errors.getInTouch.phone.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="touch-location">General Location</Label>
                  <Input
                    id="touch-location"
                    {...register("getInTouch.location")}
                    disabled={isPending}
                    placeholder="Houston, TX"
                  />
                  {errors.getInTouch?.location && (
                    <span className="text-red-400 text-xs">
                      {errors.getInTouch.location.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="touch-booking">Booking Email</Label>
                  <Input
                    id="touch-booking"
                    {...register("getInTouch.bookingEmail")}
                    disabled={isPending}
                    placeholder="bookings@kennediharris.com"
                  />
                  {errors.getInTouch?.bookingEmail && (
                    <span className="text-red-400 text-xs">
                      {errors.getInTouch.bookingEmail.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="touch-media">Media Inquiries Email</Label>
                  <Input
                    id="touch-media"
                    {...register("getInTouch.mediaEmail")}
                    disabled={isPending}
                    placeholder="media@kennediharris.com"
                  />
                  {errors.getInTouch?.mediaEmail && (
                    <span className="text-red-400 text-xs">
                      {errors.getInTouch.mediaEmail.message}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-3 justify-end border-t border-white/5 pt-6">
            {activeContact && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleReset}
                disabled={isPending}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-condensed font-bold uppercase tracking-wider text-xs py-2 px-4 rounded-xl cursor-pointer"
              >
                Delete Configurations
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
        </form>
      ) : (
        /* View Mode (Two Cards Side-by-side) */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Direct Reachout */}
          <Card className="bg-[#0c0c14] border-white/5 shadow-xl p-6 rounded-2xl relative overflow-hidden">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="font-display text-2xl uppercase tracking-wider text-white">
                Direct Reachout
              </CardTitle>
              <CardDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500">
                Administrative contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/30 border border-white/[0.02]">
                <Mail size={16} className="text-kh-pink" />
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    Agency Email
                  </p>
                  <p className="text-sm font-bold text-white">
                    {activeContact!.directReachout?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/30 border border-white/[0.02]">
                <Phone size={16} className="text-kh-pink" />
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    Agency Phone
                  </p>
                  <p className="text-sm font-bold text-white">
                    {activeContact!.directReachout?.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/30 border border-white/[0.02]">
                <MapPin size={16} className="text-kh-pink" />
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    Primary Location
                  </p>
                  <p className="text-sm font-bold text-white">
                    {activeContact!.directReachout?.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Get In Touch */}
          <Card className="bg-[#0c0c14] border-white/5 shadow-xl p-6 rounded-2xl relative overflow-hidden">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="font-display text-2xl uppercase tracking-wider text-white">
                Get In Touch
              </CardTitle>
              <CardDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500">
                Main booking and media departments
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/30 border border-white/[0.02]">
                <Mail size={16} className="text-kh-pink" />
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    General Email
                  </p>
                  <p className="text-sm font-bold text-white">
                    {activeContact!.getInTouch?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/30 border border-white/[0.02]">
                <Phone size={16} className="text-kh-pink" />
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    General Phone
                  </p>
                  <p className="text-sm font-bold text-white">
                    {activeContact!.getInTouch?.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/30 border border-white/[0.02]">
                <MapPin size={16} className="text-kh-pink" />
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    General Location
                  </p>
                  <p className="text-sm font-bold text-white">
                    {activeContact!.getInTouch?.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/30 border border-white/[0.02]">
                <Calendar size={16} className="text-sky-400" />
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    Booking Email
                  </p>
                  <p className="text-sm font-bold text-sky-400">
                    {activeContact!.getInTouch?.bookingEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/30 border border-white/[0.02]">
                <Camera size={16} className="text-amber-400" />
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    Media Inquiries Email
                  </p>
                  <p className="text-sm font-bold text-amber-400">
                    {activeContact!.getInTouch?.mediaEmail}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
