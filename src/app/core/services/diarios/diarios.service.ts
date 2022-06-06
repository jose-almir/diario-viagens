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
  // Referência a uma possível coleção do firestore
  diarios = collection(this.db, 'diarios').withConverter(DiarioConverter);

  getTodosDiarios(): Observable<Diario[]> {
    // collectionData - extrai listagem dos diários da coleção
    // { idField: 'id' } - solicita p/ o banco adicionar essa propriedade dentro do objeto já preenchida
    return collectionData(this.diarios, { idField: 'id' });
  }

  getDiariosUsuario(): Observable<Diario[]> {
    return this.authService.logged.pipe(
      // pega informações do user logado
      first(), // apenas a primeira informação de user
      switchMap((user) => {
        // cria um novo obs com base no filtro de user.uid
        return collectionData(
          query(this.diarios, where('usuarioId', '==', user?.uid)),
          { idField: 'id' }
        );
      })
    );
  }

  getDiarioById(id: string): Observable<Diario> {
    const diarioDoc = doc(this.diarios, id); // indica o local do documento na coleção
    return docData(diarioDoc, { idField: 'id' });
  }

  addDiario(diario: Diario, imagem?: File) {
    // A adição de diário depende de:
    // - Um usuário com nome, nick e id (1)
    // - Arquivo no storage (2)
    // - Inserção do objeto no banco (3)
    // Como todas as operações são assíncronas
    // foi necessário encadear com o uso do switchMap
    // Esse operador pode ser usado para encadear as informações necessárias.
    // user -> url -> diario
    return this.authService.userData.pipe(
      // (1)
      switchMap((user) => {
        return this.uploadService
          .upload(imagem, `diarios/${this.authService.uid}/`) // (2)
          .pipe(
            switchMap((url) => {
              diario.createdAt = new Date();
              diario.imagem = url ?? 'assets/img/placeholder.png';
              diario.usuarioId = this.authService.uid;
              diario.usuarioNick = user['nick'];
              diario.usuarioName = user['nome'];

              return from(addDoc(this.diarios, diario)); // (3)
            })
          );
      })
    );
  }

  editDiario(diario: Diario, imagem?: File) {
    const diarioDoc = doc(this.diarios, diario.id);
    return this.uploadService
      .upload(imagem, `diarios/${diario.usuarioId}/`) // tenta realizar upload 
      .pipe(
        switchMap((url) => {
          // após a tentativa de upload ele atualiza finalmente o doc
          return from(
            updateDoc(diarioDoc, { ...diario, imagem: url ?? diario.imagem })
          );
        })
      );
  }

  deleteDiario(diario: Diario) {
    // Cria uma referência para o documento
    const diarioDoc = doc(this.diarios, diario.id);
    // Deleta o documento da coleção a apartir da referência
    return from(deleteDoc(diarioDoc));
  }
}

/**
 * ATUALIZAR DIÁRIO
 */

/**
 * Como fazer uma query no firestore?
 *
 * 1) Determine a coleção para buscar os dados
 * Ex: produtos = collection(this.db, 'produtos')
 * Obs: Caso os documentos de produto possuírem data é importante
 * utilizar um ProdutoConverter: Converter<Produto>.
 *
 * 2) Agora é necessário criar a query, pode fazer separadamente:
 *
 * const w = where('preco', '>=', 50.0); // produtos com preco maior ou igual a 50.0
 * const q = query(this.produtos, w);
 *
 * return collectionData(q, { idField: 'id'})
 *
 */
