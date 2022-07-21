import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  continuar: boolean = false;
  menus!: boolean;
  constructor() {
    
  }

  ngOnInit(): void {
    if(!localStorage.getItem('menus')){
      this.menus = false;
    }
    else{
      this.menus= true;
      this.continuar= true;
    }
  }

  

}
