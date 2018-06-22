import { Component, OnInit } from '@angular/core';
import { Planet } from '../planet';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  planet: Planet = {
    orbitSpeed: 1,
    spinSpeed:  1,
    name: 'name',
    radius: 5,
    color: 'color'
  };
  constructor() {}

  ngOnInit() {
  }


}
