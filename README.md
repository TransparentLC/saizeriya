# 萨莉亚随机点餐

https://akarin.dev/saizeriya/

如标题所示。

很久以前群友的 bot 里有这样的功能（源代码可能是 [Ruan1337/saizeriyarandom.github.io](https://github.com/Ruan1337/saizeriyarandom.github.io)），在做自己的 bot 的时候尝试着自己重新写了一个（本质上其实是用动态规划解决的子集和问题），后来 bot 没办法用了就打算做成独立的网页版。

目前支持广东、上海地区的菜单，香港、日本地区待更新。

由于算法本身的局限性，不会考虑在生成的菜单中一份菜可以点复数份的情况，也不会考虑支持为每份菜设定权重。

其他内容稍后补充（或者🕊️了）

## 从源代码运行

这是一个使用 Vite 的 vanilla 模板新建的项目，所以直接 `npm install` 然后 `npm run dev` 或者 `npm run build` 就可以了。

不过在运行之前还需要进行[字体子集化处理](https://github.com/TransparentLC/saizeriya/tree/master/src/fusion-pixel-font)，这一步骤需要用到 Python，所以你还需要 `pip install -r requirements.txt`。

## 借物表

* [NES.css](https://nostalgic-css.github.io/NES.css/)
* [缝合像素字体](https://fusion-pixel-font.takwolf.com/)
