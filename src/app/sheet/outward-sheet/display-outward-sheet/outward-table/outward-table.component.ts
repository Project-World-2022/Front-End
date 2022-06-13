import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomToolTipsService } from 'src/app/custom-model/custom-tool-tips.service';
import { NotificationService } from 'src/app/notification.service';
import { DataControllerService } from 'src/service/data-controller.service';
import { ServiceService } from 'src/service/service.service';

@Component({
  selector: 'app-outward-table',
  templateUrl: './outward-table.component.html',
  styleUrls: ['./outward-table.component.css']
})
export class OutwardTableComponent implements OnInit {
  num: any = 0;
  constructor (public service: ServiceService, public AnimationLoad: CustomToolTipsService,
    protected router: Router, private notifyService: NotificationService, protected PreviewData: DataControllerService) {
  }
  Update(data: any) {
    if (this.service.OUTWARD_DATA != null && this.service.OUTWARD_DATA != undefined) {
      var id = parseInt(data.id);
       this.PreviewData.setData('UpdateOutwardSheet_Data', this.service.OUTWARD_DATA[id]);
      setTimeout(() => {
        this.router.navigate(['/OutwardSheet/UpdateSheet']);
      },1000)
    }
  }
  Delete(data: any) {
    if (confirm('Are you sure you want to delete this thing into the database?')) {
      var id_data = this.service.OUTWARD_DATA[data.id];
      this.service.DeleteOutwardData({id:id_data.Unique_Id}).subscribe(res => {
        setTimeout(() => {
          if (res['Status']==true) {
            this.notifyService.showSuccess(res['Message'], "Success Delete Data");
            this.backNavigate();
          } else {
            this.notifyService.showError(res['Error']['sqlMessage'], "Error Delete Data");
            this.backNavigate();
          }
        }, 1500);
      }, err => {
        this.notifyService.showError(err, "Error Delete Data");
      }
      );
    }
  }
  ngOnInit(): void {
  }
  backNavigate() {
    window.location.reload();
   }
}
