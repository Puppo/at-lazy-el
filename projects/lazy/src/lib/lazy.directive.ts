import {
  Directive,
  ViewContainerRef,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { tap, catchError, take } from 'rxjs/operators';
import { LazyState } from './lazy.cache';
import { LazyService } from './lazy.service';

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
    const nodeTags: string[] = this.getCustomElementsSelectors();
    this.lazySv
      .load(nodeTags)
      .pipe(
        take(1),
        tap((res) => {
          const notLoadedComponents =
            res && res.filter((c) => c.state === LazyState.error);
          if (notLoadedComponents && notLoadedComponents.length === 0) {
            this.vcr.clear();
            this.vcr.createEmbeddedView(this.template);
          } else {
            console.error(
              `Problem to load components ${notLoadedComponents
                .map((c) => c.selector)
                .join(', ')}`
            );
          }
        }),
        catchError((ex) => {
          console.error(ex);
          throw ex;
        })
      )
      .subscribe();
  }

  private getCustomElementsSelectors() {
    const template = this.template.createEmbeddedView({});
    const nodeTags: string[] = [template.rootNodes[0].tagName.toLowerCase()];
    if (template.rootNodes[0].children.length > 0) {
      // we probably have a container with elements in it, so try to load all of them
      // lazily
      nodeTags.push(
        ...[...template.rootNodes[0].children].map((x) =>
          x.tagName.toLowerCase()
        )
      );
    }
    return nodeTags.filter((selector) => selector.split('-').length > 1);
  }
}
