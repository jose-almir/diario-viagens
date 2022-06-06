import { DocumentSnapshot } from '@angular/fire/firestore';

// Processamento antes e depois do firestore
// Usar apenas em situações específicas
// Ex: FirestoreDate -> Date
export interface Converter<T> {
  // conversão antes de enviar para o firestore
  toFirestore(data: T): any;
  // conversão quando recebe do firestore
  fromFirestore(snapshot: DocumentSnapshot, options: any): T;
}
