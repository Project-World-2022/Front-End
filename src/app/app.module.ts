import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { ServiceService } from 'src/service/service.service';
import { ApiServiceService } from 'src/service/api-service.service';
import { AddInwardSheetComponent } from './sheet/inward-sheet/add-inward-sheet/add-inward-sheet.component';
import { DisplayInwardSheetComponent } from './sheet/inward-sheet/display-inward-sheet/display-inward-sheet.component';
import { DisplayOutwardSheetComponent } from './sheet/outward-sheet/display-outward-sheet/display-outward-sheet.component';
import { AddOutwardSheetComponent } from './sheet/outward-sheet/add-outward-sheet/add-outward-sheet.component';
import { HomeComponent } from './home/home.component';
import { CustomModelComponent } from './custom-model/custom-model.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OutwardTableComponent } from './sheet/outward-sheet/display-outward-sheet/outward-table/outward-table.component';
import { InwardTableComponent } from './sheet/inward-sheet/display-inward-sheet/inward-table/inward-table.component';
import { StockSheetComponent } from './sheet/stock-sheet/stock-sheet.component';
import { StockSheetTableComponent } from './sheet/stock-sheet/stock-sheet-table/stock-sheet-table.component';
import { StockSheetTable2Component } from './sheet/stock-sheet/stock-sheet-table2/stock-sheet-table2.component';
import { NewStockSheetComponent } from './sheet/new-stock-sheet/new-stock-sheet.component';
import { DealerSheetComponent } from './sheet/dealer-sheet/dealer-sheet.component';
import { DealerSheetInsertComponent } from './sheet/dealer-sheet/dealer-sheet-insert/dealer-sheet-insert.component';
import { LabourReportComponent } from './report/labour-report/labour-report.component';
import { TabelView1Component } from './report/labour-report/tabel-view1/tabel-view1.component';
import { DAILYSHEETDETAILSComponent } from './sheet/daily-sheet-details/daily-sheet-details.component';
import { TabelView2Component } from './sheet/daily-sheet-details/tabel-view2/tabel-view2.component';
import { TabelView3Component } from './sheet/daily-sheet-details/tabel-view3/tabel-view3.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { PreviewInwardSheetComponent } from './sheet/inward-sheet/add-inward-sheet/preview-inward-sheet/preview-inward-sheet.component';
import { DataControllerService } from 'src/service/data-controller.service';
import { CustomToolTipsService } from './custom-model/custom-tool-tips.service';
import { ValidationService } from 'src/service/validation.service';
import { AutoCompletedInputService } from 'src/service/auto-completed-input.service';

import { PreviewOutwardSheetComponent } from './sheet/outward-sheet/add-outward-sheet/preview-outward-sheet/preview-outward-sheet.component';
import { TabelViewComponent } from './sheet/new-stock-sheet/tabel-view/tabel-view.component';
import { DSRReportComponent } from './report/dsr-report/dsr-report.component';
import { TableView1Component } from './report/dsr-report/table-view1/table-view1.component';
import { TableView2Component } from './report/dsr-report/table-view2/table-view2.component';
import { TableView3Component } from './report/dsr-report/table-view3/table-view3.component';
import { CorrectionReportComponent } from './report/correction-report/correction-report.component';
import { CorrectionReportTableComponent } from './report/correction-report/correction-report-table/correction-report-table.component';
import { CorrectionReportTable2Component } from './report/correction-report/correction-report-table2/correction-report-table2.component';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UpdateInwardSheetComponent } from './sheet/inward-sheet/display-inward-sheet/update-inward-sheet/update-inward-sheet.component';
import { UpdateOutwardSheetComponent } from './sheet/outward-sheet/display-outward-sheet/update-outward-sheet/update-outward-sheet.component';

declare var $: any;

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    LoginComponent,
    AddInwardSheetComponent,
    DisplayInwardSheetComponent,
    DisplayOutwardSheetComponent,
    AddOutwardSheetComponent,
    HomeComponent,
    CustomModelComponent,
    OutwardTableComponent,
    InwardTableComponent,
    StockSheetComponent,
    StockSheetTableComponent,
    StockSheetTable2Component,
    NewStockSheetComponent,
    DealerSheetComponent,
    DealerSheetInsertComponent,
    DSRReportComponent,
    TableView1Component,
    TableView2Component,
    TableView3Component,
    LabourReportComponent,
    TabelView1Component,
    DAILYSHEETDETAILSComponent,
    TabelView2Component,
    TabelView3Component,
    IndexPageComponent,
    PreviewInwardSheetComponent,
    PreviewOutwardSheetComponent,
    TabelViewComponent,
    CorrectionReportComponent,
    CorrectionReportTableComponent,
    CorrectionReportTable2Component,
    PagenotfoundComponent,
    UpdateInwardSheetComponent,
    UpdateOutwardSheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AutocompleteLibModule
  ],
  providers: [
    ServiceService,
    ApiServiceService,
    DataControllerService,
    CustomToolTipsService,
    ValidationService,
    AutoCompletedInputService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor (private http: HttpClient,private notifyService: NotificationService,public route:Router) {
//  sessionStorage.clear();
 }
}
