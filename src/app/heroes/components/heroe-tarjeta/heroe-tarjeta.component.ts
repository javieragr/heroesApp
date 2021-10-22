import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles:[`
    mat-card{
      margin-top:20px;
    }
  
  `]
  
})
export class HeroeTarjetaComponent implements OnInit {

  @Input() listadoHeroes: Heroe[]=[];
  @Input() heroe!:Heroe;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe( param => {
      console.log(param)


    })
  }

}
