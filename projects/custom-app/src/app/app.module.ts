import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ValueProvider } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductRoutingModule } from '@atonspa/product';

import { AppComponent } from './app.component';
import { LazyModule, createLazyComponentProvider } from '@atonspa/lazy';

const productWebRegistry: ValueProvider = createLazyComponentProvider({
  selector: 'lib-product-web',
  loadChildren: () =>
    import('@atonspa/product').then((mod) => mod.ProductWebModule),
});

const productWebCustomRegistry: ValueProvider = createLazyComponentProvider({
  selector: 'lib-product-web',
  loadChildren: () =>
    import('@atonspa/custom').then((mod) => mod.CustomWebModule),
  custom: true,
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LazyModule,
    ProductRoutingModule,

    RouterModule.forRoot([
      { path: '', redirectTo: '/product', pathMatch: 'full' },
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    // productWebRegistry,
    productWebCustomRegistry,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
