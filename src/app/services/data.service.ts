import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { IPerson } from "../types";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  firebaseApi = 'https://angular-project-866ab-default-rtdb.europe-west1.firebasedatabase.app/family.json'
  constructor(private _http: HttpClient){}

  savePerson(person: IPerson){
    this._http.post<IPerson>(this.firebaseApi, person).subscribe(data => console.log(data, 'added...'))
  }
}
