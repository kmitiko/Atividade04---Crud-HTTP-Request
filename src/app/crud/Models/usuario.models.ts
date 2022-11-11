import { EnderecoModel } from "./Endereco.model";

export interface UsuarioModel {
  id: string,
  usuario: string,
  cpf: number,
  telefone: string,
  endereco:EnderecoModel
}
