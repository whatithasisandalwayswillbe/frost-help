# Backblaze B2

Backblaze B2 の S3 互換 API を使って、B2 のバケットにバックアップします。

> Backblaze のドキュメントには、frost に必要な条件付き書き込みに B2 が対応しているかどうかの記載がありません。セットアップは接続時にこれをテストします。テストに通らない場合は、別のプロバイダーを選んでください。詳しくは[ストレージの選び方](#choosing-storage)を参照してください。

## 始める前に

1. Backblaze のアカウントでバケットを作ります。
2. バケットのエンドポイントを控えておきます。場所は Buckets > your bucket > Endpoint で、`s3.us-west-004.backblazeb2.com` のような形です。
3. アプリケーションキーを作成します。Application Keys > Add a New Application Key で、このバケットだけに限定してください。

## セットアップでの入力

`frost init` を実行し、**Backblaze B2** を選びます。

| セットアップの質問 | 答え |
| --- | --- |
| What's the bucket's endpoint? | バケットのページにあるエンドポイント。たとえば `s3.us-west-004.backblazeb2.com` |
| What's the bucket called? | 作成したとおりのバケット名 |
| Paste the application key's keyID. | 新しいアプリケーションキーの keyID |
| Paste the applicationKey. | キーを作成した直後に一度だけ表示されます |

frost はエンドポイントからリージョンを判断し、バケット内の `frost` フォルダにバックアップを保存します。

## 知っておきたいこと

frost のフォルダ内のオブジェクトを削除するライフサイクルルールは追加しないでください。スナップショット同士はチャンクを共有しているので、オブジェクトを 1 つ消すだけで多くのスナップショットが壊れることがあります。
