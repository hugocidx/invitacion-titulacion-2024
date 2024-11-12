# Evento

# Pasos de creacion aplicacion

## Lanzar comando de creacion aplicacion 

```
    schematics .:base --dry-run=false
```

## Navegar con comandos hasta el nuevo proyecto

```
    cd schematicsCeres
    cd "Evento"
```

## Ejecutar comandos para generar un nuevo archivo vscode en un nueva vista del IDE

```
    code ./
```

## Ejecutar comandos para instalar todas las dependencias necesarias

```
    npm i
```

## Ejecutar comandos para instalar todos los componentes ceres

`el origen de estos comandos es el archivo de lanzador de mantenedores.xlxs`

```
    npm install ceres-currency-input --registry http://146.155.26.69:4873
    npm install ceres-date-input --registry http://146.155.26.69:4873
    npm install ceres-float-input --registry http://146.155.26.69:4873
    npm install ceres-int-input --registry http://146.155.26.69:4873
    npm install ceres-mask-input --registry http://146.155.26.69:4873
    npm install ceres-phone-input --registry http://146.155.26.69:4873
    npm install ceres-string-input --registry http://146.155.26.69:4873
    npm install ceres-text-input --registry http://146.155.26.69:4873
    npm install ceres-accordion-lists --registry http://146.155.26.69:4873
    npm install ceres-document-lists --registry http://146.155.26.69:4873
    npm install ceres-download-link-lists --registry http://146.155.26.69:4873
    npm install ceres-simple-lists --registry http://146.155.26.69:4873
    npm install ceres-confirm-notification --registry http://146.155.26.69:4873
    npm install ceres-confirm-code-notification --registry http://146.155.26.69:4873
    npm install ceres-rich-text-notification --registry http://146.155.26.69:4873
    npm install ceres-success-message-notification --registry http://146.155.26.69:4873
    npm install ceres-toast-notification --registry http://146.155.26.69:4873
    npm install ceres-checkbox-selector --registry http://146.155.26.69:4873
    npm install ceres-date-selector --registry http://146.155.26.69:4873
    npm install ceres-draggable-selector --registry http://146.155.26.69:4873
    npm install ceres-dropdown-selector --registry http://146.155.26.69:4873
    npm install ceres-filter-selector --registry http://146.155.26.69:4873
    npm install ceres-image-selector --registry http://146.155.26.69:4873
    npm install ceres-item-list-selector --registry http://146.155.26.69:4873
    npm install ceres-place-selector --registry http://146.155.26.69:4873
    npm install ceres-radio-selector --registry http://146.155.26.69:4873
    npm install ceres-time-selector --registry http://146.155.26.69:4873
    npm install ceres-token-selector --registry http://146.155.26.69:4873
    npm install ceres-tree-selector --registry http://146.155.26.69:4873
    npm install ceres-year-selector --registry http://146.155.26.69:4873
    npm install ceres-auto-user-api-selector --registry http://146.155.26.69:4873
    npm install ceres-auto-user-lbase-selector --registry http://146.155.26.69:4873
    npm install ceres-available-dates-selector --registry http://146.155.26.69:4873
    npm install ceres-simple-user-lbase-selector --registry http://146.155.26.69:4873
    npm install ceres-inner-table --registry http://146.155.26.69:4873
    npm install ceres-simple-table --registry http://146.155.26.69:4873
    npm install ceres-calendar-views --registry http://146.155.26.69:4873
    npm install ceres-gantt-views --registry http://146.155.26.69:4873
    npm install ceres-html-views --registry http://146.155.26.69:4873
    npm install ceres-maps-views --registry http://146.155.26.69:4873
    npm install ceres-pdf-views --registry http://146.155.26.69:4873
```

## Ejecutar comandos de git para inicializar el proyecto en el remoto

```
    git init

    git remote add origin "https://github.com/INSERTAR/LINK-DEL-NUEVO-PROYECTO-CREADO-EN-REMOTO-GIT.git"

    git remote -v

    git add .

    git commit -m "[ADD] project - first commit"

    git push --set-upstream origin master
```

## Ejecutar comando para generar node modules y lanzar aplicacion
`Esta aplicacion se ejecutara de manera predetermiada en el puerto http://localhost:4205/`
```
    npm start
```

## Personalizar

Ajustar archivos .config y transloco en el excel de lanzamiento

## Build

Ejecute `ng build` para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`.

## Ejecución de pruebas unitarias

Ejecute `ng test` para ejecutar las pruebas unitarias a través de [karma] (https://karma-runner.github.io).

## Correr pruebas end-to-end

Ejecute `ng e2e` para ejecutar las pruebas de extremo a extremo a través de una plataforma de su elección.Para usar este comando, primero debe agregar un paquete que implementa capacidades de prueba de extremo a extremo.
