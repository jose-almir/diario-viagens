import { DocumentSnapshot } from '@angular/fire/firestore';


export interface Converter<T> {
  
  toFirestore(data: T): any;
 
  fromFirestore(snapshot: DocumentSnapshot, options: any): T;
}
