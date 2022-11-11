import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto.service';

import { EnderecoModel } from '../Models/Endereco.model';
import { UsuarioModel } from '../Models/usuario.models';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  crudForm!: FormGroup;
  msg!: string;

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService) { }

  ngOnInit(): void {

    this.crudForm = this.formBuilder.group({
      usuario:['',[Validators.required,Validators.pattern(/^[a-zA-Z]/)]],
      cpf:['',[Validators.required,Validators.pattern(/[0-9]/)]],
      telefone:['',[Validators.required]],
      endereco:this.formBuilder.group({
        cep:['', [Validators.required, Validators.pattern(/^\d{5}\-?\d{3}$/)]],
        logradouro: ['',[Validators.required]],
        complemento:['',],
        bairro:['',[Validators.required]],
        cidade:['',[Validators.required]],
        uf:['',[Validators.required]]
      }),
    })
  }
  cadastrar(){
    const crud = this.crudForm.getRawValue() as UsuarioModel;
    this.produtoService.cadastrar(crud);

    this.msg = "Cadastrado com sucesso!"
  }
  verifyCEP(){
    const cep = this.crudForm.get('endereco')?.getRawValue() as EnderecoModel;
    console.log(cep)
    const receivedCEP = this.produtoService.getCEP(cep.cep);
    receivedCEP.subscribe({
      next:(cep)=>{
        this.refresForm(cep)
      },
      error: (err)=>{
        console.log(err)
      }
    })
    console.log(receivedCEP)
  }

  refresForm(endereco:EnderecoModel){
    this.crudForm.get("endereco")?.patchValue({
      logradouro: endereco.logradouro,
      bairro: endereco.bairro,
      localidade:endereco.cidade,
      uf: endereco.uf
    })
  }
  get usuario(){  return this.crudForm.get("usuario")!}
  get cpf(){return this.crudForm.get("cpf")!}
  get telefone(){return this.crudForm.get("telefone")!}

  get cep(){return this.crudForm.get("endereco")?.get("cep")!}
  get logradouro(){return this.crudForm.get("endereco")?.get("logradouro")!}

  get bairro(){return this.crudForm.get("endereco")?.get("bairro")!}
  get cidade(){return this.crudForm.get("endereco")?.get("cidade")!}
  get uf(){return this.crudForm.get("endereco")?.get("uf")!}
}




