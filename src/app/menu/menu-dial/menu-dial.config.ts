import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenudialConfig {
  public speedDialFabButtons = [
    {
      icon: 'comment',
      tooltip: 'comentar',
    },
    {
      icon: 'close',
      tooltip: 'cancelar',
    },
    {
      icon: 'done',
      tooltip: 'aprobar',
    },
  ];
}
