import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataControllerService {

  DATA_CONTROLLER: any = [];
  constructor() { }

  setData(Session_Id:any,Data: any) {
    sessionStorage.removeItem(Session_Id);
    sessionStorage.setItem(Session_Id,JSON.stringify(Data));
  }
  getData(Session_Id:any) {
    this.DATA_CONTROLLER = sessionStorage.getItem(Session_Id);
    if (this.DATA_CONTROLLER!=null && this.DATA_CONTROLLER !=undefined) {
      return  JSON.parse(this.DATA_CONTROLLER);
    }
    else {
      return  null;
    }
  }
  removeSessionData(Session_Id:any) {
    sessionStorage.removeItem(Session_Id);
  }
  removeSessionALL() {
    sessionStorage.clear();
  }
  D: any = [];
  setData2(data:any) {
    this.D = data;
  }
  getData2() {
    return this.D;
  }
}
