import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// importaciones de angular material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
