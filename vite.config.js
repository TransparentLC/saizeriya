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
        minify: 'oxc',
        cssMinify: 'lightningcss',
        rolldownOptions: {
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
