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

  ngOnInit() {
    this.getInitialPlanet();
    this.initializeRotation();
    this.startOrbit();
  }

  getInitialPlanet() {
    const pName = document.getElementById('planet-name');
    const pColor = document.getElementById('planet-color');
    const pRadius = document.getElementById('planet-radius');

    this.dataFetcher.getFirstPlanet()
      .subscribe(planet => {
          pName.innerText = planet['name'];
          pColor.innerText = planet['color'];
          pRadius.innerText = planet['radius'];
        }
      );
  }

  getNewPlanet() {
    const pName = document.getElementById('planet-name');
    const pColor = document.getElementById('planet-color');
    const pRadius = document.getElementById('planet-radius');
    const pDiv = document.getElementById('planet')

    this.dataFetcher.getRandomPlanet()
      .subscribe(planet => {
          pName.innerText = planet['name'];
          pColor.innerText = planet['color'];
          pRadius.innerText = planet['radius'];
          pDiv.style.backgroundColor = planet['color'].toLowerCase().replace(" ", "");
          pDiv.style.height = planet['radius']+ 'px';
          pDiv.style.width = planet['radius'] + 'px';

        }
      );
  }

  startOrbit() {
    var planetCoords = document.getElementById('planet').getClientRects()[0];
    var sunCoords = document.getElementById('sun').getClientRects()[0];

    var sunX = sunCoords.left;
    var sunY = sunCoords.top;

    var planetX = planetCoords.left;
    var planetY = planetCoords.top;

    var speed = Number(document.getElementById('orbit-speed').value);
    var radians = 0;
    var distance = 300;

    this.orbit = setInterval(doOneFrame, 10);

    function doOneFrame() {
      if(radians < (Math.PI * 2)) {
        radians = (radians + speed);
      } else {
        radians = 0;
      }
      updatePosition()
    }

    function updatePosition() {
      var planet = document.getElementById('planet');
      var xCoord = sunX + Math.cos(radians) * distance;
      var yCoord = sunY + Math.sin(radians) * distance;

      planet.style.left = xCoord + 'px';
      planet.style.top = yCoord + 'px';
    }
  }

  stopOrbit() {
      clearInterval(this.orbit);
  }

  initializeRotation() {
    var planet = document.getElementById('planet');
    var spinSpeed = document.getElementById('spin-speed').value;
    planet.style.animationDuration = (Number(spinSpeed) * 1000) + 'ms';
  }
}
