import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { PlatformLocation } from '@angular/common';
import { ModalFormComponent } from '../modal-form/modal-form.component';

interface IData {
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
export class DisplayAllComponent implements OnDestroy {

  private clearPopListener = this.platformLocation.onPopState(() => {
    this.ref.close();
  });
  @Input()name = '';
  @Input()id = '';

  expand = 'minus';

  root: IData = {
    name: 'main',
    dob: new Date(),
    root: true,
    id: '',
    gender: 'male',
    description: 'dfklsdlf ljdfl sdl jflsd',
    children: ['aaa','bbb'],
    link: '',
  }
  data: IData[] = [
    {
      name: 'main',
      dob: new Date(),
      root: true,
      id: '',
      gender: 'male',
      description: 'dfklsdlf ljdfl sdl jflsd',
      children: ['aaa', 'bbb'],
      link: '',
    },
    {
      name: 'child1',
      dob: new Date(),
      root: false,
      id: 'aaa',
      gender: 'male',
      description: 'dfklsdlf ljdfl sdl jflsd',
      children: ['aaa1'],
      link: '',
    },
    {
      name: 'child2',
      dob: new Date(),
      root: false,
      id: 'bbb',
      gender: 'male',
      description: 'dfklsdlf ljdfl sdl jflsd',
      link: '',
    },
    {
      name: 'child11',
      dob: new Date(),
      root: false,
      id: 'aaa1',
      gender: 'male',
      description: 'dfklsdlf ljdfl sdl jflsd',
      children: [],
      link: '',
    }
  ]

  @Output()onEdit = new EventEmitter<string>();

  editPerson(id: string){
    this.onEdit.emit(id);
  }

  getPerson(id: string){
    return this.data.find(item => item.id === id);
  }

  expandOrClose(root: IData){
    this.data = this.data.map(item => {
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
    })
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
        allPersons: this.data,
        description: `You can modify ${item?.name}'s details, add , update or delete children`,
      }
    });
  }

  constructor(
    private dialogService: DialogService,
    private platformLocation: PlatformLocation,
    public ref: DynamicDialogRef,
  ){

    this.data.find(item => item.root);

  }

  ngOnDestroy(): void {
    this.clearPopListener();
  }
}
