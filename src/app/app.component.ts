import { Component } from '@angular/core';
import { AF } from "../providers/af";
import { Router } from "@angular/router";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;
  public af: AngularFire;
  //public registeredUsers: Object;

  constructor(public afService: AF, private router: Router) {
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.
    // This is just a small thing that Firebase does that makes it easy to use.
    this.afService.af.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");

          this.isLoggedIn = false;
          this.router.navigate(['login']);
        }
        else {
          console.log("Successfully Logged in.");
          // check nếu role= user, 
          // Set the Display Name and Email so we can attribute messages to them
          if(auth.google) {
            this.afService.addUser(auth.google.displayName, auth.google.email);
            this.afService.displayName = auth.google.displayName;
            this.afService.email = auth.google.email;
            
          }
          else {
            this.afService.email = auth.auth.email;
            this.afService.displayName = this.afService.getdisplayName(this.afService.email);
            //this.afService.displayName = auth.auth.email;
            
          }
          
          this.afService.role = this.afService.getRole(this.afService.email);
          this.isLoggedIn = true;
          this.router.navigate(['']);
        }
      }
    );
  }

  // getdisplayName(email: string){
  //     this.afService.registerUsers.subscribe(list => {
  //      list.forEach(snapshot=> {
  //         if(snapshot.email = email) {
  //           this.afService.displayName = snapshot.name;
  //         }
  //         console.log(this.afService.displayName);
  //      })
  //     });
      
  //}

  logout() {
    this.afService.logout();
  }
}
