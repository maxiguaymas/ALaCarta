import { Component, OnInit } from '@angular/core';
import { Type } from 'src/app/interfaces/type';
import { PlatosServiceService } from 'src/app/services/platos-service.service';
import { Menu } from 'src/app/interfaces/menu';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  public text: string = "agregar";
  public results_platos:boolean = false
  public selectedType!: string;
  public plato:string = "";
  public platos!: [];
  public sin_resultados: boolean = false;
  
  // menus!: Menu[];
  
  
  types: Type[] = [
    {
      value: 'vegan',
      viewValue: 'Vegano'
    },
    {
        value: 'vegetarian',
        viewValue: 'Vegetariano'
    },
    {
        value: 'primal',
        viewValue: 'Primitivo'
    },
    {
      value: 'cualquiera',
        viewValue: 'cualquiera'
    }
  ];

  constructor(private _platosService: PlatosServiceService) {
    
   }

  ngOnInit(): void {
    if(!localStorage.getItem('menus')){
      this._platosService.initLocalStorage();
    }
   

  }

  onSubmit(){
    if(this.plato.length>2 && this.selectedType){
      this._platosService.obtenerPlatos(this.selectedType,this.plato).subscribe({
        next: response =>{
          if(response.results.length >0){
            this.platos = response.results;
            this.sin_resultados = false;
          }
          else{
            this.platos = [];
            this.sin_resultados = true;
            this.results_platos = false;
          }
          
        },
        error: error =>{
          console.error(error);
        },
      });
      this.selectedType= "";
      this.plato = "";
      this.results_platos = true;
    }
    else{
      Swal.fire({
        title:"debes completar todos los campos.",
        confirmButtonText: 'Aceptar',
      });
    }

  }

  async Num_menu(): Promise<number>{
    let num2: number = 0;
      await Swal.fire({
        title: 'Ingresa a que menu quieres agregar este plato: ',
        confirmButtonText: 'Seleccionar',
        input: 'select',
        inputPlaceholder: 'Menu',
        inputValue: '',
        inputOptions: {
          1: 'Menu 1',
          2: 'Menu 2',
          3: 'Menu 3',
          4: 'Menu 4',
        },
        preConfirm: (value: number) => {
          num2 = value;
        }
      });

    return num2-1;
    
  }


  async agregarPlato(event: any){
    var menus:Menu[] = this._platosService.getDataStorage();
    
    await this.Num_menu().then((value: number) => {
      let i = value;
    
      if(menus[i].platos.length < 4){

        if(event.vegan){
          if(menus[i].veganos < 2){
            menus[i].platos.push(event);
            menus[i].veganos++;
            menus[i].precio_total += event.precio;
            menus[i].healt_score += event.healt_score;
            menus[i].tiempo_promedio += event.tiempo;
            this._platosService.saveDataStorage(menus);
          }
          else Swal.fire({
            title: "El menu ya tiene 2 platos veganos.",
            confirmButtonText: 'Aceptar',
          });
        }
        
        if(!event.vegan){
          if(menus[i].no_veganos < 2){
            menus[i].platos.push(event);
            menus[i].no_veganos++;
            menus[i].precio_total += event.precio;
            menus[i].healt_score += event.healt_score;
            menus[i].tiempo_promedio += event.tiempo;
            this._platosService.saveDataStorage(menus);
          }
          else Swal.fire({
            title: "El menu ya tiene 2 platos no-veganos.",
            confirmButtonText: 'Aceptar',
          });
          
        }

      }
      else{
        Swal.fire({
          title:"el menu ya tiene 4 platos.",
          confirmButtonText: 'Aceptar',
        });
      }
      this._platosService.actualizarMenu.emit(menus);
    });
    
  }

  limpiarBusqueda(){
    this.platos = [];
    this.results_platos = false;
    this.sin_resultados = false;
  }

}
