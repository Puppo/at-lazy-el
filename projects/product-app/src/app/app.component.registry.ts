import { createLazyComponentProvider } from '@atonspa/lazy';

export const registryProvider = [
  createLazyComponentProvider({
    selector: 'lib-product-web',
    loadChildren: () =>
      import('@atonspa/product/product-web').then(
        (mod) => mod.ProductWebModule
      ),
  }),
];
