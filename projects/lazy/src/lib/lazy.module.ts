import { NgModule } from '@angular/core';
import { LazyDirective } from './lazy.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [LazyDirective],
  exports: [LazyDirective]
})
export class LazyModule { }
