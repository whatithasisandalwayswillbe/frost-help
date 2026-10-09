# Permafrost

Permafrost는 frost를 위해 만든 호스팅 스토리지입니다. 연결에는 액세스 키 하나만 필요하며, 버킷, 리전, 엔드포인트를 설정할 필요가 없습니다.

다른 스토리지와 마찬가지로 백업은 업로드 전에 컴퓨터에서 암호화됩니다. Permafrost는 그 내용을 읽을 수 없습니다.

## 키 받기

1. `frost init`을 실행하고 **Permafrost**를 고릅니다.
2. **I don't have a key yet**(아직 키가 없음)을 고릅니다. frost가 브라우저에서 키를 받을 수 있는 페이지를 엽니다.
3. 키를 받으면 페이지가 키를 frost로 돌려보내고, frost는 바로 저장합니다. 그 뒤에 설정 도우미를 종료해도 키는 사라지지 않습니다.

브라우저가 열리지 않으면 직접 [getfro.st/perma](https://getfro.st/perma)로 가서, 설정 도우미에서 `[p]`를 눌러 받은 키를 붙여 넣으세요. 키를 받는 과정이 끝나지 않으면 `[r]`로 다시 시도하거나 `[p]`로 키를 붙여 넣습니다. frost는 최대 25분까지 기다립니다.

이미 키가 있다면 **I have a key**(키가 있음)를 고르고 붙여 넣으세요.

## 키가 frost에 전달되는 방식

기다리는 동안 frost는 `127.0.0.1`에서 대기하며, 이 주소에는 사용자의 컴퓨터만 접근할 수 있습니다. frost는 페이지에 무작위 값을 넘기고, 같은 값과 함께 돌아온 키만 받아들입니다. 그래서 다른 페이지가 자신의 키를 frost에 몰래 넘길 수 없습니다.

페이지에는 키도 표시되므로, 브라우저가 다른 컴퓨터에 있는 경우 등에는 직접 frost에 복사해 넣을 수 있습니다.

## 거부된 키

Permafrost가 액세스 키를 더 이상 받아들이지 않으면, 모든 명령어가 그 사실을 알리는 오류와 함께 멈춥니다. `frost init`을 실행해 스토리지를 다시 설정하고 작동하는 키를 받으세요.

| 설정 도우미의 메시지 | 할 일 |
| --- | --- |
| Permafrost didn't accept that access key | 키를 빠짐없이 복사했는지 확인하세요. 만료되었을 수도 있습니다 |
| That access key can't store backups | Permafrost 계정에서 키의 권한을 확인하세요 |
| your Permafrost storage is full | 계정에 남은 공간이 없습니다. Permafrost 계정을 확인하세요 |

## 직접 운영하는 서버

[Permafrost API](https://github.com/whatithasisandalwayswillbe/frost/blob/main/docs/PERMAFROST.md)를 지원하는 서버는 누구나 운영할 수 있습니다. 그런 서버를 쓰려면 주소를 지정합니다.

```sh
frost config set storage.permafrost.url https://<your-server>
```

주소는 `https://`를 써야 합니다. `http://localhost:8080`처럼 사용자의 컴퓨터에서 실행하는 서버만 예외입니다. 이 설정을 비워 두면 기본 Permafrost 서버를 사용합니다.
