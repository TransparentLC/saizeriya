/** @type {SaizeriyaMenuItem[]} */
import menu from './menu.json';

/** @type {import('../../main.js').SaizeriyaMenu} */
export default {
    altTitle: '必胜客',
    priceFormat: x => '¥' + x.toFixed(2),
    priceGCD: 1,
    budget: 30,
    lang: 'zh_hans',
    companyName: '百胜（中国）投资有限公司',
    companyLink: 'https://www.yumchina.com',
    menu,
    drinkItem: null,
    allowDrinkMix: false,
    rollDrink: () => {},
};