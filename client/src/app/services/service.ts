import { Layer } from '../layers/layer';
import { Usuario } from '../usuario/usuario';
import { Standard } from '../standards/standard';
import { Domain } from '../domain/domain';

export class Service {
    _id: string;
    name: string;
    layer: Layer;
    domain: Domain;
    standard: Standard;
    parent: Service;
    user: Usuario;
}
