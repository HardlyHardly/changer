export interface CreateOrder {
    symbolFrom: string;
    valueFrom: number;
    symbolTo: string;
    valueTo: number;
    card?: string | null;
    fio?: string | null;
    wallet?: string | null;
}
