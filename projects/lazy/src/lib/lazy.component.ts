import { InjectionToken, ValueProvider } from '@angular/core';
import { ILazyComponentDef } from './lazy.component.model';

export const LAZY_COMPONENTS = new InjectionToken<ILazyComponentDef[]>(
  'LAZY_COMPONENTS'
);

export function createLazyComponentProvider(
  def: ILazyComponentDef
): ValueProvider {
  return {
    provide: LAZY_COMPONENTS,
    useValue: def,
    multi: true,
  };
}

export abstract class LazyComponentKeyService {
  abstract getCustomKey(): string;
}
