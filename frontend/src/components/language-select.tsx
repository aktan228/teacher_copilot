"use client";

import { Field, Select } from "./ui";
import { LANGUAGES, type Language } from "@/lib/types";

export function LanguageSelect({
  value,
  onChange,
  label = "Output language",
}: {
  value: Language;
  onChange: (v: Language) => void;
  label?: string;
}) {
  return (
    <Field label={label}>
      <Select value={value} onChange={(e) => onChange(e.target.value as Language)}>
        {LANGUAGES.map((l) => (
          <option key={l.value} value={l.value}>
            {l.flag} {l.label}
          </option>
        ))}
      </Select>
    </Field>
  );
}
