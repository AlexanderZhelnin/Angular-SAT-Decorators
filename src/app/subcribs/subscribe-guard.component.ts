import { Observable } from 'rxjs';
import { BehaviorSubject, filter, Subscription, switchMap, take } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscribeGuard } from 'projects/sat-directives/src/public-api';

interface IUser
{
  login: string;
  name: string;
  roles: string[];
  email?: string;
  properties: { [key: string]: any };
}
const user$ = new BehaviorSubject<IUser | undefined>(undefined);
const observer1$ = new BehaviorSubject('защита подписки');
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

  onClick()
  {
    this.withOutGuard()
      .subscribe(str =>
      {
        console.log(this.lorem);
        this.str = str;
      });
    console.log(user$);
  }

  //#region без защиты
  withOutGuard(): Observable<string>
  {
    return user$
      .pipe(
        filter(u => !!u),
        switchMap(() => observer1$)
      );
  }
  //#endregion

  //#region С защитой
  withGuard(): Observable<string>
  {
    return this.observer()
      .pipe(switchMap(() => observer1$));
  }

  @SubscribeGuard()
  observer()
  {
    return user$
      .pipe(filter(u => !!u));
  }
  //#endregion

  onUserLogon(): void
  {
    user$.next({ login: 'Alexander Zhelnin', name: 'Александр Желнин', roles: [], properties: {} });
  }
}
