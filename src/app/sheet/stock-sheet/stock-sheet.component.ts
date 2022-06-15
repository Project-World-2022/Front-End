import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { ApiServiceService } from 'src/service/api-service.service';
import { AutoCompletedInputService } from 'src/service/auto-completed-input.service';
import { DataControllerService } from 'src/service/data-controller.service';
import { ServiceService } from 'src/service/service.service';
import { UICALENDERService } from 'src/service/ui-calender.service';
import { ValidationService } from 'src/service/validation.service';
declare var $: any;

@Component({
  selector: 'app-stock-sheet',
  templateUrl: './stock-sheet.component.html',
  styleUrls: ['./stock-sheet.component.css']
})
export class StockSheetComponent implements OnInit {
  DEPOT_ALL: any = [];
  DEPOT_CODE: any = [];
  r: any = [];
  DATA: any = [];
  DEPOT_NAME_CODE_OBJECT: any = [];
  constructor (public service: ServiceService,
    public Api_Service: ApiServiceService,
    private Validation: ValidationService,
    protected PreviewData: DataControllerService,
    public DropDown: AutoCompletedInputService,
    public UI_CALENDER: UICALENDERService) {
    service.ALLDepotCode().then((res) => {
      this.r = res;
      this.DEPOT_NAME_CODE_OBJECT['Select Option'] = 'Select Option';
      for (let index = 0; index < this.r.length; index++) {
        this.DEPOT_ALL[index] = (this.r[index]['depot_name']);
        this.DEPOT_CODE[this.r[index]['depot_name']] = this.r[index]['depot_code'];
        this.DEPOT_NAME_CODE_OBJECT[this.r[index]['depot_code']] = this.r[index]['depot_name'];
      }
      this.DEPOT_ALL.sort();
      this.DATA = this.PreviewData.getData('StocksheetView_1');
      setTimeout(() => {
        this.DropDown.DropDownShow('#select_option_bag_ton',['Bag','Ton'],null);
        this.DropDown.DropDownShow('#depot_Name', this.DEPOT_NAME_CODE_OBJECT,null);
      },1000);
   });
   }
  LoadTableData(Event:any,data:any) {
    if (this.Validation.isEmptyObject2(data, ['Select Depot'], Event)) {
      $("." + Event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
      data['Depot_Code'] = this.DEPOT_CODE[data['Depot_Name']];
      $('.START_DATE').html("Selected Start Date is <br>" + data['Start_Date']);
      $('.DEPOT_NAME').html("Selected Depot Name is <br>" + data['Depot_Name']);
      $('.DEPOT_CODE').html("Selected Depot Code is <br>" + this.DEPOT_CODE[data['Depot_Name']]);
      this.service.getStockTableData(data);
      this.service.getNewStockTableData(data);
      this.PreviewData.setData('StocksheetView_1', data);
    }
  }

  ngOnInit(): void {
    this.UI_CALENDER.datePicker('#Start_Date');
    setTimeout(() => {
      if (this.DATA != null && this.DATA != undefined) {
        $(`#depot-code-select option[value='${this.DATA['Depot_Name']}']`).attr("selected", "selected");
        $('.search-btn').click();
        // this.router.navigate(['/InwardSheet/AddInwardSheet']);
      } else {
      }
    }, 1500);
  }
  BagTon(event: any) {
    if (event=='Ton') {
      this.service.CONVERT_TON_BAG = 20;
    } else {
      this.service.CONVERT_TON_BAG = 1;
    }
  }
}
