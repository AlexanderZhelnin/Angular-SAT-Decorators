# SATDirectives Библиотека полезных директив


## Декоратор кеширования


```ts
// Получить всех авторов, если авторы уже считывались, то они находятся в кэше и берутся из него
@cachedRequest()
public GetAllAuthor()
{
  return this.http.get<Author[]>(`${this.baseUrl}/api/Authors`);
}
```

**Передача фабрики для получения кэша**
```ts
const cache = { [key: string]: Observable<any> | undefined } = {};

@cachedRequest(function () { return this.cache; })
```

**Передача времени жизни кэша (в примере  300 сек = 5 мин)**
```ts
@cachedRequest(300)
```

**Передача времени жизни кэша (в примере  300 сек = 5 мин) и фабрики для получения кэша**
```ts
const cache = { [key: string]: Observable<any> | undefined } = {};
@cachedRequest(300, function () { return this.cache; })
```

**Проверка существования кэша**
```ts
hasCache(this, 'myFunction', ...args);
```
*args - аргументы, могут отсутствовать*

**Удаления кэша**
```ts
removeCache(this, 'myFunction', ...args);
```
*args - аргументы, могут отсутствовать*

## Декоратор повторных попыток

```ts
@delayRetry()

// В качестве аргументов принимает 
// delayMs: number = 1000 
// maxRetry: number = 3
// filter: (name: string) => boolean = (name: string) => true
```
*Применяется как к функциям, так и к классам*

## Декоратор автоматической подписки и отписки
```ts
@AutoSubscribe()
work()
{
  return observer1$.pipe(
    tap(str =>
    {
      // Отслеживать наблюдаемое мы будем тут
      console.log(str);
      this.str1 = str;
    })
  );
}
```
*Для компонента или директивы автоматически подпишется и отпишется по завершению жизненного цикла*

## Декоратор защиты от утечек памяти
*Необходим для того что бы проводить некоторые действия только по достижению определённого состояния и контролировать утечку памяти*
```ts

  this.observer()
    .pipe(switchMap(() => observer$))
    .subscribe(str =>
    {
      console.log(str);
    });


@SubscribeGuard()
observer()
{
  return user$
    .pipe(filter(u => !!u));
}
```
*В данном примере @SubscribeGuard гарантирует нам что у user$ подписчики будут удалятся по получению состояния, так же важно отметить, что для компонента или директивы отрабатывают жизненный цикл, т.е. если компонент или директива будут уничтожены, то и подписка будет прекращена*
