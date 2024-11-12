import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
@Injectable({
  providedIn: 'root',
})
export class TableService {
  /**
   *  campos por dewfecto usados en el config
   */
  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    minWidth: 80,
    width: 120,
    floatingFilter: true,
    filter: 'agTextColumnFilter',
  };
  /**
   * tipos de los campos usados en el config
   */
  public columnTypes: any = {
    str_string: {
      filter: 'agTextColumnFilter',
    },
    str_char: {
      filter: 'agTextColumnFilter',
    },
    str_text: {
      filter: 'agTextColumnFilter',
    },
    str_rut: {
      filter: 'agTextColumnFilter',
    },
    num_enteros: {
      filter: 'agNumberFilter',
    },
    num_decimales: {
      filter: 'agNumberFilter',
    },
    num_id: {
      editable: false,
      sortable: true,
      checkboxSelection: true,
      lockPosition: 'left',
      filter: 'agNumberFilter',
    },
    num_telefono: {
      filter: 'agNumberFilter',
    },
    dt_fecha: {
      filter: 'agDateColumnFilter',
      filterParams: { comparator: this.datetimeFormatter },
      suppressMenu: true,
    },
    dt_hora: {
      filter: 'agDateColumnFilter',
      filterParams: { comparator: this.dateSort },
      suppressMenu: true,
    },
    dt_fechayhora: {
      filter: 'agDateColumnFilter',
      filterParams: { comparator: this.dateSort },
      suppressMenu: true,
    },
    b_yesno: {
      filter: 'agTextColumnFilter',
    },
  };
  /**
   * metodo que da formato y estructura de uso del tiempo
   */
  datetimeFormatter(params: { value: string | number | Date }) {
    const fecha = new Date(params.value);
    const fecha_formato = new Date(params.value).toLocaleDateString();
    const hora =
      fecha.getHours() <= 9 ? '0' + fecha.getHours() : fecha.getHours();
    const minutos =
      fecha.getMinutes() <= 9 ? '0' + fecha.getMinutes() : fecha.getMinutes();
    return fecha_formato + ' ' + hora + ':' + minutos;
  }
  numberSort(num1: number, num2: number) {
    return num1 - num2;
  }
  dateSort(a: string, b: string) {
    var da: Date = new Date(new Date(a).toDateString());
    var db: Date = new Date(new Date(b).toDateString());
    return +db - +da;
  }
  public dateFilterParams = {
    buttons: ['reset', 'apply'],
    comparator: function (a: string, b: string) {
      var da: Date = new Date(new Date(a).toDateString());
      var db: Date = new Date(new Date(b).toDateString());
      return +db - +da;
    },
  };
  sensitiveNumber(param: { value: any }, canView: any) {
    if (!canView) {
      return Number(-999);
    } else {
      return param.value;
    }
  }
  sensitiveString(_params: any) {
    return '*****';
  }
  numberParser(number: { NewValue: any; value: any }) {
    console.log(number.NewValue);
    return Number(number.value);
  }
  percentajeFormatter(params: { value: number }) {
    return Math.floor(params.value);
  }
  dateFormatter(params: { value: string | number | Date }) {
    let fecha = new Date(params.value).toISOString().slice(0, 10).split('-');
    return fecha[2] + '-' + fecha[1] + '-' + fecha[0];
  }
  bracketsFormatter(params: { value: string }) {
    return '(' + params.value + ')';
  }
  formatNumber(number: number) {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  timeFormatter(params: { value: string | number | Date }) {
    const fecha = new Date(params.value);
    const hora =
      fecha.getHours() <= 9 ? '0' + fecha.getHours() : fecha.getHours();
    const minutos =
      fecha.getMinutes() <= 9 ? '0' + fecha.getMinutes() : fecha.getMinutes();
    return hora + ':' + minutos;
  }
  currencyFormatter(params: { value: any }) {
    return numberFormatter(params.value);
  }
}
function numberFormatter(number: number) {
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
