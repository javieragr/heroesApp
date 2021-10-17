import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/entities/cliente.models';
import { ClienteService } from 'src/app/services/cliente.service';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles:[
    `
    mat-card{
      margin-top:20px
    }
    `
  ]
})
export class ListadoComponent implements OnInit {
  entity : Cliente = new Cliente();
   heroes : Heroe[] =[] ;
  
  constructor(private clienteService:ClienteService,private heroesService:HeroesService) { }
  
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

    this.heroesService.getHeroes().subscribe(resp=> {
      this.heroes=resp;

    })
  }

}
