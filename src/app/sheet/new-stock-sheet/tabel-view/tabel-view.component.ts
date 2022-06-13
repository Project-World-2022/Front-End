import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from 'src/service/service.service';

@Component({
  selector: 'app-tabel-view',
  templateUrl: './tabel-view.component.html',
  styleUrls: ['./tabel-view.component.css']
})
export class TabelViewComponent implements OnInit {
  DEPOT_ALL: any = [];
  DEPOT_CODE: any = [];
  DEPOT_CODE_2: any = [];
  r: any = [];
  DATA: any = [];

  constructor (public service: ServiceService) {
    service.ALLDepotCode().then((res) => {
      this.r = res;
      for (let index = 0; index < this.r.length; index++) {
        this.DEPOT_CODE[this.r[index]['depot_code']] = this.r[index]['depot_name'];
      }
      this.DEPOT_CODE.sort();
   });
   }

  ngOnInit(): void {
    console.log(this.service.NEW_STOCK_SHEET_DATA_2);
  }
  ConvertInt_to_Float(number: any, number1: any) {
    if (number!=0 || number!=Infinity || number!=NaN) {
      var total = (number / parseFloat(number1)) * 100;
      if (total!=0) {
        return total.toFixed(2);
      } else {
        return 0.0;
      }
    } else {
      return 0.0;
    }

  }
}
