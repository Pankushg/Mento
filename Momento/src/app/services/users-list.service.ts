import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  constructor(private httpClient : HttpClient) { }

  readonly uri = 'http://localhost:3000/users';

  getUsers(user):Observable<any>{
    console.log('Fetching users from server for: '+user);
    return this.httpClient.get<any>(this.uri,user);
  }

}
