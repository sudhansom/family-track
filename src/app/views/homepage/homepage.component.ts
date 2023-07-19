import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { IPerson } from 'src/app/types';
import { DataService } from 'src/app/services/data.service';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent implements OnInit {
  allPersons$ = new BehaviorSubject<IPerson[]>([]);


  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.dataService.getAllPersons().pipe(map((allData)=>{
      const newArray: any = [];
      for(const key in allData){
        if(allData[key]){
          newArray.push({...allData[key], id: key});
        }
      }
      return newArray

    })).subscribe(data => {
      this.allPersons$.next(data);
    });
  }
}

