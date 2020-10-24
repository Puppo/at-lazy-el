import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ValueProvider } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductRoutingModule } from '@atonspa/product';

import { AppComponent } from './app.component';
import {
  LazyModule,
  createLazyComponentProvider,
  LazyComponentKeyService,
} from '@atonspa/lazy';
import { AppComponentKeyService, CUSTOM_KEY } from './app.custom.service';

const productWebRegistry: ValueProvider = createLazyComponentProvider({
  selector: 'lib-product-web',
  loadChildren: () =>
    import('@atonspa/product/product-web').then((mod) => mod.ProductWebModule),
});

const productWebCustomRegistry: ValueProvider = createLazyComponentProvider({
  selector: 'lib-product-web',
  loadChildren: () =>
    import('@atonspa/custom/custom-web').then((mod) => mod.CustomWebModule),
  custom: CUSTOM_KEY,
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
    { provide: LazyComponentKeyService, useExisting: AppComponentKeyService },
    productWebRegistry,
    productWebCustomRegistry,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
