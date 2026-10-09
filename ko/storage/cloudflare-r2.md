# Cloudflare R2

Cloudflare R2 버킷에 백업합니다. R2는 frost에 필요한 조건부 쓰기를 지원합니다.

## 시작하기 전에

1. Cloudflare 대시보드에서 R2 버킷을 만듭니다.
2. 계정 ID를 적어 둡니다. R2 개요 페이지에 있는 32자리 영문과 숫자입니다.
3. API 토큰을 만듭니다. R2 > Manage R2 API Tokens > Create API token에서 Object Read & Write 권한으로 만들고, 가능하면 사용할 버킷으로 제한하세요.

## 설정 도우미에서

`frost init`을 실행하고 **Cloudflare R2**를 고릅니다.

| 설정 도우미의 질문 | 답 |
| --- | --- |
| What's your Cloudflare account ID? | R2 개요 페이지의 32자리 ID |
| What's the bucket called? | 만들 때와 똑같은 버킷 이름 |
| Paste the Access Key ID. | 새 API 토큰의 Access Key ID |
| Paste the Secret Access Key. | Access Key ID 옆에 한 번만 표시됩니다 |

frost는 리전 `auto`로 `<account-id>.r2.cloudflarestorage.com`에 연결하고, 버킷 안의 `frost` 폴더에 백업을 저장합니다.

## 알아 두면 좋은 점

frost 폴더의 객체를 삭제하거나 만료시키는 수명 주기 규칙을 추가하지 마세요. 스냅샷끼리 청크를 공유하므로, 객체 하나만 지워도 많은 스냅샷이 망가질 수 있습니다.
