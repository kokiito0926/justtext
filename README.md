## ジャストテキスト（justtext）

ジャストテキスト（justtext）を用いると、HTMLからテキストを抽出することができます。  
ウェブサイトをクロールしたあとに、そのHTMLからテキストを抽出して、大規模言語モデルに与えるようなときに便利かもしれません。

## インストール

```bash
$ npm install --global @kokiito0926/justtext
```

## 実行方法

```bash
$ curl -sSL https://example.com/ | justtext
$ curl -sSL https://kokiito.com/ | justtext
```

## ライセンス

[MIT](LICENSE)
