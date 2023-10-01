整理萨莉亚的菜单数据。

如果有在线点餐系统（桌面上贴着的二维码）的话是可以从这里直接把菜单爬取下来的，不过没有营业的时候点餐系统关闭就爬不了了。没有在线点餐的话就只能从菜单手抄了，以及图片的话怎么办呢…… \_(:зゝ∠)\_

各地区的萨莉亚菜单数据出处：

* 广东
    * 官网：https://www.gz-saizeriya.com.cn/
    * 菜单：https://www.gz-saizeriya.com.cn/portal/list/index/id/19.html
    * 在线点餐：http://saliya.gzyowin.com/wx/dc/default_2.aspx?storeid=12000002
        * `storeid` 是店铺的 ID，目前已知的范围应该是 `12000002` 到 `12000223` 之间的整数。
        * 需要 Cookie `openid=0123456789012345678901234567`，任意 28 字符均可。
* 上海
    * 官网：http://www.saizeriya.com.cn/
    * 菜单：http://www.saizeriya.com.cn/Saizeriya/menu
    * 在线点餐：http://qr.tastyqube.com.cn/qrorder/index.php/order/getitem
        * `POST` 方式访问，payload 为 `tid=****`。
        * `tid` 是各店铺各桌的 ID，一个可用的值为 `CtQb9g76`。
        * 需要上海地区的 IP 才能访问。
* 日本
    * 官网：https://www.saizeriya.co.jp/
    * 菜单：https://book.saizeriya.co.jp/library/menu1907/book/list
* 香港
    * 官网：https://www.saizeriya.com.hk/?lang=zh-hant
    * 菜单：https://www.saizeriya.com.hk/wp-content/uploads/20230710_GrandMenu.pdf
    * 在线点餐：https://saizeriya.self-order.app/saizeriya/#?type=****&shop=****&tn=****&qrtime=****&data=****
        * 点餐链接的二维码打印在小票上，结账后失效，所以并不能用来获取菜单数据。
