import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';

import { UsuarioModel } from '../Models/usuario.models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  cruds!: UsuarioModel[];
  displayedColumns: string[] = ['usuario', 'telefone', 'edit', 'remove'];
  dataSource!: MatTableDataSource<UsuarioModel>;

  clickedRow!: UsuarioModel;

  constructor(private produtoService: ProdutoService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private router: Router) {
                this.matIconRegistry.addSvgIcon("kickstarter",
                  this.domSanitizer.bypassSecurityTrustResourceUrl
                  ("assets/icones/kickstarter.svg"));
    }

  ngOnInit(): void {
    this.cruds = this.produtoService.listar();
    this.dataSource = new MatTableDataSource(this.cruds);
  }
  listar(): UsuarioModel[] {
    return this.cruds;
  }

  remover(id:string): void {
    this.produtoService.remover(id);
  }

  editar(id:string): void {
    this.router.navigate(["/products/edit",id]);
  }

}
