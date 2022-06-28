import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  constructor() { }

  private user = new BehaviorSubject<any>('');
   castUser = this.user.asObservable();
   
   editUser(newUser: any){
     this.user.next(newUser); 
   }
}
