import { LoadChildrenCallback } from '@angular/router';

export interface ILazyComponentDef {
  selector: string;
  loadChildren: LoadChildrenCallback;
  custom?: string;
}
