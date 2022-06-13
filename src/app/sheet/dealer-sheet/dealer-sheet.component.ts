import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/service/service.service';

@Component({
  selector: 'app-dealer-sheet',
  templateUrl: './dealer-sheet.component.html',
  styleUrls: ['./dealer-sheet.component.css']
})
export class DealerSheetComponent implements OnInit {

  DATA: any = [];
  r: any = [];
  constructor  (public  service: ServiceService) {
    // this.service.ALLDealer_Details().then((res) => {
    //  this.DATA = res;
    //  console.log(this.DATA)
    // });
  }

  ngOnInit(): void {
    this.service.ALLDealer_Details().then((res) => {
      this.DATA = res;
      console.log(this.DATA)
     });
  }
}
