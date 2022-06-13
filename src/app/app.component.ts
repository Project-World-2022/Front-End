import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/service/api-service.service';
import { AutoCompletedInputService } from 'src/service/auto-completed-input.service';
import { ServiceService } from 'src/service/service.service';
import { CustomToolTipsService } from './custom-model/custom-tool-tips.service';
import { NotificationService } from './notification.service'
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dhandhania';
  constructor (private notifyService: NotificationService,
    private Notification: CustomToolTipsService,
    public AutoCompleted: AutoCompletedInputService, private serviceService: ServiceService,
    protected router: Router, public loginservice: ApiServiceService) {
    this.Notification.ToolTips_Mini_Load();
    this.Notification.LoadToolTips();
    this.AutoCompleted.AutoCompletedLoad();
    this.AutoCompleted.DropDown();
    $(document).ready(function() {
      $('.navbar-nav>li').click((e: any) => {
        $('.navbar-nav>li').removeClass('active');
        $(e.currentTarget).addClass('active');
      });
    });
  }
}
