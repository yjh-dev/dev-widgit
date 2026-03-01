export interface Preset<T = Record<string, unknown>> {
  id: string;
  name: string;
  data: T;
}
