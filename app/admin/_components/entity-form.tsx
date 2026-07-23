import type { FieldConfig } from "@/lib/entities";
import { FileUploadField } from "./file-upload-field";

export function EntityFormFields({
  fields,
  values,
}: {
  fields: FieldConfig[];
  values?: Record<string, unknown>;
}) {
  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const value = values?.[field.name];
        const star = field.required ? <span className="text-red-500">*</span> : null;

        if (field.type === "file") {
          return (
            <FileUploadField
              key={field.name}
              name={field.name}
              label={field.label}
              defaultValue={value as string | undefined}
            />
          );
        }

        if (field.type === "checkbox") {
          return (
            <label key={field.name} className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name={field.name}
                defaultChecked={Boolean(value)}
                className="w-4 h-4 rounded border-slate-300"
              />
              {field.label}
            </label>
          );
        }

        if (field.type === "select") {
          return (
            <div key={field.name}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {field.label} {star}
              </label>
              <select
                name={field.name}
                required={field.required}
                defaultValue={(value as string) ?? ""}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              >
                <option value="" disabled>
                  Pilih...
                </option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (field.type === "textarea") {
          return (
            <div key={field.name}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {field.label} {star}
              </label>
              <textarea
                name={field.name}
                required={field.required}
                defaultValue={(value as string) ?? ""}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
          );
        }

        return (
          <div key={field.name}>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {field.label} {star}
            </label>
            <input
              type={field.type === "number" ? "number" : field.type === "url" ? "url" : "text"}
              name={field.name}
              required={field.required}
              defaultValue={(value as string | number) ?? (field.type === "number" ? 0 : "")}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
        );
      })}
    </div>
  );
}
