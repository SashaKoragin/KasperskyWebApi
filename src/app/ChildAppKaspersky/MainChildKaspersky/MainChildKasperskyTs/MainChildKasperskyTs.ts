import { Component} from '@angular/core';
import { ModelReport, Report } from '../DataBaseKaspersky/DataBaseKaspersky';
import { AuthIdentification } from '../../../Api/RequestService/RequestService';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector:'',
  templateUrl: '../MainChildKasperskyHtml/MainChildKasperskyHtml.html',
  styleUrls: ['../MainChildKasperskyCss/MainChildKasperskyCss.css'],
  providers:[Report]
})

export class MainChildKasperskyTs{
  constructor(database: Report, public authService: AuthIdentification) {
    this.welcome = 'Добро пожаловать: ' + authService.user.nameField;
    this.rules = authService.user.groupRuleServerField;
    this.selected = this.rules[0];
   this.nestedTreeControl = new NestedTreeControl<ModelReport>(this._getChildren);
   this.nestedDataSource = new MatTreeNestedDataSource();
   database.dataChange.subscribe(data => this.nestedDataSource.data = data);
}

 welcome?:string;
 rules:string[] = [];
 selected:string = this.rules[0];
 nestedTreeControl: NestedTreeControl<ModelReport>;
 nestedDataSource: MatTreeNestedDataSource<ModelReport>;

 hasNestedChild = (_: number, nodeData: ModelReport) => !nodeData.types;
 private _getChildren = (node: ModelReport) => node.children;
}
