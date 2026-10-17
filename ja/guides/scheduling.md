# 自動バックアップ

frost は、OS に備わっているスケジューラを使って定期的にバックアップします。バックアップとバックアップの間に、バックグラウンドで動き続けるものはありません。

## スケジュールを変更する

バックアップの頻度は `frost init` で尋ねられます。あとで変更するには、次を実行します。

```sh
frost config set schedule.every 6h
```

選べるのは `hourly`、`2h`、`3h`、`4h`、`6h`、`8h`、`12h`、`daily`、`weekly` です。既定は `daily` です。

バックアップの時刻を選ぶには、24 時間制で時刻を設定します。毎週のバックアップでは曜日も設定します。

```sh
frost config set schedule.time 09:30
frost config set schedule.day friday
```

既定は `15:00` と `sunday` です。自動バックアップをオフにしたり、もう一度オンにしたりするには、次を実行します。

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

どの変更も、すぐにスケジュールジョブに反映されます。macOS と Windows では、スケジュールされたバックアップの実行中の変更は、そのバックアップが終わりしだい反映されます。 `config.toml` を自分で編集した場合は、次に実行した frost のコマンドがジョブを更新します。

## バックアップが実行される時刻

バックアップは `schedule.time` の時刻に、コンピュータのローカル時刻で実行されます。

| `schedule.every` | バックアップの時刻 |
| --- | --- |
| `daily` | 毎日、その時刻 |
| `weekly` | 毎週 `schedule.day` の、その時刻 |
| `2h` から `12h` | その時刻と、その前後の間隔ごと。`15:00` から数える `6h` なら、03:00、09:00、15:00、21:00 に実行します |
| `hourly` | 毎時、その時刻の分に |

systemd では、それぞれの実行が最大 5 分、ランダムに遅れて始まります。

## 実行されなかったバックアップ

予定の時刻にコンピュータの電源が切れていたりスリープしていたりした場合、frost はコンピュータが戻ってからバックアップします。何回分逃していても、バックアップは 1 回だけです。

| スケジューラ | 逃したバックアップを実行するタイミング |
| --- | --- |
| launchd (macOS) | Mac がスリープから復帰したとき、または電源が切れていたあとにログインしたとき |
| systemd (Linux) | コンピュータが復帰または起動したとき。lingering がオフなら、ログインしたとき |
| タスク スケジューラ (Windows) | コンピュータが戻り、サインインしている状態になったら、できるだけ早く |
| cron (Linux) | コンピュータが戻ってから 15 分以内 |

cron では、frost が 15 分ごとに確認し、予定の時刻が来たときか、逃した分があるときだけバックアップします。スケジュールされたバックアップでも自分で実行したバックアップでも、すでにバックアップ済みの時刻について 2 回目のバックアップはしません。

逃したバックアップを実行せず、予定どおりの時刻にだけバックアップするには、次を実行します。

```sh
frost config set schedule.catch_up false
```

ネットワークが戻る前に始まったスケジュールされたバックアップは、約 5 分間再試行します。別のバックアップが実行中なら、それが終わるのを待ちます。

Windows では、サインインしている間だけスケジュールされたバックアップが実行されます。バッテリーで動いている間はスケジュールされたバックアップを始めず、電源を外すと中止します。macOS と systemd では、スケジュールされたバックアップは低い優先度で動くので、コンピュータが重くなりにくくなっています。

## スケジュールジョブ

| システム | スケジューラ | ジョブ |
| --- | --- | --- |
| macOS | launchd | `~/Library/LaunchAgents/io.github.whatithasisandalwayswillbe.frost.plist` |
| systemd を使う Linux | systemd のユーザータイマー | `~/.config/systemd/user/frost-backup.service` と `frost-backup.timer` |
| systemd を使わない Linux | cron | crontab 内の、`# frost-backup` という印が付いた行 |
| Windows | タスク スケジューラ | `frost backup` という名前のタスク |

ジョブは、登録したときの設定フォルダとキャッシュフォルダを使って `frost backup` を実行します。これらのフォルダを変えた場合は、`frost init` をもう一度実行してください。

macOS では、ジョブはシステム設定 > 一般 > ログイン項目と機能拡張 (System Settings > General > Login Items & Extensions) に **Node.js Foundation** という名前で表示されます。これは frost に同梱しているランタイムの発行元です。ここでオフにするとスケジュールされたバックアップが止まり、`frost status` はジョブが見つからないと報告します。スケジュールされたバックアップを止めたいときは、代わりに `frost config set schedule.enabled false` を使ってください。

systemd では、lingering が無効だと確認できた場合に、frost がユーザーの lingering を有効にしようとします (`loginctl enable-linger`)。lingering によって、ログアウト中もバックアップを実行できます。有効にできなければ、ログアウト後はバックアップが動かなくなることがあります。タイマーを削除するときに lingering を無効に戻すのは、frost 自身が有効にしたと記録している場合だけです。

## ログ

| スケジューラ | ログの場所 |
| --- | --- |
| launchd、cron、タスク スケジューラ | frost のキャッシュフォルダにある `frost.log`。[ファイルとフォルダ](#files-and-folders)を参照してください |
| systemd | ジャーナル。`journalctl --user -u frost-backup` で読めます |

1 MiB を超えたログは、次の実行の前に空になります。前回のバックアップが成功したかどうかは、`frost status` でも確認できます。

## ジョブがなくなった場合

ジョブが削除されたりオフになったりすると、`frost status` に "scheduled job is missing" (スケジュールジョブが見つかりません) と表示されます。次のコマンドで元に戻せます。

```sh
frost config set schedule.enabled true
```
