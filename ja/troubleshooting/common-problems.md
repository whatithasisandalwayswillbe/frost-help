# よくある問題

このページでは、よく見かけるメッセージや問題をまとめています。各見出しは、frost が表示するメッセージか、あなたが気づく症状です。

## "frost isn't set up yet, run `frost init`"

frost が `config.toml` を見つけられません。`frost init` を実行してください。`--config-dir` や `FROST_CONFIG_DIR` を使っている場合は、正しいフォルダを指しているか確認してください。

## "no key on this machine"

キーファイルがありません。このコンピュータでストレージの設定が済んでいる場合は、`frost key import` を実行してリカバリーフレーズを入力します。そうでなければ、`frost init` を実行します。

## "a backup or restore is already running"

別の frost のプロセスがバックアップを使用中です。たいていはスケジュールされたバックアップです。終わるのを待ってから、もう一度試してください。frost のロックファイルを削除しても、そのプロセスは止まりません。

## "the key on this machine doesn't match"

ストレージには、別のキーで作られたバックアップがあります。`frost key verify` を実行し、書き留めたフレーズを入力して、どのキーなのかを確かめてください。正しいキーであれば、そのフレーズで `frost key import` を実行します。

## frost がバックアップを見つけられない

"has no frost repository" のようなメッセージは、frost が探している場所にバックアップがないことを意味します。エラーには、最後に開いた場所と、そこに戻る方法が表示されます。詳しくは[バックアップの移動](#moving-backups)を参照してください。

## セットアップが接続できない

セットアップは問題を説明し、原因の可能性が最も高い答えに戻ります。

| セットアップの表示 | 確認すること |
| --- | --- |
| That access key ID wasn't recognised | アクセスキー ID を最後までコピーしたか |
| The secret key doesn't match the access key ID | シークレットキーを最後までコピーしたか、そのキー ID のものか |
| There's no bucket with that name | バケット名。またはバケットを先に作ります |
| That key doesn't have the bucket permissions frost needs | キーにバケット内のオブジェクトの読み取り、一覧、書き込み、削除の権限があるか |
| The bucket is in a different region | リージョンまたはエンドポイント |
| Can't find ... | アドレスとインターネット接続 |
| Nothing answered at that address | アドレスとポート |
| The server's certificate isn't valid for that address | アドレスと、サーバーの証明書がそのアドレスに対応しているか |
| the storage didn't answer in time | インターネット接続。そのあとでもう一度試します |

## "This storage doesn't support conditional writes"

コンピュータ同士がバックアップ記録を上書きし合わないようにするために frost が必要とする機能に、プロバイダーが対応していません。キーや設定を変えても解決しません。別のプロバイダーを選んでください。詳しくは[ストレージの選び方](#choosing-storage)を参照してください。

## "the Permafrost access key was rejected"

キーが間違っているか、期限切れの可能性があります。`frost init` を実行してストレージを設定し直し、使えるキーを取得してください。詳しくは [Permafrost](#permafrost) を参照してください。

## バックアップがフォルダを読めない

macOS では、たいていプライバシーに関する権限の問題です。何を許可すればよいかはエラーに表示されます。詳しくは[macOS の権限](#macos-permissions)を参照してください。ほかのシステムでは、あなたのユーザーがそのフォルダを読めるか確認してください。

## "couldn't be read" と表示されたファイル

frost はそれらのファイルをスキップし、残りを保存しました。よくある原因は、読み取り権限のないファイル、バックアップ中に削除されたファイル、そして macOS では iCloud がオンラインにだけ置いているファイルです。

## "kept changing while they were read" と表示されたファイル

バックアップ中にプログラムがそれらのファイルに書き込んでいたため、スナップショットには以前のコピーが残りました。プログラムを閉じてからもう一度バックアップするか、次のバックアップに任せてください。

## フォルダが "not found" になる

リストにあるフォルダが見つからなかったため、frost は残りをバックアップしました。ドライブを接続し直すか、フォルダが移動した場合は `frost init` でリストを更新してください。

## "scheduled job is missing"

スケジュールジョブが削除されたか、オフになっています。`frost config set schedule.enabled true` で元に戻せます。

## スケジュールされたバックアップが実行されない

- `frost status` の "next backup" の行を確認します。
- macOS では、システム設定 > 一般 > ログイン項目と機能拡張 (System Settings > General > Login Items & Extensions) で frost のスイッチを確認します。Node.js Foundation という名前で表示されています。
- Windows では、スケジュールされたバックアップにはサインインが必要で、バッテリーで動いている間は実行されません。
- cron やタスク スケジューラでは、予定の時刻にコンピュータの電源が切れていたりスリープしていたりすると、そのバックアップはとばされます。
- ログを確認します。詳しくは[自動バックアップ](#scheduling)を参照してください。

## "verification failed"

抜き取りチェックで、ストレージ内のデータの欠落や破損が見つかりました。詳しくは[バックアップの確認](#checking-backups)を参照してください。

## "can't restore beside the originals"

元のファイルの隣のフォルダが使えません。スナップショットが別のコンピュータのものであることがよくある原因です。代わりに `--to <dir>` を使ってください。詳しくは[ファイルの復元](#restoring)を参照してください。

## "can't overwrite the originals"

スナップショットが別の種類のコンピュータのものか、元のファイルへのパスが frost の信頼しないリンクを経由しています。代わりに `--beside` か `--to <dir>` を使ってください。

## 指定したスナップショットが見つからない

| frost の表示 | 試すこと |
| --- | --- |
| no snapshot at or before ... | もっと後の日時を指定します。メッセージには最も古いスナップショットが表示されます |
| "maple" matches 2 snapshots, use more of the ID | `maple-absurd` のように、ID をもっと長く入力します |
| can't read "..." as a snapshot ID or time | `"3 days ago"` のように、スペースを含む日時を引用符で囲みます |

## frost が自分でアップデートできない

frost がパッケージマネージャでインストールされたか、フォルダに書き込めないか、ソースからビルドされています。詳しくは[frost のアップデート](#updating)を参照してください。

## インストーラが止まる

| インストーラの表示 | 対処 |
| --- | --- |
| need OpenSSH 8.1+ to verify the frost release signature | OpenSSH をインストールまたはアップデートします。Windows では Git for Windows に含まれています |
| checksums.txt isn't signed by the frost release key. Don't install this. | インストールしないでください。時間をおいて再試行し、繰り返し起きる場合は[報告](#getting-help)してください |
| checksum mismatch | ダウンロードしたファイルが壊れています。インストーラをもう一度実行します |
| 32-bit ARM isn't supported by the bundled runtime | このコンピュータ向けの frost のパッケージはありません |
