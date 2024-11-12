import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '@app/services/author/crud.service';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SuccessDialogComponent } from '@app/selectores/success-dialog/success-dialog.component';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-entradas-new-form',
  templateUrl: './entradas-new-form.component.html',
  styleUrl: './entradas-new-form.component.scss',
  imports: [
    CommonModule,
    DropzoneModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
})
export class EntradasNewFormComponent implements OnInit {
  public primaryForm: FormGroup;
  public configDropzone: DropzoneConfigInterface;
  public combinedImages: any[] = [];
  public data: any = [];
  public entries: any[] = [];
  public showRepresentativeSection: boolean = false;
  public showPhotoUploadSection: boolean = true;
  public id: string;
  public currentDescription: string = ''; // Nueva variable para la descripción
  constructor(
    private dataService: CrudService,
    public dialog: MatDialog,
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.configDropzone = {
      url: environment.API_URL + '/api/dtp/documents/upload',
      paramName: 'archivo[]',
      maxFilesize: 20,
      acceptedFiles: 'image/*',
      parallelUploads: 1,
      addRemoveLinks: true,
      dictDefaultMessage: 'Haga clic o arrastre las imágenes aquí para cargar',
      dictRemoveFile: 'Eliminar documento',
      dictCancelUpload: 'Cancelar carga',
      maxFiles: 2, // Limitar a 2 imágenes
      init: function () {
        const dropzoneInstance = this;
        dropzoneInstance.componentRef = this;
        this.on('success', function (file: any, response: any) {
          file.serverId = response.data[0].id;
          console.log('Archivo subido exitosamente con ID:', file.serverId);
        });
        this.on('removedfile', (file: any) => {
          if (file.serverId) {
            dropzoneInstance.componentRef.deleteImage(file.serverId);
          }
          this.on('maxfilesexceeded', function (file: any) {
            this.removeFile(file); // Elimina automáticamente el archivo adicional
            alert('No puedes subir más de dos imágenes.');
          });
        });
      },
    };
  }
  ngOnInit(): void {
    this.FormDefaults();
    this.getId();
    this.getData();
  }
  getId() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';
      // Solo continúa si existe el ID
      if (this.id) {
        this.FormDefaults();
        // Suscribirse al cambio de valor de will_attend
        this.primaryForm.get('will_attend')?.valueChanges.subscribe((value) => {
          this.showRepresentativeSection = value === '2';
          this.showPhotoUploadSection = value !== '0'; // Mostrar la sección de fotos si no selecciona "0"
        });
      } else {
        console.error('ID no encontrado en la ruta');
      }
    });
  }
  getData() {
    this.dataService.getItems('/api/v1/confirmations/' + this.id).subscribe({
      next: (res) => {
        console.log('Elementos obtenidos del API', res);
        this.data = res.data;

        // Valida si `will_attend` no es null
        if (this.data.will_attend !== null) {
          this.router.navigate(['/not-found']); // Redirige a la ruta 404 si will_attend no es null
        }
      },
      error: (error) => {
        console.error('Error en la solicitud HTTP:', error);
      },
    });
  }
  /* metodos de control de deropzone */
  onUploadSuccess(event: any): void {
    const response = event[1];
    const file = event[0];

    if (response && response.data && response.data[0] && response.data[0].id) {
      const uploadedImageId = response.data[0].id;

      if (this.primaryForm) {
        const controlName = `photo${this.combinedImages.length + 1}_file_id`; // Calcula el nombre del control
        this.primaryForm.patchValue(
          {
            [controlName]: [uploadedImageId],
          },
          { emitEvent: false }
        );
      }

      // Puedes agregar la imagen al array de documentos si lo necesitas para otros fines
      const uploadedImage = {
        id: uploadedImageId,
        name: file.name,
        dataURL: file.dataURL,
        tag: 'documento',
        description: this.currentDescription, // Agrega la descripción actual
      };

      this.combinedImages.unshift(uploadedImage);
      console.log(
        'ID, nombre y descripción de la imagen subida:',
        uploadedImage
      );

      // Resetea la descripción para la siguiente imagen
      this.currentDescription = '';

      // Oculta la previsualización
      if (file.previewElement) {
        file.previewElement.style.display = 'none';
      }
    } else {
      console.error('No se pudo obtener el ID de la imagen subida');
    }
  }
  /* metodos de control de deropzone */
  onUploadError(event: any): void {
    console.error('Error en la carga de la imagen:', event);
  }
  /* Elimina una imagen subida como documentos*/
  deleteImage(imageId: string): void {
    this.http
      .delete(`${environment.API_URL}/api/dtp/documents/${imageId}/delete/`)
      .subscribe({
        next: (response) => {
          console.log('Imagen eliminada exitosamente:', response);
          // Elimina la imagen del array local
          this.combinedImages = this.combinedImages.filter(
            (image) => image.id !== imageId
          );

          // Actualizar el formulario para reflejar la eliminación de la imagen
          this.primaryForm.patchValue({
            documentos: this.combinedImages,
          });
        },
        error: (error) => {
          console.error('Error al eliminar la imagen:', error);
        },
      });
  }
  // campos de formulario
  FormDefaults() {
    this.primaryForm = this.fb.group({
      representative_name: ['alumno juan Perez', Validators.required],
      student_nominated_name: ['alumno juan Perez', Validators.required],
      student_nominated_reason: [
        'porque nomino a alumno juan Perez',
        Validators.required,
      ],
      teacher_nominated_name: ['academico juan Perez', Validators.required],
      teacher_nominated_reason: [
        'porque nomino a academico juan Perez',
        Validators.required,
      ],
      will_attend: ['', Validators.required],
      photo1_file_id: [''],
      photo1_label: ['descripcion de imagen 1', Validators.required],
      photo2_file_id: [''],
      photo2_label: ['descripcion de imagen 2', Validators.required],
    });
  }
  // limpia el formulario
  clear() {
    this.primaryForm.reset();
  }
  /* Limpia un campo específico del formulario */
  clearField(fieldName: string) {
    this.primaryForm.get(fieldName)?.setValue('');
  }
  // MatDialog success
  openSuccessDialog(entries: any[], message: string): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      data: { entries, message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El diálogo se cerró', result);
    });
  }
  // envio de datos
  onSubmit() {
    if (this.primaryForm.invalid) {
      return;
    }

    const payload = {
      ...this.primaryForm.value,
      documentos: this.combinedImages,
    };
    const url = `api/v1/confirmations/${this.id}/update`;
    console.log('Form submitted', payload);

    this.dataService.sendItem(url, payload).subscribe({
      next: (res) => {
        if (res.ok) {
          console.log('Elementos enviados al API', res);
          this.openSuccessDialog(res.body.data, res.body.msg);
        }
      },
      error: (error) => {
        console.error('Error en la solicitud HTTP:', error);
      },
    });
  }
}
