import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserChatService {

  constructor(
    private httpClient : HttpClient
  ) { }

  readonly chatsUri: string = 'http://localhost:3000/chats';
  readonly authUsersUri: string = 'http://localhost:3000/chats/authRoute';

  getChats(id:any):Observable<any>{
    return this.httpClient.get(this.chatsUri);
  }

  authenticateChatsRoute(){
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : window.localStorage.getItem('id_token'),
    });
    console.log('chat service');
    console.log(window.localStorage.getItem('username'));
    return this.httpClient.get<any>(this.authUsersUri,{headers: headers});
  }
}
