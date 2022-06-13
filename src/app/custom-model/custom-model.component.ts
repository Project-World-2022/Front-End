import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/service/service.service';
declare var $: any;

@Component({
  selector: 'app-custom-model',
  templateUrl: './custom-model.component.html',
  styleUrls: ['./custom-model.component.css']
})
export class CustomModelComponent implements OnInit {
  constructor(public service:ServiceService) { }

  ngOnInit(): void {
    $(document).ready(function(){
      $("#CLOSEBTN").click(function () {
        $("#custom-popup").hide();
      });
    });
  }

}
