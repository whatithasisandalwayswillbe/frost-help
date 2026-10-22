# 클라우드 제공업체

설정 도우미에는 S3 프로토콜을 쓰는 네 곳의 클라우드 제공업체용 설정이 준비되어 있습니다. `frost init`을 실행하고 **S3-compatible**을 고른 다음, 사용하는 제공업체를 고르세요. 다른 S3 서비스나 직접 운영하는 S3 서버는 [기타 S3 호환 스토리지](#other-s3)를 참고하세요.

어느 설정이든 백업은 버킷 안의 `frost` 폴더에 저장되므로, 버킷에 다른 것도 함께 둘 수 있습니다. frost에는 그 버킷에만 접근할 수 있는 키를 주고, frost 폴더의 객체를 삭제하거나 만료시키거나 보관 처리하는 수명 주기 규칙은 추가하지 마세요. 스냅샷끼리 청크를 공유하므로, 객체 하나만 지워도 많은 스냅샷이 망가질 수 있습니다.

## Amazon S3

S3는 frost에 필요한 조건부 쓰기를 지원합니다.

1. AWS 콘솔에서 버킷을 만들고, `us-east-1` 같은 리전을 적어 둡니다.
2. frost용 IAM 사용자와 그 사용자의 액세스 키를 만듭니다. 위치는 IAM > Users > your user > Security credentials > Create access key입니다.

frost에는 버킷 안 객체의 읽기, 조회, 쓰기, 삭제 권한이 필요하지만, 실제로 삭제하는 객체는 설정 도우미가 연결할 때 만드는 작은 테스트 객체뿐입니다. 다음과 같은 정책이면 충분합니다. `my-backups`는 사용하는 버킷 이름으로 바꾸세요.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::my-backups"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-backups/*"
    }
  ]
}
```

| 설정 도우미의 질문 | 답 |
| --- | --- |
| Which region hosts the bucket? | 버킷의 리전. 예: `us-east-1` |
| What is the bucket name? | 만들 때와 똑같은 버킷 이름 |
| Paste the Access Key ID. | IAM의 액세스 키 ID |
| Paste the Secret Access Key. | 만들 때 액세스 키 ID 옆에 한 번만 표시됩니다 |

frost는 `s3.<region>.amazonaws.com`에 연결합니다. frost의 객체는 S3 Standard나 S3 Standard-IA처럼 바로 읽을 수 있는 스토리지 클래스에 두고, Glacier Flexible Retrieval이나 Glacier Deep Archive에는 두지 마세요. 버킷 버전 관리는 필요하지 않습니다.

## Cloudflare R2

R2는 frost에 필요한 조건부 쓰기를 지원합니다.

1. Cloudflare 대시보드에서 R2 버킷을 만듭니다.
2. 계정 ID를 적어 둡니다. R2 개요 페이지에 있는 32자리 영문과 숫자입니다.
3. API 토큰을 만듭니다. R2 > Manage R2 API Tokens > Create API token에서 Object Read & Write 권한으로 만드세요. 가능하면 토큰을 그 버킷으로 제한하세요.

| 설정 도우미의 질문 | 답 |
| --- | --- |
| What is your Cloudflare Account ID? | R2 개요 페이지에 있는 32자리 ID |
| What is the bucket name? | 만들 때와 똑같은 버킷 이름 |
| Paste the Access Key ID. | 새 API 토큰의 Access Key ID |
| Paste the Secret Access Key. | Access Key ID 옆에 한 번만 표시됩니다 |

frost는 `<account-id>.r2.cloudflarestorage.com`에 리전 `auto`로 연결합니다.

## Backblaze B2

Backblaze 문서에는 B2가 frost에 필요한 조건부 쓰기를 지원하는지 나와 있지 않습니다. 설정 도우미가 연결할 때 이를 테스트합니다. 테스트에 실패하면 다른 스토리지를 고르세요.

1. Backblaze 계정에서 버킷을 만듭니다.
2. 버킷의 엔드포인트를 적어 둡니다. 위치는 Buckets > your bucket > Endpoint이며, `s3.us-west-004.backblazeb2.com` 같은 형식입니다.
3. 애플리케이션 키를 만듭니다. Application Keys > Add a New Application Key에서 만들고, 이 버킷으로 제한하세요.

| 설정 도우미의 질문 | 답 |
| --- | --- |
| What is the bucket endpoint? | 버킷 페이지에 있는 엔드포인트. 예: `s3.us-west-004.backblazeb2.com` |
| What is the bucket name? | 만들 때와 똑같은 버킷 이름 |
| Paste the application key's keyID. | 새 애플리케이션 키의 keyID |
| Paste the applicationKey. | 키를 만든 직후 한 번만 표시됩니다 |

frost는 엔드포인트에서 리전을 알아냅니다.

## Wasabi

Wasabi 문서로는 frost에 필요한 조건부 쓰기를 지원하는지 확인할 수 없습니다. 설정 도우미가 연결할 때 이를 테스트합니다. 테스트에 실패하면 다른 스토리지를 고르세요.

1. Wasabi 콘솔에서 버킷을 만들고, `us-east-1`이나 `eu-central-1` 같은 리전을 적어 둡니다.
2. 액세스 키를 만듭니다. 위치는 Access Keys > Create New Access Key입니다. 가능하면 이 버킷에만 접근할 수 있는 사용자를 쓰세요.

| 설정 도우미의 질문 | 답 |
| --- | --- |
| Which region hosts the bucket? | 버킷의 리전. 예: `us-east-1` |
| What is the bucket name? | 만들 때와 똑같은 버킷 이름 |
| Paste the Access Key. | 만든 액세스 키 |
| Paste the Secret Key. | 키를 만들 때 한 번만 표시됩니다 |

frost는 `s3.<region>.wasabisys.com`에 연결합니다.
