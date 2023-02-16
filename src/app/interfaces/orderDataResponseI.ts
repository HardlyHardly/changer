export interface orderDataResponseI{
    card: null | string,
    createdAt: Date,
    fio: null,
    id: number,
    status: string,
    symbolFrom: string,
    symbolTo: string,
    valueFrom: string,
    valueTo: number,
    wallet: string
    user: {
        createdAt: Date,
        email: string,
        id: number,
        password: string,
        refreshToken: string
    }
}