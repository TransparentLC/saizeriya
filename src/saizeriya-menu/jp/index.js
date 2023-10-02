import { randomChoice, pickItem, numberComma } from '../../util.js';
/** @type {SaizeriyaMenuItem[]} */
import menu from './menu.json';

const drinkItem = pickItem(menu, e => e.id === "DB01");

/** @type {import('../../main.js').SaizeriyaMenu} */
export default {
    priceFormat: x => '¥' + numberComma(x),
    priceGCD: 10,
    budget: 80,
    lang: 'ja',
    companyName: '株式会社サイゼリヤ',
    companyLink: 'https://www.saizeriya.co.jp/',
    menu,
    drinkItem,
    rollDrink: () => randomChoice([
        '山ブドウ', '白ブドウ', 'コカ・コーラ', 'メロンソーダ',
        'オレンジ', 'トニックウォーター', '野菜ジュース', 'アイスコーヒー',
        'ホットコーヒー', 'エスプレッソ', 'カプチーノ',
    ]),
};