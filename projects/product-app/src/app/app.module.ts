import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ValueProvider } from '@angular/core';
import { ProductRoutingModule } from '@atonspa/product';

import { AppComponent } from './app.component';
import { LazyModule, ILazyComponentDef, LAZY_COMPONENTS } from '@atonspa/lazy';
import { RouterModule } from '@angular/router';
import { registryProvider } from './app.component.registry';

@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    LazyModule,
    ProductRoutingModule,
    RouterModule.forRoot(
      [{ path: '', redirectTo: '/product', pathMatch: 'full' }],
      {
        useHash: true,
      }
    ),
  ],
  bootstrap: [AppComponent],
  providers: [
    // registryProvider
  ],
})
export class AppModule {}
