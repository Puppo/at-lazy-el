import { NgModule } from '@angular/core';
import { LazyDirective } from './lazy.directive';

@NgModule({
  declarations: [LazyDirective],
  exports: [LazyDirective]
})
export class LazyModule { }
