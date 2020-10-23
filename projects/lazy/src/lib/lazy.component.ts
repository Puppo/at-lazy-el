import { LoadChildrenCallback } from '@angular/router';
import { InjectionToken, ValueProvider } from '@angular/core';

export interface ILazyComponentDef {
  selector: string;
  loadChildren: LoadChildrenCallback;
  custom?: boolean;
}

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
