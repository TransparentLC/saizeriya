import { randomChoice, randomInt, pickItem } from '../../util.js';
/** @type {SaizeriyaMenuItem[]} */
import menu from './menu.json';

const drinkItem = pickItem(menu, e => e.id === "857");

/** @type {import('../../main.js').SaizeriyaMenu} */
export default {
    priceFormat: x => '¥' + x.toFixed(2),
    priceGCD: 1,
    budget: 30,
    lang: 'zh_hans',
    companyName: '上海萨莉亚餐饮有限公司',
    companyLink: 'http://www.saizeriya.com.cn/',
    menu,
    drinkItem,
    rollDrink: abnormal => {
        switch (abnormal ? randomInt(4, 6) : randomInt(0, 3)) {
            case 0:
                return `热饮（${randomChoice(['拿铁咖啡', '卡布奇诺', '热牛奶', '美式咖啡', '意式浓缩咖啡', '香沫咖啡'])}）`;
            case 1:
                return `茶包（${randomChoice(['高山绿茶', '玄米茶', '红茶', '茉莉花茶', '菊花茶', '普洱'])}）`;
            case 2:
                return `汽水（${randomChoice(['可口可乐', '雪碧', '柠檬红茶', '芬达'])}）`;
            case 3:
                return `果汁（${randomChoice(['黑加仑汁', '草莓番石榴汁', '芒果汁', '橙汁'])}）`;
            case 4:
                return `热奶茶（${randomChoice(['高山绿茶', '玄米茶', '红茶', '茉莉花茶', '菊花茶', '普洱'])}+热牛奶）`;
            case 5:
                return `碳酸果汁（${randomChoice(['可口可乐', '雪碧', '柠檬红茶', '芬达'])}+${randomChoice(['黑加仑汁', '草莓番石榴汁', '芒果汁', '橙汁'])}）`;
            case 6:
                return '气泡咖啡（冰块+雪碧+意式浓缩咖啡）';
        }
    },
};