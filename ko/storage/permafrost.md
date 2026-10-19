# Permafrost

Permafrost는 frost를 위해 만든 호스팅 스토리지입니다. 연결에는 액세스 키 하나만 필요하며, 버킷, 리전, 엔드포인트를 설정할 필요가 없습니다.

다른 스토리지와 마찬가지로 백업은 업로드 전에 컴퓨터에서 암호화됩니다. Permafrost는 그 내용을 읽을 수 없습니다.

## 키 받기

1. `frost init`을 실행하고 **Permafrost**를 고릅니다.
2. **I don't have a key yet**(아직 키가 없음)을 고릅니다. frost가 브라우저에서 [getfro.st/perma](https://getfro.st/perma)를 엽니다. 열리지 않으면 직접 들어가세요.
3. 그곳에서 키를 받아 복사합니다.
4. 설정 도우미에 붙여 넣습니다.

이미 키가 있다면 **I have a key**(키가 있음)를 고르고 붙여 넣으세요.

## 새 키 받기

키를 잃어버렸다면 [getfro.st/perma/recover](https://getfro.st/perma/recover)로 가서 키를 받을 때 쓴 이메일 주소를 입력하세요. 받은 이메일의 링크로 새 키를 받을 수 있습니다. 새 키는 이전 키를 대신하며, 이전 키는 모든 컴퓨터에서 더 이상 작동하지 않습니다.

Permafrost를 쓰는 컴퓨터마다 새 키로 바꿉니다.

```sh
frost config set storage.permafrost.token <new key>
```

Permafrost가 업로드를 받지 않는 동안에는 `frost config set`이 스토리지 확인을 할 수 없습니다. 대신 `frost config edit`을 사용해 `[storage.permafrost]` 아래의 `token`에 키를 넣으세요.

## 스토리지 사용량

`frost status`는 Permafrost 스토리지를 얼마나 쓰고 있는지 보여 줍니다. 스토리지가 거의 찼을 때처럼 Permafrost가 알려 줄 것이 있으면, `frost status`와 `frost backup`이 경고로 표시합니다. 자세한 내용은 [백업 확인](#checking-backups)을 참고하세요.

## Permafrost가 거부할 때

Permafrost의 오류 메시지에는 이유가 담겨 있습니다. 백업에 접근하는 명령어는 그 메시지와 함께 멈춥니다.

| 보이는 메시지 | 의미 |
| --- | --- |
| the Permafrost access key was rejected | 키가 잘못되었거나, 더 새 키로 바뀌었거나, 계정이 닫혔습니다. 어느 경우인지는 메시지에 나옵니다. 가장 최근 키를 쓰거나 새 키를 받으세요 |
| uploads are paused | Permafrost가 지금은 새 백업을 받지 않습니다. 복원은 계속 됩니다. 이유, 기한, 할 일은 메시지에 나옵니다 |
| your Permafrost storage is full | 이번 업로드가 들어갈 자리가 없습니다. 저장한 양과 할 일은 메시지에 나옵니다 |

설정 도우미에서는 앞의 두 가지가 "Permafrost didn't accept that access key"와 "Permafrost won't store backups with that access key"로 표시되고, 그 뒤에 같은 이유가 붙습니다.

## 호환 서버

frost는 기본 서버 대신 [Permafrost API](https://github.com/whatithasisandalwayswillbe/frost/blob/main/docs/PERMAFROST.md)를 지원하는 어떤 서버든 쓸 수 있습니다. 이미 그런 서버를 운영하는 사람을 위한 기능입니다. 내 컴퓨터에 백업하려면 [셀프 호스팅](#self-hosted) 스토리지는 SSH만 있으면 됩니다.

호환 서버는 빈 업로드 거부를 포함해 API의 객체 및 오류 규칙을 따라야 합니다. 서버가 바쁘면 frost가 자동으로 다시 시도합니다.

처음 설정하기 전에 frost의 설정 폴더에 `config.toml`을 만들고 아래 설정을 넣으세요. 위치는 [파일 및 폴더](#files-and-folders)에 나와 있습니다. 주소는 자신의 서버 주소로 바꾸세요.

```toml
[storage]
backend = "permafrost"

[storage.permafrost]
url = "https://<your-server>"
```

그런 다음 `frost init`을 실행하고 Permafrost를 고른 뒤, 액세스 키를 붙여 넣고 폴더를 골라 저장하세요. 서버가 비어 있으면 설정 도우미가 저장소를 만듭니다.

이미 frost를 설정했다면 `frost config edit`로 기존 파일에서 백엔드와 서버 주소를 함께 바꾸세요. 새 서버가 비어 있다면 경고를 확인하고 `yes`를 입력해 저장한 뒤 `frost init`을 다시 실행하세요. `frost config set`은 빈 대상 위치를 거부하므로 새 서버를 준비하는 데 쓸 수 없습니다.

주소는 `https://`를 써야 합니다. `http://localhost:8080`처럼 사용자의 컴퓨터에서 실행하는 서버만 예외입니다. 이 설정을 비워 두면 기본 Permafrost 서버인 `https://permafrost.wihiaawb.com`을 사용합니다.
