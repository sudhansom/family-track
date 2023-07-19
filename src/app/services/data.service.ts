import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { IPerson } from "../types";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  firebaseApi = environment.familyApi;
  constructor(private _http: HttpClient){}

  editMode$ = new BehaviorSubject(false);

  savePerson(person: IPerson){
    return this._http.post<IPerson>(this.firebaseApi + '.json', person);
  }

  createANewDatabase(person: any){
    return this._http.post<IPerson>(this.firebaseApi, person);
  }

  editPerson(person: IPerson){
     this.getOnePerson(person.id).subscribe(data => {
      let children = data?.children;
      let root = data?.root;
      let newPerson = { ...person, children:children, root: root, id:'' };
      this._http.put<IPerson>(this.firebaseApi +`/${person.id}.json`, newPerson)
      .subscribe(d => {
        console.log('edited person...', d);
        window.location.reload();

      });
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
      this._http.put<IPerson>(this.firebaseApi + `/${parentId}.json`, person)
      .subscribe(d => {
        console.log('child added to ...', person.name)
        window.location.reload();
      });
    })
  }
  getAllPersons(){
    return this._http.get<{[key:string]: IPerson}>(this.firebaseApi + `.json`);
  }

  getOnePerson(id: string){
    return this._http.get<IPerson>(this.firebaseApi + `/${id}.json`);
  }
  deleteOnePerson(id: string, parentId: string){
    return this._http.delete<IPerson>(this.firebaseApi + `/${id}.json`).subscribe(c =>
    {
      this.editParentChildren(id, parentId);
    });
  }

  editParentChildren(id: string, parentId: string){
    this.getOnePerson(parentId).subscribe(data => {
     let children = data?.children.filter(each => each !==id);
     let root = data?.root;
     let newPerson = { ...data, children:children, root: root, id:'' };
     this._http.put<IPerson>(this.firebaseApi + `/${parentId}.json`, newPerson)
     .subscribe(d => {
      console.log('edited person...', d);
      window.location.reload();
    });
   })
 }
}
