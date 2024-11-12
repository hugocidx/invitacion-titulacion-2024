import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@services/loader.service';
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  public color = 'primary';
  public mode = 'indeterminate';
  public value = 50;
  constructor(public loaderService: LoaderService) {}
  ngOnInit(): void {}
  iAmloading() {
    alert('cargando');
  }
}
