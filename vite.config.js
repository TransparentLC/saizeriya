import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from 'rollup-plugin-visualizer';

const __IS_PROD__ = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    plugins: [
        createHtmlPlugin({
            minify: {
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                decodeEntities: true,
                removeComments: true,
                removeAttributeQuotes: false,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeEmptyAttributes: true,
                useShortDoctype: true,
                processConditionalComments: true,
                sortAttributes: true,
                sortClassName: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: false,
            },
        }),
    ],
    build: {
        chunkSizeWarningLimit: Infinity,
        minify: 'terser',
        terserOptions: {
            compress: {
                arguments: true,
                ecma: 2020,
                module: true,
                unsafe_math: true,
                unsafe_methods: true,
                unsafe_proto: true,
                unsafe_regexp: true,
                unsafe_symbols: true,
                unsafe_undefined: true,
                passes: 2,
            },
            mangle: {
                module: true,
            },
            format: {
                ecma: 2020,
                comments: false,
            },
        },
        rollupOptions: {
            plugins: [
                visualizer({
                    gzipSize: true,
                    brotliSize: true,
                }),
            ],
        },
    },
    define: {
        __IS_PROD__,
        __BUILD_TIME__: `"${(new Date).toISOString()}"`,
    },
});
