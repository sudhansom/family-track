import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

interface IUser {
  userName: string,
  password: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
isLoggedIn$ = new BehaviorSubject(false);

authApi = environment.authApi;

constructor(private _http: HttpClient){}

putUser(user:IUser){
  return this._http.post<any>(this.authApi, user)
}
checkUser(user: IUser){
  const {userName, password} = user;
  return this._http.get<{[key: string]: IUser}>(this.authApi);
}
}
