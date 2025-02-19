import { mainColor } from './src/constants/colors'
import { sidebarWidthClassName } from './src/core/computedClassNames'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    // Modo oscuro en clase CSS
    darkMode: 'class',

    // Lista de clases computadas a incluir siempre
    safelist: [
        sidebarWidthClassName,
        "-translate-y-[50%]",
        'group-[.coords-cell]:group-hover:drop-shadow-[0_0_4px_#c3f9ff80]',
        'group-[.coords-cell]:group-hover:drop-shadow-[0_0_4px_#ff6c6c80]',
        'group-[.coords-cell]:group-hover:drop-shadow-[0_0_4px_#76ffd180]',
        'group-[.coords-cell]:group-hover:drop-shadow-[0_0_4px_#6cccff80]',
        'group-[.coords-cell]:group-hover:drop-shadow-[0_0_4px_#e459fc80]',
        'group-[.coords-cell]:group-hover:drop-shadow-[0_0_4px_#fffa6c80]',
    ],

    theme: {
        extend: {
            height: {
                '9.5': '2.375rem',
            },
            width: {
                '9.5': '2.375rem',
            },
            maxHeight: {
                '9.5': '2.375rem',
                50: '12.5rem',
                94: '23.5rem',
            },
            maxWidth: {
                '9.5': '2.375rem',
            },
            colors: {
                main: mainColor,
            },
            backgroundColor: {
                inherit: 'inherit',
            },
            boxShadow: {
                'darkmode-switch-s': '0px 1.5px 2px 1px rgba(0, 0, 0, 0.2)',
                'button-round': '0px 1.5px 2px 1px rgba(0, 0, 0, 0.2)',
                'inverted': 'inset 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
            },
            animation : {
                'loading-spin': 'spin 1s infinite ease-in-out',
                'star-spin': 'spin 30s infinite linear'
            },
            transitionProperty: {
                width: 'width',
                height: 'height',
                hover: 'backdrop-filter, box-shadow, background-color',
            },
            backdropSaturate: {
                115: '1.15',
            }
        },
    },
    plugins: [],
}
