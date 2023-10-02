import { randomChoice, pickItem, numberComma } from '../../util.js';
/** @type {SaizeriyaMenuItem[]} */
import menu from './menu.json';

const drinkItem = pickItem(menu, e => e.id === "DB01");

/** @type {import('../../main.js').SaizeriyaMenu} */
export default {
    priceFormat: x => '¥' + numberComma(x),
    priceGCD: 10,
    budget: 80,
    lang: 'zh_hans',
    companyName: '株式会社サイゼリヤ',
    companyLink: 'https://www.saizeriya.co.jp/',
    menu,
    drinkItem,
    allowDrinkMix: false,
    rollDrink: () => randomChoice([
        '山葡萄', '白葡萄', '可口可乐', '甜瓜苏打',
        '橙汁', '汤力水', '蔬果汁', '冰咖啡',
        '热咖啡', '浓缩咖啡', '卡布奇诺',
    ]),
};