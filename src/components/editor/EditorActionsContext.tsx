"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface EditorActionsState {
  widgetUrl: string;
  onCopy: () => void;
  onReset: () => void;
}

interface EditorActionsContextValue {
  state: EditorActionsState | null;
  register: (actions: EditorActionsState) => void;
}

const EditorActionsContext = createContext<EditorActionsContextValue | null>(null);

export function EditorActionsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EditorActionsState | null>(null);

  const register = useCallback((actions: EditorActionsState) => {
    setState(actions);
  }, []);

  return (
    <EditorActionsContext.Provider value={{ state, register }}>
      {children}
    </EditorActionsContext.Provider>
  );
}

export function useEditorActions() {
  const ctx = useContext(EditorActionsContext);
  if (!ctx) {
    throw new Error("useEditorActions must be used within EditorActionsProvider");
  }
  return ctx;
}
