import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

import { IPerson } from 'src/app/types';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent implements OnInit {
  reactiveForm: FormGroup = new FormGroup<any>({});
  @Output()onSave = new EventEmitter<IPerson>()
  @Input() editMode = false;
  @Input() currentPerson?: IPerson;

  ngOnInit(): void {
    console.log(this.currentPerson);
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.editMode? this.currentPerson?.name:null, Validators.required),
      gender: new FormControl(this.editMode? this.currentPerson?.gender:'male'),
      location: new FormControl(this.editMode? this.currentPerson?.location:null),
      description: new FormControl(this.editMode? this.currentPerson?.description:null),
      dob: new FormControl(this.editMode? this.currentPerson?.dob:new Date().toLocaleDateString()),
      phone: new FormControl(this.editMode? this.currentPerson?.phone:null),
      email: new FormControl(this.editMode? this.currentPerson?.email:null),
      link: new FormControl(this.editMode? this.currentPerson?.link:null),
    })
  }
  onSubmit(){
    const newPerson: IPerson = {...this.reactiveForm.value, children: [], root: false, id:''}
    if(this.editMode){
      console.log('in person edit mode...');
      this.dataService.editPerson(newPerson);
    }else{
      this.dataService.savePerson(newPerson).subscribe(d => console.log(d));
    }
    this.reactiveForm.reset();
  }

  constructor(private dataService: DataService){}
}
