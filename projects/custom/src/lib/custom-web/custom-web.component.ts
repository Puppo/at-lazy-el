import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA, NgModule, Input } from '@angular/core';
import { ProductWebComponent } from '@atonspa/product';

@Component({
  selector: 'lib-custom-web',
  templateUrl: './custom-web.component.html',
  styleUrls: ['./custom-web.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CustomWebComponent extends ProductWebComponent {

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
