"use client";

import { useRouter } from "next/navigation";
import { saveEvent, deleteEvent, type EventInput } from "@/app/actions/admin";
import { CrudForm, NewItemPanel, type FieldSpec } from "./crud";

const FIELDS: FieldSpec[] = [
  { name: "title", label: "Title", type: "text", placeholder: "Winter blanket drive" },
  { name: "date", label: "Date", type: "date" },
  { name: "location", label: "Location", type: "text", placeholder: "Main campus" },
  { name: "image_path", label: "Image path (media bucket)", type: "text", placeholder: "events/drive.jpg" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "draft", label: "Draft" },
      { value: "published", label: "Published" },
    ],
  },
  { name: "description", label: "Description", type: "textarea" },
];

const EMPTY: Record<string, string | number> = {
  title: "",
  date: "",
  location: "",
  image_path: "",
  status: "draft",
  description: "",
};

function toInput(values: Record<string, string | number>): EventInput {
  return {
    title: String(values.title ?? ""),
    date: String(values.date ?? ""),
    location: String(values.location ?? ""),
    image_path: String(values.image_path ?? ""),
    status: values.status === "published" ? "published" : "draft",
    description: String(values.description ?? ""),
  };
}

export function NewEventForm() {
  const router = useRouter();
  return (
    <NewItemPanel label="Event">
      <CrudForm
        title="Create event"
        fields={FIELDS}
        initialValues={EMPTY}
        submit={async (values) => {
          const result = await saveEvent(toInput(values));
          if (result.ok) router.refresh();
          return result;
        }}
        onDone={router.refresh}
      />
    </NewItemPanel>
  );
}

export function EventEditor({
  id,
  values,
}: {
  id: string;
  values: Record<string, string | number>;
}) {
  const router = useRouter();
  return (
    <CrudForm
      title="Edit event"
      fields={FIELDS}
      initialValues={values}
      submit={async (next) => {
        const result = await saveEvent({ ...toInput(next), id });
        if (result.ok) router.refresh();
        return result;
      }}
      onDelete={async () => {
        const result = await deleteEvent(id);
        if (result.ok) router.refresh();
        return result;
      }}
      onDone={router.refresh}
    />
  );
}
