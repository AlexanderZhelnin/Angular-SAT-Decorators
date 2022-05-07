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
  </pre>`
})
export class WithAutoSubscribeComponent
{
  str1: string = '';

  constructor(private readonly s_subs: SubsService) { }


  @AutoSubscribe({
    isAutoSubscribeOnInit: true,
    onNext: WithAutoSubscribeComponent.prototype.onNext,
    onError: WithAutoSubscribeComponent.prototype.onError

  }) work()
  {
    return this.s_subs.observer1$.pipe(
      tap(str =>
      {
        this.str1 = str;
      })
    );
  }

  onNext(str: string) { console.log(str); }
  onError(err: any) { console.log(err); }

}
