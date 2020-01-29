import { Directive, ViewContainerRef, OnInit, TemplateRef } from '@angular/core';
import { LAZY_CACHE, LazyState } from './lazy.cache';
import { take, tap, skipWhile } from 'rxjs/operators';

@Directive({
  selector: '[libLazyEl]'
})
export class LazyDirective implements OnInit {

  constructor(
    private vcr: ViewContainerRef,
    private template: TemplateRef<any>
  ) { }

  ngOnInit() {
    const template = this.template.createEmbeddedView({});
    const nodeTag: string = template.rootNodes[0].tagName.toLowerCase();
    LAZY_CACHE.get(nodeTag).pipe(
      skipWhile(x => x === LazyState.loading),
      take(1),
      tap(state => {
        if (state === LazyState.loaded) {
          this.vcr.clear();
          this.vcr.createEmbeddedView(this.template);
        }

      })
    ).subscribe();
  }

}
