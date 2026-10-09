# Permafrost

Permafrost は、frost のために作られたホスト型ストレージです。接続に必要なのはアクセスキー 1 つだけで、バケット、リージョン、エンドポイントを設定する必要はありません。

ほかのストレージと同じように、バックアップはアップロード前にコンピュータ上で暗号化されます。Permafrost が中身を読むことはできません。

## キーを取得する

1. `frost init` を実行し、**Permafrost** を選びます。
2. **I don't have a key yet** (まだキーを持っていない) を選びます。frost がブラウザでページを開くので、そこでキーを取得します。
3. キーを取得すると、ページがそれを frost に送り返し、frost がすぐに保存します。そのあとでセットアップを終了しても、キーは失われません。

ブラウザが開かない場合は、自分で [getfro.st/perma](https://getfro.st/perma) を開き、セットアップで `[p]` を押して、表示されたキーを貼り付けます。キーの取得が完了しない場合は、`[r]` で再試行するか、`[p]` でキーを貼り付けます。frost は最大 25 分待ちます。

すでにキーを持っている場合は、**I have a key** (キーを持っている) を選んで貼り付けます。

## キーが frost に届くしくみ

待っている間、frost は `127.0.0.1` で待ち受けます。このアドレスには、お使いのコンピュータからしか接続できません。frost はページにランダムな値を渡し、同じ値と一緒に戻ってきたキーだけを受け付けます。そのため、ほかのページが自分のキーを frost に紛れ込ませることはできません。

ページにはキーも表示されるので、ブラウザが別のコンピュータにある場合などは、自分で frost にコピーできます。

## キーが拒否された場合

Permafrost がアクセスキーを受け付けなくなると、すべてのコマンドがその旨のエラーで止まります。`frost init` を実行してストレージを設定し直し、使えるキーを取得してください。

| セットアップの表示 | 対処 |
| --- | --- |
| Permafrost didn't accept that access key | キーを最後までコピーしたか確認してください。期限切れの可能性もあります |
| That access key can't store backups | Permafrost のアカウントで、そのキーの権限を確認してください |
| your Permafrost storage is full | アカウントの空き容量がありません。Permafrost のアカウントを確認してください |

## 自分のサーバー

[Permafrost API](https://github.com/whatithasisandalwayswillbe/frost/blob/main/docs/PERMAFROST.md) に対応したサーバーは、誰でも運用できます。使うには、そのアドレスを設定します。

```sh
frost config set storage.permafrost.url https://<your-server>
```

アドレスには `https://` を使う必要があります。例外は、`http://localhost:8080` のように自分のコンピュータで動かすサーバーだけです。この設定を空にすると、既定の Permafrost サーバーを使います。
