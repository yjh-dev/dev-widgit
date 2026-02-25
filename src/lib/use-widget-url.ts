import { useCallback, useMemo } from "react";

export function useWidgetUrl(builder: () => string, deps: unknown[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const buildWidgetUrl = useCallback(builder, deps);

  const widgetUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return buildWidgetUrl();
  }, [buildWidgetUrl]);

  return { buildWidgetUrl, widgetUrl };
}
