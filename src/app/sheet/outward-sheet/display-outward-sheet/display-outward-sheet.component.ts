import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { ApiServiceService } from 'src/service/api-service.service';
import { AutoCompletedInputService } from 'src/service/auto-completed-input.service';
import { DataControllerService } from 'src/service/data-controller.service';
import { PdfDownloadService } from 'src/service/pdf-download.service';
import { ServiceService } from 'src/service/service.service';
import { UICALENDERService } from 'src/service/ui-calender.service';
import { ValidationService } from 'src/service/validation.service';
declare var $: any;

@Component({
  selector: 'app-display-outward-sheet',
  templateUrl: './display-outward-sheet.component.html',
  styleUrls: ['./display-outward-sheet.component.css']
})
export class DisplayOutwardSheetComponent implements OnInit {
  DEPOT_ALL: any = [];
  DEPOT_CODE: any = [];
  r: any = [];
  DATA: any = [];
  DEPOT_NAME_CODE_OBJECT: any = [];

  constructor (public service: ServiceService,
    private Validation: ValidationService,
    public Api_Service: ApiServiceService,
    protected PreviewData: DataControllerService,
    public DropDown: AutoCompletedInputService,
    public UI_CALENDER: UICALENDERService,
    public pdfDownnload: PdfDownloadService) {}
  LoadTableData(Event: any, data: any) {
    if (this.Validation.isEmptyObject2(data, ['Select Month', 'Select Year', 'Select Depot'], Event)) {
      $("." + Event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
      data['Depot_Code'] = this.DEPOT_CODE[data['Depot_Name']];
      $('.START_DATE').html("Selected Start Date is <br>" + data['Start_Date']);
      $('.END_DATE').html("Selected End Date is <br>" + data['End_Date']);
      $('.DEPOT_NAME').html("Selected Depot Name is <br>" + data['Depot_Name']);
      $('.DEPOT_CODE').html("Selected Depot Code is <br>" + this.DEPOT_CODE[data['Depot_Name']]);
      this.service.getOutwardTableData(data);
      this.PreviewData.setData('OutwardSheetViewSelect', data);
    }
  }
  public openPDF(Type: any): void {
    if (Type=='.pdf') {
      $("#OUTER_TABLE").tableHTMLExport({
        type: 'pdf',
        filename: 'sample.pdf',
        orientation:'pt'
      });
    } else if (Type=='.xls') {

    }
    else if (Type=='.json') {
      $("#OUTER_TABLE").tableHTMLExport({
        type: 'json',
        filename: 'sample.json'
    });
    }
    else if (Type=='.csv') {
      $("#OUTER_TABLE").tableHTMLExport({
        type: 'csv',
        filename: 'sample.csv'
    });
    }
}
  ngOnInit(): void {
    this.UI_CALENDER.datePicker('#Start_Date');
    this.UI_CALENDER.datePicker('#End_Date');
    this.service.ALLDepotCode().then((res) => {
      this.r = res;
      this.DEPOT_NAME_CODE_OBJECT['Select Option'] = 'Select Option';
       for (let index = 0; index < this.r.length; index++) {
         this.DEPOT_ALL[index] = (this.r[index]['depot_name']);
         this.DEPOT_CODE[this.r[index]['depot_name']] = this.r[index]['depot_code'];
         this.DEPOT_NAME_CODE_OBJECT[this.r[index]['depot_code']] = this.r[index]['depot_name'];
       }
    });
    this.DATA = this.PreviewData.getData('OutwardSheetViewSelect');
    this.DropDown.DropDownShow('#depot_Name', this.DEPOT_NAME_CODE_OBJECT,null);
    this.DropDown.DropDownShow('#select_option_bag_ton', ['Bag', 'Ton'], (res:any) => {
      if (res=='Ton') {
        this.service.CONVERT_TON_BAG = 20;
      } else {
        this.service.CONVERT_TON_BAG = 1;
      }
    });
    // setTimeout(() => {
    //   if (this.DATA != null && this.DATA != undefined) {
    //     $(`#depot-code-select option[value='${this.DATA['Depot_Name']}']`).attr("selected", "selected");
    //     $('.inward-search-btn').click();
    //   } else {
    //   }
    // }, 1500);
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
}
