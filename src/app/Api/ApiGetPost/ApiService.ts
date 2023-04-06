export const ServerHostKaspersky: string = '77068-APP065';  //localhost
//export const ServerHostKaspersky: string = 'localhost';
export const ServerPortKaspersky: string = '8565';
//К примеру новая структура

export class ApiService {
  ///Авторизация
  public AuthorizationUser = `http://${ServerHostKaspersky}:${ServerPortKaspersky}/ServiceKaspersky/Authorization`;
  ///Описание схем view касперского
  public kasperskyGetAllInfoModelView = `http://${ServerHostKaspersky}:${ServerPortKaspersky}/ServiceKaspersky/AllInfoModelView`;
  ///Получение схемы касперского
  public kasperskyGetSchemeModel = `http://${ServerHostKaspersky}:${ServerPortKaspersky}/ServiceKaspersky/GetSchemeModel?nameView=`;
  ///Получение фильтра
  public kasperskyGetFilter = `http://${ServerHostKaspersky}:${ServerPortKaspersky}/ServiceKaspersky/GetModelFilter`;
  ///Получение выборки согласно исходным данным
  public kasperskyPostModel = `http://${ServerHostKaspersky}:${ServerPortKaspersky}/ServiceKaspersky/GenerateSelectKaspersky`;
  ///Получение данных по сгенерированной схеме
  public postViewKaspersky = `http://${ServerHostKaspersky}:${ServerPortKaspersky}/ServiceKaspersky/PostViewModelServerKaspersky`;
  ///Получение файла Excel из касперского
  public postViewModelServerKasperskyStream = `http://${ServerHostKaspersky}:${ServerPortKaspersky}/ServiceKaspersky/PostViewModelServerKasperskyStream`;
  ///Получение данных всех хостов
  public allGroupHostKaspersky = `http://${ServerHostKaspersky}:${ServerPortKaspersky}/ServiceKaspersky/GetModelAllHostGroup`;
  ///Получение категории оборудования
  public postHostAllDriver = `http://${ServerHostKaspersky}:${ServerPortKaspersky}/ServiceKaspersky/PostHostAllDriver`;
}
