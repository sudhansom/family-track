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
    return this._http.post<IPerson>(this.firebaseApi, person);
  }

  editPerson(person: IPerson){
     this.getOnePerson(person.id).subscribe(data => {
      let children = data?.children;
      person = { ...person, children:[...children] };
      this._http.put<IPerson>('https://angular-project-866ab-default-rtdb.europe-west1.firebasedatabase.app/family/-N_FyGw7mGs2JMQmOrhK.json', person)
      .subscribe(d => console.log('edited person...', d));
    })

  }
  getAllPersons(){
    return this._http.get<{[key:string]: IPerson}>(this.firebaseApi);
  }

  getOnePerson(id: string){
    return this._http.get<IPerson>('https://angular-project-866ab-default-rtdb.europe-west1.firebasedatabase.app/family/-N_FyGw7mGs2JMQmOrhK.json')
  }
}
