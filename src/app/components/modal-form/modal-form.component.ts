import { ChangeDetectionStrategy, Component, Output, Input, EventEmitter } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { NgForm } from '@angular/forms';


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

  allPersons = this.config.data.allPersons;

  private initialFormValue? : IFormValue;
  private _formValue?: IFormValue;
  @Input() set formValue(val: IFormValue | undefined){
    if(!this.initialFormValue && val){
      this.initialFormValue = val;
    }
    this._formValue = val;
  }

  get formValue(){
    return this._formValue;
  }


  @Output() delete = new EventEmitter();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private dataService: DataService,
  ) {

  }

  deleteItem(item: string){
    if (confirm('Are you sure you want to save this thing into the database?')) {
      //this.dataService.deleteMe(item, this.config.data.item.id).subscribe();
      console.log('deleted');
    }
  }

  close(){
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
}
