import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  
})
export class AgregarComponent implements OnInit {
  publishers=[
    {
      id:'DC Comics',
      desc:'DC - Comics'

    },
    {
      id:'Marvel Comics',
      desc:'Marvel - Comics'

    }
  ]
  heroe : Heroe={
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher:Publisher.DCComics,
    alt_image:''

  }

  constructor(private heroeService:HeroesService,private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return //validacion para que cuando este agregando uno nuevo y no sea editar no se mande llamar el metodo de get
    }
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=>  this.heroeService.getHeroePorId(id))
    ).subscribe(resp=> this.heroe=resp)
  }

  guardar(){
    if (this.heroe.superhero.trim().length===0) {
      return
    }
    if (this.heroe.id) {
      
      this.heroeService.actualizarHeroe(this.heroe).subscribe(resp=>{
        console.log(resp);
      })

    }else{
      this.heroeService.agregarHeroe(this.heroe).subscribe(resp=>{
        this.router.navigate(['/heroes/editar',resp.id])
      })
    }
    
  }

  eliminar(){

    this.heroeService.borrarHeroe(this.heroe.id!).subscribe(resp=> {
      this.router.navigate(['/heroes/agregar'])

    })
  }

}
