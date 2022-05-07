import { delay, Observable, of } from 'rxjs';
import { BehaviorSubject, filter, Subscription, switchMap, take } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscribeGuard } from 'projects/sat-directives/src/public-api';
import { SubsService } from './subs.service';

let index = 1;
@Component({
  selector: 'app-subscribe-guard',
  template: `
  <pre>
  Защита подписки
    {{str}}

    <button (click)="onClick()">Получить данные</button>

    <button (click)="onUserLogon()">Пользователь залогинился</button>
  </pre>`

})
export class SubscribeGuardComponent
{

  lorem = `${index++} Не вызывает сомнений, что реализация намеченных плановых заданий обеспечивает актуальность направлений прогрессивного развития. Не вызывает сомнений, что управление и развитие структуры требует определения и уточнения модели развития. Идейные соображения высшего порядка, а также курс на социально-ориентированный национальный проект создаёт предпосылки качественно новых шагов для существующий финансовых и административных условий. Прежде всего начало повседневной работы по формированию позиции проверки влечёт за собой интересный процесс внедрения модернизации позиции, занимаемых участниками в отношении поставленных задач. Не следует, однако, забывать, что управление и развитие структуры в значительной степени обуславливает создание соответствующих условий активизации. Идейные соображения высшего порядка, а также выбранный нами инновационный путь требует от нас анализа новых предложений. С другой стороны реализация намеченных плановых заданий способствует подготовке и реализации прогресса профессионального общества.`;

  str?: string;

  constructor(private readonly s_subs: SubsService) { }

  /** Имитация доступа к беку */
  fakeHttpGetLorem(): Observable<string>
  {
    console.log('getLorem');
    return of(this.lorem).pipe(delay(2000));
  }

  onClick()
  {
    this.withOutGuard()
      .subscribe(str =>
      {
        console.log(str);
        this.str = str;
      });
    console.log(this.s_subs.user$);
  }

  //#region Без защиты
  withOutGuard(): Observable<string>
  {
    return this.s_subs.user$
      .pipe(
        filter(u => !!u),
        switchMap(() => this.fakeHttpGetLorem())
      );
  }
  //#endregion

  //#region С защитой
  withGuard(): Observable<string>
  {
    return this.observer()
      .pipe(switchMap(() => this.fakeHttpGetLorem()));
  }

  @SubscribeGuard()
  observer()
  {
    return this.s_subs.user$
      .pipe(filter(u => !!u));
  }
  //#endregion

  onUserLogon(): void
  {
    this.s_subs.user$.next({ login: 'Alexander Zhelnin', name: 'Александр Желнин', roles: [], properties: {} });
  }

}
