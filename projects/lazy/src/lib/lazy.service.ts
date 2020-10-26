import {
  Injectable,
  Inject,
  Compiler,
  NgModuleFactory,
  NgModuleRef,
  Injector,
  Type,
  Optional,
  isDevMode,
} from '@angular/core';
import { LazyComponentKeyService, LAZY_COMPONENTS } from './lazy.component';
import { skipWhile, map, take } from 'rxjs/operators';
import { createCustomElement } from '@angular/elements';
import { LAZY_CACHE, LazyState } from './lazy.cache';
import { combineLatest, Observable, of } from 'rxjs';
import { ILazyComponentDef } from './lazy.component.model';
import { LoadComponentResultInterface } from './lazy.service.model';

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
   * @param selectors components selectors
   */
  load(selectors: string[]): Observable<LoadComponentResultInterface[]>;
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
    arg1: string | string[],
    componentType?: Type<any>
  ): Promise<boolean> | Observable<LoadComponentResultInterface[]> {
    if (arg1 instanceof Array) {
      return combineLatest(arg1.map((s) => this.loadComponent(s)));
    } else {
      return this.loadComponent(arg1, componentType);
    }
  }

  /**
   * Load a component from its selector
   * @param selector component selector
   */
  private loadComponent(
    selector: string
  ): Observable<LoadComponentResultInterface>;
  /**
   * Load a component from its selector
   * otherwise load default implementation
   * @param selector component selector
   * @param componentType component type default
   */
  private loadComponent(
    selector: string,
    componentType: Type<any>
  ): Promise<boolean>;
  private loadComponent(
    selector: string,
    componentType?: Type<any>
  ): Promise<boolean> | Observable<LoadComponentResultInterface> {
    if (!LAZY_CACHE.has(selector)) {
      LAZY_CACHE.add(selector, LazyState.loading);
      // find component definition
      const definitions = (this.lazyComponents || []).filter(
        (x) => x.selector === selector
      );
      const lazyDef =
        (this.customSv &&
          definitions.find((c) => c.custom === this.customSv.getCustomKey())) ||
        (definitions.length && definitions[0]);
      if (!lazyDef && componentType) {
        // if component definition is not found
        // but there is a component default type
        // the system load the default type
        this.registerWebComponents(selector, componentType);
        LAZY_CACHE.set(selector, LazyState.loaded);
      } else {
        if (!lazyDef) {
          // if component definition is not found
          // the system set the component in the cache with state notfound
          // we use not found because the component can be a angular components
          // in console we show a warning
          LAZY_CACHE.set(selector, LazyState.notfound);
          if (isDevMode()) {
            console.warn(`component ${selector} not found`);
          }
        } else {
          // if component definition is found
          // the system load th definition
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
    }

    const result = LAZY_CACHE.get(selector).pipe(
      skipWhile((x) => x === LazyState.loading)
    );

    return componentType
      ? result
          .pipe(
            map((x) => x === LazyState.loaded),
            take(1)
          )
          .toPromise()
      : result.pipe(
          map((state) => ({
            selector,
            state,
          }))
        );
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
