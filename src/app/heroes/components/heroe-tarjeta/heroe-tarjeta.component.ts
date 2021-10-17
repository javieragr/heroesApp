import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  
})
export class HeroeTarjetaComponent implements OnInit {

  @Input() listadoHeroes: Heroe[]=[];
  @Input() heroe!:Heroe;

  constructor() { }

  ngOnInit(): void {
  }

}
