import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/service/api-service.service';
import { DataControllerService } from 'src/service/data-controller.service';
import { ServiceService } from 'src/service/service.service';
import { CookiesService } from '../cookies.service';
import { CustomToolTipsService } from '../custom-model/custom-tool-tips.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  SESSION_DATA: any = [];
  constructor (private serviceService: ServiceService, protected router: Router,
    public loginservice: ApiServiceService,
    public ToolTipsService: CustomToolTipsService, protected PreviewData: DataControllerService) {
    this.ActiveClass();
    // PreviewData.removeSessionALL();
    this.SESSION_DATA = this.serviceService.getSeesionLogin();
    $('.body').removeClass('sb-sidenav-toggled');
  }

  ngOnInit(): void {
  }
  ActiveClass() {
    $(document).ready(function() {
      $('.navbar-nav>li').click((e: any) => {
        $('.navbar-nav>li').removeClass('active');
        $(e.currentTarget).addClass('active');
      });
    });
  }
}
