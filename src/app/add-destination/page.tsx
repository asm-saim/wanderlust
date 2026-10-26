"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CircleX, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["Beach", "Mountain", "City Break", "Adventure", "Cultural", "Wildlife"];

const fieldClass =
  "h-9 rounded-md border-transparent bg-muted/50 px-3 text-sm focus-visible:border-ring/50 focus-visible:ring-ring/20";

type FormState = {
  destinationName: string;
  country: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const initialForm: FormState = {
  destinationName: "",
  country: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

function LabeledField({ id, label, ...props }: { id: string; label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <Input id={id} className={fieldClass} {...props} />
    </div>
  );
}

export default function AddDestinationPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [category, setCategory] = useState("");

  const updateField = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Demo form — no backend wired up yet
    event.preventDefault();
    console.log("New travel package:", { ...form, category });

    //
    const res = await fetch("http://localhost:8000/add-destination", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log(data);
  };

  const handleCancel = () => {
    setForm(initialForm);
    setCategory("");
  };

  return (
    <main className="flex-1 px-4 py-10 md:px-8 md:py-14">
      <h1 className="font-display text-3xl text-foreground md:text-4xl">Add New Travel Package</h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 w-full max-w-3xl rounded-xl border border-border bg-white p-6 shadow-sm md:p-7"
      >
        <div className="grid gap-4 md:gap-5">
          <LabeledField
            id="destinationName"
            label="Destination Name"
            placeholder="Bali Paradise"
            required
            value={form.destinationName}
            onChange={updateField("destinationName")}
          />

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <LabeledField
              id="country"
              label="Country"
              placeholder="Indonesia"
              value={form.country}
              onChange={updateField("country")}
            />
            <div className="space-y-1.5">
              <label htmlFor="category" className="text-sm font-medium text-foreground">
                Category
              </label>
              <Select value={category} onValueChange={(value) => setCategory(value ?? "")}>
                <SelectTrigger
                  id="category"
                  className="h-9 w-full rounded-md border-transparent bg-muted/50 px-3 text-sm focus-visible:border-ring/50 focus-visible:ring-ring/20"
                >
                  <SelectValue placeholder="Beach" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <LabeledField
              id="price"
              label="Price (USD)"
              type="number"
              min="0"
              placeholder="e.g., 1299"
              value={form.price}
              onChange={updateField("price")}
            />
            <LabeledField
              id="duration"
              label="Duration"
              placeholder="e.g., 7 Days/6 Nights"
              value={form.duration}
              onChange={updateField("duration")}
            />
          </div>

          <LabeledField
            id="departureDate"
            label="Departure Date"
            type="date"
            value={form.departureDate}
            onChange={updateField("departureDate")}
          />

          <LabeledField
            id="imageUrl"
            label="Image URL"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={form.imageUrl}
            onChange={updateField("imageUrl")}
          />

          <div className="space-y-1.5">
            <label htmlFor="description" className="text-sm font-medium text-foreground">
              Description
            </label>
            <Textarea
              id="description"
              rows={4}
              placeholder="Describe the travel experience..."
              className="min-h-36 rounded-md border-transparent bg-muted/50 px-3 py-2 text-sm focus-visible:border-ring/50 focus-visible:ring-ring/20"
              value={form.description}
              onChange={updateField("description")}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleCancel}
            className="border-destructive bg-background text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <CircleX />
            Cancel
          </Button>
          <Button type="submit" size="lg" className="border-transparent bg-brand text-white hover:bg-brand/90">
            <Send />
            Add Travel Package
          </Button>
        </div>
      </form>
    </main>
  );
}
