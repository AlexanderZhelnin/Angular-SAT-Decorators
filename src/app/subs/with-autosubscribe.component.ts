import { tap } from 'rxjs';
import { Component } from '@angular/core';
import { AutoSubscribe } from 'sat-directives';
import { SubsService } from './subs.service';

@Component({
  selector: 'app-with-autosubcribe',
  template: `
  <pre>
    Компонент с авто подпиской/отпиской
    {{str1}}
  </pre>`
})
export class WithAutoSubscribeComponent
{
  str1?: string;

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
}
