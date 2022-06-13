import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/service/api-service.service';
import { ServiceService } from 'src/service/service.service';
import { CookiesService } from '../cookies.service';
import { CustomToolTipsService } from '../custom-model/custom-tool-tips.service';
declare var $: any;
@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  SESSION_DATA: any = [];
  constructor (public serviceService: ServiceService, protected router: Router,
    public loginservice: ApiServiceService,
    public ToolTipsService: CustomToolTipsService) {
    this.SESSION_DATA = this.serviceService.getSeesionLogin();
    this.serviceService.isLoginCheck();
    $('#sidebarToggle').click(() => {
      if ($('.side-nav-bar').hasClass('active-class')) {
        $('.side-nav-bar').removeClass('active-class');
        $('.side-nav-cls').addClass('visible');
      } else {
        $('.side-nav-bar').addClass('active-class');
        $('.side-nav-cls').removeClass('visible');
      }
    });
   }
  ngOnInit(): void {
    $('#sidebarToggle').click(() => {
      if ($('.side-nav-bar').hasClass('active-class')) {
        $('.side-nav-bar').removeClass('active-class');
        $('.side-nav-cls').addClass('visible');
      } else {
        $('.side-nav-bar').addClass('active-class');
        $('.side-nav-cls').removeClass('visible');
      }
    });
  }
  CallingTooltips($event: any) {
    this.ToolTipsService.ShowToolTips($event, {
      Emp_Id: this.SESSION_DATA['Emp_Id'],
      Role:this.SESSION_DATA['Role']
    }, 'Empyoole Details');
  }
}
