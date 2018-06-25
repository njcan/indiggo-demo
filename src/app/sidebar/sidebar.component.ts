import { Component, OnInit } from '@angular/core';
import { DataFetcherService} from '../data-fetcher.service';
import { PlanetService } from '../planet.service';
import { Planet } from '../planet';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [DataFetcherService]
})
export class SidebarComponent implements OnInit {

  constructor(private dataFetcher: DataFetcherService, private planetControls: PlanetService) { }
  spinError = false;
  orbitError = false;
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
    this.speed = (<HTMLInputElement>document.getElementById('orbit-speed')).value;
    this.planetName = document.getElementById('planet-name');
    this.planetRadius = document.getElementById('planet-radius');
    this.planetColor = document.getElementById('planet-color');
    this.isOrbiting =  false;
    this.radians = 0;
    this.startRotation();
    this.getInitialPlanet();
    this.startOrbit(5);
  }

  /*
    function: getInitialPlanet()
    inputs: none
    outputs: none
    purpose: This function calls the getFirstPlanet() method from the data fetcher service,
             which will poke the backend server for the first planet's data. We then update our
             sidebar with the information from the server
   */
  getInitialPlanet() {
    this.dataFetcher.getFirstPlanet()
      .subscribe(planet => {
          this.planetName.innerText = planet['name'];
          this.planetColor.innerText = planet['color'];
          this.planetRadius.innerText = planet['radius'];
        }
      );
  }

  /*
  function: getNewPlanet()
  inputs: none
  outputs: none
  purpose: This function calls the getNewPlanet() method from the data fetcher service,
           which will poke the backend server for a random planet. We then update our sidebar
           with information from the server as well as the planet's new radius and color
 */
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

  /*
  function: startOrbit(speed)
  inputs: speed
  outputs: none
  purpose: This function starts the orbit of the planet and performs orbital calculations
 */
  startOrbit(speed: number) {

    // If we are not orbiting..
    if(!this.isOrbiting) {
      this.isOrbiting = true; // Set orbiting to true
    } else {
      return; // Else we are already orbiting, return to avoid a new orbit
    }

    // Declare variables to hold rectangle coordinates for both the planet and sun
    var planetCoords = this.planet.getClientRects()[0];
    var sunCoords = document.getElementById('sun').getClientRects()[0];

    // Declare variabes to hold the sun's (x,y) coordinate
    var sunX = sunCoords.left;
    var sunY = sunCoords.top;

    // Declare variabes to hold the planet's (x,y) coordinate
    var planetX = planetCoords.left;
    var planetY = planetCoords.top;

    // Declare variables to hold the distance between the sun and planet
    var distance = 150;

    // If speed is null from updating the orbit, look to the new value set
    if(speed === null) {
      speed = Number(this.speed) / 1000;
    }
    else {
      speed = Number(speed) / 1000;
    }

    // Orbiting animation control - process one frame 100 times a second for a smooth animation
    this.orbit = setInterval(doOneFrame, 10);

    /*
      function: doOneFrame()
      inputs: none
      outputs: none
      purpose: This function processes one frame of the animation and updates the planet's position
    */
    function doOneFrame() {

      // 360 degrees in a circle or 2π for a full revolution
      // If the radians doesn't exceed 2π...
      if(this.radians < (Math.PI * 2)) {
        this.radians += speed; // Continue to add speed to radians
      } else {
        this.radians = 0; // Else reset them as we have made 1 revolution
      }
      // Update our planet's position
      updatePosition(this);
    }

    /*
      function: updatePosition(self)
      inputs: this (itself)
      outputs: none
      purpose: This function calculates the new position of the planet after updating the radian value
    */
    function updatePosition(self) {
      var xCoord = sunX + Math.cos(self.radians) * distance; // x-coordinate calculation using angle and distance
      var yCoord = sunY + Math.sin(self.radians) * distance; // y-coordinate calculation using angle and distance
      self.planet.style.left = xCoord + 'px'; // Update x coordinate css
      self.planet.style.top = yCoord + 'px'; // Update y coordinate css
    }
  }

  /*
    function: stopOrbit()
    inputs: none
    outputs: none
    purpose: This function stops the orbit by clearing the interval that executes our animation
  */
  stopOrbit() {
    this.isOrbiting = false; // Set the orbit variable to false
    clearInterval(this.orbit); // Stop the orbit animation
  }

  /*
    function: updatePosition(self)
    inputs: this (itself)
    outputs: none
    purpose: This function kicks off the planet rotation animation
  */
  startRotation() {
    var speed = (<HTMLInputElement>document.getElementById('spin-speed')).value; // Get the initial value from the spin-speed input
    this.planet.style.animationDuration = (Number(speed) * 1000) + 'ms'; // Update the animation duration
  }

  /*
    function: updateRotationSpeed(value)
    inputs: value from input box
    outputs: none
    purpose: This function updates the rotation speed of the planet and handles validation
  */
  updateRotationSpeed(value: number) {

    // Declare variable that represent the input form
    var inputBox = document.getElementById('spin-speed');

    // If the value is not valid
    if(isNaN(Number(value)) || Number(value) < 0 || String(value) === '') {
      inputBox.style.border = '2px solid red'; // Change input box to red border
      this.planet.style.animationDuration = '0ms'; // Stop the animation
      this.spinError = true;
      // If the input is valid
    } else {
      inputBox.style.border = '2px solid silver'; // Update the input box to represent valid input
      this.planet.style.animationDuration = (Number(value) * 1000) + 'ms'; // Update the animation to the new speed
      this.spinError = false;
    }
  }

  /*
    function: updateOrbitSpeed(value)
    inputs: value from input box
    outputs: none
    purpose: This function updates the planet's orbit speed
  */
  updateOrbitSpeed(value: number) {

    // Declare variable for input form
    var inputBox = document.getElementById('orbit-speed');
    var error = document.getElementById('error-orbit');

    // Coerce input to number
    this.speed = Number(value);

    // If the value is blank or not a number
    if(isNaN(Number(value)) || String(value) === '') {
      inputBox.style.border = '2px solid red'; // Set input box to red
      this.orbitError = true; // Update the class variable to turn on the directive
      this.stopOrbit(); // Stop the orbit

      // If the value is valid
    } else {
      this.stopOrbit(); // Stop the orbit
      this.startOrbit(value); // Restart the orbit with the new value
      inputBox.style.border = '2px solid silver'; // Update the input box to represent valid input
      this.orbitError = false; // Update the class variable to turn off the directive
    }
  }

  /*
    function: resize(event)
    inputs: resize event
    outputs: none
    purpose: This function listens for a resize event and acts accordingly
  */
  resize(event: any) {
    this.updateSunCoordinates();
    this.stopOrbit()
    setTimeout(this.startOrbit(null), 2000);
  }

  /*
    function: updateSunCoordiantes()
    inputs: none
    outputs: none
    purpose: This function updates the sun's coordinates
  */
  updateSunCoordinates() {
    const sun = document.getElementById('sun');
    sun.style.left = '60%';
    sun.style.top = '50%';
  }
}
