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

  editPerson(id: string){
    console.log('in service edit...');
     let person: IPerson;

     this.getOnePerson(id).subscribe(data => {
      let children = data?.children;
      if(!children){
        children = ['zzz'];
      }
      else{
        children = [...children, 'kkk'];
      }
      person = { ...data, children:children };
      console.log('person value: ...', person);
      this._http.put<IPerson>('https://angular-project-866ab-default-rtdb.europe-west1.firebasedatabase.app/family/-N_Fysl8WIkeXSeMSbKU.json', person)
      .subscribe(d => console.log('edited...', d));
    })

  }
  getAllPersons(){
    return this._http.get<{[key:string]: IPerson}>(this.firebaseApi);
  }

  getOnePerson(id: string){
    return this._http.get<IPerson>('https://angular-project-866ab-default-rtdb.europe-west1.firebasedatabase.app/family/-N_Fysl8WIkeXSeMSbKU.json')
  }
}
