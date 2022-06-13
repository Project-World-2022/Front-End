import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { ApiServiceService } from 'src/service/api-service.service';
import { ServiceService } from 'src/service/service.service';
import { ValidationService } from 'src/service/validation.service';
declare var $: any;

@Component({
  selector: 'app-dsr-report',
  templateUrl: './dsr-report.component.html',
  styleUrls: ['./dsr-report.component.css']
})
export class DSRReportComponent implements OnInit {

  DEPOT_ALL: any = [];
  DEPOT_CODE: any = [];
  r: any = [];
  VIEW_BOOL = false;
  constructor (private http: HttpClient, public service: ServiceService,
    private notifyService: NotificationService,public Api_Service: ApiServiceService,
    private Validation: ValidationService) {
    service.getInwardTableData(null);
    service.ALLDepotCode().then((res) => {
      this.r = res;
      for (let index = 0; index < this.r.length; index++) {
        this.DEPOT_ALL[index] = (this.r[index]['depot_name']);
        this.DEPOT_CODE[this.r[index]['depot_name']]=this.r[index]['depot_code'];
      }
      this.DEPOT_ALL.sort();
   });
   }
   LoadTableData(Event:any,data:any) {
    if (this.Validation.isEmptyObject2(data, ['Select Month', 'Select Year', 'Select Depot'], Event)) {
      $("." + Event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
      data['Depot_Code'] = this.DEPOT_CODE[data['Depot_Code']];
      $('.START_DATE').html("Selected Start Date is <br>" + data['Start_Date']);
      $('.END_DATE').html("Selected End Date is <br>" + data['End_Date']);
      $('.DEPOT_NAME').html("Selected Depot Name is <br>" + data['Depot_Name']);
      $('.DEPOT_CODE').html("Selected Depot Code is <br>" + this.DEPOT_CODE[data['Depot_Name']]);
      // this.service.getInwardTableData(data);
    }
  }
  TDate() {
    var UserDate = $(".start-date-input").val();
    var UserDate2 = $(".end-date-input").val();
    var ToDate = new Date();
    if (new Date(UserDate).getTime() > ToDate.getTime()) {
        $(".start-date-input").val('');
        $(".end-date-input").val('');
        alert("The Date must be less or Equal to today date");
        return false;
    } else if (new Date(UserDate2).getTime() > ToDate.getTime()) {
        $(".start-date-input").val('');
        $(".end-date-input").val('');
        alert("The Date must be less or Equal to today date");
        return false;
    } else if (new Date(UserDate2).getTime() < new Date(UserDate).getTime()) {
        alert("The Star Date must be less or Equal to end date");
        $(".start-date-input").val('');
        $(".end-date-input").val('');
        return false;
    }
    return true;
}
  ngOnInit(): void {
  }
  ChangeView() {
    this.VIEW_BOOL = true;
  }
}
