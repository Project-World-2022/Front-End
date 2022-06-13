import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { ServiceService } from 'src/service/service.service';

@Component({
  selector: 'app-stock-sheet-table2',
  templateUrl: './stock-sheet-table2.component.html',
  styleUrls: ['./stock-sheet-table2.component.css']
})
export class StockSheetTable2Component implements OnInit {

  @Input() data: any = [];
  constructor (public service:ServiceService,private notifyService : NotificationService) {
    console.log(this.data, this.service.NEW_STOCK_SHEET_DATA);
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.data,changes);
  }
}
