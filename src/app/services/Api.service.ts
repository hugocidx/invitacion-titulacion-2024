import { Injectable } from '@angular/core';
import { ProcessService } from './process.service';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public category_id: string = 'proyectos';
  constructor(private processService: ProcessService) {}
  public opportunities: any[] =
    this.category_id === 'proyectos'
      ? [
          {
            id: 1,
            eid: 'EID1',
            category_id: {
              parent_id: {
                name: 'Padre 1',
              },
              name: 'Categoría 1',
            },
            organization_id: {
              name: 'Organización 1',
            },
            segment_name: 'Nombre del Segmento 1',
            segment_value: 'Valor del Segmento 1',
            name: 'Oportunidad 1',
            description: 'Descripción 1',
            requirements: 'Requisitos 1',
            can_apply_groups_ids: 'Grupos que pueden aplicar 1',
            clasification: 'Clasificación 1',
            optional_data: 'Datos Opcionales 1',
            view_after_date: {
              date: '2023-01-01',
            },
            view_before_date: {
              date: '2023-01-02',
            },
            selection_score: 'Puntuación de Selección 1',
            is_visible: true,
            start_date: {
              date: '2023-01-01',
            },
            end_date: {
              date: '2023-01-02',
            },
            is_active: true,
            closed_at: {
              date: '2023-01-02',
            },
            created_at: {
              date: '2023-01-01',
            },
            updated_at: {
              date: '2023-01-02',
            },
            deleted_at: {
              date: null,
            },
          },
          // ...
        ]
      : [];
  public data = [
    {
      itemName: [
        {
          rol: 'academico',
          acciones: null,
          itemDescription: 'Solicitud académico',
          itemContent: 'Contenido de la solicitud',
          status: 'Pendiente',
        },
        {
          rol: 'administrativo',
          formSent_date: 'date.now',
          acciones: null,
          itemDescription: 'Solicitud administrativo',
          itemContent: 'Contenido de la solicitud',
          status: 'Pendiente',
          last_attempt: this.processService.attempts.last_attempt,
        },
        {
          rol: 'alumno',
          acciones: null,
          itemDescription: 'Solicitud alumno',
          itemContent: 'Contenido de la solicitud',
          status: 'Pendiente',
          last_attempt: this.processService.attempts.last_attempt,
        },
      ],
    },
  ];
}
