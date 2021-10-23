import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private baseUrl:string =environment.baseUrl;
private _auth:Auth| undefined;

get auth():Auth{
  return {...this._auth!}
}

  constructor(private http:HttpClient) { }

  verificaAutenticacion():Observable<boolean>{
    if (!localStorage.getItem('token')) {
      return of(false)
    }
    return  this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      map(resp=>{
        this._auth=resp;
        return true
      })
    )
  }

login(){
  return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
  .pipe( 
    tap(resp => this._auth=resp),
    tap( resp=> localStorage.setItem('token',this.auth.id))
  )
}

}
