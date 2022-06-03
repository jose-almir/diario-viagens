import { Injectable } from '@angular/core';
import {
  collectionData,
  Firestore,
  limit,
  orderBy,
} from '@angular/fire/firestore';
import { collection, query, where } from '@firebase/firestore';
import { endOfWeek, startOfWeek } from 'date-fns';
import { map, Observable } from 'rxjs';
import { Diario, DiarioConverter } from '../../models/diario';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  diarios = collection(this.db, 'diarios').withConverter(DiarioConverter);

  constructor(private db: Firestore) {}

  getPostsCount(): Observable<number> {
    return collectionData(this.diarios).pipe(map((diarios) => diarios.length));
  }

  getLastPosts(): Observable<Diario[]> {
    const q = query(this.diarios, orderBy('createdAt', 'desc'), limit(5));

    return collectionData(q);
  }

  getCommonLocals() {
    return collectionData(this.diarios).pipe(map(this._commonLocals));
  }

  private _commonLocals(diarios: Diario[]) {
    const todosLocais = diarios.map((diario) => diario.local);
    const locais = new Set(todosLocais);

    const obj: { [x: string]: number } = {};

    locais.forEach((local) => {
      obj[local] = todosLocais.filter((loc) => loc === local).length;
    });

    return obj;
  }

  getWeekPosts() {
    const hoje = new Date();
    const start = startOfWeek(hoje);
    const end = endOfWeek(hoje);

    return collectionData(
      query(
        this.diarios,
        where('createdAt', '>=', start),
        where('createdAt', '<=', end)
      )
    ).pipe(map(this._weekPosts));
  }

  private _weekPosts(diarios: Diario[]) {
    const weekdays = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta', 
      'Sexta', 
      'Sábado', 
    ];

    const dates = diarios.map((diario) => weekdays[diario.createdAt.getDay()]);

    const obj: { [x: string]: number } = {};

    weekdays.forEach((day) => {
      obj[day] = dates.filter((dt) => dt === day).length;
    });

    return obj;
  }
}
