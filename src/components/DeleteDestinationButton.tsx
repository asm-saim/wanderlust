"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";

type Props = {
  destinationId: string | null;
  destinationName?: string;
};

export default function DeleteDestinationButton({ destinationId, destinationName }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    // Don't dismiss the confirm dialog while a delete is in flight.
    if (!nextOpen && deleting) {
      return;
    }
    setOpen(nextOpen);
  };

  const handleDelete = async () => {
    if (!destinationId || deleting) {
      return;
    }
    setDeleting(true);

    try {
      const res = await fetch(`http://localhost:8000/destinations/${destinationId}`, {
        method: "DELETE",
        // Safety net: never leave the button spinning if the server accepts the
        // request but forgets to respond. The handler's res.json() sends an
        // empty body, so only res.ok is checked — nothing is parsed.
        signal: AbortSignal.timeout(10_000),
      });

      if (!res.ok) {
        throw new Error(`status-${res.status}`);
      }

      toast.add({
        type: "success",
        title: "Destination deleted 🗑",
        description: `“${destinationName || "The destination"}” is no longer in the catalog.`,
      });
      setOpen(false);
      router.push("/destinations");
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      let description: string;
      if (message.startsWith("status-")) {
        description = `The server responded with ${message.slice("status-".length)}. Please try again.`;
      } else if (err instanceof Error && err.name === "TimeoutError") {
        description =
          "The booking API at localhost:8000 accepted the request but never replied. Make sure the DELETE handler calls res.json(...), then try again.";
      } else {
        description =
          "The booking API at localhost:8000 didn't respond. Check that it's running and try again.";
      }
      toast.add({
        type: "error",
        title: "Couldn't delete this destination",
        description,
      });
      setOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            disabled={!destinationId}
            className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
          />
        }
      >
        <Trash />
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this destination?</AlertDialogTitle>
          <AlertDialogDescription>
            {destinationName
              ? `“${destinationName}” will be permanently removed. This can’t be undone.`
              : "This destination will be permanently removed. This can’t be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleting || !destinationId}
            className="border-transparent bg-destructive text-white hover:bg-destructive/90"
          >
            <Trash />
            {deleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
