export interface opcionesSeleccion {
    value: number,
    text: string,
    texto_short?: string,
}
export interface opcionesSeleccionCompleto {
    id: number,
    contexto: string,
    grupo?: string,
    codigo: string,
    texto: string,
    texto_corto?: string,
    orden: number,
    modified: Date
}
