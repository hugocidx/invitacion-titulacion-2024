export interface Roles {
    id: number,
    title: string,
    description: string
}

export interface Usuario {
    id: string,
    nombre: string,
}
export interface User {
    username: string,
    password: string,
}

export interface UserResponse {
    status: boolean
    token?: string
}



