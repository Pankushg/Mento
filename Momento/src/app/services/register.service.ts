import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient : HttpClient) { }

  readonly loginUri:string = 'http://localhost:3000/register';

  register(userData):Observable<any>{
    return this.httpClient.post<any>(this.loginUri,userData)
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('username', user.username);
    localStorage.setItem('id', user._id);
  }

  logout(){
    localStorage.clear();
  }
}
