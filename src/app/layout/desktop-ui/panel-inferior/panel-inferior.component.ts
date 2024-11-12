import { Component, Input } from '@angular/core';
import { CeresInnerTableComponent } from 'ceres-inner-table';
@Component({
  standalone: true,
  imports: [CeresInnerTableComponent],
  selector: 'app-panel-inferior',
  template: `<!-- <div b class="inferiorContainerB">
  <app-inner-table [dataset]="dataSet.secondaryTable[0]"></app-inner-table>
</div> -->
    <ceres-inner-table></ceres-inner-table> `,
  styles: [
    `
      .inferiorContainerB {
        display: block;
        border-color: #000;
        height: calc(100vh - 105px) !important;
        background-color: var(--gris_claro_b);
      }
    `,
  ],
})
export class PanelInferiorComponent {
  @Input() dataSet: any;
}
