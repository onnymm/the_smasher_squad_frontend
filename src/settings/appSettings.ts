import { BeakerIcon, Cog6ToothIcon, HomeIcon } from "@heroicons/react/24/outline"

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
                    // {
                    //     name: 'Coordenadas',
                    //     route: '/coords',
                    // },
                    {
                        name: 'Coordenadas',
                        route: '/summary',
                    }
                ]
            },
        ]
    },
    {
        name: 'Configuración',
        groups: [
            {
                name: 'Preferencias',
                icon: Cog6ToothIcon,
                routes: '',
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