import { randomChoice, randomInt, pickItem } from '../../util.js';
/** @type {SaizeriyaMenuItem[]} */
import menu from './menu.json';

const drinkItem = pickItem(menu, e => e.id === 65);

/** @type {import('../../main.js').SaizeriyaMenu} */
export default {
    priceFormat: x => '$' + x,
    priceGCD: 5,
    budget: 40,
    lang: 'zh_hant',
    companyName: '台灣薩莉亞餐飲股份有限公司',
    companyLink: 'http://www.saliya.com.tw/',
    menu,
    drinkItem,
    allowDrinkMix: false,
    rollDrink: () => '（TODO：暢飲資料暫缺）', // TODO
};