/**
 * Interfaz responsable de dar funcionalidad a los botones del menú
 */
export interface ActionCommandMenu {
  icon_on: string;
  icon_off?: string;
  action: string;
  action_off?: string
  zeroItems?: boolean;
  tooltip?: string;
  arialabel?: string;
  matTooltip?: string;
  status?: boolean;
}
