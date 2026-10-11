# frost のインストール

frost は、macOS、Linux、Windows のいずれでも 1 つのコマンドでインストールできます。どのリリースにも専用のランタイムが含まれているので、事前に何かをインストールする必要はありません。

## 対応システム

| システム | プロセッサ |
| --- | --- |
| macOS | Apple シリコン (`arm64`) と Intel (`amd64`) |
| Linux | `amd64` と `arm64` |
| Windows | `amd64` と `arm64` |

古い Raspberry Pi などの 32 ビット ARM 向けのパッケージはありません。Windows の WSL では Linux 版のパッケージがインストールされます。

## インストーラ

macOS や Linux では、ターミナルで次のコマンドを実行します。

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | sh
```

Windows では、PowerShell で次のコマンドを実行します。

```powershell
irm https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.ps1 | iex
```

インストーラは次のことを行います。

1. お使いのシステム向けの最新リリースをダウンロードします。
2. リリースの署名とダウンロードしたファイルのチェックサムを確認し、どちらかが合わなければ中止します。
3. frost をユーザープロファイルにインストールし、`PATH` 上のフォルダに `frost` ランチャーを置きます。

macOS と Linux では、検証に `curl` または `wget`、OpenSSH 8.1 以降の `ssh-keygen`、`sha256sum` または `shasum` が必要です。Windows では、Windows 10 と 11 に付属する Windows PowerShell 5.1、または PowerShell 7 が必要です。署名の確認には、リリースに含まれるランタイムを使います。そのランタイムが OpenJS Foundation によって署名されていることを、先に Windows が確認します。

macOS と Linux では、ランチャーは書き込み権限があれば `/usr/local/bin` に、なければ `~/.local/bin` に置かれます。そのフォルダがまだ `PATH` に含まれていない場合は、追加するためのコマンドをインストーラが表示します。Windows では、ランチャーは `%LocalAppData%\frost\bin` に置かれ、インストーラがこのフォルダを `PATH` に追加します。インストール前から開いていたターミナルで `frost` を使うには、ターミナルを開き直す必要があります。

`curl` のインストーラは、Windows の Git Bash でも使えます。その場合は Git Bash が提供する `cygpath` が必要で、展開には `unzip` または PowerShell を使い、ランチャーは `~/bin` に置かれます。

インストールが終わったら、`frost init` を実行して最初のバックアップを設定します。詳しくは[frost の設定](#setting-up)を参照してください。

## インストーラのオプション

| 変数 | 動作 |
| --- | --- |
| `FROST_INSTALL_DIR` | ランチャーをこのフォルダに置きます。この場合、Windows のインストーラは `PATH` を変更しません |
| `FROST_VERSION` | 最新版ではなく、`v0.1.0` のように指定したリリースをインストールします |

macOS や Linux での例:

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | FROST_INSTALL_DIR="$HOME/bin" sh
```

Windows では、同じ PowerShell ウィンドウで先に変数を設定します。

```powershell
$env:FROST_VERSION = 'v0.1.0'; irm https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.ps1 | iex
```

ランチャーのフォルダを変えても、frost 本体の場所は変わりません。各ファイルの場所は[ファイルとフォルダ](#files-and-folders)にまとめています。

## npm や pnpm でインストールする

Node.js 22 以降をすでに使っているなら、npm で frost をインストールできます。

```sh
npm install -g getfrost
```

pnpm の場合:

```sh
pnpm add -g getfrost
```

パッケージ名は `getfrost` で、使えるようになるコマンドは `frost` です。初めて `frost` を実行すると、お使いのシステム向けのリリースをダウンロードし、インストーラと同じように署名とチェックサムを確認してから、ユーザープロファイルにインストールします。そのあとで、入力したコマンドを実行します。以降の `frost` コマンドはすべて、インストール済みの frost にそのまま渡されます。frost は自分自身を最新の状態に保ちます。

pnpm の場合、まだ実行したことがなければ先に `pnpm setup` を実行して、pnpm のグローバルコマンドが `PATH` に入るようにしてください。

## 手動でインストールする

1. [最新リリース](https://github.com/whatithasisandalwayswillbe/frost/releases/latest)から、お使いのシステム向けのアーカイブをダウンロードします。名前は `frost_0.1.0_linux_amd64.tar.gz` のような形で、Windows では `.zip` です。
2. 中身を実行する前に、ダウンロードしたファイルを検証します。方法は下の「ダウンロードの検証」で説明しています。
3. 新しい空のフォルダに展開します。
4. 展開したフォルダの中で同梱のインストーラを実行し、ランチャーを置くフォルダを指定します。

macOS や Linux の場合:

```sh
./runtime/bin/node install.mjs "$PWD" "$HOME/.local/bin"
```

Windows の場合は PowerShell で:

```powershell
.\runtime\bin\node.exe .\install.mjs "$PWD" "$env:LOCALAPPDATA\frost\bin"
```

ランチャーのフォルダがまだ `PATH` に含まれていなければ、追加してください。Windows では、`frost.cmd` はコマンド プロンプトと PowerShell で、`frost` は Git Bash で使えます。

展開したパッケージをインストールせずに使う場合は、その中の `frost` ランチャー (Windows では `frost.cmd`) を直接実行し、ファイルはすべて同じ場所にまとめておいてください。

## ダウンロードの検証

この作業はインストーラが自動で行います。アーカイブを自分で確認したい場合は、同じリリースから `checksums.txt` と `checksums.txt.sig` を一緒にダウンロードし、リポジトリから [`release-signing.pub`](https://github.com/whatithasisandalwayswillbe/frost/blob/main/install/release-signing.pub) をダウンロードします。`archive` にアーカイブのファイル名を設定してから、次を実行します。

```sh
(
  set -e
  archive='frost_X.Y.Z_linux_amd64.tar.gz'
  printf 'frost-release %s\n' "$(cat release-signing.pub)" > allowed_signers
  ssh-keygen -Y verify -f allowed_signers -I frost-release -n file -s checksums.txt.sig < checksums.txt
  selected_checksum=$(awk -v archive="$archive" '$2 == archive { line = $0; count++ } END { if (count != 1) exit 1; print line }' checksums.txt)
  printf '%s\n' "$selected_checksum" | shasum -a 256 -c -
)
```

署名が正しくない場合や、署名付きリストに対象のアーカイブがちょうど 1 件だけ載っていない場合、このコマンド群は停止します。1 つ目のチェックでは `Good "file" signature` と、2 つ目ではアーカイブ名の後ろに `OK` と表示されるはずです。どちらかがそうならない場合は、インストールしないでください。
