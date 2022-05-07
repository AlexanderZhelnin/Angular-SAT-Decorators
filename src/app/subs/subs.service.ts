import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface IUser
{
  login: string;
  name: string;
  roles: string[];
  email?: string;
  properties: { [key: string]: any };
}

@Injectable({ providedIn: 'root' })
export class SubsService
{


  readonly observer1$ = new Subject<string>();
  readonly observer2$ = new Subject<string>();
  readonly user$ = new BehaviorSubject<IUser | undefined>(undefined);
}
