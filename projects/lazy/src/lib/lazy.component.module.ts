import { Type, Inject } from '@angular/core';
import { LazyService } from './lazy.service';

interface ILazyComponentModule {
  selector: string;
  componentType: Type<any>;
}

export class LazyComponentModule {
  constructor(
    lazySv: LazyService,
    config: ILazyComponentModule
  ) {
    lazySv.load(config.selector, config.componentType);
  }

}
