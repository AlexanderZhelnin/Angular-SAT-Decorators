import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubsService } from './subs.service';

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

  constructor(private readonly s_subs: SubsService) { }

  ngOnInit(): void
  {
    this.#subscription = this.s_subs.observer1$
      .subscribe({
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
