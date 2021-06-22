import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { Tile } from '../tile';
import { Service } from '../service';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.css']
})
export class TilesComponent implements OnInit {
  tiles?: Tile[];
  interval: any;
  t: any;
  id: any;
  gameNavigation: any;
  gameArea: any;
  gameOver: any;
  startButton: any;
  

  constructor(private service: Service) { }

  ngOnInit(): void {
    //document.addEventListener("keyup", this.changeDirection);
    this.gameNavigation = document.getElementById("gameNavigation");
    this.gameArea = document.getElementById("gameArea");
    this.gameOver = document.getElementById("gameOver");
    this.startButton = document.getElementById("startButton");
  }

  onPressButton() {
    this.service.getUserId().subscribe(id => this.id = id);

    this.gameArea.classList.remove("hide");
    this.gameOver.classList.remove("hide");
    this.gameNavigation.classList.add("hide");

    this.interval = setInterval(() => {
      this.update();
    }, 1000);
  }

  update() {
    console.log(this.id);
    this.service.getTiles(this.id).subscribe(tiles => this.t = tiles);

    console.log(this.tiles);

    if (this.t === undefined) return;

    if (this.t === null) {
        this.gameArea.classList.add("hide");
        this.gameNavigation.classList.remove("hide");
        clearInterval(this.interval);
    } else {
      this.tiles = this.t.slice();
      if (this.tiles != null) {
        for (var i = 0; i < 441; i++) {
          var x = i % 21;
          var y = (i - i % 21) / 21;
          var id = "x" + x.toString() + "y" + y.toString();
          var docTile = document.getElementById(id);
          if (docTile != null) {
            if (this.tiles[i] != null) {
              if (this.tiles[i].currentPlayer != null) {
                docTile.style.backgroundColor = this.tiles[i].currentPlayerColor;
                docTile.classList.remove("abroad");
                docTile.classList.add("player");
              } else {
                docTile.style.backgroundColor = this.tiles[i].color;
                docTile.classList.remove("abroad");
                docTile.classList.remove("player");
              }
            } else {
              docTile.classList.add("abroad");
              docTile.classList.remove("player");
            }
          }  
        }
      }
    }
  }

  changeDirection(event: KeyboardEvent) {
    //event.preventDefault();
    switch (event.key) {
      case "ArrowUp":
        console.log('keyUP');
        this.service.setDirection(this.id, 'UP');
        break;
      case "w":
        console.log('keyUP');
        this.service.setDirection(this.id, 'UP');
        break;
      case "ArrowLeft":
        console.log('keyLEFT');
        this.service.setDirection(this.id, 'LEFT');
        break;
      case "a":
        console.log('keyLEFT');
        this.service.setDirection(this.id, 'LEFT');
        break;
      case "ArrowRight":
        console.log('keyRIGHT');
        this.service.setDirection(this.id, 'RIGHT');
        break;
      case "d":
        console.log('keyRIGHT');
        this.service.setDirection(this.id, 'RIGHT');
        break;
      case "ArrowDown":
        console.log('keyDOWN');
        this.service.setDirection(this.id, 'DOWN');
        break;
      case "s":
        console.log('keyDOWN');
        this.service.setDirection(this.id, 'DOWN');
        break;
      default: break;
    }
  }

  onKeyDownUp() {
    console.log('keyUP');
    this.service.setDirection(this.id, 'UP');
  }

  onKeyDownLeft() {
    console.log('keyLEFT');
    this.service.setDirection(this.id, 'LEFT');
  }

  onKeyDownRight() {
    console.log('keyRIGHT');
    this.service.setDirection(this.id, 'RIGHT');
  }

  onKeyDownDown() {
    console.log('keyDOWN');
    this.service.setDirection(this.id, 'DOWN');
  }

}
