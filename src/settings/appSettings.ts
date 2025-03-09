import { BeakerIcon, Cog6ToothIcon, HomeIcon } from "@heroicons/react/24/outline"
import { PlusIcon } from "@heroicons/react/24/solid"

// Delimitador de ancho de pantalla en pixeles
export const screenWidthThereshold = 768

// Ancho de sidebar
export const sidebarWidth = 640

// Menú de la barra lateral
export const sidebarMenu: MenuSection[] = [
    {
        name: 'Guerra',
        groups: [
            {
                name: 'Guerra actual',
                icon: HomeIcon,
                routes: [
                    {
                        name: 'Coordenadas',
                        route: '/summary',
                    },
                    {
                        name: 'Planetas para atacar',
                        route: '/available',
                    }
                ]
            },
        ],
    },
    {
        name: 'Coordenadas',
        groups: [
            {
                name: 'Añadir coordenadas',
                icon: PlusIcon,
                routes: '/add_coords',
            }
        ]
    },
    {
        name: 'Configuración',
        groups: [
            {
                name: 'Mi cuenta',
                icon: Cog6ToothIcon,
                routes: '/me',
            }
        ]
    },
    {
        name: 'Experimental',
        groups: [
            {
                name: 'UI-Tests',
                icon: BeakerIcon,
                routes: '/uitests',
            }
        ]
    }
]

// Mensajes y leyendas
export const COMMON_LEGEND = {
    NO_RECORDS_MESSAGE: "No hay registros.",
    CELL_RENDER_ERROR: 'N/A',
}