import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddInwardSheetComponent } from './sheet/inward-sheet/add-inward-sheet/add-inward-sheet.component';
import { DisplayInwardSheetComponent } from './sheet/inward-sheet/display-inward-sheet/display-inward-sheet.component';
import { NewStockSheetComponent } from './sheet/new-stock-sheet/new-stock-sheet.component';
import { AddOutwardSheetComponent } from './sheet/outward-sheet/add-outward-sheet/add-outward-sheet.component';
import { DisplayOutwardSheetComponent } from './sheet/outward-sheet/display-outward-sheet/display-outward-sheet.component';
import { StockSheetComponent } from './sheet/stock-sheet/stock-sheet.component';
import { PreviewInwardSheetComponent } from './sheet/inward-sheet/add-inward-sheet/preview-inward-sheet/preview-inward-sheet.component';
import { PreviewOutwardSheetComponent } from './sheet/outward-sheet/add-outward-sheet/preview-outward-sheet/preview-outward-sheet.component';
import { CorrectionReportComponent } from './report/correction-report/correction-report.component';
import { LabourReportComponent } from './report/labour-report/labour-report.component';
import { DSRReportComponent } from './report/dsr-report/dsr-report.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UpdateInwardSheetComponent } from './sheet/inward-sheet/display-inward-sheet/update-inward-sheet/update-inward-sheet.component';
import { UpdateOutwardSheetComponent } from './sheet/outward-sheet/display-outward-sheet/update-outward-sheet/update-outward-sheet.component';
import { DealerSheetComponent } from './sheet/dealer-sheet/dealer-sheet.component';
import { DealerSheetInsertComponent } from './sheet/dealer-sheet/dealer-sheet-insert/dealer-sheet-insert.component';
import { TableView1Component } from './report/dsr-report/table-view1/table-view1.component';
import { TableView2Component } from './report/dsr-report/table-view2/table-view2.component';
import { TableView3Component } from './report/dsr-report/table-view3/table-view3.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'DashBoard', component: DashBoardComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'DSRReport', component: DSRReportComponent },
  { path: 'InwardSheet/AddInwardSheet', component: AddInwardSheetComponent },
  { path: 'InwardSheet/ViewInwardSheet', component: DisplayInwardSheetComponent },
  { path: 'InwardSheet/UpdateSheet', component: UpdateInwardSheetComponent },
  { path: 'InwardSheet/PreviewSheet', component: PreviewInwardSheetComponent },
  { path: 'OutwardSheet/AddOutwardSheet', component: AddOutwardSheetComponent },
  { path: 'OutwardSheet/DisplayOutwardSheet', component: DisplayOutwardSheetComponent },
  { path: 'OutwardSheet/PreviewSheet', component: PreviewOutwardSheetComponent },
  { path: 'OutwardSheet/UpdateSheet', component: UpdateOutwardSheetComponent },
  { path: 'StockSheetView', component: StockSheetComponent },
  { path: 'NewStockSheetView', component: NewStockSheetComponent },
  { path: 'DealerSheetView', component: DealerSheetComponent },
  { path: 'DealerAddSheet', component: DealerSheetInsertComponent },
  { path: 'CorrectionReport', component: CorrectionReportComponent },
  { path: 'LabourReport', component: LabourReportComponent },
  { path: 'DSRReport/View_1', component: TableView1Component },
  { path: 'DSRReport/View_2', component: TableView2Component },
  { path: 'DSRReport/View_3', component: TableView3Component },
  { path: 'Error_Page', pathMatch: 'full', component: PagenotfoundComponent },
  { path: '*', pathMatch: 'full', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
