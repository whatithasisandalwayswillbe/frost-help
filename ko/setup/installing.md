# frost 설치

frost는 macOS, Linux, Windows 어디서든 명령어 하나로 설치할 수 있습니다. 모든 릴리스에 자체 런타임이 들어 있으므로 미리 설치할 것은 없습니다.

## 지원하는 시스템

| 시스템 | 프로세서 |
| --- | --- |
| macOS | Apple 실리콘(`arm64`)과 Intel(`amd64`) |
| Linux | `amd64`와 `arm64` |
| Windows | `amd64`와 `arm64` |

예전 Raspberry Pi 같은 32비트 ARM용 패키지는 없습니다. Windows의 WSL에서는 Linux용 패키지가 설치됩니다.

## 설치 프로그램

macOS나 Linux에서는 터미널에서 다음 명령어를 실행합니다. Windows에서는 Git Bash에서 실행합니다.

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | sh
```

설치 프로그램은 다음 일을 합니다.

1. 사용 중인 시스템에 맞는 최신 릴리스를 내려받습니다.
2. 릴리스의 서명과 내려받은 파일의 체크섬을 확인하고, 하나라도 맞지 않으면 중단합니다.
3. frost를 사용자 프로필에 설치하고, `PATH`에 있는 폴더에 `frost` 런처를 둡니다.

`curl` 또는 `wget`이 필요하고, 서명을 확인하려면 OpenSSH 8.1 이상의 `ssh-keygen`도 필요합니다.

런처는 쓰기 권한이 있으면 `/usr/local/bin`에, 없으면 `~/.local/bin`에 놓입니다. Windows에서는 `~/bin`에 놓입니다. 그 폴더가 아직 `PATH`에 없으면, 설치 프로그램이 추가하는 명령어를 보여 줍니다.

설치가 끝나면 `frost init`을 실행해 첫 백업을 설정합니다. 자세한 내용은 [frost 설정](#setting-up)을 참고하세요.

## 설치 프로그램 옵션

| 변수 | 동작 |
| --- | --- |
| `FROST_INSTALL_DIR` | 런처를 이 폴더에 둡니다 |
| `FROST_VERSION` | 최신 버전 대신 `v0.1.0`처럼 지정한 릴리스를 설치합니다 |

예:

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | FROST_INSTALL_DIR="$HOME/bin" sh
```

런처 폴더를 바꿔도 frost 자체의 위치는 바뀌지 않습니다. 각 파일의 위치는 [파일 및 폴더](#files-and-folders)에 정리되어 있습니다.

## 직접 설치하기

1. [최신 릴리스](https://github.com/whatithasisandalwayswillbe/frost/releases/latest)에서 사용 중인 시스템에 맞는 압축 파일을 내려받습니다. 이름은 `frost_0.1.0_linux_amd64.tar.gz` 같은 형식이며, Windows용은 `.zip`입니다.
2. 안에 든 것을 실행하기 전에 내려받은 파일을 검증합니다. 방법은 아래의 "다운로드 검증" 항목에 있습니다.
3. 비어 있는 새 폴더에 압축을 풉니다.
4. 압축을 푼 폴더 안에서 포함된 설치 프로그램을 실행하고, 런처를 둘 폴더를 지정합니다.

macOS나 Linux:

```sh
./runtime/bin/node install.mjs "$PWD" "$HOME/.local/bin"
```

Windows에서는 PowerShell에서:

```powershell
.\runtime\bin\node.exe .\install.mjs "$PWD" "$env:LOCALAPPDATA\frost\bin"
```

런처 폴더가 아직 `PATH`에 없다면 추가합니다. Windows에서는 `frost.cmd`를 명령 프롬프트와 PowerShell에서, `frost`를 Git Bash에서 사용할 수 있습니다.

압축을 푼 패키지를 설치하지 않고 쓰려면, 그 안의 `frost` 런처(Windows에서는 `frost.cmd`)를 바로 실행하고, 파일은 모두 한곳에 그대로 두세요.

## 다운로드 검증

이 작업은 설치 프로그램이 대신 해 줍니다. 압축 파일을 직접 확인하려면, 같은 릴리스에서 `checksums.txt`와 `checksums.txt.sig`를 함께 내려받고, 저장소에서 [`release-signing.pub`](https://github.com/whatithasisandalwayswillbe/frost/blob/main/install/release-signing.pub)를 내려받습니다. `archive`에 압축 파일 이름을 넣고 다음을 실행합니다.

```sh
archive='frost_X.Y.Z_linux_amd64.tar.gz'
printf 'frost-release %s\n' "$(cat release-signing.pub)" > allowed_signers
ssh-keygen -Y verify -f allowed_signers -I frost-release -n file -s checksums.txt.sig < checksums.txt
awk -v archive="$archive" '$2 == archive { print }' checksums.txt | shasum -a 256 -c -
```

첫 번째 검사는 `Good "file" signature`를, 두 번째 검사는 압축 파일 이름 뒤에 `OK`를 출력해야 합니다. 둘 중 하나라도 그렇지 않으면 설치하지 마세요.
