import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataControllerService {

  constructor() { }

  private loggedInUserData: {username:string,id:string};
  private availableUsersData: [{username:string,_id:string}];

  private loggedInUserDataChange: Subject<{username:string,id:string}>= new Subject<{username:string,id:string}>();
  private availableUsersDataChange: Subject<[{username:string,_id:string}]>= new Subject<[{username:string,_id:string}]>();
  
  getLoggedInUserData() : {username:string,id:string}{
    return this.loggedInUserData;
  }
  setLoggedInUserData(loggedInUserData : {username:string,id:string}){
    window.localStorage.setItem("id",loggedInUserData.id);
    window.localStorage.setItem("username",loggedInUserData.username);
    this.loggedInUserDataChange.next(this.loggedInUserData=loggedInUserData);
  }
  
  getAvailableUsersData() : [{username:string,_id:string}]{
    return this.availableUsersData;
  }
  setAvailableUsersData(availableUsersData : [{username:string,_id:string}]){
    this.availableUsersDataChange.next(this.availableUsersData=availableUsersData);
  }
}
