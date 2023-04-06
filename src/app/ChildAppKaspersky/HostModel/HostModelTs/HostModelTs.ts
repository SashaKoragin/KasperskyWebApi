import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModelHost } from 'src/app/Api/ModelServer/ModelServer';
import { ModelGetPostKaspersky } from '../../../Api/RequestService/RequestService';
import { SelectionModel } from '@angular/cdk/collections';
import { AllModelDevice } from './AllModelDevice';


@Component({
  selector: 'allHostKaspersky',
  templateUrl: '../HostModelHtml/HostModelHtml.html',
  styleUrls: ['../HostModelCss/HostModelCss.css'],
  providers: [ModelGetPostKaspersky]
})

export class AllHostKaspersky implements OnInit {

  constructor(public getPostModel: ModelGetPostKaspersky) { }



  @ViewChild('modelHost', { static: true }) paginatorModelHost!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortModelHost!: MatSort;

  allModelDevice: AllModelDevice = new AllModelDevice()
  selectionRowModel = new SelectionModel<ModelHost>(false, []);



  async selectModelHost() {
    if (this.selectionRowModel.selected.length === 1) {
      await this.getPostModel.postHostAllDriver(this.selectionRowModel.selected[0]);
      this.allModelDevice.addDataSourse(this.getPostModel.modelWeb.TypesDevices);
    }
    else {
      this.allModelDevice.isVisibleModel = false;
    }
  }

  public isLoadForm: boolean = true;
  public disPlayColumns = ['LOGIC', 'KLHST_WKS_DN', 'KLHST_WKS_HOSTNAME', 'KLHST_INSTANCEID', 'KLHST_WKS_WINHOSTNAME', 'KLHST_WKS_WINDOMAIN', 'KLHST_WKS_IP_LONG', 'KLHST_WKS_DNSDOMAIN', 'KLHST_WKS_DNSNAME', 'KLHST_WKS_FQDN', 'KLHST_PRCST_PRODUCT_NAME', 'KLHST_PRCST_PRODUCT_VERSION'];
  public dataSource: MatTableDataSource<ModelHost> = new MatTableDataSource<ModelHost>();

  public filtersTable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async ngOnInit(): Promise<void> {
    await this.getPostModel.getModelAllHostGroup();
    this.dataSource.paginator = this.paginatorModelHost;
    this.dataSource.sort = this.sortModelHost
    this.dataSource.data = this.getPostModel.modelWeb.ModelHost;
    this.isLoadForm = false;
  }

}
