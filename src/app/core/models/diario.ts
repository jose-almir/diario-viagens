import { Converter } from './converter';

export interface Diario {
  id?: string; 
  titulo: string;
  corpo: string;
  local: string;
  data: Date;
  imagem?: string;

  createdAt: Date; 
  usuarioId?: string;
  usuarioNick?: string;
  usuarioName?: string;
}

export const DiarioConverter: Converter<Diario> = {
  toFirestore: (data) => data,
  fromFirestore: (snapshot, options) => {
   
    const obj = snapshot.data(options)!;

    return {
      ...obj, 
      data: obj['data']?.toDate(),
      createdAt: obj['createdAt']?.toDate(),
    } as Diario;
  },
};
