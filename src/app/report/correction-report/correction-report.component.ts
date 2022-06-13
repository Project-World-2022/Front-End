import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { ApiServiceService } from 'src/service/api-service.service';
import { DataControllerService } from 'src/service/data-controller.service';
import { ServiceService } from 'src/service/service.service';
import { ValidationService } from 'src/service/validation.service';
declare var $: any;


@Component({
  selector: 'app-correction-report',
  templateUrl: './correction-report.component.html',
  styleUrls: ['./correction-report.component.css']
})
export class CorrectionReportComponent implements OnInit {
  DEPOT_ALL: any = [];
  DEPOT_CODE: any = [];
  r: any = [];
  DATA:any = [];
  constructor (private http: HttpClient, public service: ServiceService,
    private notifyService: NotificationService,public Api_Service: ApiServiceService,
    private Validation: ValidationService,protected PreviewData: DataControllerService) {
    service.getInwardTableData(null);
    service.ALLDepotCode().then((res) => {
      this.r = res;
      for (let index = 0; index < this.r.length; index++) {
        this.DEPOT_ALL[index] = (this.r[index]['depot_name']);
        this.DEPOT_CODE[this.r[index]['depot_name']]=this.r[index]['depot_code'];
      }
      this.DEPOT_ALL.sort();
      this.DATA = this.PreviewData.getData('CorrectionReportData');
   });
   }
   LoadTableData(Event:any,data:any) {
    if (this.Validation.isEmptyObject2(data, ['Select Month', 'Select Year', 'Select Depot','Select View Types'], Event)) {
      $("." + Event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
      data['Depot_Code'] = this.DEPOT_CODE[data['Depot_Code']];
      $('.START_DATE').html("Selected Start Date is <br>" + data['Start_Date']);
      $('.END_DATE').html("Selected End Date is <br>" + data['End_Date']);
      $('.DEPOT_NAME').html("Selected Depot Name is <br>" + data['Depot_Name']);
      $('.DEPOT_CODE').html("Selected Depot Code is <br>" + this.DEPOT_CODE[data['Depot_Name']]);
      $('.SELECT_VIEW_TYPES-1').html("Selected View Type 1 is <br>" + data['Select_View_Type_1']);
      $('.SELECT_VIEW_TYPES-2').html("Selected View Type 2 is <br>" + data['Select_View_Type_2']);
      this.service.getCorrectionReportData(data);
      this.PreviewData.setData('CorrectionReportData', data);
    }
  }
  TDate() {
    var UserDate = $("start-date-input").val();
    var UserDate2 = $("end-date-input").val();
    var ToDate = new Date();
    if (new Date(UserDate).getTime() > ToDate.getTime()) {
        $("start-date-input").val('');
        $("end-date-input").val('');
        alert("The Date must be less or Equal to today date");
        return false;
    } else if (new Date(UserDate2).getTime() > ToDate.getTime()) {
        $("start-date-input").val('');
        $("end-date-input").val('');
        alert("The Date must be less or Equal to today date");
        return false;
    } else if (new Date(UserDate2).getTime() < new Date(UserDate).getTime()) {
        alert("The Star Date must be less or Equal to end date");
        $("start-date-input").val('');
        $("end-date-input").val('');
        return false;
    }
    return true;
}
  ngOnInit(): void {
    setTimeout(() => {
      if (this.DATA != null && this.DATA != undefined) {
        $(`#depot-code-select option[value='${this.DATA['Depot_Name']}']`).attr("selected", "selected");
        $('.search-btn').click();
        // this.router.navigate(['/InwardSheet/AddInwardSheet']);
      } else {
      }
    },1500);
  }
  visiblityChanged(value:string) {
   if (value=='Inward') {
     this.service.VIEW_SHOW_HIDE = false;
   } else {
    this.service.VIEW_SHOW_HIDE = true;
   }
 }
}
