# SATDirectives Библиотека полезных декораторов


## Декоратор кеширования

**Получить всех авторов, если авторы уже считывались, то они находятся в кэше и берутся из него**
```ts
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

**Удаление кэша**
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

 **для целого класса, все функции которые возвращают Observable, будут с повторными попытками при возникновении ошибки**
 ```ts
 @Injectable({ providedIn: 'root' })
 @delayRetry()
 export class ApiClientService
 {
   constructor(
     private readonly http: HttpClient,
     @Inject('BASE_URL') private readonly baseUrl: string,
     private readonly cache: CacheService
   ) { }

   // Получить всех авторов
   public GetAllAuthor()
   {
     return this.http.get<Author[]>(`${this.baseUrl}/api/Authors`);
   }

   // Получить автора по уникальному идентификатору
   public GetAuthorById(id: number)
   {
   return this.http.get<Author[]>(`${this.baseUrl}/api/Authors/${id}`);
 ```
 **Для для отдельной функции** 
 ```ts
   // Получить всех авторов
   @delayRetry()
   public GetAllAuthor()
   {
     return this.http.get<Author[]>(`${this.baseUrl}/api/Authors`);
   }
 ```

## Декоратор автоматической подписки и отписки
**В соответствии с жизненным циклом, при инициализации произойдёт подписка на work(), а при уничтожении отписка**
```ts
import { AutoSubscribe } from 'sat-decorators';
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
```

**Подписка на work() произойдёт только при самостоятельном вызове метода, а вот отписка в соответствии с жизненным циклом при уничтожении**:
```ts
import { AutoSubscribe } from 'sat-decorators';
export class WithAutoSubscribeComponent
{
  str1?: string;
  constructor(private readonly s_subs: SubsService) { }
   
  ngOnInit()
  {
    work();
  }  
   
  @AutoSubscribe({ isAutoSubscribeOnInit: false }) work()
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
```
*Для компонента или директивы автоматически подпишется и отпишется по завершению жизненного цикла*

## Декоратор защиты от утечек памяти
*Необходим для того что бы проводить некоторые действия только по достижению определённого состояния и контролировать утечку памяти*

**В данном примере @SubscribeGuard гарантирует нам что у user$ подписчики будут удалятся по получению состояния, так же важно отметить, что для компонента или директивы отрабатывают жизненный цикл, т.е. если компонент или директива будут уничтожены, то и подписка будет прекращена**
```ts
test(): void
{
  this.observer()
    .pipe(switchMap(() => observer$))
    .subscribe(str =>
    {
      console.log(str);
    });
}

@SubscribeGuard()
observer()
{
  return user$
    .pipe(filter(u => !!u));
}
```

