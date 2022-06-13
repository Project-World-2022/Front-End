import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomToolTipsService } from 'src/app/custom-model/custom-tool-tips.service';
import { NotificationService } from 'src/app/notification.service';
import { ApiServiceService } from 'src/service/api-service.service';
import { AutoCompletedInputService } from 'src/service/auto-completed-input.service';
import { DataControllerService } from 'src/service/data-controller.service';
import { ServiceService } from 'src/service/service.service';
import { ValidationService } from 'src/service/validation.service';
import { InwwardServiceService } from '../../inwward-service.service';
declare var $: any;

@Component({
  selector: 'app-update-inward-sheet',
  templateUrl: './update-inward-sheet.component.html',
  styleUrls: ['./update-inward-sheet.component.css']
})
export class UpdateInwardSheetComponent implements OnInit {
  DEPOT_ALL: any = [];
  DEPOT_CODE: any = [];
  SELECT_CODE = '';
  SELECT_MONTH = '';
  SELECT_YEAR = '';
  r: any = [];
  DATA: any = [];
  INPUT_DATA: any = [];
  DEPOT_NAME_CODE_OBJECT: any = [];

  constructor (public Inservice: InwwardServiceService, public service: ServiceService,
    public Api_Service: ApiServiceService, public InwardService: InwwardServiceService,
    protected router: Router,
    protected PreviewData: DataControllerService,
    private Validation: ValidationService,
    private Notification: CustomToolTipsService,
    private notifyService: NotificationService,
    public DropDown: AutoCompletedInputService) {
      service.isLoginCheck();
      service.ALLDepotCode().then((res) => {
        this.r = res;
        this.DEPOT_NAME_CODE_OBJECT['Select Option'] = 'Select Option';
        for (let index = 0; index < this.r.length; index++) {
          this.DEPOT_ALL[index] = (this.r[index]['depot_name']);
          this.DEPOT_CODE[index] = this.r[index]['depot_code'];
          this.DEPOT_NAME_CODE_OBJECT[this.r[index]['depot_name']] = this.r[index]['depot_code'];
        }
        this.DEPOT_ALL.sort();
        this.DATA = this.PreviewData.getData('UpdateInwardSheet_Data');
        if (this.DATA != null && this.DATA != undefined) {
          setTimeout(() => {
            var GradeList = ['Select Option'];
            for (let index = 0; index <  this.service.GRADE_LIST.length; index++) {
              GradeList.push(this.service.GRADE_LIST[index]);
            }
            this.DropDown.DropDownShow('#grade', GradeList);
            this.DropDown.DropDownShow('#depot_code', this.DEPOT_NAME_CODE_OBJECT);

            if ($("#outTimeOfTruck").val() != "") {
              var datediff = this.dateDiff($("#arrivalDateOfTruck").val(), $("#entryDate").val());
              var inp = $('#inTimeOfTruck').val().split(':');
              var out = $('#inTimeOfTruck').val().split(':');
              var haltHour = ((datediff * 24 * 60) + (out[0] * 60 + out[1]) - (inp[0] * 60 + inp[1]));
              var clearDateOfTruck = $("#entryDate").val();
              $("#haltHour").val(haltHour);
              $("#clearDateOfTruck").val(clearDateOfTruck);
            } else {
              var haltHour = 0;
              $("#haltHour").val(haltHour);
              $("#clearDateOfTruck").val('2000-01-01');
              $("#outTimeOfTruck").val('halting');
            }
          },1500);
        }
      });
  }

  ngOnInit(): void {
    this.DropDown.DropDownShow('#sourcePlant', this.SourcePlantData());
    this.DropDown.DropDownShow('#transporterCompany', this.InwardService.getTransporterCompanyName());
    this.Validation.MobileNumberLimit('#driverMobileNumber');
    this.Validation.MobileNumberLimit('#invoiceNumber');
  }
  SumbitData(event: any, data: any) {
    var ALL_DATA_INPUT = data;
    if (this.Validation._isEmptyObject(ALL_DATA_INPUT, ['Select Option', 'undefined', 'Select Depot', 'Select option',
      '00/00/0000', '00-00-0000', '0000/00/00', '0000-00-00'], event)) {
      this.StoreData(data);
      this.INPUT_DATA['Unique_Id'] = this.DATA['Unique_Id'];
      this.INPUT_DATA['HaltHour'] = $("#haltHour").val();
      this.INPUT_DATA['ClearDateOfTruck'] = $("#clearDateOfTruck").val();
      var storeDate = this.service.getMonthYear(this.INPUT_DATA['Entry_Date']);
       this.INPUT_DATA['Month'] = storeDate.Month;
       this.INPUT_DATA['Year'] = storeDate.Year;
       this.INPUT_DATA['Day'] = storeDate.Day;
      console.log(this.INPUT_DATA);
      if (this.Validation.dateValidation({
        Entry_Date: this.INPUT_DATA['Entry_Date'],
        InvoiceDate: this.INPUT_DATA['InvoiceDate'],
        ArrivalDateOfTruck: this.INPUT_DATA['ArrivalDateOfTruck']
      }, event) && this.Validation.MobileNumberValidation(data['DriverMobileNumber'], event)) {
        $("." + event.target.className).css({ 'pointer-events': 'none', 'cursor': 'default' });
        if (this.checking(this.INPUT_DATA) == true) {
          this.Notification.LoadingAnimation();
          this.service.UpdateInwardData(this.INPUT_DATA).subscribe(res => {
            console.log(res);
            setTimeout(() => {
              if (res['Status'] == true) {
                this.notifyService.showSuccess(res['Message'], "Success Update Data");
                $("." + event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
                this.backNavigate();
                this.Notification.removeAnimation();
              } else {
                this.notifyService.showError(res['Error']['sqlMessage'], "Error Update Data");
                $("." + event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
                this.backNavigate();
                this.Notification.removeAnimation();
              }
            },500);
          }, err => {
            this.notifyService.showError(err, "Error Update Data");
            $("." + event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
            // this.router.navigate(['/InwardSheet/AddInwardSheet']);
            this.Notification.removeAnimation();
          }
          );
        } else {
          if (event != null) {
            $("." + event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
          }
        }
      }
    }
  }
   dateDiff(date1:any, date2:any) {
    var date1_ts = Date.parse(date1);
    var date2_ts = Date.parse(date2);
    var diff = date2_ts - date1_ts;
    return Math.round(diff / 86400);
   }
  backNavigate() {
    this.router.navigate(['/InwardSheet/ViewInwardSheet']);
  }
  checking(data: any) {
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
    if (data['InvoiceNumber'].length!=10) {
      this.Notification.ToolTips_AnimationStart(15,['Please check invoice number length is should be 10-digit empty!'], null);
      bool = false;
    }
    return bool;
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
  getMonthYear(date:string) {
    var dateObj = new Date(date);
    var month = dateObj.toLocaleString('default', { month: 'long' });
    var day = dateObj.toLocaleDateString('default', { weekday: 'long' });
    var year = dateObj.getUTCFullYear();
    return {Month:month,Year:year,Day:day}
  }
  StoreData(data: any) {
    this.INPUT_DATA = {};
    for (const key in data) {
     this.INPUT_DATA[key] = data[key].value;
   }
  }
  SourcePlantData() {
    return ['Select Option', 'Kadapa', 'Dalmiapuram', 'Venkatagiri Kote', 'Ariyalur', 'Yadwad', 'Belgaum'];
  }
}
