import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject } from "rxjs";

interface IUser {
  userName: string,
  password: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
isLoggedIn$ = new BehaviorSubject(false);

constructor(private _http: HttpClient){}

putUser(user:IUser){
  return this._http.post<any>(`https://angular-project-866ab-default-rtdb.europe-west1.firebasedatabase.app/user.json`, user)
}
checkUser(user: IUser){
  const {userName, password} = user;
  return this._http.get<{[key: string]: IUser}>(`https://angular-project-866ab-default-rtdb.europe-west1.firebasedatabase.app/user.json`)
}
}
