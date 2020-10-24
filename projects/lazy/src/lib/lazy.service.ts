import {
  Injectable,
  Inject,
  Compiler,
  NgModuleFactory,
  NgModuleRef,
  Injector,
  Type,
  Optional,
} from '@angular/core';
import { LazyComponentKeyService, LAZY_COMPONENTS } from './lazy.component';
import { skipWhile, map } from 'rxjs/operators';
import { createCustomElement } from '@angular/elements';
import { LAZY_CACHE, LazyState } from './lazy.cache';
import { Observable } from 'rxjs';
import { ILazyComponentDef } from './lazy.component.model';

@Injectable({
  providedIn: 'root',
})
export class LazyService {
  constructor(
    private compiler: Compiler,
    private injector: Injector,
    @Optional()
    @Inject(LAZY_COMPONENTS)
    protected lazyComponents: ILazyComponentDef[],
    @Optional()
    protected customSv: LazyComponentKeyService
  ) {}

  /**
   * Load web component from LAZY_COMPONENTS definition
   * @param selector component selector
   */
  load(selector: string): Observable<boolean>;
  /**
   * Load web component
   * if LAZY_COMPONENTS contains selector load lazy component
   * else load componentType
   * @param selector component selector
   * @param componentType Component type default
   * @deprecated
   */
  load(selector: string, componentType: Type<any>): Promise<boolean>;
  load(
    selector: string,
    componentType?: Type<any>
  ): Promise<boolean> | Observable<boolean> {
    if (!LAZY_CACHE.has(selector)) {
      LAZY_CACHE.add(selector, LazyState.loading);
      const definitions = (this.lazyComponents || []).filter(
        (x) => x.selector === selector
      );
      const lazyDef =
        (this.customSv &&
          definitions.find((c) => c.custom === this.customSv.getCustomKey())) ||
        (definitions.length && definitions[0]);
      if (!lazyDef && componentType) {
        this.registerWebComponents(selector, componentType);
        LAZY_CACHE.set(selector, LazyState.loaded);
      } else {
        if (!lazyDef) {
          throw new Error(`${selector} component definition not found`);
        }
        this.loadLazyModuleFactory(lazyDef.loadChildren)
          .then((moduleFactory) => this.createModule(moduleFactory))
          .then((moduleRef) => {
            this.registerWebComponents(
              selector,
              moduleRef.instance.components[selector],
              moduleRef.injector
            );
            LAZY_CACHE.set(selector, LazyState.loaded);
          })
          .catch((err) => {
            LAZY_CACHE.set(selector, LazyState.error);
            console.error(err);
          });
      }
    }

    const result = LAZY_CACHE.get(selector).pipe(
      skipWhile((x) => x === LazyState.loading),
      map((x) => x === LazyState.loaded)
    );

    return componentType ? result.toPromise() : result;
  }

  /**
   * Load lazy path
   * @param path Path to load
   */
  private loadLazyModuleFactory(
    path: () => any
  ): Promise<NgModuleFactory<any>> {
    return (path() as Promise<NgModuleFactory<any>>).then(
      (elementModuleOrFactory) => {
        if (elementModuleOrFactory instanceof NgModuleFactory) {
          // if ViewEngine
          return elementModuleOrFactory;
        } else {
          try {
            // if Ivy
            return this.compiler.compileModuleAsync(elementModuleOrFactory);
          } catch (err) {
            throw err;
          }
        }
      }
    );
  }

  /**
   * Return module ref from module factory
   * @param moduleFactory module factory
   */
  private createModule(moduleFactory: NgModuleFactory<any>): NgModuleRef<any> {
    try {
      const elementModuleRef = moduleFactory.create(this.injector);
      return elementModuleRef;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Register component as web components
   * @param selector web component selector
   * @param componentType web component type
   */
  private registerWebComponents(
    selector: string,
    componentType: Type<any>,
    injector: Injector = this.injector
  ) {
    // Convert `componentType` to a custom element.
    const componentElement = createCustomElement(componentType, { injector });
    // Register the custom element with the browser.
    customElements.define(selector, componentElement);
  }
}
