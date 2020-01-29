import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA, NgModule, Input } from '@angular/core';
import { ProductWebComponent, ProductWebComponentTemplate } from '@atonspa/product';

@Component({
  selector: 'lib-custom-web',
  template: ProductWebComponentTemplate,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CustomWebComponent extends ProductWebComponent {

  title = 'custom-web';

  sayHello() {
    this.hello.emit(`Hello ${this.name} from lib-custom-web`);
  }
}

@NgModule({
  declarations: [CustomWebComponent],
  entryComponents: [CustomWebComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomWebModule {

  components = {
    'lib-product-web': CustomWebComponent
  };

}
