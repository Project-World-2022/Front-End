import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class UICALENDERService {

  month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  calendar: any = null;
  popupLeft: any = null;
  popupTop: any = null;
  SELECTED_INDEX: any = [];
  SELECTED_DATA_INDEX:any = [];
  appendCalender = `<div class="calendar">
          <div class="calendar-header">
              <span class="month-picker" id="month-picker">February</span>
              <div class="year-picker">
                  <span class="year-change" id="prev-year">
                     <i class='fas fa-arrow-left prev'></i>
                  </span>
                  <span id="year">2021</span>
                  <span class="year-change" id="next-year">
                    <i class='fas fa-arrow-right next' style='float:right' ></i>
                  </span>
              </div>
          </div>
          <div class="calendar-body">
              <div class="calendar-week-day">
                  <div>Su</div>
                  <div>Mo</div>
                  <div>Tu</div>
                  <div>We</div>
                  <div>Th</div>
                  <div>Fr</div>
                  <div>Sa</div>
              </div>
              <div class="calendar-days"></div>
          </div>
          <div class="month-list"></div>
      </div>`;
      CLASS_NAME:any = null;
      month_picker:any =null;
      CURRENT_TARGET:any = null;
  constructor () { }


isLeapYear = (year:any) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year:any) => {
    return this.isLeapYear(year) ? 29 : 28
}

  datePicker(className: any) {
    $(`.date-select`).remove();
  this.CLASS_NAME = className;
    var INPUT_ID1 = className.replace("#", "");
  var DIV_CLASS_NAME = "new" + INPUT_ID1;
  $(`#${ DIV_CLASS_NAME}calenderid`).remove();
    $($(className).parent()).append('<span class="far fa-calendar-alt svg-cal" id=' + DIV_CLASS_NAME + "calenderid" + '></span>');
    $(className).attr("autocomplete", "off");
    $(className).attr("readonly",true);
    setTimeout(() => {
      $(`#${DIV_CLASS_NAME}calenderid`).click((e: any) => {
        $(`.date-select`).remove();
        var today: any = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        if ($(className).val() == null || $(className).val() == '' || $(className).val() == 'undefined') {
          $(className).val(today);
        }
        this.show(e, className);
      });
      $(className).click((e: any) => {
        $(`.date-select`).remove();
        var today: any = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        if ($(className).val() == null || $(className).val() == '' || $(className).val() == 'undefined') {
          $(className).val('yyyy-mm-dd');
        }
        this.show(e, className);
      });
    }, 500);
    this.bodyOutside(`.date-picker-${className.replace('#','')}`,`.date-picker-${className.replace('#','')}`, className);
}

keyEventAddDropDown(Class_OR_Id: any,data:any) {
  $(Class_OR_Id).keyup((event:any)=>{
    $('.DropDownPopup').css('display', 'none');
  });
}
bodyOutside(MAIN_CLASS_POPUP: string, CLOSE_DIV: string,TargetClass_Id:any) {
  $(MAIN_CLASS_POPUP+',.year-change svg').click(function(e:any){
    e.stopPropagation();
    $(`.date-picker-${TargetClass_Id.replace('#','')}`).remove();
  });
  document.addEventListener('scroll', function (event: any) {
    if (event.target.className!=CLOSE_DIV.replace('.','')) {
      $(CLOSE_DIV).hide();
      $(`.date-picker-${TargetClass_Id.replace('#','')}`).remove();
    }
  }, true);

  window.onresize = (event:any)=> {
    $('.date-select').hide();
    $(`.date-select`).remove();
    // var BoundingClientRect = $(this.CLASS_NAME)[0].getBoundingClientRect();
    // this.popupTop = window.scrollY + BoundingClientRect.top + BoundingClientRect.height;// Y
    // this.popupLeft = window.scrollX + BoundingClientRect.left; // X
    // $('.svg-cal').css({'left':BoundingClientRect.width-25+'px'})
  };
  $(document).click(function (e: any) {
    if (TargetClass_Id.replace('#', '') != $(e.target).attr('id')
      && 'prev-year' != $(e.target).attr('id')
      && 'next-year' != $(e.target).attr('id')
      && 'month-picker' != $(e.target).attr('id')
      && 'month-name' != $(e.target)[0].className
      && 'svg-inline--fa fa-arrow-right fa-w-14 next' != $(e.target)[0].className.baseVal
      && 'svg-inline--fa fa-arrow-left fa-w-14 prev' != $(e.target)[0].className.baseVal
      && 'svg-inline--fa fa-calendar-alt fa-w-14 svg-cal' != $(e.target)[0].value) {
      $(CLOSE_DIV).hide();
      $(`.date-picker-${TargetClass_Id.replace('#','')}`).remove();
    }
  });
}
  show(event: any, Input_Id_Class: any) {
    $(`.date-select`).remove();
    setTimeout(() => {
      $(`.date-select`).remove();
      var doc = document.createElement('div');
      doc.className = `date-picker-${Input_Id_Class.replace('#','')} date-select`;
      doc.innerHTML = this.appendCalender;
      document.body.append(doc);

      this.calendar = document.querySelector('.calendar')
      let month_list = this.calendar.querySelector('.month-list')
      this.month_names.forEach((e, index) => {
        let month: any = document.createElement('div');
          month.innerHTML = `<div data-month="${index}" class='month-name'>${e}</div>`
          month.querySelector('div').onclick = () => {
              month_list.classList.remove('show')
              curr_month.value = index
              this.generateCalendar(index, curr_year.value,Input_Id_Class)
          }
        month_list.appendChild(month);
      });
      var BoundingClientRect = $(Input_Id_Class)[0].getBoundingClientRect();
      var MAIN_POPUP_BoundingClientRect = $('.date-select')[0].getBoundingClientRect();
      this.popupTop = window.scrollY + BoundingClientRect.top + BoundingClientRect.height;// Y
      this.popupLeft = window.scrollX + BoundingClientRect.left; // X
      console.log(window.scrollY,MAIN_POPUP_BoundingClientRect,BoundingClientRect);
      if (($(window).height()-80) > BoundingClientRect.y) {
        $(`.date-picker-${Input_Id_Class.replace('#','')}`).css({
          'width': BoundingClientRect.width>200?(BoundingClientRect.width+50)+'px':260 + 'px',
          'top': (this.popupTop-15) + 'px',
          'left':  (this.popupLeft-30)+ 'px'
        });
     }
     else {
      $(`.date-picker-${Input_Id_Class.replace('#','')}`).css({
        'width': BoundingClientRect.width>200?(BoundingClientRect.width+50)+'px':260 + 'px',
        'bottom': ($('.date-select').height()-30) + 'px',
        'left':  (this.popupLeft-30)+ 'px'
      });
     }

      this.month_picker = this.calendar.querySelector('#month-picker')
      this.month_picker.onclick = () => {
        month_list.classList.add('show');
      }
      let currDate = new Date()
      let curr_month = { value: currDate.getMonth() }
      let curr_year = { value: currDate.getFullYear() };
      if ($(Input_Id_Class).val() != undefined && $(Input_Id_Class).val() != ''
           && $(Input_Id_Class).val() != 'yyyy-mm-dd') {
        var INPUT_SPLIT = $(Input_Id_Class).val().split('-');
        this.generateCalendar(parseInt(INPUT_SPLIT[1])-1,parseInt(INPUT_SPLIT[0]),Input_Id_Class)
      } else {
        this.generateCalendar(curr_month.value, curr_year.value,Input_Id_Class)
      }

    $('#prev-year').click(() => {
      --curr_year.value;
      this.generateCalendar(curr_month.value, curr_year.value,Input_Id_Class);
    });
    $('#next-year').click(() => {
      ++curr_year.value;
      this.generateCalendar(curr_month.value, curr_year.value,Input_Id_Class);
    });
    },300)
}
generateCalendar = (month:any, year:any,Input_Id_Class:any) => {
    let calendar_days = this.calendar.querySelector('.calendar-days')
    let calendar_header_year = this.calendar.querySelector('#year')
    let days_of_month = [31, this.getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    calendar_days.innerHTML = ''
    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${this.month_names[month]}`
    this.month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    let first_day = new Date(year, month, 1)
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day:any = document.createElement('div')
        if (i >= first_day.getDay()) {
          day.classList.add('calendar-day-hover')
          day.id = 'id_' + (i - first_day.getDay() + 1);
          day.setAttribute('data-Index',Input_Id_Class.replace('#',''));
            day.innerHTML = i - first_day.getDay() + 1;
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
              day.classList.add('curr-date');
              day.setAttribute('title','Today date');
            }
        }
      if (day.innerHTML=='' || day.innerHTML==undefined) {
        day.setAttribute("readOnly", true);
        day.style.cursor = 'not-allowed';
      }
      calendar_days.appendChild(day);
      if ((i) == (days_of_month[month] + first_day.getDay() - 1)) {
        if (this.SELECTED_INDEX != null && this.SELECTED_INDEX != undefined) {
          for (const key in this.SELECTED_INDEX) {
           $(`.date-picker-${key}`+' .calendar-days #'+this.SELECTED_INDEX[key]['id']).addClass('active');
          }
        }
      }
    }
    let numberselector = this.calendar.querySelectorAll('.calendar-day-hover')
    var datemaker = "";
    numberselector.forEach((elements:any) => {
      $(elements).click((e: any) => {
        this.SELECTED_INDEX[Input_Id_Class.replace('#', '')] = {
          id: $(e.target).attr('id'),
          data_index:$(e.target).attr('data-index')
        };
            $(numberselector).removeClass('active');
            datemaker = e.target.innerHTML + "-" + $(".month-picker")[0].innerHTML + '-' + $('#year')[0].innerHTML;
            $(Input_Id_Class).val(this.formatDate(new Date(datemaker).toLocaleDateString()));
            $(e.currentTarget).addClass('active');
            $(`.date-picker-${this.CLASS_NAME.replace('#','')},.date-select`).remove();
        })
    });
}

formatDate(date:any) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}

}
