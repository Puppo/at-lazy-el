import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductModule } from '@atonspa/product';

import { AppComponent } from './app.component';
import { LazyModule } from '@atonspa/lazy';

@NgModule({
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    LazyModule,
    ProductModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
