# よくある問題

このページでは、よく見かけるメッセージや問題をまとめています。各見出しは、frost が表示するメッセージか、あなたが気づく症状です。

## "frost isn't set up yet, run `frost init`"

frost が `config.toml` を見つけられません。`frost init` を実行してください。`--config-dir` や `FROST_CONFIG_DIR` を使っている場合は、正しいフォルダを指しているか確認してください。

## "no key on this machine"

キーファイルがありません。このコンピュータでストレージの設定が済んでいる場合は、`frost key import` を実行してリカバリーフレーズを入力します。そうでなければ、`frost init` を実行します。

## "a backup or restore is already running"

別の frost のプロセスがバックアップを使用中です。たいていはスケジュールされたバックアップです。その場合、frost は "a scheduled backup is already running" と、それが始まった時刻を表示します。終わるのを待ってから、もう一度試してください。frost のロックファイルを削除しても、そのプロセスは止まりません。

## "the key on this machine doesn't match"

ストレージには、別のキーで作られたバックアップがあります。`frost key verify` を実行し、書き留めたフレーズを入力して、どのキーなのかを確かめてください。正しいキーであれば、そのフレーズで `frost key import` を実行します。

## frost がバックアップを見つけられない

"has no frost repository" のようなメッセージは、frost が探している場所にバックアップがないことを意味します。エラーには、最後に開いた場所と、そこに戻る方法が表示されます。詳しくは[バックアップの移動](#moving-backups)を参照してください。

アクセスキーがまだ使えるのにバックアップが Permafrost から消えている場合は、そのキーを使って削除された可能性が高いです。すぐに care@getfro.st にメールしてください。ほかの人がキーを持っているかもしれない場合は、[getfro.st/perma/recover](https://getfro.st/perma/recover) で新しいキーを受け取ってください。

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
| can't reach Permafrost | インターネット接続。そのあとでもう一度試します |
| Can't find that server | SSH アドレスとネットワーク |
| The server didn't answer | SSH アドレスと、サーバーの電源が入っているか |
| That server doesn't offer SFTP | サーバーの SSH やファイルサービスの設定で SFTP がオンになっているか |
| The server sent text before SFTP started | `.bashrc` などサーバーのログインスクリプトが何かを出力していないか。対話型シェルでだけ出力するようにします |
| There's no folder ... on ... | フォルダのパス。その親フォルダは存在している必要があります |
| The server won't let frost write in that folder | frost がログインするアカウントに対するフォルダの権限 |
| ... isn't there. Connect the drive and try again | ドライブが接続されていて、パスが正しいか |
| frost can't write in that folder | フォルダの権限。macOS では[macOS の権限](#macos-permissions)を参照してください |
| frost doesn't follow links or junctions to a backup folder | フォルダの実際のパスを使います |
| That drive is read-only | 書き込めるドライブを使います |

## "This storage doesn't support conditional writes"

コンピュータ同士がバックアップ記録を上書きし合わないようにするために frost が必要とする機能に、ストレージが対応していません。キーや設定を変えても解決しません。別のストレージを選んでください。詳しくは[ストレージの選び方](#choosing-storage)を参照してください。

セルフホストのサーバーやドライブでは、別の言い方で表示されます。サーバーが "can't make hard links" と表示するか、フォルダが "on a filesystem that can't create a file only when its name is free" と表示されます。ext4、Btrfs、XFS、ZFS、APFS、NTFS などのファイルシステム上のフォルダを使ってください。

## "the server didn't accept frost's SSH key"

セルフホストのサーバーが frost のキーを拒否しました。たとえば、キーが `authorized_keys` から削除された場合です。`frost init` を実行して、キーをもう一度追加してください。詳しくは[セルフホスト](#self-hosted)を参照してください。

## "the server's SSH host key has changed"

サーバーの身元が変わると、frost は ssh と同じように接続を拒否します。サーバーを再インストールした場合や、サーバーのアドレスが変わった場合は、`ssh-keygen -R <host>` で古いキーを削除し、もう一度 `frost init` を実行します。それ以外の場合は、接続する前にキーが変わった理由を確かめてください。

## "... isn't there. Connect the drive and try again"

バックアップのあるドライブが接続されていないか、フォルダのパスが変わりました。ドライブを接続してください。Windows で別のドライブ文字が割り当てられた場合は、[ローカルドライブ](#local-drive)を参照してください。

## "the Permafrost access key was rejected"

メッセージの続きに、Permafrost からの理由が書かれています。キーが間違っている、新しいキーに置き換えられた、またはアカウントが閉じられた、のいずれかです。最新のキーを使うか、新しいキーを取得してください。詳しくは [Permafrost](#permafrost) を参照してください。

## "uploads are paused"

Permafrost は今のところ、あなたのアカウントの新しいバックアップを受け付けていません。理由と期限はメッセージに書かれており、復元は引き続き使えます。詳しくは [Permafrost](#permafrost) を参照してください。

## バックアップがフォルダを読めない

macOS では、たいていプライバシーに関する権限の問題です。何を許可すればよいかはエラーに表示されます。詳しくは[macOS の権限](#macos-permissions)を参照してください。ほかのシステムでは、あなたのユーザーがそのフォルダを読めるか確認してください。

## "couldn't be read" と表示されたファイル

frost はそれらのファイルをスキップし、残りを保存しました。よくある原因は、読み取り権限のないファイル、バックアップ中に削除されたファイル、そして macOS では iCloud がオンラインにだけ置いているファイルです。

## "kept changing while they were read" と表示されたファイル

バックアップ中にプログラムがそれらのファイルに書き込んでいたため、スナップショットには以前のコピーが残りました。プログラムを閉じてからもう一度バックアップするか、次のバックアップに任せてください。

## フォルダが "not found" になる

リストにあるフォルダが見つからなかったため、frost は残りをバックアップしました。ドライブを接続し直すか、フォルダが移動した場合は `frost init` でリストを更新してください。

## "config.toml changed, but updating the scheduled job failed"

`config.toml` を編集したものの、frost がスケジュールジョブをそれに合わせて更新できませんでした。理由はメッセージの続きに書かれています。設定名が書かれていれば、`config.toml` でその設定を直してください。frost はうまくいくまで、コマンドを実行するたびに再試行します。

## "config.toml changed where backups go"

`config.toml` でバックアップの保存先を変えたところ、frost が新しい場所を最初に使ったときに問題が見つかりました。内容はメッセージの続きに書かれています。詳しくは[バックアップの移動](#moving-backups)を参照してください。

## "scheduled job is missing"

スケジュールジョブが削除されたか、オフになっています。`frost config set schedule.enabled true` で元に戻せます。

## スケジュールされたバックアップが実行されない

- `frost status` の "next backup" の行を確認します。
- macOS では、システム設定 > 一般 > ログイン項目と機能拡張 (System Settings > General > Login Items & Extensions) で frost のスイッチを確認します。Node.js Foundation という名前で表示されています。
- Windows では、スケジュールされたバックアップにはサインインが必要で、バッテリーで動いている間は実行されません。
- `schedule.catch_up` が `false` のとき、予定の時刻にコンピュータの電源が切れていたりスリープしていたりすると、そのバックアップはとばされます。
- ログを確認します。詳しくは[自動バックアップ](#scheduling)を参照してください。

## "verification failed"

抜き取りチェックで、ストレージ内のデータの欠落や破損が見つかりました。詳しくは[バックアップの確認](#checking-backups)を参照してください。

## "can't restore beside the originals"

元のファイルの隣のフォルダが使えません。スナップショットが別のコンピュータのものであることがよくある原因です。代わりに `--to <dir>` を使ってください。詳しくは[ファイルの復元](#restoring)を参照してください。

## "can't overwrite the originals"

スナップショットが別の種類のコンピュータのものか、元のファイルへのパスが frost の信頼しないリンクを経由しています。代わりに `--beside` か `--to <dir>` を使ってください。

## 復元時にファイルについて "changed after it was checked" または "has more than one link" と表示される

frost は、確認済みのファイルが変更されたか、復元途中のファイルに別の名前へのハードリンクがあることを検出しました。復元先のフォルダを変更しているプログラムを閉じてから、もう一度試してください。復元途中のファイルにハードリンクがある場合は、代わりに新しい空のフォルダに復元してください。

## 指定したスナップショットが見つからない

| frost の表示 | 試すこと |
| --- | --- |
| no snapshot at or before ... | もっと後の日時を指定します。メッセージには最も古いスナップショットが表示されます |
| "maple" matches 2 snapshots, use more of the ID | `maple-absurd` のように、ID をもっと長く入力します |
| can't read "..." as a snapshot ID or time | `"3 days ago"` のように、スペースを含む日時を引用符で囲みます |

## frost が自分でアップデートできない

frost のフォルダに書き込めないか、frost がソースからビルドされています。詳しくは[frost のアップデート](#updating)を参照してください。

## インストーラが止まる

| インストーラの表示 | 対処 |
| --- | --- |
| need OpenSSH 8.1+ to verify the frost release signature | OpenSSH をインストールまたはアップデートします。Windows では PowerShell のインストーラを使ってください |
| checksums.txt isn't signed by the frost release key. Don't install this. | インストールしないでください。時間をおいて再試行し、繰り返し起きる場合は[報告](#getting-help)してください |
| the runtime in ... isn't signed by the OpenJS Foundation. Don't install this. | インストールしないでください。時間をおいて再試行し、繰り返し起きる場合は[報告](#getting-help)してください |
| checksum mismatch | ダウンロードしたファイルが壊れています。インストーラをもう一度実行します |
| 32-bit ARM isn't supported by the bundled runtime | このコンピュータ向けの frost のパッケージはありません |
| installing frost needs Node.js 22 or newer | Node.js をアップデートするか、npm や pnpm ではなくインストーラを使ってください |

## インストール後に `frost` が見つからない

新しいターミナルを開いてください。frost のインストール中に開いていたターミナルには、新しい `PATH` が反映されません。pnpm の場合は、`pnpm setup` を一度実行してから新しいターミナルを開きます。
