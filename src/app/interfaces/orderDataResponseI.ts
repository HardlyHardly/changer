export interface orderDataResponseI{
    card: null | string,
    createdAt: string,
    fio: null,
    id: number,
    status: string,
    symbolFrom: string,
    symbolTo: string,
    valueFrom: string,
    valueTo: number,
    wallet: string
    user: {
        createdAt: string,
        email: string,
        id: number,
        password: string,
        refreshToken: string
    }
}