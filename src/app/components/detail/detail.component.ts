import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatosServiceService } from 'src/app/services/platos-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  plato:any;

  constructor(private _route: ActivatedRoute,private _platosService: PlatosServiceService) { }

  ngOnInit(): void {
    console.log("oninit detail");
    this._route.queryParams.subscribe((params:any) => {
      console.log(params);
      this._platosService.obtenerPlato(params.id).subscribe({
        next: response =>{
          console.log(response);
          this.plato = response;
          
        },
        error: error =>{
          console.error(error);
        },
        complete: () => console.log("peticion completada")
      });
    });
    
  }

}
