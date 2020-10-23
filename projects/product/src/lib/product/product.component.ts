import {
  Component,
  ViewEncapsulation,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { LazyService, LazyModule } from '@atonspa/lazy';
import { RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-product',
  template: `
    <p>product works!</p>

    <a routerLink="/product-page">Change</a>

    <div>
      {{ serviceName$ | async }}
    </div>

    <lib-product-web
      *libLazyEl
      [name]="name"
      (hello)="onHello($event)"
    ></lib-product-web>
  `,
})
export class ProductComponent {
  name = 'Luca Del Puppo';
  serviceName$ = this.sv.name$;

  constructor(protected sv: ProductService) {}

  onHello(event: CustomEvent<string>) {
    alert(event.detail);
  }
}

@NgModule({
  declarations: [ProductComponent],
  entryComponents: [ProductComponent],
  imports: [
    CommonModule,
    LazyModule,
    RouterModule.forChild([{ path: '', component: ProductComponent }]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
})
export class ProductModule {}
