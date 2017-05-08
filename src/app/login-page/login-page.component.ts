import { Component } from '@angular/core';
import {AF} from "../../providers/af";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public error: any;

  constructor(public afService: AF,public af: AngularFire, private router: Router) {}

  loginWithGoogle() {
    event.preventDefault();
    this.afService.loginWithGoogle().then((data) => {
      // Send them to the homepage if they are logged in
      console.log(data);
      //this.afService.addUserInfo();
      this.router.navigate(['']);
    })
  }

  // loginGoogle() {
  //   this.af.auth.login({
  //     provider: AuthProviders.Google,
  //     method: AuthMethods.Popup,
  //   }).then(
  //       (success) => {
  //       this.router.navigate(['']);
  //     }).catch(
  //       (err) => {
  //       this.error = err;
  //     })
  // }

  loginWithEmail(event, email, password){
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      this.router.navigate(['']);
    })
      .catch((error: any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }
}
