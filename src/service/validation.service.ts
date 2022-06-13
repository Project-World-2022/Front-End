import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { CustomToolTipsService } from 'src/app/custom-model/custom-tool-tips.service';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  k: any = [];
  EMPTY_LIST: any = [];
  list: any = [];
  mobNumber: number = 0;
  constructor (private Notification: CustomToolTipsService) { }

  isEmptyObject(obj: any) {
    this.EMPTY_LIST = [];
    var count = 0;
    var bool = false;
    var count2 = 0;
    for (const key in obj) {
      count++;
      if (obj[key] == 'Select Option' || obj[key] == undefined || obj[key] == '' || obj[key] == null) {
        count2++;
        this.EMPTY_LIST[key] = `Please Check ${key} is Empty!`;
      }
      if (count == Object.keys(obj).length) {
        if (this.mobilenumber(obj['DriverMobileNumber']) == false) {
          this.EMPTY_LIST['Mobile_Number'] = `Not a valid Phone Number`;
        }
        this.Notification.ToolTips_AnimationStart(8, this.EMPTY_LIST, null);
      }
    }
    if (count2 == 0) {
      bool = true;
    } else {
      bool = false;
    }
    return bool;
  }
  isEmptyObject2(obj: any, validationList: any, EventId: any) {
    this.EMPTY_LIST = [];
    var count = 0;
    var bool = false;
    var count2 = 0;
    for (const key in obj) {
      count++;
      for (let index = 0; index < validationList.length; index++) {
        if (obj[key] == validationList[index] || obj[key] == undefined || obj[key] == '' || obj[key] == null) {
          count2++;
          this.EMPTY_LIST[key] = `Please Check ${key} is Empty!`;
        }
      }
      if (count == Object.keys(obj).length) {
        this.Notification.ToolTips_AnimationStart(8, this.EMPTY_LIST, EventId);
      }
    }
    if (count2 == 0) {
      bool = true;
    } else {
      bool = false;
    }
    return bool;
  }
  _isEmptyObject(obj: any, validationList: any, EventId: any) {
    this.EMPTY_LIST = [];
    var count = 0;
    var bool = false;
    var count2 = 0;
    for (const key in obj) {
      count++;
      for (let index = 0; index < validationList.length; index++) {
        var d = ``;
        if (obj[key].value == validationList[index] || obj[key].value == undefined || obj[key].value == 'undefined' || obj[key].value == '' || obj[key].value == null) {
          count2++;
          this.EMPTY_LIST[key] = `Please Check ${key} is Empty!`;
          obj[key].focus();
          obj[key].style.borderBottom = "2px solid red";
        } else {
          obj[key].style.borderBottom = "2px solid #373839a6";
        }
      }
      if (count == Object.keys(obj).length) {
        this.Notification.ToolTips_AnimationStart(8, this.EMPTY_LIST, EventId);
      }
    }
    if (count2 == 0) {
      bool = true;
    } else {
      bool = false;
    }
    return bool;
  }
  mobilenumber(Input_value: any) {
    var phoneno = /^\d{10}$/;
    if (Input_value.match(phoneno)) {
      return true;
    }
    else {
      return false;
    }
  }
  MobileNumberValidation(MobileNumber: any, Event: any) {
    var bool = false;
    if (MobileNumber.value.length == 10) {
      bool = true;
    } else {
      bool = false;
      this.Notification.ToolTips_AnimationStart(8, ['Mobile no. not vaild!'], Event);
    }
    return bool;
  }
  dateValidation(dateObject: any, Event: any) {
    var bool = false;
    var count = 0;
    var len = 0;
    this.list = [];
    for (const key in dateObject) {
      if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateObject[key])) {
      } else if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(dateObject[key])) {
      } else if (/^\d{1,2}\-\d{1,2}\-\d{4}$/.test(dateObject[key])) {
      } else if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateObject[key])) {
      } else {
        count++;
        this.list[key] = key + 'Date not valid';
      }
      if ((len + 1) == Object.keys(dateObject).length) {
        this.Notification.ToolTips_AnimationStart(8, this.list, Event);
      }
      len++;
    }
    if (count == 0) {
      bool = true;
    } else {
      bool = false;
    }
    return bool;
  }
  dateFormat(inputDate: any, format: any) {
    var d = new Date(inputDate),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }
  MobileNumberLimit(ClassName_Id: string) {
    $(document).ready(function() {
      $(ClassName_Id).on('keypress', (e:any)=> {
       var $this = $(e.target);
       var regex = new RegExp("^[0-9\b]+$");
       var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
       if ($this.val().length > 9) {
          e.preventDefault();
          return false;
        }
        if (e.charCode < 54 && e.charCode > 47) {
            if ($this.val().length == 0) {
              e.preventDefault();
              return false;
            } else {
              return true;
            }
        }
        if (regex.test(str)) {
          return true;
        }
        e.preventDefault();
        return false;
        });
      });
  }
}

