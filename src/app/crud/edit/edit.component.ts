import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { EnderecoModel } from '../Models/Endereco.model';

import { UsuarioModel } from '../Models/usuario.models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: string;
  crud!: UsuarioModel;
  crudForm!: FormGroup;
  msg!: string

  constructor(private route: ActivatedRoute,private service: ProdutoService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    // this.id = id;

    this.crud = this.service.getCrudById(id);
    console.log(this.crud);

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
    this.loadForm(this.crud)
  }

  loadForm(user: UsuarioModel){
    this.crudForm.patchValue({
      nome: user.usuario,
      cpf: user.cpf,
      telefone: user.telefone,
      endereco: user.endereco
    })
  }

  edit() {
    this.crud.usuario = this.usuario.value;
    this.crud.cpf = this.cpf.value;
    this.crud.telefone = this.telefone.value;
    this.crud.endereco.cep = this.cep.value;
    this.crud.endereco.logradouro = this.logradouro.value;
    this.crud.endereco.complemento = this.complemento.value;
    this.crud.endereco.bairro = this.bairro.value;
    this.crud.endereco.cidade = this.cidade.value;
    this.crud.endereco.uf = this.uf.value;

    this.service.atualizar(this.crud)

    this.msg = "Atualizado com sucesso!";
  }
  verifyCEP(){
    const endereco = this.crudForm.get("endereco")?.getRawValue() as EnderecoModel;

    const receivedCEP = this.service.getCEP(endereco.cep).subscribe({
      next: (end)=>{
        this.crudForm.get("endereco")?.patchValue({
          logradouro: end.logradouro,
          bairro: end.bairro,
          cidade: end.cidade,
          uf: end.uf,
        })
      },
      error:(err)=>{console.log(err)}
    })

  }
  get usuario(){  return this.crudForm.get("usuario")!}
  get cpf(){return this.crudForm.get("cpf")!}
  get telefone(){return this.crudForm.get("telefone")!}

  get cep(){return this.crudForm.get("endereco")?.get("cep")!}
  get logradouro(){return this.crudForm.get("endereco")?.get("logradouro")!}
  get complemento(){return this.crudForm.get("endereco")?.get("complemento")!};
  get bairro(){return this.crudForm.get("endereco")?.get("bairro")!}
  get cidade(){return this.crudForm.get("endereco")?.get("cidade")!}
  get uf(){return this.crudForm.get("endereco")?.get("uf")!}



}
