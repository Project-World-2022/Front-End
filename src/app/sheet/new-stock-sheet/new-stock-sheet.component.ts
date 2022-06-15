import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { ApiServiceService } from 'src/service/api-service.service';
import { AutoCompletedInputService } from 'src/service/auto-completed-input.service';
import { DataControllerService } from 'src/service/data-controller.service';
import { ServiceService } from 'src/service/service.service';
import { ValidationService } from 'src/service/validation.service';
declare var $: any;

@Component({
  selector: 'app-new-stock-sheet',
  templateUrl: './new-stock-sheet.component.html',
  styleUrls: ['./new-stock-sheet.component.css']
})
export class NewStockSheetComponent implements OnInit {
  DEPOT_ALL: any = [];
  DEPOT_CODE: any = [];
  DEPOT_CODE_2: any = [];
  DEPOT_CODE_NAME: any = {};
  r: any = [];
  DATA: any = [];
  DEPOT_NAME_CODE_OBJECT: any = [];
  constructor (public service: ServiceService,
   public Api_Service: ApiServiceService,
    private Validation: ValidationService,
    protected PreviewData: DataControllerService,
    public DropDown: AutoCompletedInputService) {
    service.ALLDepotCode().then((res) => {
      this.r = res;
      this.DEPOT_NAME_CODE_OBJECT['Select Option'] = 'Select Option';
      for (let index = 0; index < this.r.length; index++) {
        this.DEPOT_ALL[index] = (this.r[index]['depot_name']);
        this.DEPOT_CODE[this.r[index]['depot_name']] = this.r[index]['depot_code'];
        this.DEPOT_CODE_2.push(this.r[index]['depot_code']);
        this.DEPOT_CODE_NAME[this.r[index]['depot_code']] = this.r[index]['depot_name'];
        this.DEPOT_NAME_CODE_OBJECT[this.r[index]['depot_code']] = this.r[index]['depot_name'];
      }
      this.DEPOT_ALL.sort();
      this.DATA = this.PreviewData.getData('NewStocksheetView_1');
      setTimeout(() => {
        this.DropDown.DropDownShow('#select_option_bag_ton', ['Bag', 'Ton'],null);
        this.DropDown.DropDownShow('#selectoptiondataview',['Select View','All','Depot Name'],null);
        this.DropDown.DropDownShow('#depot_Name', this.DEPOT_NAME_CODE_OBJECT,null);
      },1000);
   });
   }
   LoadTableData(Event:any,data:any) {
    if (this.Validation.isEmptyObject2(data, ['Select Depot222','Select View'], Event)) {
      $("." + Event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
      if (data['Select_View_Type']!='All') {
        data['Depot_Code'] = this.DEPOT_CODE[data['Depot_Name']];
        $('.DEPOT_NAME').html("Selected Depot Name is <br>" + data['Depot_Name']);
        $('.DEPOT_CODE').html("Selected Depot Code is <br>" + this.DEPOT_CODE[data['Depot_Name']]);
        $('.SELECT_VIEW_TYPES').html("Selected View Type is <br>" + data['Select_View_Type']);
      } else {
        data['Depot_Code'] = 'All';
        $('.DEPOT_NAME').html("Selected Depot Name is <br>" + 'ALL');
        $('.DEPOT_CODE').html("Selected Depot Code is <br>" + 'ALL');
        $('.SELECT_VIEW_TYPES').html("Selected View Type is <br>" + data['Select_View_Type']);
      }
      data['Depot_Name_List'] = this.DEPOT_CODE_NAME;
      data['Depot_Code_List'] = this.DEPOT_CODE_2;
      $('.START_DATE').html("Selected Start Date is <br>" + data['Start_Date']);
      $('.END_DATE').html("Selected End Date is <br>" + data['End_Date']);
      this.service.getNewStockTableData_2(data);
      this.PreviewData.setData('NewStocksheetView_1', data);
    }
  }
  onchangeView(data:any) {
    if (data.Select_Value=='All') {
      $(data.Id).attr('disabled', true);
    }else {
      $(data.Id).attr('disabled', false);
    }
  }
  ngOnInit(): void {
    setTimeout(() => {
      if (this.DATA != null && this.DATA != undefined) {
        if (confirm('You want reload previous data')) {
          $(`#depot-code-select option[value='${this.DATA['Depot_Name']}']`).attr("selected", "selected");
          $(`#select-option-data-view option[value='${this.DATA['Select_View_Type']}']`).attr("selected", "selected");
          $('.search-btn').click();
        }
        // this.router.navigate(['/InwardSheet/AddInwardSheet']);
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
