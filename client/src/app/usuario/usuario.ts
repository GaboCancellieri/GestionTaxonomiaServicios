import { Permission } from './permiso';

export class Usuario {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    permisos: Permission[];


    constructor(public newId: string,
                public newUsername: string,
                public newFirstName: string,
                public newLastName: string,
                public newPermissions: Permission[]
    ) {
        this._id = this.newId;
        this.username = newUsername;
        this.firstName = newFirstName;
        this.lastName = newLastName;
        this.permisos = newPermissions;
    }

}
