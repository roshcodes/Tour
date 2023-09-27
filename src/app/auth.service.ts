import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable()
export class AuthService 
{

  private _loginUrl:string = "http://localhost:3000/api/login";

  constructor(private http: HttpClient,
              private _router: Router) { }

  loginUser(user:any):any {
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser():any {
    localStorage.removeItem('token')
    this._router.navigate(['/events'])
  }

  getToken():any {
    return localStorage.getItem('token')
  }

  loggedIn():any {
    return !!localStorage.getItem('token')    
  }
}
