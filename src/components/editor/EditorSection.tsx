"use client";

import type { ReactNode } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface Section {
  id: string;
  title: string;
  children: ReactNode;
}

interface EditorSectionProps {
  sections: Section[];
  defaultOpen?: string[];
}

export default function EditorSection({
  sections,
  defaultOpen,
}: EditorSectionProps) {
  return (
    <Accordion
      type="multiple"
      defaultValue={defaultOpen ?? sections.map((s) => s.id)}
    >
      {sections.map((section) => (
        <AccordionItem key={section.id} value={section.id}>
          <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline">
            {section.title}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">{section.children}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
