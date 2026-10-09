# Backblaze B2

Backblaze B2의 S3 호환 API를 통해 B2 버킷에 백업합니다.

> Backblaze 문서에는 B2가 frost에 필요한 조건부 쓰기를 지원하는지 나와 있지 않습니다. 설정 도우미가 연결할 때 이를 테스트합니다. 테스트에 실패하면 다른 제공업체를 고르세요. 자세한 내용은 [스토리지 선택](#choosing-storage)을 참고하세요.

## 시작하기 전에

1. Backblaze 계정에서 버킷을 만듭니다.
2. 버킷의 엔드포인트를 적어 둡니다. 위치는 Buckets > your bucket > Endpoint이며, `s3.us-west-004.backblazeb2.com` 같은 형식입니다.
3. 애플리케이션 키를 만듭니다. Application Keys > Add a New Application Key에서 만들고, 이 버킷으로 제한하세요.

## 설정 도우미에서

`frost init`을 실행하고 **Backblaze B2**를 고릅니다.

| 설정 도우미의 질문 | 답 |
| --- | --- |
| What's the bucket's endpoint? | 버킷 페이지에 있는 엔드포인트. 예: `s3.us-west-004.backblazeb2.com` |
| What's the bucket called? | 만들 때와 똑같은 버킷 이름 |
| Paste the application key's keyID. | 새 애플리케이션 키의 keyID |
| Paste the applicationKey. | 키를 만든 직후 한 번만 표시됩니다 |

frost는 엔드포인트에서 리전을 알아내고, 버킷 안의 `frost` 폴더에 백업을 저장합니다.

## 알아 두면 좋은 점

frost 폴더의 객체를 삭제하는 수명 주기 규칙을 추가하지 마세요. 스냅샷끼리 청크를 공유하므로, 객체 하나만 지워도 많은 스냅샷이 망가질 수 있습니다.
