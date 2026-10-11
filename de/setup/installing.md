# frost installieren

frost lässt sich unter macOS, Linux und Windows mit einem einzigen Befehl installieren. Jede Version bringt ihre eigene Laufzeitumgebung mit, du musst also vorher nichts anderes installieren.

## Unterstützte Systeme

| System | Prozessoren |
| --- | --- |
| macOS | Apple Silicon (`arm64`) und Intel (`amd64`) |
| Linux | `amd64` und `arm64` |
| Windows | `amd64` und `arm64` |

Für 32-Bit-ARM, etwa ältere Raspberry-Pi-Systeme, gibt es kein Paket. Unter Windows installiert WSL das Linux-Paket.

## Das Installationsprogramm

Führe unter macOS oder Linux diesen Befehl in einem Terminal aus:

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | sh
```

Unter Windows führst du diesen Befehl in PowerShell aus:

```powershell
irm https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.ps1 | iex
```

Das Installationsprogramm:

1. Lädt die neueste Version für dein System herunter.
2. Prüft die Signatur der Version und die Prüfsumme des Downloads und bricht ab, wenn eins davon nicht stimmt.
3. Installiert frost in deinem Benutzerprofil und legt einen `frost`-Starter in einem Ordner in deinem `PATH` ab.

Unter macOS und Linux braucht es `curl` oder `wget`, `ssh-keygen` aus OpenSSH 8.1 oder neuer sowie `sha256sum` oder `shasum` für die Prüfung. Unter Windows braucht es Windows PowerShell 5.1, das bei Windows 10 und 11 dabei ist, oder PowerShell 7. Die Signatur prüft es mit der Laufzeitumgebung aus der Version selbst, nachdem Windows bestätigt hat, dass die OpenJS Foundation sie signiert hat.

Unter macOS und Linux landet der Starter in `/usr/local/bin`, wenn du dort schreiben darfst, sonst in `~/.local/bin`. Ist dieser Ordner noch nicht in deinem `PATH`, gibt das Installationsprogramm die Zeile aus, die ihn hinzufügt. Unter Windows landet der Starter in `%LocalAppData%\frost\bin`, und das Installationsprogramm fügt diesen Ordner deinem `PATH` hinzu. Terminals, die schon offen waren, musst du neu starten, damit sie `frost` finden.

Das `curl`-Installationsprogramm funktioniert auch in Git Bash unter Windows. Dort braucht es `cygpath`, das Git Bash bereitstellt, entpackt mit `unzip` oder PowerShell und legt den Starter in `~/bin` ab.

Wenn alles fertig ist, richte mit `frost init` dein erstes Backup ein. Siehe [frost einrichten](#setting-up).

## Optionen des Installationsprogramms

| Variable | Wirkung |
| --- | --- |
| `FROST_INSTALL_DIR` | Legt den Starter in diesem Ordner ab. Das Windows-Installationsprogramm ändert deinen `PATH` dafür nicht |
| `FROST_VERSION` | Installiert diese Version, zum Beispiel `v0.1.0`, statt der neuesten |

Zum Beispiel unter macOS oder Linux:

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | FROST_INSTALL_DIR="$HOME/bin" sh
```

Unter Windows setzt du die Variable vorher im selben PowerShell-Fenster:

```powershell
$env:FROST_VERSION = 'v0.1.0'; irm https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.ps1 | iex
```

Ein anderer Ordner für den Starter verschiebt frost selbst nicht. [Dateien und Ordner](#files-and-folders) listet auf, wo was liegt.

## Mit npm oder pnpm

Wenn du schon Node.js 22 oder neuer hast, kannst du frost mit npm installieren:

```sh
npm install -g getfrost
```

Oder mit pnpm:

```sh
pnpm add -g getfrost
```

Das Paket heißt `getfrost`, und der Befehl, den es dir gibt, heißt `frost`. Beim ersten Aufruf von `frost` lädt es die Version für dein System herunter, prüft Signatur und Prüfsumme wie das Installationsprogramm und installiert sie in deinem Benutzerprofil. Danach führt es deinen Befehl aus. Ab dann geht jeder `frost`-Befehl direkt an das installierte frost, das sich selbst aktuell hält.

Mit pnpm führst du vorher `pnpm setup` aus, falls du das noch nie getan hast, damit die globalen Befehle von pnpm in deinem `PATH` liegen.

## Manuell installieren

1. Lade das Archiv für dein System von der [neuesten Version](https://github.com/whatithasisandalwayswillbe/frost/releases/latest) herunter. Die Namen sehen aus wie `frost_0.1.0_linux_amd64.tar.gz`, unter Windows mit `.zip`.
2. Prüfe den Download, bevor du irgendetwas daraus ausführst, wie unten unter „Einen Download prüfen“ beschrieben.
3. Entpacke es in einen neuen, leeren Ordner.
4. Führe im entpackten Ordner das mitgelieferte Installationsprogramm aus und gib ihm den Ordner für den Starter mit.

Unter macOS oder Linux:

```sh
./runtime/bin/node install.mjs "$PWD" "$HOME/.local/bin"
```

Unter Windows in PowerShell:

```powershell
.\runtime\bin\node.exe .\install.mjs "$PWD" "$env:LOCALAPPDATA\frost\bin"
```

Füge danach den Ordner des Starters zu deinem `PATH` hinzu, falls er dort noch fehlt. Unter Windows funktioniert `frost.cmd` in der Eingabeaufforderung und in PowerShell, `frost` in Git Bash.

Um ein entpacktes Paket ohne Installation zu nutzen, starte direkt seinen `frost`-Starter (unter Windows `frost.cmd`) und lass alle seine Dateien zusammen.

## Einen Download prüfen

Das Installationsprogramm erledigt das für dich. Um ein Archiv selbst zu prüfen, lade es zusammen mit `checksums.txt` und `checksums.txt.sig` aus derselben Version herunter, dazu [`release-signing.pub`](https://github.com/whatithasisandalwayswillbe/frost/blob/main/install/release-signing.pub) aus dem Repository. Setze `archive` auf den Dateinamen des Archivs und führe dann aus:

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

Die Befehle brechen ab, wenn die Signatur nicht stimmt oder die signierte Liste nicht genau einen Eintrag für dein Archiv enthält. Die erste Prüfung sollte `Good "file" signature` ausgeben und die zweite `OK` hinter dem Namen deines Archivs. Wenn eine davon das nicht tut, installiere es nicht.
