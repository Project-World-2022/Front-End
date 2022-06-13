import { Component, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  TEMPLATE_TOST_CLASS = `
      <div class="main-page" id="custom-popup">
      <div class="responsive-page">
      <div class="header-page">
        <h5 class="title-page">Custom Model</h5>
        <button class="btn btn-secondary close-btn" id="CLOSEBTN">Close</button>
      </div>
      <div class="middle-page"></div>
      <div class="footer-page">
          <h2>Rajput Org@</h2>
      </div>
      </div>
      </div>
  `;

  TEMPLATE_TOST_CLASS_CSS = `
  .main-page{
    display:none;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #00000029;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .responsive-page{
    min-width: 300px;
    min-height: 150px;
    max-width: 60%;
    max-height: 50%;
    background-color: #ebf0f0;
    border-radius: 10px;
    padding: 5px;
    box-shadow: 0px 0px 9px 2px #e9e7e7;
    margin: auto;
    transition: all .5s ease-in-out;
  }

  .header-page{
    border-bottom: 2px solid gray;
    padding: 5px;
    display: flex;
    gap: 30px;
    width: 100%;
    height: 55px;
    align-items: center;
  }

  .close-btn{
    width: 80px;
    height: 85%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 13px;
    margin: auto;
    margin-right: 0;
    font-size: 20px;
    background-color: transparent;
    border: none;
    color: black;
    font-weight: 700;
  }

  .title-page{
    font-size: 20px;
  }
  .middle-page{
    overflow-wrap: anywhere;
    width: 100%;
    height: 100%;
    padding: 30px;
    margin: auto;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
  }
  .footer-page{
    border-top: 2px solid #989696;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 10px;
    color: darkred;
  }
  .footer-page h2{
    font-size: 13px;
  }
  .Success-cls{
    background-color: #226b22;
    color: white;
  }
  .color-white{
    color:white;
  }

  .Error-cls{
    background-color:#860202;
    color: white;
  }
  `;

  constructor () {
    $('body').append(this.TEMPLATE_TOST_CLASS);
    $(`<style class="style-remove">${this.TEMPLATE_TOST_CLASS_CSS}</style>`).appendTo('head');
    $("#CLOSEBTN").click(function () {
      $("#custom-popup").hide();
    });
    this.removeAllClass();
    $("#custom-popup").hide();
  }

  showSuccess(message: any, title: any) {
    this.removeAllClass();
    $("#custom-popup").show();
    $(`.title-page`).html(title);
    $(`.middle-page`).html(message);
    this.HideTimer();
  }

  showError(message: any, title: any) {
    this.removeAllClass();
    $("#custom-popup").show();
    $(`.title-page`).html(title);
    $(`.middle-page`).html(message);
    this.HideTimer();
  }

  showInfo(message:any, title:any){
    $("#custom-popup").show();
  }

  showWarning(message:any, title:any){
    $("#custom-popup").show();
  }
  removeAllClass() {
    $("#custom-popup .responsive-page").removeClass('Success-cls');
    $("#custom-popup .responsive-page .footer-page").removeClass('color-white');
    $("#custom-popup .responsive-page").removeClass('Error-cls');
    $("#custom-popup .responsive-page .footer-page").removeClass('color-white');
  }

  HideTimer() {
    setTimeout(() => {
      this.removeAllClass();
      $("#custom-popup").hide();
    }, 10000);
  }

}
