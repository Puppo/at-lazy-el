import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, SystemJsNgModuleLoader, NgModuleFactoryLoader } from '@angular/core';
import { ProductRoutingModule } from '@atonspa/product';

import { AppComponent } from './app.component';
import { LazyModule } from '@atonspa/lazy';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    LazyModule,
    ProductRoutingModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/product', pathMatch: 'full' }
    ], {
      enableTracing: true,
      useHash: true
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
