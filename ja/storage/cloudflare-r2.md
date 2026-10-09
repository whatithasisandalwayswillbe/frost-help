# Cloudflare R2

Cloudflare R2 のバケットにバックアップします。R2 は、frost に必要な条件付き書き込みに対応しています。

## 始める前に

1. Cloudflare のダッシュボードで R2 のバケットを作ります。
2. アカウント ID を控えておきます。R2 の概要ページにある、英数字 32 文字の ID です。
3. API トークンを作成します。R2 > Manage R2 API Tokens > Create API token で、権限は Object Read & Write にします。できればバケットを限定してください。

## セットアップでの入力

`frost init` を実行し、**Cloudflare R2** を選びます。

| セットアップの質問 | 答え |
| --- | --- |
| What's your Cloudflare account ID? | R2 の概要ページにある 32 文字の ID |
| What's the bucket called? | 作成したとおりのバケット名 |
| Paste the Access Key ID. | 新しい API トークンの Access Key ID |
| Paste the Secret Access Key. | Access Key ID の隣に一度だけ表示されます |

frost はリージョン `auto` で `<account-id>.r2.cloudflarestorage.com` に接続し、バケット内の `frost` フォルダにバックアップを保存します。

## 知っておきたいこと

frost のフォルダ内のオブジェクトを削除したり期限切れにしたりするライフサイクルルールは追加しないでください。スナップショット同士はチャンクを共有しているので、オブジェクトを 1 つ消すだけで多くのスナップショットが壊れることがあります。
