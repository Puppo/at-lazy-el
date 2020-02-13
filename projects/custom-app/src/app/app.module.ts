import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProductRoutingModule } from '@atonspa/product';
import { AppComponent } from './app.component';
import { LAZY_COMPONENTS, LazyModule, ILazyComponentDef } from '@atonspa/lazy';
import { RouterModule } from '@angular/router';

const libProductWebDef: ILazyComponentDef = {
  selector: 'lib-product-web',
  loadChildren: () => import('@atonspa/custom').then(mod => mod.CustomWebModule)
};

const libProductPageDef: ILazyComponentDef = {
  selector: 'lib-product-page',
  loadChildren: () => import('@atonspa/custom').then(mod => mod.CustomPageModule)
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LazyModule,
    ProductRoutingModule,

    RouterModule.forRoot([
      { path: '', redirectTo: '/product', pathMatch: 'full' }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    // {
    //   provide: LAZY_COMPONENTS,
    //   useValue: libProductWebDef,
    //   multi: true
    // },
    // {
    //   provide: LAZY_COMPONENTS,
    //   useValue: libProductPageDef,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
