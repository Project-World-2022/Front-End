import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/service/api-service.service';
import { ServiceService } from 'src/service/service.service';
import { CookiesService } from '../cookies.service';
declare var $: any;

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  constructor (private serviceService: ServiceService,protected router: Router,public loginservice: ApiServiceService, private cookieService: CookiesService) {
    this.ActiveClass();
    this.serviceService.isLoginCheck();
   }
  ngOnInit(): void {
    this.ActiveClass();
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
