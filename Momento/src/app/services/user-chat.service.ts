import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserChatService {

  constructor(
    private http : HttpClient
  ) { }

  readonly uri = 'http://localhost:3000/chats'
  getChats(id:any):Observable<any>{
    return this.http.get(this.uri);
  }
}
