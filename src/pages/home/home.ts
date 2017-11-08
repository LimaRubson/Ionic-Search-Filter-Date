import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataProvider } from './../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //Variável do tipo string
  searchTerm: string = '';
  //Variável de qualquer tipo
  //items: any;
  searchQuery;

  programacao: any[];
  private items: any[];
  private employees: any;

  constructor(public navCtrl: NavController, public dataService: DataProvider, private http: Http) {

  }

    //Método que pega as informações do objeto programação
    getUsers() {

        this.http.get('assets/data/cinema-programacao.json').map(res => res.json()).subscribe(data => {

            //A variável que recebe as informações do objeto programação
            this.employees = data.programacao;

            //A variável que recebe as informações do objeto programação
            this.programacao = data.programacao;

            //Filtra as informações do JSON
            this.programacao.filter(val => {

            //Variável local que recebe a data atual
            let dateHoje = new Date().toDateString();

            //Variável local que recebe a data do objeto programação
            let dateBienal = new Date(val.date).toDateString();
              
              //Verifica se tem alguma programação do dia
              if(dateHoje == dateBienal) {

                  //A variável 'status' recebe a negação booleana dela 
                  val.status = !val.status;

              }

          });

            ///Exibe no console as informações do json 
            console.log(this.programacao);

        })

    }

    //Método que reinicia o objeto programação
    inicializar() {

       this.programacao = this.employees;

    }
    
  //Método que filtra uma informação específica do objeto programação
  getItems (ev: any) { 

    // Repor itens de volta para todos os itens 
    if(ev.target.value === "") { 

        this.inicializar(); 

      }

     let val = ev.target.value;

    // se o valor for uma string vazia, não filtre os itens 
    if (val && val.trim () != '') { 

        this.programacao = this.programacao.filter((item) => { 

            let name: any = item; 

            return ( name.name.toLowerCase().indexOf(val.toLowerCase ())> -1);

        }) 

    }

}
  //Método que muda o valor do atributo 'status'
  toggleSection(i) {

        this.programacao[i].status = !this.programacao[i].status;

   }

   ionViewDidLoad() {
      
      //Invoca o método getUsers()
      this.getUsers();

  }

}
