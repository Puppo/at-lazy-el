
import { LoadChildrenCallback } from '@angular/router';
import { InjectionToken } from '@angular/core';

export interface ILazyComponentDef {
  selector: string;
  loadChildren: LoadChildrenCallback;
}

export const LAZY_COMPONENTS = new InjectionToken<ILazyComponentDef>('LAZY_COMPONENTS');
