import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/service/service.service';
import { NotificationService } from 'src/app/notification.service';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-stock-sheet-table',
  templateUrl: './stock-sheet-table.component.html',
  styleUrls: ['./stock-sheet-table.component.css']
})
export class StockSheetTableComponent implements OnInit {
  DEPOT_ALL: any = [];
  DEPOT_CODE: any = [];
  r: any = [];

  constructor (private http: HttpClient,public service:ServiceService,private notifyService : NotificationService) {

   }

  ngOnInit(): void {
  }
}
