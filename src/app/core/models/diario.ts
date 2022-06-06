import { Converter } from './converter';

export interface Diario {
  id?: string; // string aleatória/atribuído pelo firestore
  titulo: string;
  corpo: string;
  local: string;
  data: Date; // data da viagem realizada
  imagem?: string; // link da imagem
  // Serão preenchidas programaticamente
  createdAt: Date; // guarda quando o diário foi criado
  usuarioId?: string;
  usuarioNick?: string;
  usuarioName?: string;
}

export const DiarioConverter: Converter<Diario> = {
  toFirestore: (data) => data, // ao enviar eu não quero alterar o obj
  fromFirestore: (snapshot, options) => {
    // extrai o objeto de dados do documento
    const obj = snapshot.data(options)!;

    return {
      ...obj, // spread - adiciona todas as propriedades de obj
      data: obj['data']?.toDate(), // converte de FirestoreDate p/ Date
      createdAt: obj['createdAt']?.toDate(),
    } as Diario;
  },
};
