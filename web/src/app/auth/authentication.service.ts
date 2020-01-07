import { Injectable } from '@angular/core';
import { Credentials } from './credentials';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoggedUser } from './logged-user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<LoggedUser>;
  public currentUser: Observable<LoggedUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoggedUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get loggedUser(): LoggedUser {
    return this.currentUserSubject.value;
  }

  public login(credentials: Credentials): Observable<LoggedUser> {
    return this.http.post<LoggedUser>('/login', credentials).pipe(filter(user => {
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return true;
      }
      return false;
    }));
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}