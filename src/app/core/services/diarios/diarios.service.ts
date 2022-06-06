import { Injectable } from '@angular/core';
import {
  collectionData,
  docData,
  Firestore,
  where,
} from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  updateDoc,
} from '@firebase/firestore';
import { first, from, Observable, switchMap } from 'rxjs';
import { Diario, DiarioConverter } from '../../models/diario';
import { AuthService } from '../auth/auth.service';
import { UploadService } from '../upload/upload.service';

@Injectable({
  providedIn: 'root',
})
export class DiariosService {
  constructor(
    private db: Firestore,
    private authService: AuthService,
    private uploadService: UploadService
  ) {}
  
  diarios = collection(this.db, 'diarios').withConverter(DiarioConverter);

  getTodosDiarios(): Observable<Diario[]> {
   
    return collectionData(this.diarios, { idField: 'id' });
  }

  getDiariosUsuario(): Observable<Diario[]> {
    return this.authService.logged.pipe(
      
      first(), 
      switchMap((user) => {
        
        return collectionData(
          query(this.diarios, where('usuarioId', '==', user?.uid)),
          { idField: 'id' }
        );
      })
    );
  }

  getDiarioById(id: string): Observable<Diario> {
    const diarioDoc = doc(this.diarios, id); 
    return docData(diarioDoc, { idField: 'id' });
  }

  addDiario(diario: Diario, imagem?: File) {
   
    return this.authService.userData.pipe(
 
      switchMap((user) => {
        return this.uploadService
          .upload(imagem, `diarios/${this.authService.uid}/`) 
          .pipe(
            switchMap((url) => {
              diario.createdAt = new Date();
              diario.imagem = url ?? 'assets/img/placeholder.png';
              diario.usuarioId = this.authService.uid;
              diario.usuarioNick = user['nick'];
              diario.usuarioName = user['nome'];

              return from(addDoc(this.diarios, diario)); 
            })
          );
      })
    );
  }

  editDiario(diario: Diario, imagem?: File) {
    const diarioDoc = doc(this.diarios, diario.id);
    return this.uploadService
      .upload(imagem, `diarios/${diario.usuarioId}/`)  
      .pipe(
        switchMap((url) => {
          
          return from(
            updateDoc(diarioDoc, { ...diario, imagem: url ?? diario.imagem })
          );
        })
      );
  }

  deleteDiario(diario: Diario) {
   
    const diarioDoc = doc(this.diarios, diario.id);
    
    return from(deleteDoc(diarioDoc));
  }
}

