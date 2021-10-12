import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/entities/cliente.models';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {
  entity : Cliente = new Cliente();
  
  constructor(private clienteService:ClienteService) { }
  
   save (){
     let  tosave : Cliente = new Cliente();
      if (this.entity) {
         Object.assign(tosave, this.entity);
         this.clienteService.save(tosave).toPromise().then(resp=>{
          console.log(resp);
          alert('Guarde')
          
         })
         .catch(err=>{
          console.log(err);
          alert('fallo')
          
         })
         
         
      }
    
      
   }
  updateName(){


  }

  ngOnInit(): void {

  }

}
