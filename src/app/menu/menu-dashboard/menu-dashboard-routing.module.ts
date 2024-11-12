import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RichTextComponent } from '@app/shared/notificaciones/rich-text/rich-text.component';
const routes: Routes = [
  {
    path: 'richText',
    component: RichTextComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
