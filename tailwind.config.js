/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#C62828',
                    dark: '#B71C1C',
                    light: '#EF5350',
                },
                secondary: {
                    DEFAULT: '#1565C0',
                    dark: '#0D47A1',
                    light: '#42A5F5',
                },
                background: '#F8FAFC',
                status: {
                    available: '#059669',
                    low: '#D97706',
                    critical: '#DC2626',
                }
            },
            borderRadius: {
                'xl': '12px',
            },
            fontFamily: {
                sans: ['Inter', 'Poppins', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}
