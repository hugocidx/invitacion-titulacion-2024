export interface interConfig {
  columns: Array<{
    visible: boolean;
    size: number;
    rows: Array<{
      visible: boolean;
      size: number;
      type: string;
      name: string;
    }>;
  }>;
  disabled: boolean;
}
