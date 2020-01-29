import { Component, OnInit, ViewEncapsulation, NgModule, CUSTOM_ELEMENTS_SCHEMA, Input, Output, EventEmitter } from '@angular/core';
import { LazyService } from '@atonspa/lazy';

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
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProductWebComponent {

  title = 'product-web';

  @Input() name: string;

  @Output() hello = new EventEmitter<string>();

  sayHello() {
    this.hello.emit(`Hello ${this.name} from lib-product-web`);
  }

}

@NgModule({
  declarations: [ProductWebComponent],
  entryComponents: [ProductWebComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductWebModule {

  constructor(
    lazySv: LazyService
  ) {
    lazySv.load('lib-product-web', ProductWebComponent);
  }
}
