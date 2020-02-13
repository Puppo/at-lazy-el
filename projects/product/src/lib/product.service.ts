import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private nameSub = new BehaviorSubject<string>('Luca Del Puppo - Product');

  name$ = this.nameSub.asObservable();

  constructor() {
    console.log('ProductService ctor');
  }

  get name() {
    return this.nameSub.value;
  }

  set name(value: string) {
    this.nameSub.next(value);
  }

}
