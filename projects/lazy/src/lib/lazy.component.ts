import { LoadChildrenCallback } from '@angular/router';
import { Injectable, InjectionToken, ValueProvider } from '@angular/core';

export interface ILazyComponentDef {
  selector: string;
  loadChildren: LoadChildrenCallback;
  custom?: string;
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

@Injectable()
export abstract class LazyComponentKeyService {
  abstract getCustomKey(): string;
}
