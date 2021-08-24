import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface IContato extends Record<string,any>{
  idPessoa: number;
  nome?: string;
  dataNascimento?: Date;
  dataNascimentoString?: string |null;
  observacoes?: string;  
  email?: string;  
  telefone?: string;  
}

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {
  allContatos:IContato[] = [];
  shownContatos:IContato[] = [];
  pagination={
    pageSize: 9,
    current: 1,
    totalPages: 1
  }
  searchTerm:string = '';
  searchResult:IContato[] = [];

  public selectedContato: IContato = {
    idPessoa: 0,
    nome: 'N/A',
    dataNascimento: undefined,
    dataNascimentoString: 'N/A',
    observacoes: 'N/A',
    email: 'N/A',
    telefone: 'N/A',
  };

  constructor(private modalService: NgbModal) { }

  paginate(){
    this.shownContatos = this.searchResult.slice(
      (this.pagination.current-1)*this.pagination.pageSize,
      this.pagination.current*this.pagination.pageSize,
    );
  }

  setPage(page:number){
    if(page <= this.pagination.totalPages && page >= 1){
      this.pagination.current = page;
      this.paginate()
    }
  }

  nextPage(){
    if(this.pagination.current < this.pagination.totalPages){
      this.pagination.current = this.pagination.current + 1;
      this.paginate()
    }
  }

  previousPage(){
    if(this.pagination.current > 1){
      this.pagination.current = this.pagination.current - 1;
      this.paginate()
    }
  }

  getAllContatos(){
    fetch('https://localhost:5001/Contatos')
      .then((response)=>response.json())
        .then((data)=>{
            this.allContatos = data
            this.pagination.totalPages = Math.ceil(this.allContatos.length/this.pagination.pageSize)
            this.searchContatos()
          }
        );
  }

  getContato(id:number, format:boolean){
    fetch(`https://localhost:5001/Contatos/${id}`)
    .then((response)=>response.json())
      .then((data:IContato)=> 
        this.selectedContato = format?
          this.formatContato(data):
          {
            ...data,
            dataNascimento: data.dataNascimento? new Date(data.dataNascimento) : undefined,
            dataNascimentoString: data.dataNascimento? new Date(data.dataNascimento).toLocaleDateString() : 'N/A',
          }
      );
  }

  postContato(){
    const {dataNascimentoString, ...rest} = this.selectedContato
    fetch(`https://localhost:5001/Contatos/`,{
      method: 'POST',
      body: JSON.stringify({...rest}),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(()=>this.getAllContatos())
  }

  patchContato(){
    const {dataNascimentoString,idPessoa, ...rest} = this.selectedContato
    fetch(`https://localhost:5001/Contatos/${this.selectedContato.idPessoa}`,{
      method: 'PATCH',
      body: JSON.stringify({...rest}),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(()=>this.getAllContatos())
  }

  deleteContato(index:number){
    const { idPessoa } = this.allContatos[index];
    fetch(`https://localhost:5001/Contatos/${idPessoa}`,{
      method: 'DELETE'
    }).then(()=>this.getAllContatos())
  }

  ngOnInit(): void {
    this.getAllContatos();
  }

  formatContato=(value:IContato)=>({
    idPessoa: value.idPessoa,
    nome: value.nome || 'N/A',
    dataNascimento: value.dataNascimento? new Date(value.dataNascimento) : undefined,
    dataNascimentoString: value.dataNascimento? new Date(value.dataNascimento).toLocaleDateString() : 'N/A',
    observacoes: value.observacoes || 'N/A',
    email: value.email || 'N/A',
    telefone: value.telefone || 'N/A',
  })

  openModal(content:any, index:number, type: string){
    switch(type){
      case 'edit':
        this.getContato(this.shownContatos[index].idPessoa, false);
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
        break;
      case 'detail':
        this.getContato(this.shownContatos[index].idPessoa, true);
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
        break;
      case 'new':
        this.selectedContato = {} as IContato
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
        break;
      default:
        break;   
    }
  }

  searchContatos(){
    const keysToSearch = [
      'nome',
      'telefone',
      'email',
      'observacoes'
    ];
    this.searchResult = this.allContatos.filter((value)=>
      keysToSearch.some((key)=>value[key]?.toString?.().toLocaleLowerCase?.().includes?.(this.searchTerm.toLocaleLowerCase()))
    );
    this.paginate();
  }

  get items() {
    return this.shownContatos.map(this.formatContato)
  }

}