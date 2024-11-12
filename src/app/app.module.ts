import { HttpClientModule } from '@angular/common/http';
import { Injectable, LOCALE_ID } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntradasNewFormComponent } from './pages/entradas-new-form/entradas-new-form.component';
@Injectable({
  providedIn: 'root',
})
@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    EntradasNewFormComponent,
    HttpClientModule,
  ],
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
