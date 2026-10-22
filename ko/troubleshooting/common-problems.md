# 자주 발생하는 문제

이 페이지에는 자주 보는 메시지와 문제를 모았습니다. 각 제목은 frost가 표시하는 메시지이거나, 사용자가 겪는 증상입니다.

## "frost isn't set up yet, run `frost init`"

frost가 `config.toml`을 찾지 못했습니다. `frost init`을 실행하세요. `--config-dir`나 `FROST_CONFIG_DIR`을 쓴다면 올바른 폴더를 가리키는지 확인하세요.

## "no key on this machine"

키 파일이 없습니다. 이 컴퓨터에 스토리지가 이미 설정되어 있다면 `frost key import`를 실행하고 복구 문구를 입력하세요. 그렇지 않다면 `frost init`을 실행하세요.

## "a backup or restore operation is already in progress"

다른 frost 프로세스가 백업을 사용하고 있습니다. 대개 예약된 백업입니다. 그런 경우 frost는 "a scheduled backup is already running"이라고 표시하고 언제 시작했는지 알려 줍니다. 끝날 때까지 기다렸다가 다시 시도하세요. frost의 잠금 파일을 지워도 그 프로세스는 멈추지 않습니다.

## "the local encryption key does not match"

스토리지에 다른 키로 만든 백업이 있습니다. `frost key verify`를 실행하고 적어 둔 복구 문구를 입력해 어떤 키인지 확인하세요. 올바른 키라면 그 문구로 `frost key import`를 실행하세요.

## frost가 백업을 찾지 못함

"has no frost repository" 같은 메시지는 frost가 찾는 곳에 백업이 없다는 뜻입니다. 오류에는 백업을 마지막으로 연 위치와 되돌아가는 방법이 표시됩니다. 자세한 내용은 [백업 옮기기](#moving-backups)를 참고하세요.

액세스 키가 아직 작동하는데 백업이 Permafrost에서 사라졌다면, 그 키로 삭제되었을 가능성이 큽니다. 바로 care@getfro.st로 이메일을 보내세요. 다른 사람이 키를 가지고 있을 수 있다면 [getfro.st/perma/recover](https://getfro.st/perma/recover)에서 새 키를 받으세요.

## 설정 도우미가 연결하지 못함

설정 도우미는 문제를 설명하고, 원인일 가능성이 가장 큰 답으로 돌아갑니다.

| 설정 도우미의 메시지 | 확인할 것 |
| --- | --- |
| Access key ID not recognized | 액세스 키 ID를 빠짐없이 복사했는지 |
| The secret key does not match the access key ID | 비밀 키를 빠짐없이 복사했는지, 그 키 ID의 것인지 |
| No bucket found with that name | 버킷 이름. 또는 버킷을 먼저 만드세요 |
| The provided key lacks necessary bucket permissions | 키에 버킷 객체의 읽기, 조회, 쓰기, 삭제 권한이 있는지 |
| The bucket is located in a different region | 리전 또는 엔드포인트 |
| Cannot resolve ... | 주소와 인터넷 연결 |
| No response from that address | 주소와 포트 |
| The server's TLS certificate is not valid for that address | 주소, 그리고 서버 인증서가 그 주소를 포함하는지 |
| the storage host timed out | 인터넷 연결. 그런 다음 다시 시도하세요 |
| cannot reach Permafrost | 인터넷 연결. 그런 다음 다시 시도하세요 |
| Cannot locate the server | SSH 주소와 네트워크 |
| The server did not respond | SSH 주소, 그리고 서버가 켜져 있는지 |
| That server does not support SFTP | 서버의 SSH나 파일 서비스 설정에서 SFTP가 켜져 있는지 |
| server returned text before opening SFTP subsystem | `.bashrc` 같은 서버의 로그인 스크립트가 무언가를 출력하는지. 대화형 셸에서만 출력하게 하세요 |
| There's no folder ... on ... | 폴더 경로. 그 상위 폴더는 있어야 합니다 |
| The server denied write access to that folder | frost가 로그인하는 계정에 대한 폴더 권한 |
| ... not found. Connect the required drive and try again | 드라이브가 연결되어 있고 경로가 맞는지 |
| Unable to write to that folder | 폴더 권한. macOS라면 [macOS 권한](#macos-permissions)을 참고하세요 |
| Symbolic links and directory junctions are not supported for backup folders | 폴더의 실제 경로를 쓰세요 |
| That drive is read-only | 쓸 수 있는 드라이브를 쓰세요 |

## "This storage provider does not support conditional writes"

컴퓨터끼리 서로의 백업 기록을 덮어쓰지 않도록 frost에 필요한 기능을 스토리지가 지원하지 않습니다. 키나 설정을 바꿔도 해결되지 않습니다. 다른 스토리지를 고르세요. 자세한 내용은 [스토리지 선택](#choosing-storage)을 참고하세요.

셀프 호스팅 서버나 드라이브에서는 다르게 표시됩니다. 서버가 "cannot create hard links"라고 하거나, 폴더가 "on an unsupported filesystem"라고 표시됩니다. ext4, Btrfs, XFS, ZFS, APFS, NTFS 같은 파일 시스템에 있는 폴더를 쓰세요.

## "the server didn't accept frost's SSH key"

셀프 호스팅 서버가 frost의 키를 거부했습니다. 예를 들어 키가 `authorized_keys`에서 지워진 경우입니다. `frost init`을 실행하고 키를 다시 추가하세요. 자세한 내용은 [셀프 호스팅](#self-hosted)을 참고하세요.

## "the server's SSH host key has changed"

서버의 신원이 바뀌면 frost는 ssh와 마찬가지로 연결을 거부합니다. 서버를 다시 설치했거나 서버 주소가 바뀌었다면 `ssh-keygen -R <host>`로 이전 키를 지운 뒤 `frost init`을 다시 실행하세요. 그런 경우가 아니라면 연결하기 전에 키가 바뀐 이유를 확인하세요.

## "... not found. Connect the required drive and try again"

백업이 있는 드라이브가 연결되어 있지 않거나, 폴더 경로가 바뀌었습니다. 드라이브를 연결하세요. Windows가 다른 드라이브 문자를 지정했다면 [로컬 드라이브](#local-drive)를 참고하세요.

## "the Permafrost access key was rejected"

메시지 뒤에 Permafrost가 알려 주는 이유가 이어집니다. 키가 잘못되었거나, 더 새 키로 바뀌었거나, 계정이 닫혔습니다. 가장 최근 키를 쓰거나 새 키를 받으세요. 자세한 내용은 [Permafrost](#permafrost)를 참고하세요.

## "uploads are paused"

Permafrost가 지금은 이 계정의 새 백업을 받지 않습니다. 이유와 기한은 메시지에 나오며, 복원은 계속 됩니다. 자세한 내용은 [Permafrost](#permafrost)를 참고하세요.

## 백업이 폴더를 읽지 못함

macOS에서는 대개 개인정보 보호 권한 문제입니다. 오류에 무엇을 허용해야 하는지 나옵니다. 자세한 내용은 [macOS 권한](#macos-permissions)을 참고하세요. 다른 시스템에서는 사용자가 그 폴더를 읽을 수 있는지 확인하세요.

## "couldn't be read"로 표시된 파일

frost는 그 파일들을 건너뛰고 나머지를 저장했습니다. 흔한 원인은 읽기 권한이 없는 파일, 백업 중에 삭제된 파일, 그리고 macOS에서 iCloud가 온라인에만 보관하는 파일입니다.

## "continued changing while being read"로 표시된 파일

백업하는 동안 어떤 프로그램이 그 파일에 쓰고 있었기 때문에, 스냅샷에는 이전 사본이 남았습니다. 프로그램을 닫고 다시 백업하거나, 다음 백업에 맡기세요.

## 폴더가 "not found"로 표시됨

목록에 있는 폴더가 없어서 frost가 나머지만 백업했습니다. 드라이브를 다시 연결하거나, 폴더를 옮겼다면 `frost init`으로 목록을 고치세요.

## "config.toml changed, but updating the scheduled job failed"

`config.toml`을 편집했지만 frost가 예약 작업을 그에 맞게 업데이트하지 못했습니다. 이유는 메시지 뒷부분에 나옵니다. 설정 이름이 나오면 `config.toml`에서 그 설정을 고치세요. frost는 성공할 때까지 명령어를 실행할 때마다 다시 시도합니다.

## "config.toml changed where backups go"

`config.toml`에서 백업이 저장되는 곳을 바꿨는데, frost가 새 위치를 처음 사용할 때 문제를 발견했습니다. 무엇이 문제인지는 메시지 뒷부분에 나옵니다. [백업 옮기기](#moving-backups)를 참고하세요.

## "scheduled job is missing"

예약 작업이 삭제되었거나 꺼졌습니다. `frost config set schedule.enabled true`로 되살리세요.

## 예약된 백업이 실행되지 않음

- `frost status`의 "next backup" 줄을 확인하세요.
- macOS에서는 시스템 설정 > 일반 > 로그인 항목 및 확장 프로그램(System Settings > General > Login Items & Extensions)에서 frost의 스위치를 확인하세요. Node.js Foundation이라는 이름으로 표시됩니다.
- Windows에서는 예약된 백업을 실행하려면 로그인한 상태여야 하며, 배터리로 동작하는 동안에는 실행되지 않습니다.
- `schedule.catch_up`이 `false`면 컴퓨터가 꺼져 있거나 잠자기 상태일 때 예정된 백업을 건너뜁니다.
- 로그를 확인하세요. 자세한 내용은 [자동 백업](#scheduling)을 참고하세요.

## "verification failed"

표본 검사에서 스토리지의 데이터가 빠졌거나 손상된 것을 발견했습니다. 자세한 내용은 [백업 확인](#checking-backups)을 참고하세요.

## "cannot restore alongside original files"

원본 옆의 폴더를 쓸 수 없습니다. 스냅샷이 다른 컴퓨터에서 온 경우가 많습니다. 대신 `--to <dir>`를 쓰세요. 자세한 내용은 [파일 복원](#restoring)을 참고하세요.

## "cannot overwrite original files"

스냅샷이 다른 종류의 컴퓨터에서 왔거나, 원본으로 가는 경로가 frost가 신뢰하지 않는 링크를 거칩니다. 대신 `--beside`나 `--to <dir>`를 쓰세요.

## 복원 중 파일에 "changed after it was checked" 또는 "has more than one link"가 표시됨

frost가 이미 확인한 파일이 변경되었거나, 아직 복원이 끝나지 않은 파일에 다른 이름으로 연결된 하드 링크가 있음을 발견했습니다. 복원 폴더를 변경하는 프로그램을 닫고 다시 시도하세요. 복원이 끝나지 않은 파일에 하드 링크가 있다면 새 빈 폴더에 복원하세요.

## 지정한 스냅샷을 찾지 못함

| frost의 메시지 | 시도할 것 |
| --- | --- |
| no snapshot at or before ... | 더 나중의 시각. 메시지에 가장 오래된 스냅샷이 표시됩니다 |
| "maple" matches 2 snapshots; provide additional ID characters | `maple-absurd`처럼 ID를 더 길게 입력하기 |
| cannot parse "..." as a snapshot ID or timestamp | `"3 days ago"`처럼 공백이 있는 시각을 따옴표로 감싸기 |

## frost가 스스로 업데이트하지 못함

frost 폴더에 쓸 수 없거나, frost를 소스에서 빌드한 경우입니다. 자세한 내용은 [frost 업데이트](#updating)를 참고하세요.

## 설치 프로그램이 멈춤

| 설치 프로그램의 메시지 | 할 일 |
| --- | --- |
| need OpenSSH 8.1+ to verify the frost release signature | OpenSSH를 설치하거나 업데이트하세요. Windows에서는 PowerShell 설치 프로그램을 쓰세요 |
| checksums.txt signature does not match official frost release key; installation aborted | 설치하지 마세요. 나중에 다시 시도하고, 계속 발생하면 [신고](#getting-help)하세요 |
| runtime inside ... lacks valid OpenJS Foundation signature; installation aborted | 설치하지 마세요. 나중에 다시 시도하고, 계속 발생하면 [신고](#getting-help)하세요 |
| checksum mismatch | 내려받은 파일이 손상되었습니다. 설치 프로그램을 다시 실행하세요 |
| 32-bit ARM isn't supported by the bundled runtime | 이 컴퓨터용 frost 패키지는 없습니다 |
| installing frost requires Node.js v22 or newer | Node.js를 업데이트하거나, npm이나 pnpm 대신 설치 프로그램을 쓰세요 |

## 설치한 뒤 `frost`를 찾을 수 없음

새 터미널을 여세요. frost를 설치하는 동안 열려 있던 터미널에는 새 `PATH`가 반영되지 않습니다. pnpm을 쓴다면 `pnpm setup`을 한 번 실행한 뒤 새 터미널을 여세요.
