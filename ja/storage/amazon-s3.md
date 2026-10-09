# Amazon S3

Amazon S3 のバケットにバックアップします。S3 は、frost に必要な条件付き書き込みに対応しています。

## 始める前に

1. AWS コンソールでバケットを作り、`us-east-1` のようなリージョンを控えておきます。
2. frost 用の IAM ユーザーを作ってそのバケットだけにアクセスできるようにし、アクセスキーを作成します。場所は IAM > Users > your user > Security credentials > Create access key です。

frost には、バケット内のオブジェクトの読み取り、一覧、書き込み、削除の権限が必要です。次のようなポリシーで足ります。`my-backups` はご自分のバケット名に置き換えてください。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::my-backups"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-backups/*"
    }
  ]
}
```

frost が削除するオブジェクトは、セットアップが接続時に作る小さなテスト用オブジェクトだけです。

## セットアップでの入力

`frost init` を実行し、**Amazon S3** を選びます。

| セットアップの質問 | 答え |
| --- | --- |
| Which region is the bucket in? | バケットのリージョン。たとえば `us-east-1` |
| What's the bucket called? | 作成したとおりのバケット名 |
| Paste the access key ID. | IAM のアクセスキー ID |
| Paste the secret access key. | 作成時に一度だけ、アクセスキー ID の隣に表示されます |

frost は `s3.<region>.amazonaws.com` に接続し、バケット内の `frost` フォルダにバックアップを保存します。

## 知っておきたいこと

- frost のオブジェクトは、S3 Standard や S3 Standard-IA のように、すぐに読み出せるストレージクラスに置いてください。Glacier Flexible Retrieval や Glacier Deep Archive に移したり、期限切れにしたりするライフサイクルルールは追加しないでください。
- バケットのバージョニングは必要ありません。
