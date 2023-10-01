import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';

import asyncPool from 'tiny-async-pool';
import fetch from 'node-fetch';
import sharp from 'sharp';

/**
 * @typedef {{
 *  id: Number,
 *  name: String,
 *  price: Number,
 *  category: String,
 *  image: Record<String, String>,
 * }} SaizeriyaMenuItem
 */

/** @type {SaizeriyaMenuItem[]} */
const menu = JSON.parse(fs.readFileSync('menu-raw.json', {encoding: 'utf-8'}));

for await (const _ of asyncPool(16, menu, async e => {
    const ts = performance.now();

    const url = e.image['image/jpeg'];
    const basename = path.basename(url, '.jpg');
    const imgData = Buffer.from(await fetch(url, {headers: {'Referer': 'http://saliya.gzyowin.com/'}}).then(e => e.arrayBuffer()));
    const img = sharp(imgData);
    const metadata = await img.metadata();
    const imgResized = img.resize({
        width: metadata.width & ~(0b1),
        height: metadata.height & ~(0b1),
        fit: 'fill',
        withoutEnlargement: true,
    });
    fs.writeFileSync(`../../../public/image/gd/${basename}.jpg`, imgData);
    fs.writeFileSync(`../../../public/image/gd/${basename}.webp`, await imgResized.webp({
        quality: 75,
        effort: 6,
        smartSubsample: true,
    }).toBuffer());
    fs.writeFileSync(`../../../public/image/gd/${basename}.avif`, await imgResized.avif({
        quality: 50,
        effort: 9,
        chromaSubsampling: '4:2:0',
    }).toBuffer());
    e.image = {
        'image/avif': `image/gd/${basename}.avif`,
        'image/webp': `image/gd/${basename}.webp`,
        'image/jpeg': `image/gd/${basename}.jpg`,
    };

    const te = performance.now();
    console.log('Compressed', e.name, url, 'in', te - ts, 'ms');
})) {}

fs.writeFileSync('menu.json', JSON.stringify(Array.from(menu.values()), null, 4));
