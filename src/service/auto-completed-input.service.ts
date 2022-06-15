import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AutoCompletedInputService {
  private renderer!: Renderer2;
  TIMER: any = null;
  popupLeft: any = null;
  popupTop: any = null;
  results: any = [];
  SELECTED_INDEX = 0;
  SELECTED_CLASS_NAME: any = [];
  filterArr:any = [];
  SELECTED_VALUE: any = null;
  constructor (rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  AutoCompletedLoad() {
    $('.style-AutoCompletedPopup,.AutoCompletedPopup').remove();
    var TEMPLATE_TOST_CLASS = `
    <div class="AutoCompletedPopup" id="AutoCompletedPopup" #AutoCompletedPopup></div>`;
    var TEMPLATE_TOST_CLASS_CSS = `
  .AutoCompletedPopup{
    display: none;
    grid-template-columns: repeat(1,1fr);
    min-width: 300px;
    max-width: 50%;
    min-height: 30px;
    max-height: 380px;
    position: absolute;
    top: 65px;
    right: 10px;
    padding: 15px;
    background-color: #0b131a;
    align-items: center;
    justify-content: left;
    border-radius: 5px;
    box-shadow: 0px 0px 3px 2px #9d9999;
    color: white;
    text-align: left;
    gap: 10px;
    overflow: auto;
    animation: opacity-animation .5s ease-in-out;
  }
  .AutoCompletedPopup h3{
    font-size: .9rem;
    margin: auto;
    text-align: left;
    margin-left: 0;
    box-shadow: 0px 0px 2px 2px #fffbfb;
    padding: 5px;
    width: 100%;
    border-radius: 5px;
    padding-left: 10px;
    cursor:pointer;
  }
  .AutoCompletedPopup .border-bottom{
    width: 95%;
    position: absolute;
    top: 3px;
    left: 9px;
    border-bottom: 5px solid white !important;
    border-radius: 5px;
    }
    @keyframes opacity-animation{
      from{
        opacity:0;
      }
      to{
        opacity:1;
      }
    }
    `;
    $('body').append(TEMPLATE_TOST_CLASS);
    $(`<style class="style-AutoCompletedPopup">${TEMPLATE_TOST_CLASS_CSS}</style>`).appendTo('head');
  }
  AutoCompletedShow(Class_OR_Id: any, DATA: any) {
    this.keyEventAdd(Class_OR_Id, DATA);
    this.DataLoad(DATA, '.AutoCompletedPopup', Class_OR_Id);
    this.bodyOutside(Class_OR_Id, '.AutoCompletedPopup');

    $(Class_OR_Id).click((e: any) => {
      $('.AutoCompletedPopup').css('display', 'none');
      var BoundingClientRect = $(Class_OR_Id)[0].getBoundingClientRect();
      this.popupTop = window.scrollY + BoundingClientRect.top + BoundingClientRect.height;// Y
      this.popupLeft = window.scrollX + BoundingClientRect.left; // X
      $('.AutoCompletedPopup').css({
        'width': BoundingClientRect.width + 'px',
        'top': this.popupTop + 5 + 'px',
        'left': this.popupLeft + 'px'
      });
    });
  }
  keyEventAdd(Class_OR_Id: any, data: any) {
    this.TIMER = null;
    $(Class_OR_Id).keyup((event: any) => {
      clearTimeout(this.TIMER);
      $('.AutoCompletedPopup').css('display', 'none');
      this.TIMER = setTimeout(() => {
        $('.AutoCompletedPopup').css('display', 'grid');
        this.handleSearch(Class_OR_Id, data);
      }, 1000);
    });
  }
  DataLoad(data: any, ClassName: string, InputClassName: any) {
    $(ClassName).empty();
    var H3_TAG = [];
    for (let index = 0; index < data.length; index++) {
      var CLASS_NAME = 'custom-popup-text';
      H3_TAG[index] = this.renderer.createElement('h3');
      H3_TAG[index].classList.add(CLASS_NAME);
      this.renderer.setProperty(H3_TAG[index], 'innerText', data[index]);
      this.renderer.setAttribute(H3_TAG[index], 'value', data[index]);
      this.renderer.setAttribute(H3_TAG[index], 'data-index', `${index}`);
      this.renderer.listen(H3_TAG[index], 'click', (event) => {
        this.EventTextSelect(ClassName,InputClassName,data[index]);
        console.log(event)
      });
      this.renderer.appendChild($(ClassName)[0], H3_TAG[index]);
    }
  }
  EventTextSelect(MainClass: string, Input_Class_List: any, value: any) {
    $(Input_Class_List).val(value);
    $(MainClass).hide();
  }
  handleSearch(InputClassName: any, DATA: any) {
    var value = $(InputClassName).val();
    if (value) {
      var filterArr = [];
      for (var i in DATA) {
        if (DATA[i].toLowerCase().indexOf(value.toLowerCase()) != -1) {
          filterArr[filterArr.length] = DATA[i];
        }
      }
      if (filterArr.length != 0) {
        this.DataLoad(filterArr, '.AutoCompletedPopup', InputClassName);
      }
      else {
        $('.AutoCompletedPopup').css('display', 'none');
      }
    }
  }

  DropDown() {
    $('.style-DropDownPopup,.DropDownPopup').remove();
    var TEMPLATE_TOST_CLASS = `
   <div class="DropDownPopup" id="DropDownPopup" #DropDownPopup></div>`;
    var TEMPLATE_TOST_CLASS_CSS = `
 .DropDownPopup{
   display: none;
   grid-template-columns: repeat(1,1fr);
   min-width: 200px;
   max-width: 50%;
   min-height: 30px;
   max-height: 250px;
   position: absolute;
   top: 65px;
   right: 10px;
   padding: 15px;
   background-color: #0b131a;
   align-items: center;
   justify-content: left;
   border-radius: 5px;
   box-shadow: 0px 0px 3px 2px #9d9999;
   color: white;
   text-align: left;
   gap: 10px;
   overflow: auto;
   animation: opacity-animation .1s ease-in-out;
 }
 .DropDownPopup h3{
  font-size: 12px;
  margin: auto;
  text-align: left;
  margin-left: 0;
  box-shadow: 0px 0px 2px 2px #fffbfb;
  padding: 5px;
  width: 100%;
  border-radius: 20px;
  padding-left: 10px;
  cursor: pointer;
  display: flex;
  padding-right: 20px;
 }
 .DropDownPopup h3:hover{
  background-color: white;
  color: black;
  font-weight: bold;
 }
 .DropDownPopup .border-bottom{
   width: 95%;
   position: absolute;
   top: 3px;
   left: 9px;
   border-bottom: 5px solid white !important;
   border-radius: 5px;
   }
   .text-right{
     margin:auto;
     margin-right:0;
     text-align:left;
   }
   .selected{
    background-color: #1919c0;
   }
   @keyframes opacity-animation{
     from{
       opacity:0;
     }
     to{
       opacity:1;
     }
   }
   `;
    $('body').append(TEMPLATE_TOST_CLASS);
    $(`<style class="style-DropDownPopup">${TEMPLATE_TOST_CLASS_CSS}</style>`).appendTo('head');
  }
  DropDownShow(Class_OR_Id: any, DATA: any,callback:any) {
    $(Class_OR_Id).empty();
    $($(Class_OR_Id)).addClass(`arrow-down`);
    if ($(Class_OR_Id).val() == '') {
      $(Class_OR_Id).val(DATA[0]);
    }
    $(`#svg-${Class_OR_Id.replace('#','')}`).remove();
    $($(Class_OR_Id).parent()).append(`<span class="svg-cal-drop-down" id="svg-${Class_OR_Id.replace('#','')}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"/></svg></span>`);
    this.keyEventAddDropDown(Class_OR_Id, DATA);
    this.bodyOutside(Class_OR_Id, '.DropDownPopup');
    $(Class_OR_Id).focus( function() {
      $($('#svg-'+Class_OR_Id.replace('#',''))).empty();
      $($('#svg-'+Class_OR_Id.replace('#',''))).html(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 352c-8.188 0-16.38-3.125-22.62-9.375L192 205.3l-137.4 137.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25C368.4 348.9 360.2 352 352 352z"/></svg>`);
    });
    $(Class_OR_Id).blur( function() {
      $($('#svg-'+Class_OR_Id.replace('#',''))).empty();
      $($('#svg-'+Class_OR_Id.replace('#',''))).html(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"/></svg>`);
      setTimeout(() => {
        $('.DropDownPopup').hide();
        $('.DropDownPopup').empty();
      },500);
    });

    $(Class_OR_Id).click((e: any) => {
      if (Object.prototype.toString.call(DATA) === '[object Object]') {
        this.DataLoadDropDownKeyArray(Class_OR_Id, DATA);
      } else if (Object.prototype.toString.call(DATA) === '[object Array]') {
        this.DataLoadDropDownArray(Class_OR_Id, DATA,callback);
      }
      $('.DropDownPopup').css('display', 'grid');
      var BoundingClientRect = $(Class_OR_Id)[0].getBoundingClientRect();
      this.popupTop = window.scrollY + BoundingClientRect.top + BoundingClientRect.height;// Y
      this.popupLeft = window.scrollX + BoundingClientRect.left; // X
      $('.DropDownPopup').css({
        'width': BoundingClientRect.width + 'px',
        'top': this.popupTop + 5 + 'px',
        'left': this.popupLeft + 'px'
      });
    });
  }
  DataLoadDropDownArray(Class_OR_Id: any, DATA: any,callback:any) {
    $('.DropDownPopup').empty();
    var H3_TAG = [];
    var index = 0;
    var CLASS_NAME = Class_OR_Id.replace('#', '')+'-custom-popup-text';
    for (const key in DATA) {
      H3_TAG[index] = this.renderer.createElement('h3');
      H3_TAG[index].classList.add(CLASS_NAME);
      if (parseInt(key)===index) {
        this.renderer.setProperty(H3_TAG[index], 'innerHTML',`<span class="text-left">${DATA[key]}</span>`);
      }
      else {
        this.renderer.setProperty(H3_TAG[index], 'innerHTML',`<span class="text-left">${DATA[key]}</span> <span class="text-right"> ${key}</span>`);
      }
      H3_TAG[index].classList.add(`${Class_OR_Id.replace('#', '')}-h3-class-${(index + 1)}`);
      this.renderer.setAttribute(H3_TAG[index], 'value', DATA[key]);
      this.renderer.setAttribute(H3_TAG[index], 'data-index', `${index+1}`);
      this.renderer.listen(H3_TAG[index], 'click', (event) => {
        this.SELECTED_CLASS_NAME[Class_OR_Id] = $(event.target)[0].classList[1];
        this.EventTextSelectDropDown('.DropDownPopup', Class_OR_Id, DATA[key]);
        if (callback!=undefined && callback!=null && callback!='') {
          callback(DATA[key]);
        }
      });
      this.renderer.appendChild($('.DropDownPopup')[0], H3_TAG[index]);
      index++;
      if ((index) == Object.keys(DATA).length) {
        $(CLASS_NAME).removeClass('selected');
        if (Object.keys(this.SELECTED_CLASS_NAME).length != 0) {
          $('.'+this.SELECTED_CLASS_NAME[Class_OR_Id]).addClass('selected');
        }
      }
    }
  }
  DataLoadDropDownKeyArray(Class_OR_Id: any, DATA: any) {
    var H3_TAG = [];
    var index = 0;
    for (const key in DATA) {
      var CLASS_NAME = 'custom-popup-text';
      H3_TAG[index] = this.renderer.createElement('h3');
      H3_TAG[index].classList.add(CLASS_NAME);
      this.renderer.setProperty(H3_TAG[index], 'innerText',`<span class="text-left">${DATA[key]}</span> : <span class="text-right">${key}</span>`);
      this.renderer.setAttribute(H3_TAG[index], 'value', DATA[key]);
      this.renderer.setAttribute(H3_TAG[index], 'data-index', `${index}`);
      this.renderer.listen(H3_TAG[index], 'click', (event) => {
        this.SELECTED_CLASS_NAME[Class_OR_Id]=$(event.target)[0].classList[1];
        this.EventTextSelectDropDown('.DropDownPopup', Class_OR_Id, DATA[key]);
      });
      this.renderer.appendChild($('.DropDownPopup')[0], H3_TAG[index]);
      index++;
    }
  }

  keyEventAddDropDown(Class_OR_Id: any,data:any) {
    this.TIMER = null;
    $(Class_OR_Id).keyup((event:any)=>{
      clearTimeout(this.TIMER);
      $('.DropDownPopup').css('display', 'none');
      this.TIMER = setTimeout(() => {
        $('.DropDownPopup').css('display', 'grid');
        this.DropDownhandleSearch(Class_OR_Id,data);
      }, 1000);
    });
  }
  EventTextSelectDropDown(MainClass:string,Input_Class:any,value:any) {
    $(Input_Class).val(value);
    $(MainClass).hide();
    $(MainClass).empty();
    this.SELECTED_VALUE = value;
  }
  bodyOutside(MAIN_CLASS_POPUP: string, CLOSE_DIV: string) {
    $(MAIN_CLASS_POPUP).click(function(e:any){
      e.stopPropagation();
    });
    document.addEventListener('scroll', function (event: any) {
      if (event.target.className!=CLOSE_DIV.replace('.','')) {
        $(CLOSE_DIV).hide();
        $(MAIN_CLASS_POPUP).empty();
      }
    }, true);
  $(document).click(function(){
    $(CLOSE_DIV).hide();
    $(MAIN_CLASS_POPUP).empty();
  });
  }
  _add_right_text_css(ClassName: any) {
    console.log($('.' + ClassName + '-custom-popup-text  .text-left'));
    return {
      left: $('.'+ClassName+ '-custom-popup-text  .text-left'),
      right:$('.'+ClassName+ '-custom-popup-text .text-right')
    };
  }
  DropDownhandleSearch(InputClassName: any, DATA: any) {
    var value = $(InputClassName).val();
    if (value) {
      this.filterArr = [];
      for (var i in DATA) {
        if (DATA[i].toLowerCase().indexOf(value.toLowerCase()) != -1) {
          this.filterArr[i] = DATA[i];
        }
      }
      if (Object.keys(this.filterArr).length != 0) {
        this.DataLoadDropDownArray(InputClassName,this.filterArr,null);
      }
      else {
        $('.DropDownPopup').css('display', 'none');
      }
    }
  }
  getDropDownValue() {
    return  this.SELECTED_VALUE;
  }
  getDropDownClassEvent() {
    return $('.custom-popup-text');
  }
}
