import { Component, OnInit } from '@angular/core';
import { SubsService } from './subs/subs.service';
// import { cachedRequest } from 'sat-decorators';
// import { take } from 'rxjs';

enum SelectedEnum
{
  empty,
  subscribeGuard,
  withAutoSubscribe,
  withoutAutoSubscribe,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  //#region Свойства
  SelectedEnum = SelectedEnum
  selected: SelectedEnum = SelectedEnum.empty;
  //#endregion

  //#region Конструктор
  constructor(private readonly s_subs: SubsService)
  {
    let i1 = 0;
    let i2 = 0;
    setInterval(() =>
    {
      this.s_subs.observer1$.next(`Проверка1 ${++i1}`);
      this.s_subs.observer2$.next(`Проверка2 ${++i2}`);
    }, 1000);
  }
  //#endregion

  ngOnInit(): void
  {
    // setInterval(() =>
    // {

    //   this.work1().subscribe({
    //     next: str =>
    //     {
    //       console.log(str);

    //     }
    //   })
    // }, 1000);

  }

  // @cachedRequest(3000) work1()
  // {
  //   return observer1$.pipe(take(1));
  // }

}
