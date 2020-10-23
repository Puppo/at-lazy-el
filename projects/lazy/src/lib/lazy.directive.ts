import {
  Directive,
  ViewContainerRef,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { LAZY_CACHE, LazyState } from './lazy.cache';
import { take, tap, skipWhile, catchError } from 'rxjs/operators';
import { LazyService } from './lazy.service';
import { from } from 'rxjs';

@Directive({
  selector: '[libLazyEl]',
})
export class LazyDirective implements OnInit {
  constructor(
    private vcr: ViewContainerRef,
    private template: TemplateRef<any>,
    private lazySv: LazyService
  ) {}

  ngOnInit() {
    const template = this.template.createEmbeddedView({});
    const nodeTag: string = template.rootNodes[0].tagName.toLowerCase();
    this.vcr.clear();
    this.lazySv
      .load(nodeTag)
      .pipe(
        tap((res) => {
          if (res) {
            this.vcr.createEmbeddedView(this.template);
          } else {
            console.error(`Problem load ${nodeTag} components`);
          }
        }),
        catchError((ex) => {
          console.error(ex);
          throw ex;
        })
      )
      .subscribe();
  }
}
