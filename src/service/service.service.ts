import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Observable, shareReplay } from 'rxjs';
import { CookiesService } from 'src/app/cookies.service';
import { CustomToolTipsService } from 'src/app/custom-model/custom-tool-tips.service';
import { NotificationService } from 'src/app/notification.service';
import { environment } from 'src/environments/environment';
import { ApiServiceService } from './api-service.service';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  InwardShow: boolean = false;
  OutwardShow: boolean = false;
  islogged: boolean = false;
  CUSTOM_POPUP_SHOW_HIDE: boolean = false;
  isConnectionAvailable: boolean = navigator.onLine;
  INWARD_DATA: any = [];
  OUTWARD_DATA: any = [];
  STOCK_SHEET_DATA: any = [];
  NEW_STOCK_SHEET_DATA: any = [];
  NEW_STOCK_SHEET_DATA_2: any = [];
  DATA: any = [];
  PARSE_FLOAT: any = 0;
  GRADE_LIST: any = [];
  headers = { 'content-type': 'application/json' };
  CONVERT_TON_BAG = 1;
  VIEW_SHOW_HIDE = false;
  CORRECTION_REPORT_DATA: any = [];
  DSR_REPORT_DATA: any = [];
  DSR_REPORT_DATA_2: any = [];
  DSR_REPORT_DATA_3: any = [];

  constructor (private http: HttpClient,
    protected router: Router,
    private cookieService: CookiesService,
    private notifyService: NotificationService,
    public AnimationLoad: CustomToolTipsService,
    private activatedRoute: ActivatedRoute) {
    this.islogged = false;
    this.getGradeList();
  }
  LoginService(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'Login'}`, formdata,{'headers':this.headers});
  }
  InserInwardData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'InwardSheetData/Insert'}`, formdata,{'headers':this.headers});
  }
  UpdateInwardData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'InwardSheetData/Update'}`, formdata,{'headers':this.headers});
  }
  DeleteInwardData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'InwardSheetData/Delete'}`, formdata,{'headers':this.headers});
  }

  InserOutwardData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'OutwardSheetData/Insert'}`, formdata,{'headers':this.headers});
  }
  UpdateOutwardData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'OutwardSheetData/Update'}`, formdata,{'headers':this.headers});
  }
  DeleteOutwardData(formdata: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl + 'OutwardSheetData/Delete'}`, formdata,{'headers':this.headers});
  }

  getInwardTableData(DATA: any) {
    this.AnimationLoad.LoadingAnimation();
    return new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.baseUrl + 'InwardSheet/getData'}`, DATA).subscribe((res) => {
          if (res['status']) {
            this.INWARD_DATA = res['data'];
            resolve(res);
          } else {
            this.INWARD_DATA = [];
            resolve(null);
            this.AnimationLoad.ToolTips_AnimationStart(5, { Inward_Table:res['message']},null);
          }
          this.AnimationLoad.removeAnimation();
        }, error => {
          this.notifyService.showError(error['message'], error['statusText']);
          this.AnimationLoad.removeAnimation();
        });
      } else {
        this.INWARD_DATA = [];
        resolve(null);
        this.AnimationLoad.removeAnimation();
      }
    });
  }
  getOutwardTableData(DATA: any) {
    this.AnimationLoad.LoadingAnimation();
    return new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.baseUrl + 'OutwardSheet/getData'}`, DATA, { 'headers': this.headers }).subscribe((res) => {
          if (res['status']) {
            this.OUTWARD_DATA = res['data'];
            console.log(this.OUTWARD_DATA);
            resolve(res);
          } else {
            this.OUTWARD_DATA = [];
            resolve(null);
            this.AnimationLoad.ToolTips_AnimationStart(5, { Outward_Table:res['message']},null);
          }
          this.AnimationLoad.removeAnimation();
        }, error => {
          this.notifyService.showError(error['message'], error['statusText']);
          this.AnimationLoad.removeAnimation();
        });
      } else {
        this.OUTWARD_DATA = [];
        resolve(null);
        this.AnimationLoad.removeAnimation();
      }
      });
  }

  getStockTableData(DATA: any) {
    new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.baseUrl + 'StockSheet/getData'}`, DATA, { 'headers': this.headers }).subscribe((res) => {
         if (res['Status']==true) {
           this.STOCK_SHEET_DATA = [res['Data']];
           this.STOCK_SHEET_DATA.sort();
          resolve(res);
         } else {
          this.STOCK_SHEET_DATA = [];
          resolve([]);
         }
        }, error => {
          reject(error);
          this.notifyService.showError(error['message'], error['statusText']);
        });
      } else {
        this.STOCK_SHEET_DATA = [];
        reject(null);
      }
      });
  }
  getNewStockTableData(DATA: any) {
    new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.baseUrl + 'NewStockSheet/getData'}`, DATA, { 'headers': this.headers }).subscribe((res) => {
         if (res['Status']==true) {
          this.NEW_STOCK_SHEET_DATA = res['Data']['NewStockSheet'];
          resolve(res);
         } else {
          this.NEW_STOCK_SHEET_DATA = [];
          resolve([]);
         }
        }, error => {
          reject(error);
          this.notifyService.showError(error['message'], error['statusText']);
        });
      } else {
        this.NEW_STOCK_SHEET_DATA = [];
        reject(null);
      }
      });
  }
  getNewStockTableData_2(DATA: any) {
    this.AnimationLoad.LoadingAnimation();
    new Promise((resolve, reject) => {
      if (DATA != null && DATA != '') {
        this.http.post<any>(`${environment.baseUrl + 'NewStockSheet2/getData'}`, DATA, { 'headers': this.headers }).subscribe((res) => {
          console.log(res,"res")
         if (res['Status']==true) {
           var OBJECT_KEY = Object.keys(res['Data']);
           OBJECT_KEY.sort();
           this.NEW_STOCK_SHEET_DATA_2 = {
             'KeyList': OBJECT_KEY,
              'Data':res['Data']
           };
           console.log(this.NEW_STOCK_SHEET_DATA_2)
           resolve(res);
           this.AnimationLoad.removeAnimation();
         } else {
          this.NEW_STOCK_SHEET_DATA_2 = [];
          resolve([]);
         }
        }, error => {
          reject(error);
          this.notifyService.showError(error['message'], error['statusText']);
          this.AnimationLoad.removeAnimation();
        });
      } else {
        this.NEW_STOCK_SHEET_DATA = [];
        reject(null);
        this.AnimationLoad.removeAnimation();
      }
      });
  }
  ALLDepotCode() {
    clearInterval();
    return new Promise((resolve,reject) => {
      this.http.get<any>(`${environment.baseUrl + 'DepotList'}`).subscribe((res) => {
          resolve(res);
      }, err => {
        this.notifyService.showError(err['message'], err['statusText']);
      });
    });
  }
  Dealer_Details(){
    return new Promise((resolve,reject) => {
      this.http.get<any>(`${environment.baseUrl + 'Dealer_Details'}`).subscribe((res) => {
        resolve(res);
      }, err => {
      });
    });
  }
  ALLDealer_Details(){
    return new Promise((resolve,reject) => {
      this.http.get<any>(`${environment.baseUrl + 'Dealer/data'}`).pipe(
        shareReplay(1),
      ).subscribe((res) => {
        resolve(res.e.Data);
      }, err => {
      });
    });
  }
  getSeesionLogin() {
    return {
      UserName: this.cookieService.getCookie('User'),
      Password: this.cookieService.getCookie('Password'),
      LoginStatus: this.cookieService.getCookie('LoginStatus'),
      Role: this.cookieService.getCookie('Login_Type'),
      Emp_Id: this.cookieService.getCookie('Emp_Id'),
      User_Name: this.cookieService.getCookie('User_Name')
    }
  }
  LogoutSession() {
    this.islogged = false;
    this.cookieService.deleteCookie('User');
    this.cookieService.deleteCookie('Password');
    this.cookieService.deleteCookie('LoginStatus');
    this.cookieService.deleteCookie('Login_Type');
    this.cookieService.deleteCookie('Emp_Id');
    this.cookieService.deleteCookie('User_Name');
    this.router.navigate(['/Login']);
  }
  ParseFloat(value: number) :any {
    this.PARSE_FLOAT = value / this.CONVERT_TON_BAG;
    var num1 = parseFloat(this.PARSE_FLOAT).toFixed(2);
    if (value==0 || value==undefined) {
      return 0.0;
    }else {
      return num1;
    }
  }
  TDate(INPUT_CLASS_ID_1:string,INPUT_CLASS_ID_2:string) {
    var UserDate = $(INPUT_CLASS_ID_1).val();
    var UserDate2 = $(INPUT_CLASS_ID_2).val();
    var ToDate = new Date();
    if (new Date(UserDate).getTime() > ToDate.getTime()) {
        $(INPUT_CLASS_ID_1).val('');
        $(INPUT_CLASS_ID_2).val('');
        alert("The Date must be less or Equal to today date");
        return false;
    } else if (new Date(UserDate2).getTime() > ToDate.getTime()) {
        $(INPUT_CLASS_ID_1).val('');
        $(INPUT_CLASS_ID_2).val('');
        alert("The Date must be less or Equal to today date");
        return false;
    } else if (new Date(UserDate2).getTime() < new Date(UserDate).getTime()) {
        alert("The Star Date must be less or Equal to end date");
        $(INPUT_CLASS_ID_1).val('');
        $(INPUT_CLASS_ID_2).val('');
        return false;
    }
    return true;
  }

  isLoginCheck() {
    if (this.getSeesionLogin().LoginStatus == 'true') {
      this.islogged = true;
    } else {
      this.islogged = false;
      this.router.navigate(['/Login']);
    }
    return this.islogged;
  }
  getGradeList() {
   return this.http.get<any>(`${environment.baseUrl + 'Grade'}`).subscribe((res) => {
      this.GRADE_LIST = res['Grade_List'];
    }, err => {
      this.notifyService.showError(err['message'], err['statusText']);
    });
  }
  getMonthYear(date:string) {
    var dateObj = new Date(date);
    var month = dateObj.toLocaleString('default', { month: 'long' });
    var day = dateObj.toLocaleDateString('default', { weekday: 'long' });
    var year = dateObj.getUTCFullYear();
    return {Month:month,Year:year,Day:day}
  }
  getCorrectionReportData(data:any) {
   return new Promise((resolve,reject) => {
     this.getDataApi('Correction_Report/data', data).subscribe((res) => {
       resolve(res);
       this.CORRECTION_REPORT_DATA = res;
     }, err => {
       reject(err);
       this.CORRECTION_REPORT_DATA = [];
     });
    });
  }
  getDataApi(URL:string,data:any): Observable<Object[]> {
    return this.http.post<any>(`${environment.baseUrl + URL}`, data, { 'headers': this.headers }).pipe(
      shareReplay(),
      first());
  }
  DSR_Report(data: any) {
    this.http.post<any>(`${environment.baseUrl + 'Dsr_Report/data'}`,data,{ 'headers': this.headers }).subscribe((res) => {
      if (res != null && res != undefined) {
        console.log(res);
        var KeyList = Object.keys(res);
        KeyList.sort();
        var KEY_LIST = Object.keys(res[KeyList[0]]['Data']);
        var FOOTER_SUM = [];
        var TOTAL_SUM = 0;
        for (let index = 0; index < KEY_LIST.length; index++) {
          var SUM = 0;
          for (let j = 0; j < KeyList.length; j++) {
              var d = res[KeyList[j]];
              d = d['Data'][KEY_LIST[index]]['SUM'];
              SUM += d;
          }
          FOOTER_SUM.push(SUM);
        }
        for (let index = 0; index < KeyList.length; index++) {
          TOTAL_SUM += res[KeyList[index]]['SUM'];
        }
        this.DSR_REPORT_DATA = {
          Data: res,
          KeyList: KeyList,
          DATE_LIST: KEY_LIST,
          FOOTER_SUM: FOOTER_SUM,
          TOTAL_SUM: TOTAL_SUM,
          DATE_LENGTH:KEY_LIST.length
        };
        console.log(this.DSR_REPORT_DATA);
      } else {
        this.DSR_REPORT_DATA = [];
      }
    }, err => {
      this.notifyService.showError(err['message'], err['statusText']);
    });
  }
  DSR_Report_2(data: any) {
    this.http.post<any>(`${environment.baseUrl + 'Dsr_Report/data2'}`,data,{ 'headers': this.headers }).subscribe((res) => {
      if (res != null && res != undefined) {
        var KeyList = Object.keys(res);
        KeyList.sort();
        this.DSR_REPORT_DATA_2 = {
          Data: res,
          KeyList:KeyList
        };
        console.log(this.DSR_REPORT_DATA_2);
      } else {
        this.DSR_REPORT_DATA_2 = [];
      }
    }, err => {
      this.notifyService.showError(err['message'], err['statusText']);
    });
  }
  DSR_Report_3(data: any) {
    this.http.post<any>(`${environment.baseUrl + 'Dsr_Report/data3'}`,data,{ 'headers': this.headers }).subscribe((res) => {
      if (res != null && res != undefined) {
        this.DSR_REPORT_DATA_3 = res;
        console.log(this.DSR_REPORT_DATA_3);
      } else {
        this.DSR_REPORT_DATA_3 = [];
      }
    }, err => {
      this.notifyService.showError(err['message'], err['statusText']);
    });
  }
}
