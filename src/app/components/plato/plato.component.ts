import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';
import { PlatosServiceService } from 'src/app/services/platos-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit {
  
  data: any;
  @Input() i_menu!: number;
  @Input() ind_platos!: number;
  @Input() plato!: any;
  @Input() agregar_eliminar!: string;
  @Output() enviar_plato: EventEmitter<any> = new EventEmitter();
  
  
  constructor(private _router: Router,private _platosService:PlatosServiceService) { }

  ngOnInit(): void {
  }

  details(){
    window.open('/detalles/?id='+this.plato.id, '_blank');
  }

  agregar(){
    
    this.tipoPlato();
    
  }

  eliminar(){
    Swal.fire({
      title: 'Seguro que quieres eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        let menus:Menu[] = this._platosService.getDataStorage();
        this.data = {
          plato: menus[this.i_menu].platos[this.ind_platos].plato,
          vegan: menus[this.i_menu].platos[this.ind_platos].vegan,
          precio: menus[this.i_menu].platos[this.ind_platos].precio,
          tiempo: menus[this.i_menu].platos[this.ind_platos].tiempo,
          healt_score: menus[this.i_menu].platos[this.ind_platos].healt_score,
          i: this.i_menu,
          ind: this.ind_platos
        }
        this.enviar_plato.emit(this.data);
        Swal.fire(
          'Eliminado!',
        )
      }
    })
    
  }

  tipoPlato(){
    
    this._platosService.obtenerPlato(this.plato.id).pipe(finalize(() => this.enviar_plato.emit(this.data))).subscribe({
       next: (response:any): void =>{
        
        this.data = {
          plato: this.plato,
          vegan: response.vegan,
          precio: response.pricePerServing,
          tiempo: response.readyInMinutes,
          healt_score: response.healthScore,
          i: this.i_menu,
          ind: this.ind_platos
        }
        
      },
      error: (error:any) =>{
        console.error(error);
      },
      complete: () => console.log("peticion completada")
    });
   
  }


}


