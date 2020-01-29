import { Component, OnInit, ViewEncapsulation, NgModule, CUSTOM_ELEMENTS_SCHEMA, Input, Output, EventEmitter } from '@angular/core';
import { LazyService } from '@atonspa/lazy';

@Component({
  selector: 'lib-product-web',
  templateUrl: './product-web.component.html',
  styleUrls: ['./product-web.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProductWebComponent {

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
