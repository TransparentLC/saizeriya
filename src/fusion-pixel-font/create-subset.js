import childProcess from 'node:child_process';
import fs from 'node:fs';

const charset = new Set('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\x0b\x0c'.split(''));

for (const f of [
    '../main.js',
    '../menu.json',
    '../../index.html',
]) {
    let s = fs.readFileSync(f, {encoding: 'utf-8'})
    if (f.endsWith('.js')) {
        s = s.replace(/^\s*\/\/\s*.*$/gm, '');
    }
    if (f.endsWith('.js') || f.endsWith('.css')) {
        s = s.replace(/\/\*[\s\S]*\*\//g, '');
    }
    if (f.endsWith('.html')) {
        s = s.replace(/<!--[\s\S]*-->/g, '');
    }
    s.split('').forEach(e => charset.add(e));
}

const charsetString = Array.from(charset).join('');
console.log(charsetString.length);
console.log(charsetString);

fs.writeFileSync('charset.txt', charsetString);
childProcess.execFileSync('pyftsubset', [
    'fusion-pixel-12px-proportional.woff2',
    '--text-file=charset.txt',
    '--output-file=fusion-pixel-12px-proportional-subset.woff2',
    '--flavor=woff2',
]);
fs.unlinkSync('charset.txt');
