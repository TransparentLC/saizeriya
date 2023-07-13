import { createApp } from 'petite-vue';

/**
 * @typedef {{
 *  id: Number,
 *  name: String,
 *  price: Number,
 *  category: String,
 *  image: Record<String, String>,
 * }} SaizeriyaMenuItem
 */

import './style.css';
/** @type {SaizeriyaMenuItem[]} */
import menu from './menu.json';

// 对畅饮进行特殊处理
const menuDrink = menu.find(e => e.id === 1888);
menu.splice(menu.indexOf(menuDrink), 1);
const menuNoDrink = menu.find(e => e.id === 1777);
menu.splice(menu.indexOf(menuNoDrink), 1);

const menuPriceMin = Math.min(...menu.map(e => e.price));
const menuPriceTotal = menu.map(e => e.price).reduce((acc, cur) => acc += cur, 0);

/**
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
const randomInt = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
/**
 * @template {T}
 * @param {T[]} arr
 * @returns {T}
 */
const randomChoice = arr => arr[randomInt(0, arr.length - 1)];

createApp({
    showResult: false,
    menuPriceMin,
    menuPriceTotal,
    budgetMin: null,
    budgetMax: null,
    categoryFilter: Array.from(new Set(menu.map(e => e.category))).map(e => ({category: e, enabled: true})),
    blacklistExpr: '',
    /** @type {SaizeriyaMenuItem[]} */
    result: [],
    drinkProbability: .5,
    drinkMix: false,
    drinkRecommendation: '',
    qrImage: '',
    resultImage: '',

    /**
     * @param {Number} e
     * @returns {String}
     */
    formatPrice(e) {
        return '¥' + e.toFixed(2);
    },

    autoSetBudget() {
        const budgetInputMin = parseInt(this.budgetMin);
        const budgetInputMax = parseInt(this.budgetMax);
        let mid;
        if (isNaN(budgetInputMin) && isNaN(budgetInputMax)) {
            mid = 30;
        } else if (isNaN(budgetInputMin)) {
            mid = budgetInputMax;
        } else if (isNaN(budgetInputMax)) {
            mid = budgetInputMin;
        } else {
            mid = (budgetInputMin + budgetInputMax) / 2;
        }
        this.budgetMin = Math.round(mid * .8);
        this.budgetMax = Math.round(mid * 1.2);
    },

    rollMenu() {
        this.result.length = 0;

        let budgetMin = parseInt(this.budgetMin);
        let budgetMax = parseInt(this.budgetMax);
        if (isNaN(budgetMin) && isNaN(budgetMax)) {
            alert('请输入预算…_φ(･ω･` )');
            return;
        }
        if (isNaN(budgetMin) || budgetMin < 1) {
            this.budgetMin = budgetMin = 1;
        }
        if (isNaN(budgetMax) || budgetMax < 1) {
            this.budgetMax = budgetMax = 1;
        }
        if (budgetMin > budgetMax) {
            [budgetMin, budgetMax] = [budgetMax, budgetMin];
            [this.budgetMin, this.budgetMax] = [this.budgetMax, this.budgetMin];
        }
        if (budgetMin > menuPriceTotal || budgetMax < menuPriceMin) {
            return;
        }
        if (budgetMax > menuPriceTotal) {
            budgetMax = menuPriceTotal;
        }

        // 根据筛选初始化菜单
        const blacklistCategory = new Set(this.categoryFilter.filter(e => !e.enabled).map(e => e.category));
        const blacklistId = new Set(this.blacklistExpr.split(' ').map(e => parseInt(e)));
        const m = menu.filter(e => !blacklistId.has(e.id) && !blacklistCategory.has(e.category));
        if (!m.length) return;

        // 为了使每次运行的结果不一样，将菜单随机打乱
        for (let i = m.length - 1; i >= 0; i--) {
            const x = Math.floor(Math.random() * (i + 1));
            [m[i], m[x]] = [m[x], m[i]];
        }

        // 是否添加畅饮
        const enableDrink = Math.random() < this.drinkProbability && budgetMin >= menuDrink.price;
        if (enableDrink) {
            budgetMin -= menuDrink.price;
            budgetMax -= menuDrink.price;
        }

        /** @type {Set<Number>} 已经尝试过的预算值 */
        const budgetTried = new Set;

        for (
            let i = 0;
            (
                i < ((budgetMin === budgetMax) ? 1 : 64)
                && budgetTried.size < (budgetMax - budgetMin + 1)
                && !this.result.length
            );
            i++
        ) {
            this.result.length = 0;

            // 随机决定本次的预算值
            let budget;
            do {
                budget = randomInt(budgetMin, budgetMax);
            } while (budgetTried.has(budget));
            budgetTried.add(budget);

            if (budget === menuPriceTotal) {
                this.result.push(...m);
            } else {
                // 算法 - 动态规划法（三）子集和问题(Subset sum problem) - 个人文章 - SegmentFault 思否
                // https://segmentfault.com/a/1190000015115623

                // 建立数组s[i][j]，表示数组m的前i个元素（下标从1开始）的子集和是否可以等于j，有两种方法构造这样的子集：
                // * 直接使用前i-1个元素的子集和等于j的子集，不需要加上第i个元素
                // * 找到前i-1个元素的子集和等于j - m[i]的子集，再加上第i个元素
                // 这样就可以构造状态转移方程：
                // s[i][j] = s[i - 1][j] || s[i - 1][j - m[i]]
                // 然后考虑初始化的情况：
                // * s[0][j] = false，表示空集的子集和是否可以等于一个非0值，显然是不可能的
                // * s[i][0] = true，表示子集和是否可以等于0，只要选择空集作为子集就可以了
                // * s[0][0] = true，空集的唯一的子集是空集，子集和为0
                //
                // 如果s[i][j] = true，从这里开始回溯就可以得到子集的内容：
                // s[i][j] = true且s[i - 1][j] = true，说明m[i]不在子集中
                // 那就继续检查m[i - 1]是否在子集中，也就是检查s[i - 1][j]的值
                // s[i][j] = true且s[i - 1][j] = false，说明m[i]在子集中
                // 根据状态转移方程，此时s[i - 1][j - m[i]] = true一定成立
                // 不断回溯直到s[0][j]或s[i][0]为止

                const subset = Array(m.length + 1).fill().map(() => Array(budget + 1).fill());

                for (let i = 0; i <= budget; i++) subset[0][i] = false;
                for (let i = 0; i <= m.length; i++) subset[i][0] = true;
                for (let i = 1; i <= m.length; i++) {
                    for (let j = 1; j <= budget; j++) {
                        if (j < m[i - 1].price) {
                            subset[i][j] = subset[i - 1][j];
                        } else {
                            subset[i][j] = subset[i - 1][j] || subset[i - 1][j - m[i - 1].price];
                        }
                    }
                }
                if (subset[m.length][budget]) {
                    for (let i = m.length; i >= 0 && budget; i--) {
                        if (subset[i][budget] && !subset[i - 1][budget]) {
                            this.result.push(m[i - 1]);
                            budget -= m[i - 1].price;
                        }
                    }
                }
            }
        }

        if (enableDrink) {
            this.result.push(menuDrink);
            switch (this.drinkMix ? randomInt(4, 6) : randomInt(0, 3)) {
                case 0:
                    this.drinkRecommendation = `热饮（${randomChoice(['拿铁咖啡', '卡布奇诺', '热牛奶', '美式咖啡', '意式浓缩咖啡', '香沫咖啡'])}）`;
                    break;
                case 1:
                    this.drinkRecommendation = `茶包（${randomChoice(['高山绿茶', '玄米茶', '红茶', '茉莉花茶', '菊花茶', '普洱'])}）`;
                    break;
                case 2:
                    this.drinkRecommendation = `汽水（${randomChoice(['可口可乐', '雪碧', '柠檬红茶', '芬达'])}）`;
                    break;
                case 3:
                    this.drinkRecommendation = `果汁（${randomChoice(['黑加仑汁', '草莓番石榴汁', '芒果汁', '橙汁'])}）`;
                    break;
                case 4:
                    this.drinkRecommendation = `热奶茶（${randomChoice(['高山绿茶', '玄米茶', '红茶', '茉莉花茶', '菊花茶', '普洱'])}+热牛奶）`;
                    break;
                case 5:
                    this.drinkRecommendation = `碳酸果汁（${randomChoice(['可口可乐', '雪碧', '柠檬红茶', '芬达'])}+${randomChoice(['黑加仑汁', '草莓番石榴汁', '芒果汁', '橙汁'])}）`;
                    break;
                case 6:
                    this.drinkRecommendation = this.result.find(e => e.id === 1738) ? `阿芙佳朵（香草冰激凌+意式浓缩咖啡）` : `气泡咖啡（冰块+雪碧+意式浓缩咖啡）`;
                    break;
            }
        } else {
            this.result.push(menuNoDrink);
        }
        this.result.sort((a, b) => a.id - b.id);
        this.showResult = true;
    },

    async saveMenu() {
        const [html2canvas, qrImage] = await Promise.all([
            __IS_PROD__ ? (window.html2canvas || new Promise((resolve, reject) => {
                const el = document.createElement('script');
                el.src = 'https://npm.elemecdn.com/html2canvas@1/dist/html2canvas.min.js';
                el.onload = () => resolve(window.html2canvas);
                el.onerror = reject;
                document.body.appendChild(el);
            })) : import('html2canvas').then(e => e.default),
            this.qrImage || new Promise((resolve, reject) => {
                const qrUrl = new URL('https://quickchart.io/qr');
                qrUrl.searchParams.set('text', location.href.split('?')[0]);
                qrUrl.searchParams.set('ecLevel', 'L');
                qrUrl.searchParams.set('margin', 0);
                qrUrl.searchParams.set('format', 'svg');
                fetch(qrUrl)
                    .then(r => r.text())
                    .then(r => resolve(this.qrImage = `data:image/svg+xml,${encodeURIComponent(r)}`))
                    .catch(reject);
            }),
        ]);
        const canvas = await html2canvas(document.getElementById('menu-result'), {
            useCORS: true,
            onclone: document => {
                const container = document.getElementById('menu-result');
                container.style.cssText = 'padding:24px';
                container.insertBefore(document.getElementById('title').cloneNode(true), container.firstChild);
                const source = document.getElementById('source');
                const footer = document.createElement('div');
                footer.style.cssText = 'display:flex;align-items:center'
                const footerText = document.createElement('small');
                footerText.style.cssText = 'flex-grow:1';
                footerText.innerHTML = document.getElementById('footer').innerText
                    .replaceAll('\n', '<br>')
                    .replace(source.innerText.trim(), '');
                const footerImg = document.createElement('img');
                footerImg.src = qrImage;
                footerImg.style.cssText = 'margin-left:1rem;max-width:6rem;max-height:6rem';
                footer.appendChild(footerText);
                footer.appendChild(footerImg);
                container.appendChild(footer);
            },
        });
        URL.revokeObjectURL(this.resultImage);
        if (navigator.userAgent.includes('MicroMessenger')) {
            this.resultImage = canvas.toDataURL('image/png');
        } else {
            this.resultImage = URL.createObjectURL(await new Promise(resolve => canvas.toBlob(resolve, 'image/png')));
        }
        document.getElementById('dialog-image').showModal();
    },
}).mount();

/**
 * @param {String} label
 * @param {String} content
 * @param {String} color
 */
const consoleBadge = (label, content, color) => console.log(
    `%c ${label} %c ${content} `,
    'color:#fff;background-color:#555;border-radius:3px 0 0 3px',
    `color:#fff;background-color:${color};border-radius:0 3px 3px 0`
);

consoleBadge('Project', 'saizeriya', '#07c');
consoleBadge('Author', 'TransparentLC', '#f84');
consoleBadge('Build Time', __BUILD_TIME__, '#f48');
