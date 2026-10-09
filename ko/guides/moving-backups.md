# 백업 옮기기

모든 내용을 다시 업로드하지 않고도 백업을 다른 폴더, 버킷, 제공업체로 옮길 수 있습니다.

| 하고 싶은 일 | 방법 |
| --- | --- |
| 백업을 다른 폴더나 버킷으로 옮기기 | 리포지토리 폴더 전체를 옮긴 뒤, frost에 새 위치를 지정합니다. 다시 업로드하는 것은 없습니다 |
| 다른 곳에서 별도의 백업을 새로 시작하기 | `frost init`을 실행하고 비어 있는 새 위치를 고릅니다. 기존 백업은 그대로 남지만, frost는 새 백업만 보여 줍니다 |
| 옮기기 전의 백업으로 돌아가기 | frost에 이전 위치를 다시 지정합니다 |

## 리포지토리 옮기기

리포지토리는 스토리지에서 `frost.repo`, `chunks/`, `snapshots/`, `trees/`가 들어 있는 폴더입니다. 이 네 가지를 안에 든 모든 객체와 함께 옮기거나 복사하고, 이름은 그대로 두세요. `frost.repo`만 옮겨서는 백업이 옮겨지지 않습니다.

그런 다음 frost에 백업이 있는 곳을 알려 줍니다. 다른 버킷으로 옮긴 경우:

```sh
frost config set storage.s3.bucket new-bucket
```

버킷 안의 다른 폴더로 옮긴 경우:

```sh
frost config set storage.s3.prefix backups/frost
```

다른 제공업체로 옮기려면 여러 설정을 한꺼번에 바꿔야 하므로, `frost init`을 실행하고 새 제공업체를 고르세요. 설정 도우미가 백업을 찾아 연결합니다.

## 저장하기 전 확인

`frost config set`은 새 스토리지 위치를 저장하기 전에 확인합니다. 백업이 없는 위치, 다른 키로 만든 백업이 있는 위치, `frost.repo`는 있지만 스냅샷이 없는 위치는 거부합니다. `frost config edit`는 같은 문제를 경고로만 보여 주므로, `set`이 거부하는 변경도 저장할 수 있습니다.

## frost가 백업을 찾지 못할 때

백업이 frost가 예상한 곳에 없으면, 오류와 `frost status`에 마지막으로 열었던 위치와 세 가지 해결 방법이 표시됩니다.

```text
Your backups were last opened in s3://old-bucket/frost/.
Since then storage.s3.bucket changed from old-bucket to new-bucket.

Do one of these:
  put it back:       frost config set storage.s3.bucket old-bucket
  keep the change:   move the whole folder (frost.repo, chunks/, snapshots/ and trees/) to s3://new-bucket/frost/
  start over there:  frost init (your old backups stay where they are)
```
