# 設定項目

frost は、設定フォルダにある `config.toml` に設定を保存します。設定は `frost init`、`frost config set`、`frost config edit` のほか、任意のテキストエディタでも変更できます。

## 設定を読む・変える

| コマンド | 動作 |
| --- | --- |
| `frost config` | すべての設定を表示します。`--show-secrets` を付けない限り、認証情報は伏せられます |
| `frost config get <key>` | 1 つの設定を表示します。リストは 1 行に 1 項目ずつ表示されます |
| `frost config set <key> <value...>` | 1 つの設定を変更し、何が変わったかを表示します |
| `frost config edit [editor]` | `config.toml` をエディタで開きます |

例:

```sh
frost config get schedule.every
frost config set schedule.every 6h
frost config set paths ~/Documents ~/Pictures
```

- リストは 1 項目につき 1 つの値を受け取り、`set` はリスト全体を置き換えます。
- 設定のオンとオフは `true` と `false` で切り替えます。
- `schedule` の設定を変えると、スケジュールジョブにすぐ反映されます。macOS と Windows では、スケジュールされたバックアップの実行中に変えた場合、そのバックアップが終わりしだい反映するので、バックアップが止まることはありません。
- ストレージの場所を変えると、frost は保存する前に新しい場所を確認します。詳しくは[バックアップの移動](#moving-backups)を参照してください。

## ファイルを編集する

```sh
frost config edit
```

frost は `config.toml` のコピーを、指定したエディタで開きます。指定がなければ `$VISUAL` か `$EDITOR` を使い、それもなければ nano、vim、vi のいずれかを使います。Windows ではメモ帳を使います。エディタを閉じると、frost は変更点を一覧し、`yes` と入力するとコピーを保存します。

ファイルを解釈できない場合は、frost が問題の箇所を示し、もう一度開くかどうかを尋ねます。そのため、入力ミスでスケジュールされたバックアップが動かなくなることはありません。不明な設定もエラーとして扱うので、名前のつづり間違いが見過ごされることもありません。

## 自分で編集する

`config.toml` を任意のテキストエディタで開いて保存することもできます。frost は実行するたびにこのファイルを読むので、ほとんどの変更は次の実行から反映されます。2 種類の変更だけはもう 1 手順必要で、次に frost のコマンドを何か実行したときに frost が行います。

- スケジュールを変えると、スケジュールジョブを更新し、"config.toml changed. Scheduled job updated" (config.toml が変更されたため、スケジュールジョブを更新しました) と表示します。Linux では、次のスケジュールされたバックアップもこれを行います。 スケジュールされたバックアップの実行中の変更は、`frost config set` と同じく、それが終わるまで待ちます。
- ストレージの場所を変えると、frost が最初に使うときに `frost config edit` と同じ確認をします。問題があれば警告として表示します。

保存する前にファイルを確認するものはありません。ファイルを解釈できない場合、直すまで frost のコマンドがそのことを伝えます。

## すべての設定

| キー | 既定値 | 意味 |
| --- | --- | --- |
| `paths` | | バックアップするフォルダ |
| `exclude` | `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules`, `.cache` | 除外する名前とパターン。[ファイルの除外](#excluding-files)を参照してください |
| `schedule.enabled` | `true` | 自動でバックアップする |
| `schedule.every` | `daily` | `hourly`、`2h`、`3h`、`4h`、`6h`、`8h`、`12h`、`daily`、`weekly` のいずれか |
| `schedule.time` | `15:00` | バックアップの時刻 (24 時間制)。詳しくは[自動バックアップ](#scheduling)を参照してください |
| `schedule.day` | `sunday` | 毎週のバックアップの曜日。`sunday` から `saturday` まで |
| `schedule.catch_up` | `true` | バックアップを逃したとき、コンピュータが戻ってからバックアップする。`false` なら逃したバックアップはとばす |
| `verify.sample` | `20` | 抜き取りチェックでダウンロードするチャンクの数。`0` でチェックをオフにします |
| `update.auto` | `true` | スケジュールされたバックアップのあとに新しいリリースをインストールする。`false` なら知らせるだけです |
| `storage.backend` | | `permafrost`、`s3`、[セルフホスト](#self-hosted)なら `sftp`、[ローカルドライブ](#local-drive)なら `local` |
| `storage.sftp.host` | | サーバーの SSH アドレス。たとえば `me@nas.local`、または SSH 設定の `Host` |
| `storage.sftp.port` | `0` | サーバーの SSH ポート。`0` なら SSH 設定のポート、なければ 22 を使います |
| `storage.sftp.path` | `frost` | サーバー上のフォルダ。相対パスはサーバー上のホームフォルダが起点です |
| `storage.local.path` | | ドライブ上のフォルダの絶対パス |
| `storage.permafrost.url` | | 空なら既定のサーバー `https://permafrost.wihiaawb.com`。それ以外は `https://` のアドレス。自分のコンピュータ上のサーバーなら `http://` も使えます |
| `storage.permafrost.token` | | Permafrost のアクセスキー |
| `storage.s3.endpoint` | | `s3.us-east-1.amazonaws.com` など。完全な `https://` のアドレスも使え、`http://` のアドレスにすると TLS が無効になります |
| `storage.s3.region` | | サーバーやプロバイダーがリージョンを使わないなら空のまま |
| `storage.s3.bucket` | | バケット名。あらかじめ作っておく必要があります |
| `storage.s3.prefix` | `frost` | バックアップを入れるバケット内のフォルダ。空ならバケットの最上位 |
| `storage.s3.access_key_id` | | アクセスキー ID |
| `storage.s3.secret_access_key` | | シークレットアクセスキー |
| `storage.s3.insecure` | `false` | エンドポイントにスキームがない場合、暗号化なしの HTTP を使う。ローカルでのテスト専用です |

## 環境変数

| 変数 | 置き換える設定 |
| --- | --- |
| `FROST_S3_ACCESS_KEY_ID` または `AWS_ACCESS_KEY_ID` | `storage.s3.access_key_id` |
| `FROST_S3_SECRET_ACCESS_KEY` または `AWS_SECRET_ACCESS_KEY` | `storage.s3.secret_access_key` |
| `FROST_PERMAFROST_TOKEN` | `storage.permafrost.token` |
| `FROST_CONFIG_DIR` | 設定フォルダ。`--config-dir` と同じです |
| `FROST_CACHE_DIR` | キャッシュフォルダ |

frost が環境変数の値を `config.toml` に書き込むことはありません。スケジュールされたバックアップには、シェルで設定した変数が渡らないので、認証情報は `config.toml` にも必要です。
