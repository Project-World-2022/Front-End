import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { ApiServiceService } from 'src/service/api-service.service';
import { DataControllerService } from 'src/service/data-controller.service';
import { ServiceService } from 'src/service/service.service';
import { ValidationService } from 'src/service/validation.service';
declare var $: any;

@Component({
  selector: 'app-table-view2',
  templateUrl: './table-view2.component.html',
  styleUrls: ['./table-view2.component.css']
})
export class TableView2Component implements OnInit {
  DEPOT_ALL: any = [];
  DEPOT_CODE: any = [];
  DEPOT_CODE_2: any = [];
  DEPOT_CODE_NAME: any = {};
  r: any = [];
  DATA: any = [];
  TOTAL_DAY_LIST: any = [];
  TOTAL_DAY:any = new Date().getDate();
  OBJECT_LIST: any = [];

   constructor(private http: HttpClient, public service: ServiceService,
    private notifyService: NotificationService,public Api_Service: ApiServiceService,
    private Validation: ValidationService,protected PreviewData: DataControllerService) {
      service.getInwardTableData(null);
      service.ALLDepotCode().then((res) => {
        this.r = res;
        for (let index = 0; index < this.r.length; index++) {
          this.DEPOT_ALL[index] = (this.r[index]['depot_name']);
          this.DEPOT_CODE[this.r[index]['depot_name']] = this.r[index]['depot_code'];
          this.DEPOT_CODE_2.push(this.r[index]['depot_code']);
          this.DEPOT_CODE_NAME[this.r[index]['depot_code']] = this.r[index]['depot_name'];
        }
        this.DEPOT_ALL.sort();
      });
  }

  LoadTableData(Event:any,data:any) {
    if (this.Validation.isEmptyObject2(data, ['Select Month', 'Select Year'], Event)) {
        $("." + Event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
      $('.MONTH').html("Selected Month is <br>" + data['Select_Month']);
      $('.YEAR').html("Selected Year is <br>" + data['Select_Year']);
      data['Depot_Name_List'] = this.DEPOT_CODE_NAME;
      data['Depot_Code_List'] = this.DEPOT_CODE_2;
      this.service.DSR_Report_2(data);
      this.PreviewData.setData('DSR_REPORT_2', data);
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
  BagTon(event: any) {
    if (event=='Ton') {
      this.service.CONVERT_TON_BAG = 20;
    } else {
      this.service.CONVERT_TON_BAG = 1;
    }
  }
}
