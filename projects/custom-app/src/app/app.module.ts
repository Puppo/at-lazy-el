import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProductModule } from '@atonspa/product';
import { AppComponent } from './app.component';
import { LAZY_COMPONENTS, LazyModule, ILazyComponentDef } from '@atonspa/lazy';

const libProductWebDef: ILazyComponentDef = {
  selector: 'lib-product-web',
  loadChildren: () => import('@atonspa/custom').then(mod => mod.CustomWebModule)
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LazyModule,
    ProductModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: LAZY_COMPONENTS,
      useValue: libProductWebDef,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
