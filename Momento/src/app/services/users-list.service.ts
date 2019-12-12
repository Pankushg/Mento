import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  constructor(
    private httpClient : HttpClient,
  ) { }

  readonly usersUri: string = 'http://localhost:3000/users';
  readonly authUsersUri: string = 'http://localhost:3000/users/authRoute';

  getUsers(user):Observable<any>{
    console.log('Fetching users from server');
    console.log(user)  
    return this.httpClient.get<any>(this.usersUri,{params:{id:user._id, username:user.username}});
  }
  
  authenticateUsersRoute(){
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : window.localStorage.getItem('id_token'),
    });
    console.log('userList service');
    console.log(window.localStorage.getItem('username'));
    return this.httpClient.get<any>(this.authUsersUri,{headers: headers});
  }

}
