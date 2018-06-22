import { Component, OnInit } from '@angular/core';
import { DataFetcherService} from '../data-fetcher.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [DataFetcherService]
})
export class SidebarComponent implements OnInit {

  constructor(private dataFetcher: DataFetcherService) { }

  ngOnInit() {
    this.getInitialPlanet();
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

    this.dataFetcher.getRandomPlanet()
      .subscribe(planet => {
          pName.innerText = planet['name'];
          pColor.innerText = planet['color'];
          pRadius.innerText = planet['radius'];
        }
      );
  }
}
