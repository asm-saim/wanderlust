"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CircleX, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

type FormState = {
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const categories = ["Beach", "Mountain", "City Break", "Adventure", "Cultural", "Wildlife"];

const fieldClass =
  "h-9 rounded-md border-transparent bg-muted/50 px-3 text-sm focus-visible:border-ring/50 focus-visible:ring-ring/20";

function toFormState(destination: Destination): FormState {
  return {
    destinationName: destination.destinationName,
    country: destination.country,
    category: destination.category,
    price: String(destination.price),
    duration: destination.duration,
    departureDate: destination.departureDate,
    imageUrl: destination.imageUrl,
    description: destination.description,
  };
}

function LabeledField({ id, label, ...props }: { id: string; label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <Input id={id} className={fieldClass} {...props} />
    </div>
  );
}

type Props = {
  destination: Destination;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
};

export default function UpdatePackageModal({ destination, onOpenChange, onUpdated }: Props) {
  // The parent mounts this component fresh on every open, so the initializer
  // always prefills from the current destination — no effect needed (which
  // would trip react-hooks/set-state-in-effect).
  const [form, setForm] = useState<FormState>(() => toFormState(destination));
  const [saving, setSaving] = useState(false);

  const updateField = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  // Ignore close requests while a save is in flight so the PATCH isn't orphaned.
  const handleOpenChange = (open: boolean) => {
    if (!open && saving) {
      return;
    }
    onOpenChange(open);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`http://localhost:8000/destination/${destination._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        // _id is intentionally excluded — Mongo rejects $set on _id.
        body: JSON.stringify({
          destinationName: form.destinationName,
          country: form.country,
          category: form.category,
          price: Number(form.price),
          duration: form.duration,
          departureDate: form.departureDate,
          imageUrl: form.imageUrl,
          description: form.description,
        }),
        // Safety net: never leave the button spinning if the server accepts the
        // request but forgets to respond.
        signal: AbortSignal.timeout(10_000),
      });

      if (!res.ok) {
        throw new Error(`status-${res.status}`);
      }

      toast.add({
        type: "success",
        title: "Travel package updated! ✏️",
        description: `“${form.destinationName || "Your package"}” — your changes are live.`,
      });
      onUpdated();
      onOpenChange(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      let description: string;
      if (message.startsWith("status-")) {
        description = `The server responded with ${message.slice("status-".length)}. Please try again.`;
      } else if (err instanceof Error && err.name === "TimeoutError") {
        description =
          "The booking API at localhost:8000 accepted the request but never replied. Make sure the PATCH handler calls res.json(...), then try again.";
      } else {
        description =
          "The booking API at localhost:8000 didn't respond. Check that it's running and try again.";
      }
      toast.add({
        type: "error",
        title: "Couldn't save your changes",
        description,
      });
    } finally {
      setSaving(false);
    }
  };

  // Keep the record's current category selectable even if it's outside the
  // standard list (e.g. added directly via the API).
  const categoryOptions = categories.includes(form.category)
    ? categories
    : [form.category, ...categories].filter(Boolean);

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-lg"
        showCloseButton={!saving}
      >
        <DialogHeader>
          <DialogTitle>Update Travel Package</DialogTitle>
          <DialogDescription>Make changes to the travel package details below</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <LabeledField
            id="edit-destinationName"
            label="Destination Name"
            placeholder="Bali Paradise"
            required
            value={form.destinationName}
            onChange={updateField("destinationName")}
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <LabeledField
              id="edit-country"
              label="Country"
              placeholder="Indonesia"
              value={form.country}
              onChange={updateField("country")}
            />
            <div className="space-y-1">
              <label htmlFor="edit-category" className="text-sm font-medium text-foreground">
                Category
              </label>
              <Select
                value={form.category}
                onValueChange={(value) => setForm((prev) => ({ ...prev, category: value ?? "" }))}
              >
                <SelectTrigger id="edit-category" className={`${fieldClass} w-full`}>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <LabeledField
              id="edit-price"
              label="Price ($)"
              type="number"
              min="0"
              placeholder="e.g. 1299"
              required
              value={form.price}
              onChange={updateField("price")}
            />
            <LabeledField
              id="edit-duration"
              label="Duration"
              placeholder="e.g. 7 Days/6 Nights"
              value={form.duration}
              onChange={updateField("duration")}
            />
          </div>

          <LabeledField
            id="edit-departureDate"
            label="Departure Date"
            type="date"
            required
            value={form.departureDate}
            onChange={updateField("departureDate")}
          />

          <LabeledField
            id="edit-imageUrl"
            label="Image URL"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={form.imageUrl}
            onChange={updateField("imageUrl")}
          />

          <div className="space-y-1">
            <label htmlFor="edit-description" className="text-sm font-medium text-foreground">
              Description
            </label>
            <Textarea
              id="edit-description"
              rows={4}
              placeholder="Describe the travel experience..."
              className="min-h-28 rounded-md border-transparent bg-muted/50 px-3 py-2 text-sm focus-visible:border-ring/50 focus-visible:ring-ring/20"
              value={form.description}
              onChange={updateField("description")}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={saving}
              onClick={() => handleOpenChange(false)}
              className="border-destructive bg-background text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <CircleX />
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={saving}
              className="border-transparent bg-brand text-white hover:bg-brand/90"
            >
              <Save />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
