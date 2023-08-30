import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from 'vite-plugin-svgr';
import * as esbuild from "esbuild";

const sourceJSPattern = /s.*\.js$/;
const rollupPlugin = (matchers) => ({
    name: "js-in-jsx",
    load(id) {
        if (matchers.some(matcher => matcher.test(id))) {
            const file = fs.readFileSync(id, { encoding: "utf-8" });
            return esbuild.transformSync(file, { loader: "jsx" });
        }
    }
});
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        svgr({
            svgrOptions: {
                // svgr options
            },
        }),
        react(),
        //reactRefresh(),
    ],
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                ".js": "jsx",
            },
        },
    },
    esbuild: {
        loader: "jsx",
        include: [sourceJSPattern],
        exclude: [],
    },
    resolve: {
        alias: {
            '@crema': '/resources/js/admin/@crema'
        }
    }
});


// export default ({ command }) => ({
//     base: command === 'serve' ? '' : '/build/',
//     publicDir: 'fake_dir_so_nothing_gets_copied',
//     build: {
//         manifest: true,
//         outDir: 'public/build',
//         rollupOptions: {
//             input: 'resources/js/app.js',
//         },
//     },
//     plugins: [
//         reactRefresh(),
//     ],
// });
