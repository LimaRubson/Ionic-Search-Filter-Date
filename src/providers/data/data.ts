import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {

  //Variável de qualquer tipo
  //items: any;
  emProgramacao: any;

  constructor(public http: Http) {

    /*//Váriável que recebe um conjunto de atributos
    this.items = [

      {title: 'one'},
      {title: 'two'},
      {title: 'three'},
      {title: 'four'},
      {title: 'five'},
      {title: 'six'}

    ]*/

    console.log('Hello DataProvider Provider');

  }


    //Método que pega as informações do JSON
    programacao(){

        //Verifica se a variável existe
        if(this.emProgramacao){

              //Retorna uma reposta se resolvido ou não! Nesse caso, ainda não foi resolvido, pois a variável não contém nada
              return Promise.resolve(this.emProgramacao);

        }

        //Retorna uma nova instância com o variável resolvida, ou seja, com as informações do JSON
        return new Promise(resolve => {
          
        //Faz uma requisição HTTP pegando as informações do JSON 
        this.http.get('assets/data/cinema-programacao.json').map(res => res.json()).subscribe(data => {
            //A variável 'emCartazes recebe as informações
            this.emProgramacao = data;
            //Verifica se está resolvida. Nesse caso, está resolvido, pois a variável contém as informações do JSON
            resolve(this.emProgramacao);
        });

    });

}



}
