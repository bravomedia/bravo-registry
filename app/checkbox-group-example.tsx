"use client";

import * as React from "react";

import { Checkbox } from "@/registry/bravo/ui/checkbox";
import { Field, FieldLabel } from "@/registry/bravo/ui/field";

const topics = [
  { value: "kultur", label: "Kultur" },
  { value: "sport", label: "Sport" },
  { value: "politik", label: "Politik" },
];

function CheckboxGroupExample() {
  const [selected, setSelected] = React.useState(["sport"]);
  const allChecked =
    selected.length === topics.length ? true : selected.length > 0 ? "indeterminate" : false;

  return (
    <div className="flex flex-col gap-2">
      <Field className="gap-2">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={allChecked}
            onCheckedChange={(checked) => setSelected(checked === true ? topics.map((topic) => topic.value) : [])}
          />
          <FieldLabel className="text-base leading-6 font-regular">Alla ämnen</FieldLabel>
        </div>
      </Field>
      <div className="flex flex-col gap-2 pl-8">
        {topics.map((topic) => (
          <Field key={topic.value} className="gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                name="topics[]"
                value={topic.value}
                checked={selected.includes(topic.value)}
                onCheckedChange={(checked) =>
                  setSelected((prev) =>
                    checked === true ? [...prev, topic.value] : prev.filter((value) => value !== topic.value)
                  )
                }
              />
              <FieldLabel className="text-base leading-6 font-regular">{topic.label}</FieldLabel>
            </div>
          </Field>
        ))}
      </div>
    </div>
  );
}

export { CheckboxGroupExample };
