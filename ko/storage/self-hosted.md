# 셀프 호스팅

직접 관리하는 컴퓨터의 폴더에 SSH로 백업합니다. Linux 서버, NAS, Raspberry Pi, VPS는 물론, SSH 서버를 켠 Mac이나 Windows 컴퓨터도 쓸 수 있습니다. frost는 컴퓨터에 이미 있는 SSH 클라이언트를 사용하므로, 서버에는 아무것도 설치할 필요가 없습니다.

## 시작하기 전에

- 서버에서 SSH와 SFTP가 켜져 있어야 합니다. 대부분의 Linux 서버에는 둘 다 있습니다. NAS에서는 터미널이나 파일 서비스 설정에서 찾아보세요.
- 사용할 폴더에 쓸 수 있는 서버 계정이 필요합니다. 백업 전용 계정을 따로 만들어 두면 좋습니다.
- Windows에서는 OpenSSH 클라이언트가 설치되어 있어야 합니다. 보통은 이미 설치되어 있습니다. 없다면 설정의 시스템 > 선택적 기능에서 추가하세요.

## 설정 도우미에서

`frost init`을 실행하고 **Self-hosted**를 고릅니다.

| 설정 도우미의 질문 | 답 |
| --- | --- |
| What is the server SSH address? | `me@nas.local` 같은 사용자와 호스트, 또는 SSH 설정의 `Host`. 다른 포트를 쓰면 `:2222`처럼 덧붙입니다 |
| Which folder on the server? | 기본값은 `frost`이며, 서버의 홈 폴더 안에 있습니다. `/srv/backups/frost` 같은 전체 경로도 됩니다 |

폴더의 마지막 부분이 없으면 설정 도우미가 만듭니다. 그 상위 폴더는 미리 있어야 합니다.

## frost의 SSH 키

frost는 처음 설정할 때 전용 SSH 키를 만듭니다. 개인 키나 SSH 에이전트가 필요하지 않고 비밀번호를 묻지 않으므로 예약 백업도 항상 같은 방식으로 로그인합니다.

서버는 아직 frost의 키를 모르므로, 처음에는 설정 도우미가 키를 추가할 방법을 묻습니다.

- **Add it for me**(대신 추가하기)는 터미널을 ssh에 넘깁니다. 서버에 처음 연결할 때 ssh는 서버의 지문을 보여 주고 신뢰할지 묻습니다. 그런 다음 서버의 비밀번호를 묻고 frost의 키를 추가하며, 설정 도우미가 이어서 진행합니다. 비밀번호는 ssh에만 전달됩니다. frost는 비밀번호를 보거나 저장하지 않습니다.
- **I'll add it myself**(직접 추가하기)는 frost의 공개 키 파일이 있는 곳을 보여 줍니다. 그 파일의 줄을 서버의 `~/.ssh/authorized_keys`에 추가한 뒤 `[enter]`를 누르세요.

| 컴퓨터 | frost의 공개 키 |
| --- | --- |
| macOS와 Linux | `~/.config/frost/ssh/frost_ed25519.pub` |
| Windows | `%AppData%\frost\ssh\frost_ed25519.pub` |

설정 도우미가 키를 추가하면 그 줄은 `restrict`로 시작합니다. 연결 전달과 터미널 할당은 비활성화되지만 frost는 계속 파일을 읽고 쓸 수 있습니다. 서버에서 계정을 SFTP로 제한하지 않으면 셸 명령은 계속 실행할 수 있습니다.

### 키를 직접 추가하기

macOS나 Linux에서는 다음 명령으로 앞에 `restrict`를 붙인 키를 추가할 수 있습니다. 서버의 비밀번호를 묻습니다.

```sh
(printf 'restrict '; cat ~/.config/frost/ssh/frost_ed25519.pub) | ssh me@nas.local 'umask 077; mkdir -p .ssh; cat >> .ssh/authorized_keys'
```

일부 NAS는 계정 설정에 SSH 키를 붙여 넣을 수 있게 해 줍니다.

Windows 서버는 키를 다른 곳에 두므로 **Add it for me**를 쓸 수 없습니다. 일반 계정이면 `C:\Users\<you>\.ssh\authorized_keys`에, 관리자면 `C:\ProgramData\ssh\administrators_authorized_keys`에 줄을 추가하세요.

## 포트와 SSH 설정

frost는 ssh와 마찬가지로 `~/.ssh/config`를 읽습니다. `Host` 항목에서 사용자, 포트 등의 옵션을 설정하고 그 이름을 주소로 입력할 수 있습니다. frost는 전용 키를 제공하지만 SSH 설정에서 `IdentityFile`로 명시한 키도 제시될 수 있습니다.

## 알아 두면 좋은 점

- 서버의 파일 시스템이 하드 링크를 지원해야 합니다. frost는 하드 링크를 사용해 두 컴퓨터가 서로의 백업 기록을 절대 덮어쓰지 않게 합니다. ext4, Btrfs, XFS, ZFS, APFS, NTFS는 모두 지원합니다. 설정 도우미가 연결할 때 이를 확인합니다.
- 서버의 호스트 키가 바뀌면 frost는 ssh와 마찬가지로 연결을 거부합니다. 서버를 다시 설치했다면 `ssh-keygen -R <host>`로 이전 키를 지운 뒤 `frost init`을 다시 실행하세요.
- `frost status`는 서버 디스크가 얼마나 찼는지 보여 주고, `frost backup`은 거의 찼을 때 경고합니다.
- 폴더가 서버가 마운트하는 디스크에 있다면, 백업이 실행될 때 그 디스크가 마운트되어 있어야 합니다. 폴더가 없으면 백업은 다른 곳에 쓰지 않고 실패합니다.
