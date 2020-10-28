import { Endereco } from './endereco';

export class Loja {
    nome: string;
    complemento: string = "";
    numero: string;
    tel: string;
    ativo: boolean = true;

    endereco: Endereco = new Endereco;

    lat: number;
    lng: number;
}
