export interface Task {
    titulo: string;
    conteudo: string;
    lista: string;
}

export interface CreatedTask extends Task {
    id: string;
}
