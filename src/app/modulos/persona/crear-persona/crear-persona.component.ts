import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { DepartamentoModelo } from 'src/app/modelos/departamento.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { DepartamentoService } from 'src/app/servicios/departamento.service';

declare var IniciarSelect: any;
@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {

listaDepartamentos: DepartamentoModelo[] = [];
listaCiudades: CiudadModelo[] = [];

fgValidador: FormGroup = new FormGroup({});

  constructor(
    private servicioDepartamentos: DepartamentoService,
    private servicioCiudad: CiudadService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cargarDepartamentos();
    this.fgValidador = this.fb.group({
      deptoId: ['', []],
      ciudadId: ['', []]
    });
  }

  cargarDepartamentos(){
    
    this.servicioDepartamentos.ListarRegistros().subscribe(
      (datos) => {
        this.listaDepartamentos = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
      }
    );
  }

  cargarCiudadesPorDepartamento(){
    this.servicioCiudad.BuscarRegistrosPorDepartamento(this.fgValidador.controls.deptoId.value).subscribe(
      (datos) => {
        this.listaCiudades = datos;
        setTimeout(() => {
          IniciarSelect();
        }, 500);
      }
    );
  }

}
