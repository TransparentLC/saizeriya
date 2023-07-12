import fs from 'node:fs';

import * as cheerio from 'cheerio';
import asyncPool from 'tiny-async-pool';
import fetch from 'node-fetch';

/**
 * @typedef {{
 *  id: Number,
 *  name: String,
 *  price: Number,
 *  category: String,
 *  image: Record<String, String>,
 * }} SaizeriyaMenuItem
 */

/** @type {Map<Number, SaizeriyaMenuItem>} */
const menu = new Map;

/**
 * @param {Number} start
 * @param {Number} end
 * @param {Number} [step]
 * @returns {Generator<Number, void>}
 */
const range = function* (start, end, step = 1) {
    for (let i = start; i < end; i += step) {
        yield i;
    }
};

/**
 * @param {Number} storeId
 * @returns {Promise<Map<Number, SaizeriyaMenuItem[]>>}
 */
const fn = async storeId => {
    console.log('Fetching storeId =', storeId);

    /** @type {Map<Number, SaizeriyaMenuItem>} */
    const menuPartial = new Map;
    let html;
    try {
        html = await fetch(`http://saliya.gzyowin.com/wx/dc/default_2.aspx?storeid=${storeId}`, {
            headers: {
                'Cookie': 'openid=0123456789012345678901234567',
            },
        }).then(r => r.text());
    } catch (err) {
        console.log(err);
        return menuPartial;
    }
    const $ = cheerio.load(html);

    const category = Object.fromEntries($('#nowcp-box-left ul li[data-id]').toArray().map(el => [$(el).attr('data-id'), $(el).text().replace(/0$/m, '').trim()]));

    $('#nowcp-box-right > div[data-name]').each((i, el) => {
        if ([
            '1200000211', // 新品
            '1200000212', // 人气商品
        ].includes($(el).attr('data-id'))) return;
        const [k, v] = $(el).find('.cp-box-right-box-info-right > .title').text().trim().split('\u00a0', 2);
        menuPartial.set(parseInt(k), {
            id: parseInt(k),
            name: v,
            price: parseInt($(el).find('.price').text().trim().replaceAll('¥', '')),
            category: category[$(el).attr('data-id')],
            image: {
                // http://saliyacdn.gzyowin.com/UploadFile/good/****.jpg
                // Referer: http://saliya.gzyowin.com/
                'image/jpeg': $(el).find('img[id="imggoodpic"]').attr('data-original').split('?')[0],
            },
        });
    });

    return menuPartial;
};

// console.log(await fn(12000002));
// console.log();

for await (const menuPartial of asyncPool(16, range(12000000, 12000250), fn)) {
    menuPartial.forEach((v, k) => menu.set(k, v));
}

fs.writeFileSync('menu.json', JSON.stringify(Array.from(menu.values()), null, 4));
