import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { ImagenPersonaModelo } from '../modelos/imagen.persona.modelo';
import { PersonaModelo } from '../modelos/persona.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<PersonaModelo[]> {
    return this.http.get<PersonaModelo[]>(`${this.url}/persona`);
  }


  BuscarRegistro(id: number): Observable<PersonaModelo> {
    return this.http.get<PersonaModelo>(`${this.url}/persona/${id}`);
  }

  AlmacenarRegistro(modelo: PersonaModelo): Observable<PersonaModelo> {
    return this.http.post<PersonaModelo>(
      `${this.url}/persona`,
      {
        nombre: modelo.primer_nombre
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
  }


  ModificarRegistro(modelo: PersonaModelo): Observable<PersonaModelo> {
    return this.http.put<PersonaModelo>(
      `${this.url}/persona/${modelo.id}`,
      {
        nombre: modelo.primer_nombre
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<PersonaModelo> {
    return this.http.delete<PersonaModelo>(
      `${this.url}/persona/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
  }


  CargarArchivo(formData: FormData): Observable<ImagenPersonaModelo> {
    return this.http.post<ImagenPersonaModelo>(
      `${this.url}/CargarImagenPersona`,
      formData,
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
  }

}
