import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-display-all',
  templateUrl: './display-all.component.html',
  styleUrls: ['./display-all.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayAllComponent implements OnInit {
  @Input()name = 'dddd';

  ngOnInit(): void {
    console.log('jflkdsjfls', name);
  }
}
