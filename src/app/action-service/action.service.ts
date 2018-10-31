import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private actionSource: Subject<any> = new Subject();
  private actionObservable = this.actionSource.asObservable();
  constructor() { }
  get action$() {
    return this.actionObservable;
  }
  emit(value) {
    this.actionSource.next(value);
  }
}
