import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { DepartamentoModelo } from 'src/app/modelos/departamento.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { DepartamentoService } from 'src/app/servicios/departamento.service';
import { PersonaService } from 'src/app/servicios/persona.service';

declare var IniciarSelect: any;
@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {

listaDepartamentos: DepartamentoModelo[] = [];
listaCiudades: CiudadModelo[] = [];
nombreImagenTemp: String = "Sin imagen";

fgValidador: FormGroup = new FormGroup({});

  constructor(
    private servicioDepartamentos: DepartamentoService,
    private servicioCiudad: CiudadService,
    private fb: FormBuilder,
    private servicioPersona: PersonaService) { }

  ngOnInit(): void {
    this.cargarDepartamentos();
    this.fgValidador = this.fb.group({
      deptoId: ['', []],
      ciudadId: ['', [Validators.required]],
      imagen:['', []],
      nombreImagen:[Validators.required]
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

  CuandoSeleccionanArchivo(event:any){
    if(event.target.files.length > 0){
      let archivo = event.target.files[0];
      this.fgValidador.controls.imagen.setValue(archivo);
    }else{
      console.log("Se ha cancelado la selecciónd e archivo");
    }
  }

  CargarImagenAlServidor(){
    let formData = new FormData();
    formData.append('file', this.fgValidador.controls.imagen.value);
    this.servicioPersona.CargarArchivo(formData).subscribe(
      (datos) =>{
        this.nombreImagenTemp = datos.filename;
        this.fgValidador.controls.nombreImagen.setValue(datos.filename);
      },
      (error) => {
        alert("Se ha producido un error al cargar el archivo.");
      }
    );
  }

}
