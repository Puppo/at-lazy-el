import { Injectable } from '@angular/core';
import { LazyComponentKeyService } from '@atonspa/lazy';

export const CUSTOM_KEY = 'custom';

@Injectable({
  providedIn: 'root',
})
export class AppComponentKeyService extends LazyComponentKeyService {
  getCustomKey(): string {
    return CUSTOM_KEY;
  }
}
