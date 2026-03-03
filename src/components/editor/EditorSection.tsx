"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";
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
  const [value, setValue] = useState<string[]>(
    defaultOpen ?? sections.map((s) => s.id),
  );
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleValueChange = useCallback(
    (next: string[]) => {
      // Find newly opened section(s)
      const opened = next.filter((id) => !value.includes(id));
      setValue(next);

      if (opened.length > 0) {
        const targetId = opened[0];
        // Wait for accordion animation to start, then scroll
        requestAnimationFrame(() => {
          const el = itemRefs.current[targetId];
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      }
    },
    [value],
  );

  return (
    <Accordion
      type="multiple"
      value={value}
      onValueChange={handleValueChange}
    >
      {sections.map((section) => (
        <AccordionItem
          key={section.id}
          value={section.id}
          ref={(el) => { itemRefs.current[section.id] = el; }}
        >
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
