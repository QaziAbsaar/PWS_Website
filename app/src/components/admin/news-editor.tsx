"use client";

import { useRouter } from "next/navigation";
import { saveNews, deleteNews, type NewsInput } from "@/app/actions/admin";
import { CrudForm, NewItemPanel, type FieldSpec } from "./crud";

const FIELDS: FieldSpec[] = [
  { name: "title", label: "Title", type: "text", placeholder: "Blood drive report" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "draft", label: "Draft" },
      { value: "published", label: "Published" },
    ],
  },
  { name: "excerpt", label: "Excerpt", type: "textarea", placeholder: "One-sentence summary." },
  { name: "body", label: "Body", type: "textarea", placeholder: "Separate paragraphs with a blank line." },
];

const EMPTY: Record<string, string | number> = {
  title: "",
  status: "draft",
  excerpt: "",
  body: "",
};

function toInput(values: Record<string, string | number>): NewsInput {
  return {
    title: String(values.title ?? ""),
    excerpt: String(values.excerpt ?? ""),
    body: String(values.body ?? ""),
    status: values.status === "published" ? "published" : "draft",
  };
}

export function NewNewsForm() {
  const router = useRouter();
  return (
    <NewItemPanel label="Post">
      <CrudForm
        title="Create news post"
        fields={FIELDS}
        initialValues={EMPTY}
        submit={async (values) => {
          const result = await saveNews(toInput(values));
          if (result.ok) router.refresh();
          return result;
        }}
        onDone={router.refresh}
      />
    </NewItemPanel>
  );
}

export function NewsEditor({
  id,
  values,
}: {
  id: string;
  values: Record<string, string | number>;
}) {
  const router = useRouter();
  return (
    <CrudForm
      title="Edit post"
      fields={FIELDS}
      initialValues={values}
      submit={async (next) => {
        const result = await saveNews({ ...toInput(next), id });
        if (result.ok) router.refresh();
        return result;
      }}
      onDelete={async () => {
        const result = await deleteNews(id);
        if (result.ok) router.refresh();
        return result;
      }}
      onDone={router.refresh}
    />
  );
}
