export interface matriculacionRes {
    codRetorno:     string;
    countRegistros: string;
    retorno:        Retorno[];
}

export interface Retorno {
    matFTR:     MatFTR;
    gestor:     Gestor;
    lstPropVeh: LstPropVeh[];
}

export interface Gestor {
    idPC: string;
    nom:  string;
    ape:  string;
}

export interface LstPropVeh {
    matFPV: MatFPV;
    matFVH: MatFVH;
}

export interface MatFPV {
    idPV:    string;
    iden:    string;
    nom:     string;
    ape:     string;
    rzSo:    RzSo;
    caPr:    string;
    caSe:    string;
    nmLt:    string;
    mail:    string;
    tlCv:    string;
    tlCl:    string;
    usCr:    string;
    usCa:    null | string;
    feCr:    Date;
    feCa:    Date | null;
    esta:    Esta;
    auxFila: number;
}

export enum Esta {
    Act = "ACT",
}

export enum RzSo {
    Empty = "",
    Maritex = "MARITEX",
}

export interface MatFVH {
    idVH:    string;
    idTr:    string;
    idPv:    string;
    raDu:    string;
    grav:    Grav;
    obse:    string;
    faDe:    string;
    tipo:    string;
    usCr:    string;
    usCa:    string;
    feCr:    Date;
    feCa:    Date | null;
    esta:    Esta;
    auxFila: number;
    usAs:    string;
    esMa:    EsMa;
}

export enum EsMa {
    Gen = "GEN",
}

export enum Grav {
    No = "No",
    Si = "Si",
}

export interface MatFTR {
    idTR:    string;
    idPc:    string;
    nmTr:    string;
    usCr:    string;
    usCa:    string;
    feCr:    Date;
    feCa:    Date | null;
    esta:    string;
    auxFila: number;
    aux1:    number;
}
