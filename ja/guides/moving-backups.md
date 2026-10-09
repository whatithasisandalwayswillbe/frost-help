# バックアップの移動

バックアップは、すべてをアップロードし直すことなく、別のフォルダ、バケット、プロバイダーに移せます。

| やりたいこと | 方法 |
| --- | --- |
| バックアップを別のフォルダやバケットに移す | リポジトリのフォルダを丸ごと移動し、frost に新しい場所を設定します。何もアップロードし直しません |
| 別の場所で、別系統のバックアップを始める | `frost init` を実行し、新しい空の場所を選びます。古いバックアップはそのまま残りますが、frost が表示するのは新しいほうだけです |
| 移動前のバックアップに戻る | frost に元の場所をもう一度設定します |

## リポジトリを移動する

リポジトリとは、ストレージ内で `frost.repo`、`chunks/`、`snapshots/`、`trees/` が入っているフォルダのことです。この 4 つを、中のオブジェクトごとすべて移動またはコピーし、名前はまったく変えないでください。`frost.repo` だけを移しても、バックアップは移動しません。

そのあと、frost に新しい場所を伝えます。別のバケットに移した場合:

```sh
frost config set storage.s3.bucket new-bucket
```

バケット内の別のフォルダに移した場合:

```sh
frost config set storage.s3.prefix backups/frost
```

別のプロバイダーに移るときは、いくつもの設定を一度に変える必要があるので、`frost init` を実行して新しいプロバイダーを選んでください。セットアップがバックアップを見つけて接続します。

## 保存前のチェック

`frost config set` は、新しいストレージの場所を保存する前に確認します。バックアップがない場所、別のキーで作られたバックアップがある場所、`frost.repo` はあるのにスナップショットがない場所は拒否します。`frost config edit` は同じ問題を警告として表示するだけなので、`set` が拒否する変更でも保存できます。

## frost がバックアップを見つけられない場合

バックアップが frost の想定する場所にない場合、エラーと `frost status` に、最後に開いた場所と 3 つの対処法が表示されます。

```text
Your backups were last opened in s3://old-bucket/frost/.
Since then storage.s3.bucket changed from old-bucket to new-bucket.

Do one of these:
  put it back:       frost config set storage.s3.bucket old-bucket
  keep the change:   move the whole folder (frost.repo, chunks/, snapshots/ and trees/) to s3://new-bucket/frost/
  start over there:  frost init (your old backups stay where they are)
```
