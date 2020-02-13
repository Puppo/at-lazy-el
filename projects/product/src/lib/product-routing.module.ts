import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductModule } from './product/product.component';
import { ProductPageModule } from './product-page/product-page.component';

export function loadProductRoute() {
  return ProductModule;
}

export function loadProductPageRoute() {
  return ProductPageModule;
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: loadProductRoute
      },
      {
        path: 'product-page',
        loadChildren: loadProductPageRoute
      }
    ])
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
