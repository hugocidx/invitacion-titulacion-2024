import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradasNewFormComponent } from './pages/entradas-new-form/entradas-new-form.component';
import { notFoundComponent } from './pages/componente-vacio/not-found.component';
export const routes: Routes = [
  { path: 'entradas/:id', component: EntradasNewFormComponent },
  { path: '**', component: notFoundComponent },
  { path: 'not-found', component: notFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
