import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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

  constructor(private heroeService:HeroesService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private snackBar:MatSnackBar,
    public dialog :MatDialog) { }

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
        this.mostrarSnackBar('Actualice prrooo');
      })

    }else{
      this.heroeService.agregarHeroe(this.heroe).subscribe(resp=>{
        this.mostrarSnackBar('Guarde prrooo');
        this.router.navigate(['/heroes/editar',resp.id])
      })
    }
    
  }

  eliminar(){
   const dialog= this.dialog.open(ConfirmarComponent,{width:'250px',data:this.heroe});
    dialog.afterClosed().subscribe(res=>{
      if (res) {
        this.heroeService.borrarHeroe(this.heroe.id!).subscribe(resp=> {
          this.mostrarSnackBar('Elimine prrooo');
          this.router.navigate(['/heroes/agregar'])
    
        })
      }
    })
    

    
  }

  mostrarSnackBar(mensaje:string){
    this.snackBar.open(mensaje,'ok!',{ duration:2500})
  }

}
