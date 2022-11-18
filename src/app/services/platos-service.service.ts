import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, lastValueFrom} from 'rxjs';
import { Menu } from '../interfaces/menu';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatosServiceService {
  @Output() actualizarMenu: EventEmitter<Menu[]> = new EventEmitter();

  constructor(private http: HttpClient) { }

  obtenerPlatos(tipo:string, search: string): Observable<any>{
    let params : HttpParams=  new HttpParams().set('number',8);
    if(tipo !== 'cualquiera'){
      params = params.append('diet',tipo);
    }

    if(search.length>2){
      console.log("entro a search");
      params = params.append('query',search);
    }
  
    return this.http.get(environment.endpoints + "complexSearch?"+environment.apikey,{params: params});
  }

   obtenerPlato(id: number): Observable<any>{
    return this.http.get(environment.endpoints +id +"/information?" + environment.apikey)
  }

  // metodos para obtener y mandar info al Local Storage
  initLocalStorage(){
    let menu: Menu = {
      precio_total: 0,
      tiempo_promedio: 0,
      healt_score: 0,
      veganos: 0,
      no_veganos: 0,
      platos: []
    };
    let menus: Menu[] = [menu,menu,menu,menu];
    localStorage.setItem('menus',JSON.stringify(menus));
  }

  getDataStorage(){
    let menus: Menu[] = JSON.parse(localStorage.getItem('menus')!);
    return menus;
  }

  saveDataStorage(menus: Menu[]){
    localStorage.setItem('menus',JSON.stringify(menus));
  }

  // comunicamos componentes hermanos (componente buscador con componente platos)

  
  
}
