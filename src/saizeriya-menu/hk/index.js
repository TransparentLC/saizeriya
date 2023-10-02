import { randomChoice, randomInt, pickItem } from '../../util.js';
/** @type {SaizeriyaMenuItem[]} */
import menu from './menu.json';

const drinkItem = pickItem(menu, e => e.id === "1301");

/** @type {import('../../main.js').SaizeriyaMenu} */
export default {
    priceFormat: x => '$' + x,
    priceGCD: 1,
    budget: 50,
    lang: 'zh_hant',
    companyName: 'HONG KONG SAIZERIYA CO.LIMITED',
    companyLink: 'https://www.saizeriya.com.hk',
    menu,
    drinkItem,
    rollDrink: () => '（TODO：暢飲資訊暫缺）', // TODO
};