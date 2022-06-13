import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { DataControllerService } from 'src/service/data-controller.service';
import { ServiceService } from 'src/service/service.service';
declare var jsPDF: any;
declare var $: any;

@Component({
  selector: 'app-inward-table',
  templateUrl: './inward-table.component.html',
  styleUrls: ['./inward-table.component.css']
})
export class InwardTableComponent implements OnInit {
  num: any = 0;
  constructor (public service: ServiceService,
    protected PreviewData: DataControllerService,
    protected router: Router, private notifyService: NotificationService) {

   }
  ngOnInit(): void {

  }
  public openPDF(Type: any): void {
    if (Type=='.pdf') {
      $("#OUTER_TABLE").tableHTMLExport({
        type: 'pdf',
        filename: 'sample.pdf',
        orientation:'pt'
      });
    } else if (Type=='.xls') {

    }
    else if (Type=='.json') {
      $("#OUTER_TABLE").tableHTMLExport({
        type: 'json',
        filename: 'sample.json'
    });
    }
    else if (Type=='.csv') {
      $("#OUTER_TABLE").tableHTMLExport({
        type: 'csv',
        filename: 'sample.csv'
    });
    }
}
  Update(data: any) {
    if (this.service.INWARD_DATA != null && this.service.INWARD_DATA != undefined) {
      var id = parseInt(data.id);
       this.PreviewData.setData('UpdateInwardSheet_Data', this.service.INWARD_DATA[id]);
      setTimeout(() => {
        this.router.navigate(['/InwardSheet/UpdateSheet']);
      },1000)
    }
  }
  Delete(data: any) {
    if (confirm('Are you sure you want to delete this thing into the database?')) {
      var id_data = this.service.INWARD_DATA[data.id];
      console.log(id_data)
      this.service.DeleteInwardData({id:id_data.Unique_Id}).subscribe(res => {
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
  ParseFloat(value: number) :any {
      this.num = value / 20;
      var num1 = parseFloat(this.num).toFixed(2);
    return num1;
  }
  backNavigate() {
    window.location.reload();
   }
}
