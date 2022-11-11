import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as uuid from 'uuid';
import { EnderecoModel } from '../crud/Models/Endereco.model';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../crud/Models/usuario.models';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  edit(crud: UsuarioModel) {
    throw new Error('Method not implemented.');
  }
  editar(crud: UsuarioModel) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  cadastrar(crud: UsuarioModel) {
    crud.id = uuid.v4();

    let cruds:UsuarioModel[] = this.listar();
    cruds.push(crud);

    localStorage.setItem('cruds', JSON.stringify(cruds));
  }
  atualizar(crud: UsuarioModel) {
    let cruds:UsuarioModel[] = this.listar();

    cruds.forEach((c,i,cruds)=>{
      if(crud.id === c.id){
        cruds[i] = crud;
      }
    })
    localStorage.setItem('cruds', JSON.stringify(cruds))
  }

  getCrudById(id:string){
    const cruds: UsuarioModel[] = this.listar();
    let crud!:UsuarioModel;
      for(let i = 0 ; i<cruds.length; i++){
        if(cruds[i].id === id) crud = cruds[i];
      }

    return crud;

  }
  listar(): UsuarioModel [] {

    let userList = JSON.parse(localStorage.getItem('cruds')!) as UsuarioModel[] ?? [];
      return userList;
  }

  remover(id: string): void {
    let cruds:UsuarioModel[] = this.listar();

    cruds = cruds.filter(crud => crud.id !== id)

    localStorage.setItem('cruds', JSON.stringify(cruds));
  }
  getCEP(cepNumber: string):Observable<EnderecoModel>{
    const cep = this.http.get<EnderecoModel>(`http://viacep.com.br/ws/${cepNumber}/json/`);
    return cep;
  }

}
