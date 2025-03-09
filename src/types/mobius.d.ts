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
};
