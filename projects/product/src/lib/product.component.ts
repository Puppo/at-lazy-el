import { Component, ViewEncapsulation, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LazyService, LazyModule } from '@atonspa/lazy';
import { ProductWebModule } from './product-web/product-web.component';

@Component({
  selector: 'lib-product',
  template: `
    <p>
      product works!
    </p>

    <lib-product-web
      *libLazyEl
      [name]="name"
      (hello)="onHello($event)"
    ></lib-product-web>
  `,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProductComponent {
  name = 'Luca Del Puppo';

  onHello(event: CustomEvent<string>) {
    alert(event.detail);
  }
}

@NgModule({
  declarations: [ProductComponent],
  entryComponents: [ProductComponent],
  imports: [LazyModule, ProductWebModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule {

  constructor(
    lazySv: LazyService
  ) {
    lazySv.load('lib-product', ProductComponent);
  }
}
