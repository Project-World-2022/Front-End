import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomToolTipsService } from 'src/app/custom-model/custom-tool-tips.service';
import { ApiServiceService } from 'src/service/api-service.service';
import { AutoCompletedInputService } from 'src/service/auto-completed-input.service';
import { DataControllerService } from 'src/service/data-controller.service';
import { ServiceService } from 'src/service/service.service';
import { ValidationService } from 'src/service/validation.service';
import { InwwardServiceService } from '../../inward-sheet/inwward-service.service';
declare var $: any;

@Component({
  selector: 'app-add-outward-sheet',
  templateUrl: './add-outward-sheet.component.html',
  styleUrls: ['./add-outward-sheet.component.css']
})
export class AddOutwardSheetComponent implements OnInit {
  DEPOT_ALL: any = [];
  DEPOT_CODE: any = [];
  r: any = [];
  DATA: any = [];
  DEA_CODE:any = [];
  DEA_NAME:any = [];
  CURRENT_DATE = new Date().toDateString();
  DEPOT_NAME_CODE_OBJECT: any = [];

  constructor (public Inservice: InwwardServiceService, public service: ServiceService,
    public Api_Service: ApiServiceService, public InwardService: InwwardServiceService,
    protected router: Router, protected PreviewData: DataControllerService,
    private Validation: ValidationService,
    private Notification: CustomToolTipsService,
    public DropDown: AutoCompletedInputService) {
    this.service.isLoginCheck();
    this.CURRENT_DATE = this.Validation.dateFormat(this.CURRENT_DATE, 'yyyy-MM-dd');
    service.ALLDepotCode().then((res) => {
      this.r = res;
      this.DEPOT_CODE = ['Select Option'];
      this.DEPOT_NAME_CODE_OBJECT['Select Option'] = 'Select Option';
      for (let index = 0; index < this.r.length; index++) {
        this.DEPOT_ALL[index] = (this.r[index]['depot_name']);
        this.DEPOT_CODE[index] = this.r[index]['depot_code'];
        this.DEPOT_NAME_CODE_OBJECT[this.r[index]['depot_name']] = this.r[index]['depot_code'];
      }
      this.DEPOT_ALL.sort();
    });
    setTimeout(() => {
      var GradeList = ['Select Option'];
        for (let index = 0; index <  this.service.GRADE_LIST.length; index++) {
          GradeList.push(this.service.GRADE_LIST[index]);
        }
      this.DropDown.DropDownShow('#grade', GradeList);
      this.DropDown.DropDownShow('#depot_code',this.DEPOT_NAME_CODE_OBJECT);
    }, 1500);
    this.DATA = this.PreviewData.getData('OutwardSheet_Data');
    if (this.DATA!=undefined) {
      setTimeout(() => {
        $(`#truckArrangedBy option[value='${this.DATA['TruckArrangedBy']}']`).attr("selected", "selected");
       },1500);
    }
   }

  ngOnInit(): void {
    this.service.Dealer_Details().then((r: any) => {
      var DATA = r['Data']
      if (DATA != null && DATA != undefined) {
        for (let index = 0; index < DATA.length; index++) {
          this.DEA_CODE.push(DATA[index]['de_code']);
          this.DEA_NAME.push(DATA[index]['de_name']);
        }
        this.DEA_CODE.sort();
        this.DEA_NAME.sort();
        this.DropDown.AutoCompletedShow('#dealerCode', this.DEA_CODE);
        this.DropDown.AutoCompletedShow('#dealerName', this.DEA_NAME);
      }
    });
    this.Validation.MobileNumberLimit('#driverMobileNumber');
    this.Validation.MobileNumberLimit('#invoiceNumber');
  }
  LoadNextPanel(Event:any,ALL_INPUT_ID: any) {
    console.log(ALL_INPUT_ID)
    if (this.Validation._isEmptyObject(ALL_INPUT_ID, ['Select Option','undefined', 'Select Depot', 'Select option',
     '00/00/0000', '00-00-0000', '0000/00/00', '0000-00-00'], Event)) {
      this.StoreData(ALL_INPUT_ID);
      this.PreviewData.setData('OutwardSheet_Data', this.DATA);
      if (this.Validation.dateValidation({
        Entry_Date: this.DATA ['Entry_Date'],
        InvoiceDate: this.DATA ['InvoiceDate']
      }, Event) && this.Validation.MobileNumberValidation(ALL_INPUT_ID['DriverMobileNumber'], Event)) {
        console.log(this.DATA);
        var storeDate = this.service.getMonthYear(this.DATA['Entry_Date']);
        this.DATA['Month'] = storeDate.Month;
        this.DATA['Year'] = storeDate.Year;
        this.DATA['Day'] = storeDate.Day;
        if (this.checking(this.DATA)==true) {
          this.router.navigate(['OutwardSheet/PreviewSheet']);
        } else {
          if (Event!=null) {
            $("." + Event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
          }
        }
      }
    }
  }
   TDate(id:any) {
    var UserDate = $(id).val();
    var ToDate = new Date();
    if (new Date(UserDate).getTime() > ToDate.getTime()) {
        alert("The " + id + "Date must be less or Equal to today's date");
        $(id).val();
        return false;
    } else {
        return true;
    }
}
checking(data:any) {
  var invoiceQty = data['InvoiceQty'];
  var unloading = data['Unloading'];
  var transphipment = data['Transphipment'];
  var diversion = data['Diversion'];
  var inTimeOfTruck = data['InTimeOfTruck'];
  var outTimeOf = data['OutTimeOfTruck'];
  var bool = false;
  var outTimeOfTruck = "";
  if (outTimeOf == '--:-- --' || outTimeOf == '') {
      outTimeOfTruck = "NA";
  } else {
      outTimeOfTruck = outTimeOf;
  }

  if (inTimeOfTruck > outTimeOfTruck) {
    this.Notification.ToolTips_AnimationStart(15,['Intime should be less than out time'], null);
    bool = false;
  } else {
    bool = true;
  }
  if (Number(invoiceQty)< (Number(unloading) + Number(transphipment) + Number(diversion))) {
    this.Notification.ToolTips_AnimationStart(15,[(Number(invoiceQty).toFixed(3)) != (Number(unloading) + Number(transphipment) + Number(diversion)).toFixed(3) + "<br> Please check the Value of Invoice Quantity | Good Stock | Shortage | Cut and Torn"], null);
    bool = false;
  } else {
    bool = true;
  }
  return bool;
 }
  ResetData(DataReset:any) {
     console.log(DataReset)
  }
  StoreData(data: any) {
    this.DATA = {};
    for (const key in data) {
     this.DATA[key] = data[key].value;
   }
  }
}
