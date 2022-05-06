import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { observer1$ } from './consts';

@Component({
  selector: 'app-without-autosubcribe',
  template: `
  <pre>
  Компонент без авто подписки/отписки
    {{str}}
  </pre>`

})
export class WithoutAutoSubscribeComponent implements OnInit, OnDestroy
{
  #subscription?: Subscription;
  str?: string;

  ngOnInit(): void
  {
    this.#subscription = observer1$.subscribe({
      next: str =>
      {
        console.log(str);
        this.str = str;
      }
    });
  }

  ngOnDestroy(): void
  {
    this.#subscription?.unsubscribe();
  }
}
