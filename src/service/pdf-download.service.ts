import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class PdfDownloadService {
  constructor () {
  }
  public openPDF(Type: any,TableName:any): void {
    if (Type=='.pdf') {
      $(TableName).tableHTMLExport({
        type: 'pdf',
        filename: 'sample.pdf',
        orientation:'pt'
      });
    } else if (Type=='.xls') {

    }
    else if (Type=='.json') {
      $(TableName).tableHTMLExport({
        type: 'json',
        filename: 'sample.json'
    });
    }
    else if (Type=='.csv') {
      $(TableName).tableHTMLExport({
        type: 'csv',
        filename: 'sample.csv'
    });
    }
}
}
