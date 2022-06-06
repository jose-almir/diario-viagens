import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private storage: Storage) {}

  private createFileName(file: File): string {
    // batata.jpg
    const ext = file.name.split('.').pop(); // jpg
    const name = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    return `${name}.${ext}`; // 2131231231312312312.jpg
  }

  // folder indica a pasta para salvar o file.
  // folder pode ser /diarios/fx125/
  // Retorna o link da imagem ou null
  upload(file?: File, folder?: string): Observable<string | null> {
    if (file) {
      const filename = this.createFileName(file);
      const fileRef = ref(this.storage, folder + filename); // Ex:  /diarios/fx125/12345.jpg
      return from(uploadBytes(fileRef, file)).pipe(
        switchMap(() => from(getDownloadURL(fileRef))) // o upload é realizado e depois o link é solicitado
      );
    } else {
      return of(null); // não ocorre upload
    }
  }
}
