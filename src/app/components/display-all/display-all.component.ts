import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { PlatformLocation } from '@angular/common';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { DataService } from 'src/app/services/data.service';


interface IPerson {
    name: string,
    dob: Date,
    root: boolean,
    id: string,
    gender: string,
    description: string,
    children?: string[],
    link: string,
    expand?: boolean,
}
@Component({
  selector: 'app-display-all',
  templateUrl: './display-all.component.html',
  styleUrls: ['./display-all.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayAllComponent implements OnInit, OnDestroy {

  private clearPopListener = this.platformLocation.onPopState(() => {
    this.ref.close();
  });
  @Input()name = '';
  @Input()id = '';

  expand = 'minus';

  data$ = new BehaviorSubject<IPerson[]>([]);
  root$ = new BehaviorSubject<any>(
    {
      name: 'main',
      dob: new Date(),
      root: true,
      id: '',
      gender: 'male',
      description: 'dfklsdlf ljdfl sdl jflsd',
      children: ['aaa','bbb'],
      link: '',
    }
  )

  @Output()onEdit = new EventEmitter<string>();

  editPerson(id: string){
    this.onEdit.emit(id);
  }

  getPerson(id: string){
    let data:any;
    this.data$.subscribe(d => {data = d.find(item => item.id === id)});
    return data;
  }

  expandOrClose(root: IPerson){
    this.data$.subscribe(data => data.map(item => {
      if(item.id === root.id){
        if(item?.children?.length){
          return {
            ...item,
            expand: !(item?.expand),
          }
        }
        else {
          alert(`${item.name} does not have any child...`);
          return item;
        }
      }
      return item;
    }));
  }

  errorMessage(){
    alert('does not have any child');
  }

  openModal(item: any){
    this.ref = this.dialogService.open(ModalFormComponent, {
      contentStyle: { overflow: 'auto', padding: '20px', 'border-radius': '5px', 'background-color': 'rgb(236, 233, 233)', 'box-shadow': 'rgba(0, 0, 0, 0.35) 0px 5px 15px'},
      showHeader: false,
      modal: true,
      dismissableMask: true,
      style: {
        minWidth: '300px',
      },
      data: {
        item: item,
        allPersons: this.data$.getValue(),
        description: `You can modify ${item?.name}'s details, add , update or delete children`,
      }
    });
  }

  constructor(
    private dialogService: DialogService,
    private platformLocation: PlatformLocation,
    public ref: DynamicDialogRef,
    private dataService: DataService,
  ){}

  ngOnInit(){
    this.dataService.getAllPersons()
    .pipe(map(data => {
      const tempData: IPerson[] = []
      for(const key in data){
       if(data[key]){
         tempData.push({...data[key], id: key});
      }
       }
       return tempData;
    }))
    .subscribe(data => {
      this.data$.next(data);
       this.data$.subscribe(d => this.root$.next(d.find(item => item.root)));
    });
  }

  ngOnDestroy(): void {
    this.clearPopListener();
  }
}
