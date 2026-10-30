import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "../ui/toast";

const BookingCard = ({ destination }) => {
  function formatDate(value: string) {
    if (!value) {
      return "your selected date";
    }
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  const [date, setDate] = useState("");

  const perks = ["Free cancellation up to 7 days", "Travel insurance included", "24/7 customer support"];

  const handleBookNow = () => {
    toast.add({
      type: "success",
      title: "Booking started! 🎉",
      description: `${destination?.destinationName ?? "Your trip"} for ${formatDate(date)} — we'll email you the confirmation shortly.`,
    });
  };

  return (
    <div>
      <aside className="rounded-xl border border-border bg-white p-5">
        <p className="text-xs text-muted-foreground">Starting from</p>
        <p className="mt-1 text-3xl font-bold text-foreground">${destination.price}</p>
        <p className="text-xs text-muted-foreground">/per person</p>

        <input
          type="date"
          aria-label="Departure date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="mt-4 h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20"
        />

        <Button className="mt-4 h-10 w-full bg-brand text-white hover:bg-brand/90" onClick={handleBookNow}>
          Book Now
          <ArrowRight />
        </Button>

        <ul className="mt-4 space-y-2">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3.5 w-3.5 shrink-0 text-green-600" aria-hidden="true" />
              {perk}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default BookingCard;
