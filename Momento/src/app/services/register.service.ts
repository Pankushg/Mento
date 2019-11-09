import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient : HttpClient) { }

  readonly uri:string = 'http://localhost:3000/register'

  register(userData):Observable<any>{
    return this.httpClient.post<any>(this.uri,userData)
  }
}
