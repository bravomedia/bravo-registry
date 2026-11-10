"use client";

import { toast } from "sonner";

import { Button } from "@/registry/bravo/ui/button";
import { Toaster } from "@/registry/bravo/ui/toast";

function ToastExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Toaster />
      <Button variant="secondary" onClick={() => toast("Meddelande", { description: "Detta är en exempeltext." })}>
        Visa meddelande
      </Button>
      <Button variant="secondary" onClick={() => toast.success("Klart", { description: "Ändringarna har sparats." })}>
        Visa bekräftelse
      </Button>
      <Button variant="secondary" onClick={() => toast.error("Något gick fel", { description: "Försök igen." })}>
        Visa fel
      </Button>
      <Button variant="secondary" onClick={() => toast("Meddelande utan beskrivning")}>
        Utan beskrivning
      </Button>
    </div>
  );
}

export { ToastExample };