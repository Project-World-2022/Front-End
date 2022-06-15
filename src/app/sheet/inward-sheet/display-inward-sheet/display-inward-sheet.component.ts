import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/service/api-service.service';
import { AutoCompletedInputService } from 'src/service/auto-completed-input.service';
import { DataControllerService } from 'src/service/data-controller.service';
import { PdfDownloadService } from 'src/service/pdf-download.service';
import { ServiceService } from 'src/service/service.service';
import { UICALENDERService } from 'src/service/ui-calender.service';
import { ValidationService } from 'src/service/validation.service';
declare var $: any;

@Component({
  selector: 'app-display-inward-sheet',
  templateUrl: './display-inward-sheet.component.html',
  styleUrls: ['./display-inward-sheet.component.css']
})
export class DisplayInwardSheetComponent implements OnInit {
  DEPOT_ALL: any = [];
  DEPOT_CODE: any = [];
  r: any = [];
  DATA: any = [];
  DEPOT_NAME_CODE_OBJECT: any = [];
  GRADE_LIST_OBJECT: any = [];
  constructor (private http: HttpClient, public service: ServiceService,
    public Api_Service: ApiServiceService,
    private Validation: ValidationService,
    protected PreviewData: DataControllerService,
    public DropDown: AutoCompletedInputService,
    public pdfDownnload: PdfDownloadService,
    public UI_CALENDER: UICALENDERService) {}
  LoadTableData(Event: any, data: any) {
    console.log(data);
    if (this.Validation.isEmptyObject2(data, ['Select Option','undefined'], Event)) {
      $("." + Event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
      data['Depot_Code'] = this.DEPOT_CODE[data['Depot_Name']];
      $('.START_DATE').html("Selected Start Date is <br>" + data['Start_Date']);
      $('.END_DATE').html("Selected End Date is <br>" + data['End_Date']);
      $('.DEPOT_NAME').html("Selected Depot Name is <br>" + data['Depot_Name']);
      $('.DEPOT_CODE').html("Selected Depot Code is <br>" + this.DEPOT_CODE[data['Depot_Name']]);
      this.service.getInwardTableData(data);
      this.PreviewData.setData('InwardSheetViewSelect', data);
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
    this.GRADE_LIST_OBJECT['Select Option'] = 'Select Option';
    this.service.ALLDepotCode().then((res) => {
      this.r = res;
      this.DEPOT_NAME_CODE_OBJECT['Select Option'] = 'Select Option';
      for (let index = 0; index < this.r.length; index++) {
        this.DEPOT_ALL[index] = (this.r[index]['depot_name']);
        this.DEPOT_CODE[this.r[index]['depot_name']] = this.r[index]['depot_code'];
        this.DEPOT_NAME_CODE_OBJECT[this.r[index]['depot_code']] = this.r[index]['depot_name'];
      }
      this.DEPOT_ALL.sort();
      this.DATA = this.PreviewData.getData('InwardSheetViewSelect');
   });
    this.UI_CALENDER.datePicker('#Start_Date');
    this.UI_CALENDER.datePicker('#End_Date');
    this.DropDown.DropDownShow('#depot_Name', this.DEPOT_NAME_CODE_OBJECT, null);
    this.GRADE_LIST_OBJECT['1'] = 'Bag';
    this.GRADE_LIST_OBJECT['20'] = 'Ton';
    this.DropDown.DropDownShow('#select_option_bag_ton',this.GRADE_LIST_OBJECT, (res:any) => {
      if (res=='Ton') {
        this.service.CONVERT_TON_BAG = 20;
      } else {
        this.service.CONVERT_TON_BAG = 1;
      }
    });
  }
}
