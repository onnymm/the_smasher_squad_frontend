declare namespace Mobius {

    declare namespace Types {
        // Niveles de base estelar
        type StarbaseLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

        // Números de planeta
        type NthPlanet = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

        // Colores de sistema solar
        type NonNullableSolarSystemColor = 'white' | 'red' | 'green' | 'blue' | 'blue' | 'purple' | 'yellow'
        type SolarSystemColor = NonNullableSolarSystemColor | null;
    }

    // Datos desde el backend
    declare namespace Backend {

        // Coordenadas base de jugador
        interface BasePlayerCoords {
            'planet': Mobius.Types.NthPlanet;
            'starbase_level': Mobius.Types.StarbaseLevel;
            'name': string;
            'id'?: number;
            'x'?: number;
            'y'?: number;
            'war'?: boolean;
            'color'?: Mobius.Types.SolarSystemColor;
        };
    }

    // Datos desde la API de Galaxy Life
    declare namespace Objects {

        // Rol de alianza
        type AllianceRole = 0 | 1 | 2;

        // Escudo de alianza
        interface AllianceEmblem {
            'Shape': number;
            'Pattern': number;
            'Icon': number;
        }

        // Abstracción de parámetros comunes en objetos de la API
        interface APIRecord {
            'Id': number;
            'Name': string;
        }

        // Miembro de alianza
        interface AllianceMember extends APIRecord {
            'Avatar': string;
            'Level': number;
            'AllianceRole': AllianceRole;
            'TotalWarPoints': number;
        }
    }

    // Objetos de la API de Galaxy Life
    declare namespace API {

        // Datos de alianza
        interface AllianceData extends Mobius.Objects.APIRecord {
            'Id': string;
            'Description': string;
            'Emblem': Mobius.Objects.AllianceEmblem;
            'AllianceLevel': number;
            'WarPoints': number;
            'WarsWon': number;
            'WarsLost': number;
            'InWar': boolean;
            'OpponentAllianceId': string;
        }
    }
};
