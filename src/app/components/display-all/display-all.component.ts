import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-display-all',
  templateUrl: './display-all.component.html',
  styleUrls: ['./display-all.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayAllComponent {
  @Input()name = '';
  @Input()id = '';

  @Output()onEdit = new EventEmitter<string>();

  editPerson(id: string){
    this.onEdit.emit(id);
  }
}
