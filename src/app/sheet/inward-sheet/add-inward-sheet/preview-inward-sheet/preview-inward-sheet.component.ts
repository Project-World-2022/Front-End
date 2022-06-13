import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomToolTipsService } from 'src/app/custom-model/custom-tool-tips.service';
import { NotificationService } from 'src/app/notification.service';
import { ApiServiceService } from 'src/service/api-service.service';
import { DataControllerService } from 'src/service/data-controller.service';
import { ServiceService } from 'src/service/service.service';
import { InwwardServiceService } from '../../inwward-service.service';
declare var $: any;

@Component({
  selector: 'app-preview-inward-sheet',
  templateUrl: './preview-inward-sheet.component.html',
  styleUrls: ['./preview-inward-sheet.component.css']
})
export class PreviewInwardSheetComponent implements OnInit {
  DATA: any = [];
  constructor (public Inservice: InwwardServiceService, public service: ServiceService,
    public serviceService: ServiceService,
    protected router: Router,
    public Api_Service: ApiServiceService,
    public InwardService: InwwardServiceService,
    protected PreviewData: DataControllerService,
    private notifyService: NotificationService,
    public AnimationLoad: CustomToolTipsService) {
    this.DATA = this.PreviewData.getData('InwardSheet_Data');
    if (this.DATA==null && this.DATA==undefined) {
      // this.router.navigate(['/InwardSheet/AddInwardSheet']);
    } else {
      setTimeout(() => {
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
      })
    }
  }

  ngOnInit(): void {

  }
  SumbitData(event: any, DATA: any) {
    $("."+event.target.className).css({'pointer-events':'none','cursor':'default'})
    DATA['HaltHour'] = $("#haltHour").val();
    DATA['ClearDateOfTruck'] = $("#clearDateOfTruck").val();
    DATA['Emp_Id'] = this.serviceService.getSeesionLogin()['Emp_Id'];
    DATA['Month'] = this.DATA['Month'];
    DATA['Year'] = this.DATA['Year'];
    DATA['Today'] = this.DATA['Day'];
    this.AnimationLoad.LoadingAnimation();
    this.serviceService.InserInwardData(DATA).subscribe(res => {
      console.log(res);
      setTimeout(() => {
        if (res['Status']==true) {
          this.notifyService.showSuccess(res['Message'], "Success Insert Data");
          $("." + event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
          this.router.navigate(['/InwardSheet/AddInwardSheet']);
          this.AnimationLoad.removeAnimation();
        } else {
          this.notifyService.showError(res['Error']['sqlMessage'], "Error Insert Data");
          $("." + event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
          this.router.navigate(['/InwardSheet/AddInwardSheet']);
          this.AnimationLoad.removeAnimation();
        }
      },500);
    }, err => {
      this.notifyService.showError(err, "Error Insert Data");
      $("." + event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
      // this.router.navigate(['/InwardSheet/AddInwardSheet']);
      this.AnimationLoad.removeAnimation();
    }
    );
  }
   dateDiff(date1:any, date2:any) {
    var date1_ts = Date.parse(date1);
    var date2_ts = Date.parse(date2);
    var diff = date2_ts - date1_ts;
    return Math.round(diff / 86400);
   }
  backNavigate() {
    this.router.navigate(['/InwardSheet/AddInwardSheet']);
   }
}
