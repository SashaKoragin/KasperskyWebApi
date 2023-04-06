import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { NgxPermissionsService } from "ngx-permissions";
import { lastValueFrom, Observable } from "rxjs";
import { ApiService } from "../ApiGetPost/ApiService";
import { Identification, ModelView, SettingScheme, TypeFilters, SchemeModel, ModelWebKaspersky, ModelHost, TypesDevices } from '../ModelServer/ModelServer';

const url: ApiService = new ApiService();
const httpOptionsJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthIdentification {

  constructor(private http: HttpClient, public router: Router, public permissionsService: NgxPermissionsService) { }

  public user: Identification = new Identification();

  public IsVisibleButton: boolean = false
  isLoggedIn = false;
  redirectUrl: string = '';

  ///Подключение по средством запроса
  login(): Observable<Identification> {
    return this.http.post(url.AuthorizationUser, this.user, httpOptionsJson) as Observable<Identification>;
  }

  ///Добавление ролей с сервера
  addRule() {
    try {
      console.log('Подключились к серверу!');
      this.permissionsService.addPermission(this.user.groupRuleServerField);
      console.log(this.user.groupRuleServerField);
      console.log('Подключили роли!');
    } catch (e) {
      alert(e);
    }
  }

  ///Выход из авторизации
  logout(): void {
    this.isLoggedIn = false;
    this.user = new Identification();
    this.IsVisibleButton = false;
    this.permissionsService.flushPermissions()
  }

  ///Потеря контекста с сайтом
  logoutDisconnect(): void {
    this.isLoggedIn = false;
    this.IsVisibleButton = false;
    this.user = new Identification();
    let redirect = '/Login';
    console.log("Перенаправили на страницу: " + redirect)
    let navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };
    this.router.navigate([redirect], navigationExtras);
  }
}



@Injectable()
export class ModelGetPostKaspersky {
  constructor(private http: HttpClient) { }

  public modelWeb: ModelWebKaspersky = new ModelWebKaspersky();
  public model: SettingScheme = new SettingScheme();

  public async getAllInfoModelView() {
    const schemeModel$ = this.http.get<SchemeModel[]>(url.kasperskyGetAllInfoModelView, httpOptionsJson);
    this.model.SchemeModels = await lastValueFrom(schemeModel$);
    this.model.SchemeModel = this.model.SchemeModels[0];
    await this.getSchemeKaspersky(this.model.SchemeModel.NameSchemeView)
  }

  public async getSchemeKaspersky(nameModelView: string) {
    const modelView$ = this.http.get<ModelView>(url.kasperskyGetSchemeModel.concat(nameModelView), httpOptionsJson);
    this.model.Model = await lastValueFrom(modelView$);
  }

  public async getFiltersKaspersky() {
    const typeFilters$ = this.http.get<TypeFilters[]>(url.kasperskyGetFilter, httpOptionsJson)
    this.model.TypeFilters = await lastValueFrom(typeFilters$);
  }

  public postGenerateFilters(modelView: ModelView) {
    return this.http.post(url.kasperskyPostModel, modelView, httpOptionsJson);
  }

  public postViewKaspersky(modelView: ModelView) {
    return this.http.post(url.postViewKaspersky, modelView, httpOptionsJson);
  }

  public postViewKasperskyStreamExcel(modelView: ModelView) {
    return this.http.post(url.postViewModelServerKasperskyStream, modelView,
      { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(model => {
        var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "Отчеты касперского";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }
  ///Получение всех хостов с сервера касперского
  public async getModelAllHostGroup() {
    const allHost$ = this.http.get<ModelHost[]>(url.allGroupHostKaspersky, httpOptionsJson);
    this.modelWeb.ModelHost = await lastValueFrom(allHost$);
  }
  ///Получение данных об оборудовании
  public async postHostAllDriver(modelHost:ModelHost){
    const typesDevices$ = this.http.post<TypesDevices>(url.postHostAllDriver, modelHost, httpOptionsJson);
    this.modelWeb.TypesDevices = await lastValueFrom(typesDevices$);
    console.log(this.modelWeb.TypesDevices);
  }
}
