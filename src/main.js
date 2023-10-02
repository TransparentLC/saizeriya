import { createApp } from 'petite-vue';
import { randomChoice, randomInt } from './util.js';

/**
 * @typedef {{
 *  id: Number | String,
 *  name: String,
 *  price: Number,
 *  category: String,
 *  image: [Record<String, String>],
 * }} SaizeriyaMenuItem
 *
 * @typedef {{
 *  priceFormat: (x: Number) => String, // 价格格式化，例如把32转换成￥32.00这样
 *  priceGCD: Number, // 价格的最大公因数，例如日本萨莉亚的价格都是10日元的倍数，那么在菜单里350日元的菜就可以把价格记为35
 *  budget: Number, // 默认预算
 *  lang: "zh_hans" | "zh_hant" | "ja", // 菜单部分使用的字体
 *  companyName: String,
 *  companyLink: String,
 *  menu: SaizeriyaMenuItem[],
 *  drinkItem: SaizeriyaMenuItem,
 *  allowDrinkMix: Boolean, // 是否显示“自由搭配的乐趣”选项
 *  rollDrink: (abnormal: Boolean) => String, // 生成推荐的畅饮，参数为是否启用“自由搭配的乐趣”
 * }} SaizeriyaMenu
 */

import './style.css';

const app = {
    isDark: false,
    showResult: false,
    /** @type {Record<String, String>} */
    region: {
        'gd': '广东',
        'sh': '上海',
        'hk': '香港',
        'jp': '日本',
        'jp-cn': '日本（中文菜单）',
    },
    regionMenuLoading: false,
    /** @type {SaizeriyaMenu} */
    regionMenu: null,
    menuPriceMin: 0,
    menuPriceTotal: 0,
    /** @type {SaizeriyaMenuItem} */
    menuDrink: null,
    budgetMin: null,
    budgetMax: null,
    /** @type {{category: String, enabled: Boolean}[]} */
    categoryFilter: [],
    blacklistExpr: '',
    /** @type {SaizeriyaMenuItem[]} */
    result: [],
    drinkProbability: .5,
    drinkMix: false,
    drinkRecommendation: '',
    qrImage: '',
    resultImage: '',

    /**
     * @param {String} region
     * @returns {Promise<null>}
     */
    async loadMenu(region) {
        try {
            this.regionMenuLoading = true;
            this.regionMenu = await import(`./saizeriya-menu/${region}/index.js`).then(e => e.default);
            this.menuPriceMin = Math.min(...this.regionMenu.menu.map(e => e.price));
            this.menuPriceTotal = this.regionMenu.menu.map(e => e.price).reduce((acc, cur) => acc += cur, 0);
            this.categoryFilter = Array.from(new Set(this.regionMenu.menu.map(e => e.category))).map(e => ({category: e, enabled: true}));
            this.budgetMin = this.budgetMax = null;
            this.blacklistExpr = '';
            this.result = [];
            this.qrImage = '';
            const u = new URL(location.href);
            u.searchParams.set('region', region);
            history.replaceState(null, null, u);
        } catch (err) {
            alert(err);
        } finally {
            this.regionMenuLoading = false;
        }
    },

    autoSetBudget() {
        const budgetMin = Math.ceil(parseInt(this.budgetMin) / this.regionMenu.priceGCD);
        const budgetMax = Math.floor(parseInt(this.budgetMax) / this.regionMenu.priceGCD);
        let mid;
        if (isNaN(budgetMin) && isNaN(budgetMax)) {
            mid = this.regionMenu.budget;
        } else if (isNaN(budgetMin)) {
            mid = budgetMax;
        } else if (isNaN(budgetMax)) {
            mid = budgetMin;
        } else {
            mid = (budgetMin + budgetMax) / 2;
        }
        this.budgetMin = Math.round(mid * .8) * this.regionMenu.priceGCD;
        this.budgetMax = Math.round(mid * 1.2) * this.regionMenu.priceGCD;
    },

    rollMenu() {
        this.result.length = 0;

        let budgetMin = Math.ceil(parseInt(this.budgetMin) / this.regionMenu.priceGCD);
        let budgetMax = Math.floor(parseInt(this.budgetMax) / this.regionMenu.priceGCD);
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
        if (budgetMin > this.menuPriceTotal || budgetMax < this.menuPriceMin) {
            return;
        }
        if (budgetMax > this.menuPriceTotal) {
            budgetMax = this.menuPriceTotal;
        }

        // 根据筛选初始化菜单
        const blacklistCategory = new Set(this.categoryFilter.filter(e => !e.enabled).map(e => e.category));
        const blacklistId = new Set(this.blacklistExpr.split(' ').filter(Boolean));
        const m = this.regionMenu.menu.filter(e => !blacklistId.has(String(e.id)) && !blacklistCategory.has(e.category));
        if (!m.length) return;

        // 为了使每次运行的结果不一样，将菜单随机打乱
        for (let i = m.length - 1; i >= 0; i--) {
            const x = Math.floor(Math.random() * (i + 1));
            [m[i], m[x]] = [m[x], m[i]];
        }

        // 是否添加畅饮
        const enableDrink = Math.random() < this.drinkProbability && budgetMin >= this.regionMenu.drinkItem.price;
        if (enableDrink) {
            budgetMin -= this.regionMenu.drinkItem.price;
            budgetMax -= this.regionMenu.drinkItem.price;
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
            /** @type {Number} */
            let budget;
            do {
                budget = randomInt(budgetMin, budgetMax);
            } while (budgetTried.has(budget));
            budgetTried.add(budget);

            if (budget === this.menuPriceTotal) {
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
            this.result.push(this.regionMenu.drinkItem);
            this.drinkRecommendation = this.regionMenu.rollDrink(this.drinkMix);
        } else {
            this.drinkRecommendation = '';
        }
        if (!this.result.length) {
            alert('居然找不到符合要求的点餐方案……( >﹏<。)');
        } else {
            this.result.sort((a, b) => a.id - b.id);
            this.showResult = true;
        }
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
                const u = new URL(location.href);
                const r = u.searchParams.get('region');
                Array.from(u.searchParams.keys()).forEach(k => u.searchParams.delete(k));
                u.searchParams.set('region', r);
                const qrUrl = new URL('https://quickchart.io/qr');
                qrUrl.searchParams.set('text', u.toString());
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
            onclone: (/** @type {Document} */ document) => {
                Array.from(document.querySelectorAll('.is-dark')).forEach(e => e.classList.remove('is-dark'));
                const preloadStyle = document.getElementById('preload-style');
                preloadStyle.parentNode.removeChild(preloadStyle);

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

    mounted() {
        const m = matchMedia('(prefers-color-scheme:dark)');
        m.addEventListener('change', () => this.isDark = m.matches);
        this.isDark = m.matches;

        const u = new URL(location.href);
        if (this.region.hasOwnProperty(u.searchParams.get('region'))) {
            this.loadMenu(u.searchParams.get('region'));
        } else {
            u.searchParams.delete('region');
            history.replaceState(null, null, u);
        }
    },
};

createApp(app).mount();

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
