import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LazyModule, LazyService } from '@atonspa/lazy';

@Component({
  selector: 'lib-custom-page',
  templateUrl: './custom-page.component.html',
})
export class CustomPageComponent {}


@NgModule({
  imports: [
    LazyModule,
    RouterModule.forChild([
      { path: '', component: CustomPageComponent }
    ])
  ],
  declarations: [CustomPageComponent],
  entryComponents: [CustomPageComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [RouterModule]
})
export class CustomPageModule {
  components = {
    'lib-product-page': CustomPageComponent
  };
}
