import childProcess from 'node:child_process';
import fs from 'node:fs';

const charset = new Set('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\x0b\x0c'.split(''));

for (const f of [
    '../main.js',
    '../../index.html',
    ...fs.readdirSync('../saizeriya-menu').filter(e => e !== 'README.md').map(e => [`../saizeriya-menu/${e}/index.js`, `../saizeriya-menu/${e}/menu.json`]).flat(),
]) {
    let s = fs.readFileSync(f, {encoding: 'utf-8'})
    if (f.endsWith('.js')) {
        s = s.replace(/^\s*\/\/\s*.*$/gm, '');
    }
    if (f.endsWith('.js') || f.endsWith('.css')) {
        s = s.replace(/\/\*[\s\S]*?\*\//g, '');
    }
    if (f.endsWith('.html')) {
        s = s.replace(/<!--[\s\S]*?-->/g, '');
    }
    s.split('').forEach(e => charset.add(e));
}

fs.writeFileSync('charset.txt', Array.from(charset).join(''));
childProcess.execFileSync(
    'pyftsubset',
    [
        'fusion-pixel-12px-proportional-zh_hans.woff2',
        '--text-file=charset.txt',
        '--output-file=fusion-pixel-12px-proportional-zh_hans-subset.woff2',
        '--flavor=woff2',
        '--verbose',
    ],
    {
        stdio: 'inherit',
    },
);
fs.unlinkSync('charset.txt');
