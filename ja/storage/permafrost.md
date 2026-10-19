# Permafrost

Permafrost は、frost のために作られたホスト型ストレージです。接続に必要なのはアクセスキー 1 つだけで、バケット、リージョン、エンドポイントを設定する必要はありません。

ほかのストレージと同じように、バックアップはアップロード前にコンピュータ上で暗号化されます。Permafrost が中身を読むことはできません。

## キーを取得する

1. `frost init` を実行し、**Permafrost** を選びます。
2. **I don't have a key yet** (まだキーを持っていない) を選びます。frost がブラウザで [getfro.st/perma](https://getfro.st/perma) を開きます。開かない場合は、自分で開いてください。
3. そこでキーを取得してコピーします。
4. セットアップに貼り付けます。

すでにキーを持っている場合は、**I have a key** (キーを持っている) を選んで貼り付けます。

## 新しいキーを取得する

キーをなくした場合は、[getfro.st/perma/recover](https://getfro.st/perma/recover) を開き、キーを取得したときのメールアドレスを入力します。届いたメールのリンクから新しいキーを受け取れます。新しいキーは古いキーに置き換わり、古いキーはどのコンピュータでも使えなくなります。

Permafrost を使っているコンピュータごとに、新しいキーに切り替えます。

```sh
frost config set storage.permafrost.token <new key>
```

Permafrost がアップロードを受け付けていない間は、`frost config set` がストレージの確認を行えません。代わりに `frost config edit` を使い、`[storage.permafrost]` の `token` にキーを入れてください。

## ストレージの使用量

`frost status` には、Permafrost のストレージをどれだけ使っているかが表示されます。ストレージがほぼいっぱいになったときなど、Permafrost から知らせることがある場合は、`frost status` と `frost backup` が警告として表示します。詳しくは[バックアップの確認](#checking-backups)を参照してください。

## Permafrost に拒否された場合

Permafrost のエラーには理由が書かれています。バックアップにアクセスするコマンドは、そのメッセージで止まります。

| 表示 | 意味 |
| --- | --- |
| the Permafrost access key was rejected | キーが間違っている、新しいキーに置き換えられた、またはアカウントが閉じられた、のいずれかです。どれに当たるかはメッセージに書かれています。最新のキーを使うか、新しいキーを取得してください |
| uploads are paused | Permafrost は今のところ新しいバックアップを受け付けていません。復元は引き続き使えます。理由、期限、対処はメッセージに書かれています |
| your Permafrost storage is full | このアップロードは収まりません。保存している量と対処はメッセージに書かれています |

セットアップでは、最初の 2 つは "Permafrost didn't accept that access key" と "Permafrost won't store backups with that access key" と表示され、そのあとに同じ理由が続きます。

## 互換サーバー

frost は、既定のサーバーの代わりに、[Permafrost API](https://github.com/whatithasisandalwayswillbe/frost/blob/main/docs/PERMAFROST.md) に対応した任意のサーバーを使えます。これは、そうしたサーバーをすでに運用している人向けです。自分のコンピュータにバックアップするなら、[セルフホスト](#self-hosted)のストレージは SSH だけで使えます。

互換サーバーは、空のアップロードを拒否することも含め、API のオブジェクトとエラーの規則に従う必要があります。サーバーが混み合っている場合、frost は自動的に再試行します。

最初のセットアップの前に、frost の設定フォルダに `config.toml` を作り、次の設定を入れてください。場所は[ファイルとフォルダ](#files-and-folders)に載っています。アドレスを自分のサーバーのものに置き換えます。

```toml
[storage]
backend = "permafrost"

[storage.permafrost]
url = "https://<your-server>"
```

次に `frost init` を実行し、Permafrost を選び、アクセスキーを貼り付け、フォルダを選んで保存します。サーバーが空なら、セットアップがリポジトリを作成します。

すでに frost を設定済みの場合は、`frost config edit` で既存のファイルを開き、バックエンドとサーバーのアドレスを一緒に変更します。新しいサーバーが空なら警告を確認し、`yes` と入力して保存したあと、`frost init` をもう一度実行してください。`frost config set` は空の保存先を拒否するので、新しいサーバーの準備には使えません。

アドレスには `https://` を使う必要があります。例外は、`http://localhost:8080` のように自分のコンピュータで動かすサーバーだけです。この設定を空にすると、既定の Permafrost サーバー `https://permafrost.wihiaawb.com` を使います。
