import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, Input } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

const iconCache: { [key: string]: string } = {};

const fetchIcon = (icon: string, http: HttpClient) : Observable<string> => {
  if (iconCache[icon]) {
    return of(iconCache[icon]);
  }
  return http.get<string>(`/assets/icons/${icon}.svg`, {
    responseType: 'text' as 'json'
  }).pipe(
    tap(iconContent => {
      iconCache[icon] = iconContent;
    }),
    catchError((err) => {
      if (err.status === 404 && icon !== 'question_mark') {
        return fetchIcon('question_mark', http);
      }
      return throwError(() => err);
    })
  )
};

@Directive({
  selector: '[smSvgIcon]',
})
export class SvgIconDirective {
  private _smSvgIcon = '';
  @Input() set smSvgIcon(icon: string) {
    if (icon !== this._smSvgIcon) {
      this._smSvgIcon = icon;
      fetchIcon(icon, this.http).subscribe((x) => {
        this.el.nativeElement.innerHTML = x;
        this.el.nativeElement.children[0].style.display = 'block';
      });
    }
  }
  constructor(private el: ElementRef, private http: HttpClient) {}
}
