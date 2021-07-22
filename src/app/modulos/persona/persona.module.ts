import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaRoutingModule } from './persona-routing.module';
import { CrearPersonaComponent } from './crear-persona/crear-persona.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearPersonaComponent
  ],
  imports: [
    CommonModule,
    PersonaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PersonaModule { }
