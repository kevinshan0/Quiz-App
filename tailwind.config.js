/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            spacing: {
                '112': '28rem',
                '128': '32rem',
                '144': '36rem',
                '160': '40rem'
              }
        },
        fontFamily: {
            'default': 'Helvetica, Arial, sans-serif'
        }
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["coffee"]
    }
}

