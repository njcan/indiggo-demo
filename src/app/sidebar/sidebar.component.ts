import { Component, OnInit } from '@angular/core';
import { DataFetcherService} from '../data-fetcher.service';
import { PlanetService } from '../planet.service';
import { Planet } from '../planet';
import {applySourceSpanToExpressionIfNeeded} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [DataFetcherService]
})
export class SidebarComponent implements OnInit {

  constructor(private dataFetcher: DataFetcherService, private planetControls: PlanetService) { }
  private orbit;
  private speed;
  private radians;
  private planet;
  private planetName;
  private planetRadius;
  private planetColor;
  private isOrbiting = false;

  ngOnInit() {
    this.planet = document.getElementById('planet');
    this.speed = document.getElementById('orbit-speed').value;
    this.planetName = document.getElementById('planet-name');
    this.planetRadius = document.getElementById('planet-radius');
    this.planetColor = document.getElementById('planet-color');
    this.isOrbiting =  false;
    this.radians = 0;
    this.startRotation();
    this.getInitialPlanet();
    this.startOrbit(.01);
  }

  getInitialPlanet() {
    this.dataFetcher.getFirstPlanet()
      .subscribe(planet => {
          this.planetName.innerText = planet['name'];
          this.planetColor.innerText = planet['color'];
          this.planetRadius.innerText = planet['radius'];
        }
      );
  }

  getNewPlanet() {
    this.dataFetcher.getRandomPlanet()
      .subscribe(planet => {
          this.planetName.innerText = planet['name'];
          this.planetColor.innerText = planet['color'];
          this.planetRadius.innerText = planet['radius'];
          this.planet.style.backgroundColor = planet['color'].toLowerCase().replace(" ", "");
          this.planet.style.height = planet['radius']+ 'px';
          this.planet.style.width = planet['radius'] + 'px';
        }
      );
  }

  startOrbit(speed: number) {

    if(!this.isOrbiting) {
      this.isOrbiting = true;
    } else {
      return;
    }

    var planetCoords = this.planet.getClientRects()[0];
    var sunCoords = document.getElementById('sun').getClientRects()[0];

    var sunX = sunCoords.left;
    var sunY = sunCoords.top;

    var planetX = planetCoords.left;
    var planetY = planetCoords.top;

    var distance = 300;

    if(speed === null) {
      speed = Number(this.speed);
    } else {
      speed = Number(speed);
    }

    this.orbit = setInterval(doOneFrame, 10);

    function doOneFrame() {
      if(this.radians < (Math.PI * 2)) {
        this.radians += speed;
      } else {
        this.radians = 0;
      }
      updatePosition(this)
    }

    function updatePosition(self) {
      var xCoord = sunX + Math.cos(self.radians) * distance;
      var yCoord = sunY + Math.sin(self.radians) * distance;
      self.planet.style.left = xCoord + 'px';
      self.planet.style.top = yCoord + 'px';
    }
  }

  stopOrbit() {
    this.isOrbiting = false;
    clearInterval(this.orbit);
  }

  startRotation() {
    var planet = document.getElementById('planet');
    var speed = document.getElementById('spin-speed').value;
    planet.style.animationDuration = (Number(speed) * 1000) + 'ms';
  }

  updateRotationSpeed(value: number) {
    var inputBox = document.getElementById('spin-speed');

    if(isNaN(Number(value)) || Number(value) < 0) {
      inputBox.style.border = '2px solid red';
      this.planet.style.animationDuration = '0ms';

    } else {
      inputBox.style.border = '2px solid grey';
      this.planet.style.animationDuration = (Number(value) * 1000) + 'ms';
    }
  }

  updateOrbitSpeed(value: number) {
    var inputBox = document.getElementById('orbit-speed');
    this.speed = Number(value);
    if(isNaN(Number(value))) {
      inputBox.style.border = '2px solid red';
      clearInterval(this.orbit);
    } else {
      clearInterval(this.orbit);
      this.startOrbit(value)
    }
  }

}
