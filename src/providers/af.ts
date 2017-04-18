import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";

@Injectable()
export class AF {
  public messages: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public quizs: FirebaseListObservable<any>;
  public namequiz: FirebaseListObservable<any>;
  public grades: FirebaseListObservable<any>;
  public registeredUsers: FirebaseListObservable<any>;
  public questions: FirebaseListObservable<any>;

  public displayName: string;
  public email: string;
  public role: string;
  public user: FirebaseObjectObservable<any>;


  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.database.object('users/' + auth.uid);
        }
      });
    
    this.messages = this.af.database.list('messages');
    this.users = this.af.database.list('users');
    this.quizs = this.af.database.list('quizs');
    this.grades = this.af.database.list('grades');
    this.registeredUsers = this.af.database.list('registeredUsers');
    this.questions = this.af.database.list('questions');
  }

  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

  /**
   * Logs out the current user
   */
  logout() {
    return this.af.auth.logout();
  }

  /**
   *
   */
  addUserInfo(){
    //We saved their auth info now save the rest to the db.
    this.users.push({
      displayName: this.displayName,
      email: this.email,  
      role: 'student',
    });
  }

  /**
   * Saves a message to the Firebase Realtime Database
   * @param text
   */
  sendMessage(text) {
    var message = {
      message: text,
      displayName: this.displayName,
      email: this.email,
      timestamp: Date.now()
    };
    this.messages.push(message);
  }

  /**
   *
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password) {
    console.log(email)
    return this.af.auth.createUser({
      email: email,
      password: password
    });
  }

  /**
   *
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  saveUserInfoFromForm(uid, name, email) {
    return this.af.database.object('users/' + uid).set({
      displayName: name,
      email: email,
      role: 'student',
    });
  }

  addUser(displayName, email) {
    var user = {
      displayName: displayName,
      email: email,
      role: 'student',
    };
    return this.users.push(user);
  }

  /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithEmail(email, password) {
    return this.af.auth.login({
        email: email,
        password: password,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

  chondethi(text: string){
    return this.af.database.list('quizs', {
      query: {
        orderByChild: 'name',
        equalTo: text
      }
    });
  }

  getQuestion(text: string){
    return this.af.database.list('questions', {
      query: {
        orderByChild: 'dethi',
        equalTo: text
      }
    });
  }

  sendGrade(mark, dethi) {
    var grade = {
      mark: mark,
      dethi: dethi,
      displayName: this.displayName,
      email: this.email,
      timestamp: Date.now()
    };
    this.grades.push(grade);
  }

  getGrade(email: string){
    return this.af.database.list('grades', {
      query: {
        orderByChild: 'email',
        equalTo: email
      }
    });
  }
  
  getdisplayName(email: string){
      this.af.database.list('users', {
          query: {
            orderByChild: 'email',
            equalTo: email
         }
     }).subscribe(list => {
       list.forEach(snapshot=> {
          if(snapshot.email = email) {
            this.displayName = snapshot.displayName;
          }
       })
      });
      return this.displayName;
  }

  getRole(email: string){
      this.af.database.list('users', {
          query: {
            orderByChild: 'email',
            equalTo: email
         }
     }).subscribe(list => {
       list.forEach(snapshot=> {
          if(snapshot.email = email) {
            this.role = snapshot.role;
          }
       })
      });
      return this.role;
  }

  addquestion(dethi, name, A, B, C, D, key){
    var question = {
      dethi: dethi,
      name: name,
      A: A,
      B: B,
      C: C,
      D: D,
      key: key
    };
    this.questions.push(question);
  }

}
