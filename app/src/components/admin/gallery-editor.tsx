"use client";

import { useRouter } from "next/navigation";
import {
  saveGalleryImage,
  deleteGalleryImage,
  type GalleryInput,
} from "@/app/actions/admin";
import { CrudForm, NewItemPanel, type FieldSpec } from "./crud";

const FIELDS: FieldSpec[] = [
  { name: "storage_path", label: "Image path (media bucket)", type: "text", placeholder: "gallery/drive-1.jpg" },
  { name: "caption", label: "Caption", type: "text" },
  { name: "alt_text", label: "Alt text", type: "text", placeholder: "Students packing donation boxes" },
  { name: "sort_order", label: "Sort order", type: "number" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "draft", label: "Draft" },
      { value: "published", label: "Published" },
    ],
  },
];

const EMPTY: Record<string, string | number> = {
  storage_path: "",
  caption: "",
  alt_text: "",
  sort_order: 0,
  status: "draft",
};

function toInput(values: Record<string, string | number>): GalleryInput {
  return {
    caption: String(values.caption ?? ""),
    alt_text: String(values.alt_text ?? ""),
    storage_path: String(values.storage_path ?? ""),
    sort_order: Number(values.sort_order ?? 0),
    status: values.status === "published" ? "published" : "draft",
  };
}

export function NewGalleryForm() {
  const router = useRouter();
  return (
    <NewItemPanel label="Image">
      <CrudForm
        title="Add gallery image"
        fields={FIELDS}
        initialValues={EMPTY}
        submit={async (values) => {
          const result = await saveGalleryImage(toInput(values));
          if (result.ok) router.refresh();
          return result;
        }}
        onDone={router.refresh}
      />
    </NewItemPanel>
  );
}

export function GalleryEditor({
  id,
  values,
}: {
  id: string;
  values: Record<string, string | number>;
}) {
  const router = useRouter();
  return (
    <CrudForm
      title="Edit image"
      fields={FIELDS}
      initialValues={values}
      submit={async (next) => {
        const result = await saveGalleryImage({ ...toInput(next), id });
        if (result.ok) router.refresh();
        return result;
      }}
      onDelete={async () => {
        const result = await deleteGalleryImage(id);
        if (result.ok) router.refresh();
        return result;
      }}
      onDone={router.refresh}
    />
  );
}
