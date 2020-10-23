import { ValueProvider } from '@angular/core';
import {
  LAZY_COMPONENTS,
  ILazyComponentDef,
  createLazyComponentProvider,
} from '@atonspa/lazy';

export const registryProvider = [
  createLazyComponentProvider({
    selector: 'lib-product-web',
    loadChildren: () =>
      import('@atonspa/product').then((mod) => mod.ProductWebModule),
  }),
];
