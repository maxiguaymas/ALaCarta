import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { BuscadorComponent } from 'src/app/components/buscador/buscador.component';
import { PlatoComponent } from 'src/app/components/plato/plato.component';
import { PlatosComponent } from 'src/app/components/platos/platos.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from 'src/app/components/detail/detail.component';
import { DetailPageComponent } from '../detail-page/detail-page.component';


@NgModule({
  declarations: [
    HomePageComponent,
    PlatoComponent,
    PlatosComponent,
    HeaderComponent,
    BuscadorComponent,
    DetailComponent,
    DetailPageComponent,

  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MaterialModule,
    FormsModule,
    
  ]
})
export class HomePageModule { }
