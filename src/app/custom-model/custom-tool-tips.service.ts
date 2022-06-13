import { Injectable, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CustomToolTipsService {
  private renderer!: Renderer2;
  TIMER: any = '';

  constructor (protected router: Router, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  TEMPLATE_TOST_CLASS = `
  <div class="Tool-tips-main-page" id="Tool-tips-custom-popup">
  <div class="Tool-tips-responsive-page">
  <div class="Tool-tips-header-page top-bg-color">
    <h5 class="Tool-tips-title-page">Hello Model</h5>
  </div>
  <div class="Tool-tips-middle-page"></div>
  </div>
  </div>
`;

  TEMPLATE_TOST_CLASS_CSS = `
    .Tool-tips-main-page{
    display:none;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #00000029;
    align-items: center;
    justify-content: center;
    }

    .Tool-tips-responsive-page{
      min-width: 300px;
      max-width: 60%;
      max-height: 58%;
      background-color: #f9f8f8;
      border-radius: 10px;
      padding: 0px;
      box-shadow: 0px 0px 5px 5px #e0dddd5c;
      margin: auto;
      transition: all .3s ease-in-out;
    }

    .Tool-tips-header-page{
      padding: 5px;
      display: flex;
      width: 100%;
      align-items: center;
      background-color: #000a92;
      color: white;
      margin: auto;
      margin-top: 0;
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
      font-family: 'Balsamiq Sans';
    }

    .Tool-tips-title-page{
      font-size: 16px;
      margin: auto;
      margin-left: 10px;
    }
    .Tool-tips-middle-page{
        overflow-wrap: anywhere;
        width: 100%;
        height: 100%;
        margin: auto;
        display: flex;
        flex-direction: column;
        padding: 5px;
        gap:10px;
        padding-bottom: 15px;
    }
    .Tool-tips-footer-page{
      margin: auto;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: end;
      color: darkred;
      padding: 0;
      padding-top: 5px;
      background-color: #000a92;
      color: white;
      padding-right: 10px;
    }
    .Tool-tips-footer-page h2{
      font-size: 13px;
    }
    .Tool-tips-footer-page button{
      margin: auto;
    margin-left: 20px;
    padding: 5px;
    margin-bottom: 5px;
    background-color: transparent;
    font-size: 18px;
    color: white;
    text-decoration: underline;
    outline: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
    }
    .ADD-DATA{
      margin: auto;
      margin-left: 0;
      width: 100%;
      padding: 5px;
      margin-top: 0;
      box-shadow: 0px 0px 3px 2px #c9bbbb;
      border-radius: 5px;
    }
  `;

  LoadToolTips() {
    $('.style-remove-1,.Tool-tips-main-page').remove();
    $(`<style class="style-remove-1">${this.TEMPLATE_TOST_CLASS_CSS}</style>`).appendTo('head');
    $('body').append(this.TEMPLATE_TOST_CLASS);
    $('.Tool-tips-header-page #CLOSEBTN').click(function () {
      $('#Tool-tips-custom-popup').hide();
    });
    $('#Tool-tips-custom-popup').hide();
  }
  ShowToolTips($event: any, message: any, title: any) {
    $('#Tool-tips-custom-popup').show().css('display', 'flex');
    this.OutSideCOntroller($event,'.Tool-tips-responsive-page','#Tool-tips-custom-popup');
    var KEY_NAME = Object.keys(message);
    var CREATE_P_TAG = ``;
    for (let index = 0; index < KEY_NAME.length; index++) {
      CREATE_P_TAG += `<p class='ADD-DATA'>${KEY_NAME[index]} : ${message[KEY_NAME[index]]}</p>`;
    }
    var LEFT_POS = $event.pageX - $event.offsetX;
    $('.Tool-tips-responsive-page').css({
      'position':'absolute',
      'top': `50px`,
      'left':`${(LEFT_POS-230)}px`
    });
     $(`.Tool-tips-title-page`).html(title);
    $(`.Tool-tips-middle-page`).html(CREATE_P_TAG);
      var H3_TAG = [];
      var CLASS_NAME = 'custom-popup-button';
      H3_TAG= this.renderer.createElement('Button');
      H3_TAG.classList.add(CLASS_NAME);
      this.renderer.setProperty(H3_TAG, 'innerText',"Logout");
      this.renderer.listen(H3_TAG, 'click', (event) => {
        // this.logout();
      });
    // $('.Tool-tips-footer-page').empty();
    // this.renderer.appendChild($('.Tool-tips-footer-page')[0], H3_TAG+);
    this.HideTimer();
  }
  HideTimer() {
    setTimeout(() => {
      $('.Tool-tips-middle-page').empty();
      $('#Tool-tips-custom-popup').hide();
    },3000);
  }
  OutSideCOntroller($buttonEvent: any, MAIN_CLASS_POPUP: any, CLOSE_DIV: any) {
  //   $(MAIN_CLASS_POPUP).click(function (e: any) {
  //     $(CLOSE_DIV).show();
  //     e.stopPropagation();
  // });
  // $(document).click(function(){
  //     $(CLOSE_DIV).hide();
  // });
  }
  LoadingAnimation() {
    $('.style-loading,.loading').remove();
    var APPEND_ANIMATION_DIV = `<div class="loading">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`;
    var APPEND_ANIMATION_CSS = `
    .loading {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #4d545130;
      align-items: center;
      justify-content: center;
      margin: auto;
      gap:10px;
    }

    .loading div {
      background-color: #fff;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      animation: loading-effect 1s cubic-bezier(.77, .8, .58, 1) infinite
        var(--delay, .2s) alternate-reverse;
    }

    .loading div:nth-child(2) {
      --delay: .2s;
    }
    .loading div:nth-child(3) {
      --delay: .4s;
    }
    .loading div:nth-child(4) {
      --delay: .6s;
    }
    .loading div:nth-child(5) {
      --delay: .8s;
    }

    @keyframes loading-effect {
      0% {
        box-shadow: 0 0 4px 1px #fff3;
        opacity: .2;
        transform: translateY(3px) scale(1.1);
      }

      100% {
        opacity: .8;
        transform: translateY(-3px);
      }
    }
   `;
    $('body').append(APPEND_ANIMATION_DIV);
    $(`<style class="style-loading">${APPEND_ANIMATION_CSS}</style>`).appendTo('head');
  }
  removeAnimation() {
    $('.style-loading,.loading').remove();
  }

  ToolTips_Mini_Load() {
    $('.style-remove-2,.Tool-tips-mini').remove();
   var TEMPLATE_TOST_CLASS = `
    <div class="Tool-tips-mini" id="Tool-tips-mini-popup"></div>`;
  var TEMPLATE_TOST_CLASS_CSS = `
  .Tool-tips-mini{
    display: none;
    flex-direction: column;
    min-width: 300px;
    max-width: 50%;
    min-height: 30px;
    max-height: 89%;
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
    overflow:auto;
  }
  .Tool-tips-mini h3{
    font-size: .9rem;
    margin: auto;
    text-align: left;
    margin-left: 0;
    box-shadow: 0px 0px 2px 2px #fffbfb;
    padding: 5px;
    width: 100%;
    border-radius: 5px;
    padding-left: 10px;
  }
  .Tool-tips-mini .border-bottom{
    width: 95%;
    position: absolute;
    top: 3px;
    left: 9px;
    border-bottom: 5px solid white !important;
    border-radius: 5px;
  }
  @keyframes animation-border-bottom{
    from{
      width:95%;
    }
    to{
      width:0%;
    }
  }
  `;
    $('body').append(TEMPLATE_TOST_CLASS);
    $(`<style class="style-remove-2">${TEMPLATE_TOST_CLASS_CSS}</style>`).appendTo('head');
  }
  ToolTips_AnimationStart(Timer: any, Message: any, buttonId: any) {
    if (buttonId!=null) {
      $("." + buttonId.target.className).css({ 'pointer-events': 'none', 'cursor': 'default' });
    }
    clearTimeout(this.TIMER);
    $('.Tool-tips-mini').empty();
    if (Object.keys(Message).length!=0) {
      $('.Tool-tips-mini').css('display', 'grid');
    } else {
      $('.Tool-tips-mini').css('display', 'none');
      return;
    }
    var INDEX = 1;
    for (const key in Message) {
      if (Message.length == 1) {
        $('.Tool-tips-mini').append(`<h3 class="Text-Append">${Message[key]}</h3>`)
      } else {
        $('.Tool-tips-mini').append(`<h3 class="Text-Append">${INDEX} : ${Message[key]}</h3>`)
      }
      INDEX++;
    }
    $('.Tool-tips-mini').append('<div class="border-bottom"></div>');
    $('.Tool-tips-mini .border-bottom').css({'animation': `animation-border-bottom ${Timer}s ease-in-out`})
   this.TIMER=setTimeout(() => {
      $('.Tool-tips-mini').empty();
     $('.Tool-tips-mini').hide();
     if (buttonId != null) {
       $("." + buttonId.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
     }
    }, Timer*1040);
  }
  logout() {
    this.router.navigate(['/Login']);
    this.HideTimer();
  }

}
