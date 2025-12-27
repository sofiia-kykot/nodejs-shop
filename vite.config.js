import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import fullReload from 'vite-plugin-full-reload';

export default defineConfig({
    plugins: [
        fullReload(['views/**/*.ejs']),
        tailwindcss(),
    ],
    server: {
        origin: 'http://localhost:5173',
        cors: true
    },
    build: {
        manifest: true,
        rollupOptions: {
            input: './assets/js/main.js'
        }
    }
});