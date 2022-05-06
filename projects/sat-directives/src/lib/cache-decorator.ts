import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";

export const cacheDefault: { [key: string]: Observable<any> | undefined } = {};
export const cacheFactoryDefault = () => cacheDefault;

/** Проверка есть ли кэши */
export function hasCache(
  target: any,
  method: string,
  cacheFactory: ((this: any) => { [key: string]: Observable<any> | undefined }) | undefined = cacheFactoryDefault,
  ...args: any[]): boolean
{
  // Префикс кэша
  const prefix = getKeyPrefix(target, method);
  // Ключ кэша
  const key = getKey(prefix, args);

  return cacheFactory()[key] !== undefined;
}

export function removeCache(
  target: any,
  method: string,
  cacheFactory: ((this: any) => { [key: string]: Observable<any> | undefined }) | undefined = cacheFactoryDefault,
  ...args: any[])
{
  // Префикс кэша
  const prefix = getKeyPrefix(target, method);
  // Ключ кэша
  const key = getKey(prefix, args);
  delete cacheFactory()[key];
}

/** Получение префикса для ключа кэширования */
const getKeyPrefix = (target: any, method: string) =>
{
  return `${target.constructor.name}.${method}`;
}

/** Получение ключа кэширования */
const getKey = (prefix: string, args: any[]) =>
{
  return `${prefix}+${JSON.stringify(args)}`;
}

export function cachedRequest(): MethodDecorator;
export function cachedRequest(absoluteExpiration: number): MethodDecorator;
export function cachedRequest(cacheFactory: (this: any) => { [key: string]: Observable<any> | undefined }): MethodDecorator;
export function cachedRequest(
  absoluteExpiration: number,
  cacheFactory: (this: any) => { [key: string]: Observable<any> | undefined }): MethodDecorator;
/**
 * Декоратор кэширования
 *
 * @export
 * @param absoluteExpiration Фиксированные дата и время истечения срока действия записи кэша
 * @param cacheFactory Фабрика получение кэша
 * @return {*}
 */
export function cachedRequest(
  param1: unknown | undefined = undefined,
  param2: unknown | undefined = undefined
): MethodDecorator
// export function cachedRequest(
//   absoluteExpiration: number = 0,
//   cacheFactory: (this: any) => { [key: string]: Observable<any> | undefined } = cacheFactoryDefault): MethodDecorator

{
  let absoluteExpiration = 0;
  let cacheFactory: (this: any) => { [key: string]: Observable<any> | undefined } = cacheFactoryDefault;
  if (typeof param1 === 'number')
    absoluteExpiration = param1;
  else if (typeof param1 === 'function')
    cacheFactory = param1 as (this: any) => { [key: string]: Observable<any> | undefined };
  if (typeof param2 === 'function')
    cacheFactory = param2 as (this: any) => { [key: string]: Observable<any> | undefined };

  return (target: any, method: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor =>
  {
    // Запоминаем оригинальную функцию
    const origin = descriptor.value;
    // Префикс кэша
    const prefix = getKeyPrefix(target, method as string);

    // Заменяем оригинальную функцию на функцию с кэшем
    descriptor.value = function (...args: any[]): Observable<any>
    {
      // Получаем хранилище кэша
      const storage = cacheFactory.call(this)
      // Ключ кэша
      const key = getKey(prefix, args);

      // Смотрим есть кэшированный ответ
      let observable = storage[key];

      // Если есть возвращаем его
      if (!!observable) return observable;

      // Создаём ответ
      observable = origin
        .apply(this, args)
        .pipe(shareReplay(1));

      // Сохраняем в кэш
      storage[key] = observable;

      if (absoluteExpiration > 0)
        setTimeout(() =>
        {
          delete storage[key];
        }, absoluteExpiration * 1000);

      // возвращаем
      return observable as Observable<any>;
    };

    return descriptor;
  }

}
