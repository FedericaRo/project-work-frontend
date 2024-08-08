//shared.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public data$: Observable<any> = this.dataSubject.asObservable();

    constructor() { }

    setData(data: any) {
        this.dataSubject.next(data);
    }
}
