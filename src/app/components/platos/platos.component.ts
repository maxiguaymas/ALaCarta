import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { PlatosServiceService } from 'src/app/services/platos-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.css']
})
export class PlatosComponent implements OnInit {
  text: string = "eliminar";
  menus!: Menu[];
  expand : boolean[] = [false,false,false,false];
  constructor(private _platosService:PlatosServiceService) { }

  ngOnInit(): void {
    this.menus = this._platosService.getDataStorage();
    this._platosService.actualizarMenu.subscribe(menus => {
      this.menus = menus;
    })
    

  }

  eliminarPlato(event:any){
    this.menus[event.i].platos.splice(event.ind,1);
    this.menus[event.i].healt_score -= event.healt_score;
    this.menus[event.i].precio_total -= event.precio;
    this.menus[event.i].tiempo_promedio -= event.tiempo;
    if(event.vegan){
      this.menus[event.i].veganos --;
    }
    else{
      this.menus[event.i].no_veganos --;
    }
    this._platosService.saveDataStorage(this.menus);
    this.ngOnInit();
  }
  
  changeExpand(i : number){
    if(this.menus[i].platos.length > 0){
      this.expand[i] = !this.expand[i];
    }
    else{
      Swal.fire({
        title:`El Menu ${i+1} no tiene ningun plato agregado.`,
        confirmButtonText: 'Aceptar',
      });
    }
    
  }

}
