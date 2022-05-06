import { tap } from 'rxjs';
import { Component } from '@angular/core';
import { observer1$ } from './consts';
import { AutoSubscribe } from 'sat-directives';

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

  @AutoSubscribe() work()
  {
    return observer1$.pipe(
      tap(str =>
      {
        console.log(str);
        this.str1 = str;
      })
    );
  }
}
