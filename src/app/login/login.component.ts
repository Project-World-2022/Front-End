import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/service/api-service.service';
import { ServiceService } from 'src/service/service.service';
import { CookiesService } from '../cookies.service';
import { NotificationService } from '../notification.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  response = "";
  show: boolean = false;
  error: string = '';
  error1: string = '';
  isUserLoggedIn: boolean = false;
  constructor (public serviceService: ServiceService, protected router: Router,
    private cookieService: CookiesService,
    private notifyService: NotificationService) {
    if ($('.body').hasClass('sb-sidenav-toggled')) {
      $('.body').removeClass('sb-sidenav-toggled')
    } else {
      $('.body').addClass('sb-sidenav-toggled');
    }
    this.serviceService.isLoginCheck()==true?this.router.navigate(['/Home']):'';
  }

  hideShowPassword() {
    this.show = !this.show;
  }
  onSendLogin(data_json: any) {
    console.log(data_json)
    if (data_json.Email_Id =='') {
      this.error = 'Please fill email id';
    } else {
      this.error = '';
    }
    if (data_json.Password =='') {
      this.error1 = 'Please fill Password';
    } else {
      this.error1 = '';
    }
    if (data_json!=null) {
      this.serviceService.LoginService(data_json).subscribe(res => {
        if (res['status'] == true) {
           this.cookieService.setCookie('User', data_json.Email_Id,30);
           this.cookieService.setCookie('Password', data_json.Password,30);
           this.cookieService.setCookie('LoginStatus', 'true', 30);
           this.cookieService.setCookie('Emp_Id', res['data'][0]['emp_id'], 30);
           this.cookieService.setCookie('Login_Type', res['data'][0]['Role_Type'], 30);
          this.cookieService.setCookie('User_Name', res['data'][0]['emp_name'], 30);
          setTimeout(() => {
            window.location.reload();
            this.serviceService.islogged  = true;
          }, 1000);
        } else {
          this.notifyService.showError('Email id & Password not matched...<br> Please Check again!', "Error Login")
          this.router.navigate(['/Login']);
        }
        this.response = res;
      }, err => {
        this.notifyService.showError(err['message'], "Error Login")
      }
      );
    }
  }
  ngOnInit(): void {
  }
}
