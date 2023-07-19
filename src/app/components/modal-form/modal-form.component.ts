import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';


interface IFormFieldValue {
  name: string;
  gender: string;
  parent?: boolean;
}

interface IFormValue {
  dirty: boolean;
  valid: boolean;
  value: IFormFieldValue
}
interface IData {
  name: string;
  gender: string;
}

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFormComponent {
  showModal$ = new BehaviorSubject(true);

  loading$ = new BehaviorSubject(false);

  editPerson$ = new BehaviorSubject(false);
  isLoggedIn$ = this.authService.isLoggedIn$.getValue();

  allPersons = this.config.data.allPersons;

  currentPerson = this.config.data?.item;

  private initialFormValue? : IFormValue;
  private _formValue?: IFormValue;
  @Input() set formValue(val: IFormValue | undefined){
    if(!this.initialFormValue && val){
      this.initialFormValue = val;
    }
    this._formValue = val;
  }

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private dataService: DataService,
    private authService: AuthService,
  ) {

  }

  deleteItem(item: string, parentId: string){
    if (confirm(`Are you sure you want to delete this from the database?${item} ${parentId}`)) {
      this.dataService.deleteOnePerson(item, parentId);
    }
  }

  editItem(each: string){
    this.currentPerson = this.allPersons.find((item: any) =>  item.id===each);
    this.editPerson$.next(true);
    this.dataService.editMode$.next(true);
  }

  close(){
    this.dataService.editMode$.next(false);
    this.ref.close();
  }

  getPerson(each: any){
   const person = this.allPersons.find((item: any) =>  item.id===each);
   return person.name;
  }
  getGender(each: string){
    const gender = this.allPersons.find((item: any) => item?.id===each)?.gender;
    return gender;
  }

  changeEditMode(){
    this.editPerson$.next(!this.editPerson$.getValue())
    this.dataService.editMode$.next(true)
  }
}
