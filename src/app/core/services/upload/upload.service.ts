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
    const ext = file.name.split('.').pop(); 
    const name = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    return `${name}.${ext}`;
  }

  upload(file?: File, folder?: string): Observable<string | null> {
    if (file) {
      const filename = this.createFileName(file);
      const fileRef = ref(this.storage, folder + filename); 
      return from(uploadBytes(fileRef, file)).pipe(
        switchMap(() => from(getDownloadURL(fileRef)))
      );
    } else {
      return of(null);
    }
  }
}
