import { Component, OnInit } from '@angular/core';
import { Type } from 'src/app/interfaces/type';
import { PlatosServiceService } from 'src/app/services/platos-service.service';
import { Menu } from 'src/app/interfaces/menu';


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
      console.log(this.plato,this.selectedType);
      this._platosService.obtenerPlatos(this.selectedType,this.plato).subscribe({
        next: response =>{
          console.log(response);
          if(response.results.length >0){
            this.platos = response.results;
            this.sin_resultados = false;
          }
          else{
            this.platos = [];
            this.sin_resultados = true;
          }
          
        },
        error: error =>{
          console.error(error);
        },
        complete: () => console.log("peticion completada")
      });
      this.selectedType= "";
      this.plato = "";
      this.results_platos = true;
    }
    else{
      alert("debes completar todos los campos.");
    }

  }
  Num_menu(): number{
    let num = prompt('ingresa a que menu quieres agregar este plato: ');
    
    if(parseInt(num!) >0 && parseInt(num!) < 5) {
      return parseInt(num!)-1;
    }
    else{
      alert("Solo existe Menu 1,2,3 y 4, ingrese correctamente el numero.");
      return this.Num_menu();
    }
    
  }


  agregarPlato(event: any){
    var menus:Menu[] = this._platosService.getDataStorage();
    let i = this.Num_menu();
    console.log(event);
    
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
        else alert("El menu ya tiene 2 platos veganos.");
        
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
        else alert("El menu ya tiene 2 platos no-veganos.");
        
      }

    }
    else{
      alert("el menu ya tiene 4 platos.");
    }
    console.log(menus);
    this._platosService.actualizarMenu.emit(menus);
  }

}
