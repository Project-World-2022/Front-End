import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomToolTipsService } from 'src/app/custom-model/custom-tool-tips.service';
import { ApiServiceService } from 'src/service/api-service.service';
import { AutoCompletedInputService } from 'src/service/auto-completed-input.service';
import { DataControllerService } from 'src/service/data-controller.service';
import { ServiceService } from 'src/service/service.service';
import { ValidationService } from 'src/service/validation.service';
import { InwwardServiceService } from '../inwward-service.service';
declare var $: any;

@Component({
  selector: 'app-add-inward-sheet,appLoader',
  templateUrl: './add-inward-sheet.component.html',
  styleUrls: ['./add-inward-sheet.component.css']
})

export class AddInwardSheetComponent implements OnInit {
  DEPOT_ALL: any = [];
  DEPOT_CODE: any = [];
  SELECT_CODE = '';
  SELECT_MONTH = '';
  SELECT_YEAR = '';
  r: any = [];
  DATA: any = [];
  CURRENT_DATE = new Date().toDateString();
  DEPOT_NAME_CODE_OBJECT: any = [];

  constructor (public Inservice: InwwardServiceService, public service: ServiceService,
    public Api_Service: ApiServiceService, public InwardService: InwwardServiceService,
    protected router: Router,
    protected PreviewData: DataControllerService,
    public Validation: ValidationService, private Notification: CustomToolTipsService,
    public DropDown: AutoCompletedInputService) {
    this.CURRENT_DATE = this.Validation.dateFormat(this.CURRENT_DATE, 'yyyy-MM-dd');
    service.isLoginCheck();
    service.ALLDepotCode().then((res) => {
      this.r = res;
      this.DEPOT_CODE = ['Select Option'];
      this.DEPOT_NAME_CODE_OBJECT['Select Option'] = 'Select Option';
      for (let index = 0; index < this.r.length; index++) {
        this.DEPOT_ALL[index] = (this.r[index]['depot_name']);
        this.DEPOT_CODE.push(this.r[index]['depot_code']);
        this.DEPOT_NAME_CODE_OBJECT[this.r[index]['depot_name']] = this.r[index]['depot_code'];
      }
      this.DEPOT_ALL.sort();
      setTimeout(() => {
        var GradeList = ['Select Option'];
        for (let index = 0; index <  this.service.GRADE_LIST.length; index++) {
          GradeList.push(this.service.GRADE_LIST[index]);
        }
        this.DropDown.DropDownShow('#grade', GradeList);
        this.DropDown.DropDownShow('#depot_code',this.DEPOT_NAME_CODE_OBJECT);
       },1500);
    });
    this.DATA = this.PreviewData.getData('InwardSheet_Data');
    if (this.DATA!=undefined) {
      this.SELECT_CODE = this.DATA['Depot_Code'];
      this.SELECT_MONTH = this.DATA['Month'];
      this.SELECT_YEAR = this.DATA['Year'];
    }
   }

  ngOnInit(): void {
    this.DropDown.DropDownShow('#sourcePlant', this.SourcePlantData());
    this.DropDown.DropDownShow('#transporterCompany', this.InwardService.getTransporterCompanyName());
    this.Validation.MobileNumberLimit('#driverMobileNumber');
    this.Validation.MobileNumberLimit('#invoiceNumber');
  }
  LoadNextPanel(Event: any,ALL_INPUT_ID: any) {
   if (this.Validation._isEmptyObject(ALL_INPUT_ID, ['Select Option','undefined', 'Select Depot', 'Select option',
     '00/00/0000', '00-00-0000', '0000/00/00', '0000-00-00'], Event)) {
      this.StoreData(ALL_INPUT_ID);
      if (this.Validation.dateValidation({
        Entry_Date: this.DATA ['Entry_Date'],
        InvoiceDate: this.DATA ['InvoiceDate'],
        ArrivalDateOfTruck:this.DATA ['ArrivalDateOfTruck']
      }, Event) && this.Validation.MobileNumberValidation(ALL_INPUT_ID['DriverMobileNumber'],Event)) {
        var storeDate = this.getMonthYear(this.DATA['Entry_Date']);
        this.DATA['Month'] = storeDate.Month;
        this.DATA['Year'] = storeDate.Year;
        this.DATA['Day'] = storeDate.Day;
        ;
        if (this.checking(this.DATA)==true) {
          this.PreviewData.setData('InwardSheet_Data', this.DATA);
          this.router.navigate(['/InwardSheet/PreviewSheet']);
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
        $(id).val('');
        return false;
    } else {
        return true;
    }
   }
  checking(data:any) {
    var arrivalDateOfTruck = data['ArrivalDateOfTruck'];
    var invoiceQty = data['InvoiceQty'];
    var shortage = data['Shortage'];
    var cutAndTorn = data['CutAndTorn'];
    var goodStock = data['GoodStock'];
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

    if (inTimeOfTruck > outTimeOfTruck && new Date(arrivalDateOfTruck).getDay() ==
      new Date().getDay() && $("input[name='truckStatus']:checked").val()=='cleared') {
      this.Notification.ToolTips_AnimationStart(15,['Intime should be less than out time'], null);
      bool = false;
    } else {
      bool = true;
    }
    var d =Number(goodStock);
    var d1= (Number(unloading) + Number(transphipment) + Number(diversion));
    if (Number(invoiceQty) < (Number(shortage) + Number(cutAndTorn) + Number(goodStock))) {
      this.Notification.ToolTips_AnimationStart(15,[Number(invoiceQty) + (Number(shortage) + Number(cutAndTorn) + Number(goodStock)) + "<br> Please check the Value of Invoice Quantity | Good Stock | Shortage | Cut and Torn"], null);
      bool = false;
    } else if (d != d1) {
      this.Notification.ToolTips_AnimationStart(15,[Number(goodStock) + "|" + Number(unloading) + "|" + Number(transphipment) + "|" + Number(diversion) + "<br> Sum of Unloading | Diversion | Transphipment should be equal to Good Stock !!"], null);
      bool = false;
    } else {
      bool = true;
    }
    if ($('input[name=truckStatus]:checked').val() == undefined) {
      this.Notification.ToolTips_AnimationStart(15,['Please check truck status is empty!'], null);
      bool = false;
    }
    if (data['InvoiceNumber'].length!=10) {
      this.Notification.ToolTips_AnimationStart(15,['Please check invoice number length is should be 10-digit empty!'], null);
      bool = false;
    }
    return bool;
  }
  check() {
    if ($("input[name='truckStatus']:checked").val()=='halting') {
        $('#outTimeOfTruck').attr('type', 'text');
        $("#outTimeOfTruck").val('NA');
        $('#outTimeOfTruck').prop('disabled', true);
    }
 }
  check2() {
      if ($("input[name='truckStatus']:checked").val() == 'cleared') {
          $('#outTimeOfTruck').attr('type', 'time');
          $('#outTimeOfTruck').prop('disabled', false);
      }
  }
  ResetData(DataReset:any) {
     console.log(DataReset)
  }
  getMonthYear(date:string) {
    var dateObj = new Date(date);
    var month = dateObj.toLocaleString('default', { month: 'long' });
    var day = dateObj.toLocaleDateString('default', { weekday: 'long' });
    var year = dateObj.getUTCFullYear();
    return {Month:month,Year:year,Day:day}
  }
  StoreData(data: any) {
    this.DATA = {};
    for (const key in data) {
     this.DATA[key] = data[key].value;
   }
  }
  SourcePlantData() {
    return ['Select Option', 'Kadapa', 'Dalmiapuram', 'Venkatagiri Kote', 'Ariyalur', 'Yadwad', 'Belgaum'];
  }
}
