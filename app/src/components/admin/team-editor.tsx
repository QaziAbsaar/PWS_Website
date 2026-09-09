"use client";

import { useRouter } from "next/navigation";
import { saveTeamMember, deleteTeamMember, type TeamInput } from "@/app/actions/admin";
import { CrudForm, NewItemPanel, type FieldSpec } from "./crud";

const FIELDS: FieldSpec[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Hassan Vaqas Quraishi" },
  { name: "role", label: "Role", type: "text", placeholder: "President" },
  { name: "photo_path", label: "Photo", type: "upload", placeholder: "team/president.jpg" },
  { name: "sort_order", label: "Sort order", type: "number" },
];

const EMPTY: Record<string, string | number> = {
  name: "",
  role: "",
  photo_path: "",
  sort_order: 0,
};

function toInput(values: Record<string, string | number>): TeamInput {
  return {
    name: String(values.name ?? ""),
    role: String(values.role ?? ""),
    photo_path: String(values.photo_path ?? ""),
    sort_order: Number(values.sort_order ?? 0),
  };
}

export function NewTeamForm() {
  const router = useRouter();
  return (
    <NewItemPanel label="Member">
      <CrudForm
        title="Add team member"
        fields={FIELDS}
        initialValues={EMPTY}
        submit={async (values) => {
          const result = await saveTeamMember(toInput(values));
          if (result.ok) router.refresh();
          return result;
        }}
        onDone={router.refresh}
      />
    </NewItemPanel>
  );
}

export function TeamEditor({
  id,
  values,
}: {
  id: string;
  values: Record<string, string | number>;
}) {
  const router = useRouter();
  return (
    <CrudForm
      title="Edit member"
      fields={FIELDS}
      initialValues={values}
      submit={async (next) => {
        const result = await saveTeamMember({ ...toInput(next), id });
        if (result.ok) router.refresh();
        return result;
      }}
      onDelete={async () => {
        const result = await deleteTeamMember(id);
        if (result.ok) router.refresh();
        return result;
      }}
      onDone={router.refresh}
    />
  );
}
