import { Component, OnInit, ChangeDetectionStrategy, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LazyService, LazyModule } from '@atonspa/lazy';
import { RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-product-page',
  templateUrl: './product-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent {

  serviceName$ = this.sv.name$;

  constructor(
    protected sv: ProductService
  ) {}

  changeName() {
    this.sv.name = 'Luca Del Puppo - Product Changed';
  }

}


@NgModule({
  imports: [
    CommonModule,
    LazyModule,
    RouterModule.forChild([
      { path: '', component: ProductPageComponent }
    ])
  ],
  declarations: [ProductPageComponent],
  entryComponents: [ProductPageComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [RouterModule]
})
export class ProductPageModule { }
