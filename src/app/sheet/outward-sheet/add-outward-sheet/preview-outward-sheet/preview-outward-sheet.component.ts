import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomToolTipsService } from 'src/app/custom-model/custom-tool-tips.service';
import { NotificationService } from 'src/app/notification.service';
import { InwwardServiceService } from 'src/app/sheet/inward-sheet/inwward-service.service';
import { ApiServiceService } from 'src/service/api-service.service';
import { DataControllerService } from 'src/service/data-controller.service';
import { ServiceService } from 'src/service/service.service';
declare var $: any;

@Component({
  selector: 'app-preview-outward-sheet',
  templateUrl: './preview-outward-sheet.component.html',
  styleUrls: ['./preview-outward-sheet.component.css']
})
export class PreviewOutwardSheetComponent implements OnInit {
  DATA: any = [];

  constructor (public Inservice: InwwardServiceService, public service: ServiceService,
    public serviceService: ServiceService, protected router: Router,
    public Api_Service: ApiServiceService,
    public InwardService: InwwardServiceService,
    protected PreviewData: DataControllerService,
    private notifyService: NotificationService,
    public AnimationLoad: CustomToolTipsService) {
    this.DATA = this.PreviewData.getData('OutwardSheet_Data');
  }

  ngOnInit(): void {
  }
  SumbitData(event: any, DATA: any) {
    $("."+event.target.className).css({'pointer-events':'none','cursor':'default'})
    DATA['Emp_Id'] = this.serviceService.getSeesionLogin()['Emp_Id'];
    DATA['Month'] = this.DATA['Month'];
    DATA['Year'] = this.DATA['Year'];
    DATA['Today'] = this.DATA['Day'];
    console.log(DATA);
    this.AnimationLoad.LoadingAnimation();
    this.serviceService.InserOutwardData(DATA).subscribe(res => {
      console.log(res);
      if (res['Status']==true) {
        this.notifyService.showSuccess(res['Message'], "Success Insert Data");
        $("." + event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
        this.backNavigate();
        this.AnimationLoad.removeAnimation();
      } else {
        this.notifyService.showError(res['Error'], "Error Insert Data");
        $("." + event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
        this.backNavigate();
        this.AnimationLoad.removeAnimation();
      }
    }, err => {
      this.notifyService.showError(err, "Error Insert Data");
      $("." + event.target.className).css({ 'pointer-events': 'auto', 'cursor': 'pointer' });
      this.backNavigate();
      this.AnimationLoad.removeAnimation();
    }
    );
  }
  backNavigate() {
    this.router.navigate(['/OutwardSheet/AddOutwardSheet']);
   }
}
