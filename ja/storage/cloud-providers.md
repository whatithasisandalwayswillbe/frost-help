# クラウドプロバイダー

セットアップには、S3 プロトコルを使う 4 つのクラウドプロバイダー向けの設定が用意されています。`frost init` を実行し、**S3-compatible** を選んでから、使うプロバイダーを選びます。そのほかの S3 サービスや、自分で運用している S3 サーバーについては、[その他の S3 互換ストレージ](#other-s3)を参照してください。

どの設定でも、バックアップはバケット内の `frost` フォルダに保存されるので、バケットにはほかのものも置けます。frost にはそのバケットにしか届かないキーを渡し、frost のフォルダ内のオブジェクトを削除、期限切れ、アーカイブするライフサイクルルールは追加しないでください。スナップショット同士はチャンクを共有しているので、オブジェクトを 1 つ消すだけで多くのスナップショットが壊れることがあります。

## Amazon S3

S3 は、frost に必要な条件付き書き込みに対応しています。

1. AWS コンソールでバケットを作り、`us-east-1` のようなリージョンを控えておきます。
2. frost 用の IAM ユーザーを作り、そのユーザーのアクセスキーを作成します。場所は IAM > Users > your user > Security credentials > Create access key です。

frost には、バケット内のオブジェクトの読み取り、一覧、書き込み、削除の権限が必要です。ただし、frost が削除するのは、セットアップが接続時に作る小さなテスト用オブジェクトだけです。次のようなポリシーで足ります。`my-backups` はご自分のバケット名に置き換えてください。

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

| セットアップの質問 | 答え |
| --- | --- |
| Which region hosts the bucket? | バケットのリージョン。たとえば `us-east-1` |
| What is the bucket name? | 作成したとおりのバケット名 |
| Paste the Access Key ID. | IAM のアクセスキー ID |
| Paste the Secret Access Key. | 作成時に一度だけ、アクセスキー ID の隣に表示されます |

frost は `s3.<region>.amazonaws.com` に接続します。frost のオブジェクトは、S3 Standard や S3 Standard-IA のように、すぐに読み出せるストレージクラスに置き、Glacier Flexible Retrieval や Glacier Deep Archive には置かないでください。バケットのバージョニングは必要ありません。

## Cloudflare R2

R2 は、frost に必要な条件付き書き込みに対応しています。

1. Cloudflare のダッシュボードで R2 のバケットを作ります。
2. アカウント ID を控えておきます。R2 の概要ページにある、32 文字の英数字です。
3. API トークンを作成します。場所は R2 > Manage R2 API Tokens > Create API token で、権限は Object Read & Write です。できれば、トークンをそのバケットに限定してください。

| セットアップの質問 | 答え |
| --- | --- |
| What is your Cloudflare Account ID? | R2 の概要ページにある 32 文字の ID |
| What is the bucket name? | 作成したとおりのバケット名 |
| Paste the Access Key ID. | 新しい API トークンの Access Key ID |
| Paste the Secret Access Key. | 一度だけ、Access Key ID の隣に表示されます |

frost は `<account-id>.r2.cloudflarestorage.com` に、リージョン `auto` で接続します。

## Backblaze B2

Backblaze のドキュメントには、B2 が frost に必要な条件付き書き込みに対応しているかが書かれていません。セットアップは接続時にこれをテストします。テストに通らない場合は、別のストレージを選んでください。

1. Backblaze のアカウントでバケットを作ります。
2. バケットのエンドポイントを控えておきます。場所は Buckets > your bucket > Endpoint で、`s3.us-west-004.backblazeb2.com` のような形です。
3. アプリケーションキーを作成します。場所は Application Keys > Add a New Application Key です。キーはこのバケットに限定してください。

| セットアップの質問 | 答え |
| --- | --- |
| What is the bucket endpoint? | バケットのページにあるエンドポイント。たとえば `s3.us-west-004.backblazeb2.com` |
| What is the bucket name? | 作成したとおりのバケット名 |
| Paste the application key's keyID. | 新しいアプリケーションキーの keyID |
| Paste the applicationKey. | キーを作成した直後に一度だけ表示されます |

frost はエンドポイントからリージョンを判断します。

## Wasabi

Wasabi のドキュメントからは、frost に必要な条件付き書き込みに対応しているかを確認できません。セットアップは接続時にこれをテストします。テストに通らない場合は、別のストレージを選んでください。

1. Wasabi のコンソールでバケットを作り、`us-east-1` や `eu-central-1` のようなリージョンを控えておきます。
2. アクセスキーを作成します。場所は Access Keys > Create New Access Key です。できれば、このバケットにしかアクセスできないユーザーを使ってください。

| セットアップの質問 | 答え |
| --- | --- |
| Which region hosts the bucket? | バケットのリージョン。たとえば `us-east-1` |
| What is the bucket name? | 作成したとおりのバケット名 |
| Paste the Access Key. | 作成したアクセスキー |
| Paste the Secret Key. | キーの作成時に一度だけ表示されます |

frost は `s3.<region>.wasabisys.com` に接続します。
