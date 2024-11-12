import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isLoading = new BehaviorSubject(false);
  show() {
    this.isLoading.next(false);
  }
  hide() {
    this.isLoading.next(false);
  }
}
