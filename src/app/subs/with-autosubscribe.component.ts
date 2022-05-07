import { tap } from 'rxjs';
import { Component } from '@angular/core';
import { AutoSubscribe } from 'sat-decorators';
import { SubsService } from './subs.service';

@Component({
  selector: 'app-with-autosubcribe',
  template: `
  <pre>
    Компонент с авто подпиской/отпиской
    {{str1}}
    {{str2}}
  </pre>`
})
export class WithAutoSubscribeComponent
{
  str1?: string;
  str2?: string;

  constructor(private readonly s_subs: SubsService) { }

  @AutoSubscribe() work()
  {
    return this.s_subs.observer1$.pipe(
      tap(str =>
      {
        console.log(str);
        this.str1 = str;
      })
    );
  }

  @AutoSubscribe() work1()
  {
    return this.s_subs.observer2$.pipe(
      tap(str =>
      {
        console.log(str);
        this.str2 = str;
      })
    );
  }
}
