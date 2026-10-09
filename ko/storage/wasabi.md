# Wasabi

Wasabi 버킷에 백업합니다.

> Wasabi 문서로는 frost에 필요한 조건부 쓰기를 지원하는지 확인할 수 없습니다. 설정 도우미가 연결할 때 이를 테스트합니다. 테스트에 실패하면 다른 제공업체를 고르세요. 자세한 내용은 [스토리지 선택](#choosing-storage)을 참고하세요.

## 시작하기 전에

1. Wasabi 콘솔에서 버킷을 만들고, `us-east-1`이나 `eu-central-1` 같은 리전을 적어 둡니다.
2. 액세스 키를 만듭니다. 위치는 Access Keys > Create New Access Key입니다. 가능하면 이 버킷에만 접근할 수 있는 사용자를 쓰세요.

## 설정 도우미에서

`frost init`을 실행하고 **Wasabi**를 고릅니다.

| 설정 도우미의 질문 | 답 |
| --- | --- |
| Which region is the bucket in? | 버킷의 리전. 예: `us-east-1` |
| What's the bucket called? | 만들 때와 똑같은 버킷 이름 |
| Paste the access key. | 만든 액세스 키 |
| Paste the secret key. | 키를 만들 때 한 번만 표시됩니다 |

frost는 `s3.<region>.wasabisys.com`에 연결하고, 버킷 안의 `frost` 폴더에 백업을 저장합니다.

## 알아 두면 좋은 점

frost 폴더의 객체를 삭제하는 수명 주기 규칙을 추가하지 마세요. 스냅샷끼리 청크를 공유하므로, 객체 하나만 지워도 많은 스냅샷이 망가질 수 있습니다.
