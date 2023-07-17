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

  createANewDatabase(person: any){
    return this._http.post<IPerson>(this.firebaseApi, person);
  }

  editPerson(person: IPerson){
     this.getOnePerson(person.id).subscribe(data => {
      let children = data?.children;
      let root = data?.root;
      let newPerson = { ...person, children:children, root: root, id:'' };
      this._http.put<IPerson>(`https://angular-project-866ab-default-rtdb.europe-west1.firebasedatabase.app/family/${person.id}.json`, newPerson)
      .subscribe(d => console.log('edited person...', d));
    })
  }
  addChild(parentId: string, childId: string){
    this.getOnePerson(parentId).subscribe(data => {
      let children = data?.children;
      if(!children){
        children = [childId];
      }
      else {
        children = [...children, childId ];
      }
      let person = { ...data, children:children };
      this._http.put<IPerson>(`https://angular-project-866ab-default-rtdb.europe-west1.firebasedatabase.app/family/${parentId}.json`, person)
      .subscribe(d => console.log('child added to ...', person.name));
    })
  }
  getAllPersons(){
    return this._http.get<{[key:string]: IPerson}>(this.firebaseApi);
  }

  getOnePerson(id: string){
    return this._http.get<IPerson>(`https://angular-project-866ab-default-rtdb.europe-west1.firebasedatabase.app/family/${id}.json`);
  }
}
