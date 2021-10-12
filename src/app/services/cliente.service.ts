import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cliente } from '../entities/cliente.models';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url :string = environment.clienteService;

  constructor( private http:HttpClient ) { }

  save=(cliente:Cliente)=>{
   return this.http.post<Cliente>(this.url + '/cliente',cliente).pipe(map(resp=>{
       console.log(resp);
       return resp;
     }
   ))
    


  }

}
