import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {

  public afterViewInitSubject = new Subject<any>();

  constructor() { }
}
