import { Component, ViewEncapsulation, NgModule, CUSTOM_ELEMENTS_SCHEMA, Input, Output, EventEmitter, Inject } from '@angular/core';
import { LazyComponentModule, LazyService } from '@atonspa/lazy';
import { ProductService } from '../product.service';

export const ProductWebComponentTemplate = `
<p>{{ title }} works!</p>
<div>
  Hello {{ name }}
</div>
<button (click)="sayHello()">Say hello</button>
`;

@Component({
  selector: 'lib-product-web',
  template: ProductWebComponentTemplate,
  encapsulation: ViewEncapsulation.None
})
export class ProductWebComponent {

  title = 'product-web';

  @Input() name: string;

  @Output() hello = new EventEmitter<string>();

  constructor(
    protected sv: ProductService
  ) {}

  sayHello() {
    this.hello.emit(`Hello ${this.name} from lib-product-web with ${this.sv.name}`);
  }

}


@NgModule({
  declarations: [ProductWebComponent],
  entryComponents: [ProductWebComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ProductWebModule extends LazyComponentModule {

  constructor(
    lazySv: LazyService) {
    super(
      lazySv, {
      selector: 'lib-product-web',
      componentType: ProductWebComponent
    });
  }

}
