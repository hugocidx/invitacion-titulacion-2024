export interface iconfig {
  rows: Array<{
    name: string;
    visible: boolean;
    type: string;
    columns: Array<{
      title: string;
      visible: boolean;
      size: number;
      name: string;
    }>;
  }>;
  disabled: boolean;
}
