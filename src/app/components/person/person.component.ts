import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

import { IPerson } from 'src/app/types';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent implements OnInit {
  reactiveForm: FormGroup = new FormGroup<any>({});
  editMode$ = this.dataService.editMode$;
  @Input() currentPerson?: IPerson;

  ngOnInit(): void {
    console.log(this.currentPerson);
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.editMode$.getValue()? this.currentPerson?.name:null, Validators.required),
      gender: new FormControl(this.editMode$.getValue()? this.currentPerson?.gender:'male'),
      location: new FormControl(this.editMode$.getValue()? this.currentPerson?.location:null),
      description: new FormControl(this.editMode$.getValue()? this.currentPerson?.description:null),
      dob: new FormControl(this.editMode$.getValue()? this.currentPerson?.dob:new Date().toLocaleDateString()),
      phone: new FormControl(this.editMode$.getValue()? this.currentPerson?.phone:null),
      email: new FormControl(this.editMode$.getValue()? this.currentPerson?.email:null),
      link: new FormControl(this.editMode$.getValue()? this.currentPerson?.link:null),
    })
  }
  onSubmit(){
    if(this.editMode$.getValue()){
      const newPerson: IPerson = {...this.reactiveForm.value, id:this.currentPerson?.id}
      this.dataService.editPerson(newPerson);
      this.editMode$.next(false);
    }else{
      const newPerson: IPerson = {...this.reactiveForm.value, children: [], root: false, id:this.currentPerson?.id}
      this.dataService.savePerson(newPerson).subscribe(d => {
        this.dataService.addChild(newPerson.id, d.name);
      });
    }
  }

  constructor(private dataService: DataService, private router: Router){}
}
