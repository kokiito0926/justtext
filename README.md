## justtext

justtextは、HTMLから記事本文や主要なテキストのみを抽出するコマンドラインのツールです。  
ウェブサイトをクロールしたあとに、そのHTMLから記事本文や主要なテキストのみを抽出すると、大規模言語モデルに与えやすくなります。

## インストール

```bash
$ npm install --global @kokiito0926/justtext
```

## 使用方法

curlなどで取得したHTMLをパイプでjusttextに流し込みます。

```bash
$ curl -sSL https://example.com/ | justtext
```

## ライセンス

[MIT](LICENSE)
