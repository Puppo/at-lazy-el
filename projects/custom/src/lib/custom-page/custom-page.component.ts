import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-custom-page',
  templateUrl: './custom-page.component.html',
})
export class CustomPageComponent {}

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: CustomPageComponent }]),
  ],
  declarations: [CustomPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
})
export class CustomPageModule {}
