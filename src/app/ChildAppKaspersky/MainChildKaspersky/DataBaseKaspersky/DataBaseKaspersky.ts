import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


export class ModelReport {
  public otdel?: string;
  public isRule?: string[]
  public children?: ModelReport[];
  public types?: string;
  public pages?: string;
  public model?: string;
}

@Injectable()
export class Report {

  dataChange = new BehaviorSubject<ModelReport[]>([{
    otdel: 'Касперский',
    children: [
      {
        otdel: 'Все хосты сервера',
        children: [{
          types: 'Хосты', pages: './AllHostKaspersky', model: 'Хосты'
        }]
      },
      {
        otdel: 'Представление',
        children: [{
          types: 'Генератор представлений', pages: './ViewGenerator', model: 'Генератор представлений'
        }]
      }]
  }]);
}
