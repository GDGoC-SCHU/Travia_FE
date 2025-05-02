# 🌍 Travia

**AI 여행 성향 기반 세계 여행지 + 일정 추천 서비스**  
> 간단한 설문으로 당신의 여행 성향을 분석하고,  
> AI가 전 세계 여행지와 일정 루트를 자동으로 추천해주는 웹앱 서비스

---

## 🔨 프로젝트 설정

### 사전 설치 필요

- Node.js 22 or higher

### 단계별 설정

1. 본 저장소를 `git clone https://github.com/GDGoC-SCHU/Travia_FE/` 명령어로 복제합니다.
2. `corepack enable` 명령어로 `npm` 이외의 패키지 매니저를 쉽게 사용할 수 있도록 설정합니다.
3. `yarn set version stable` 명령어로 최신 버전이 설치되어 있는지 확인하고, 설치되어 있지 않다면 설치되도록 합니다.
4. `yarn install` 명령어로 패키지를 설치하고, `yarn run dev`로 정상 실행 여부를 확인합니다. 일반적으로 개발 서버의 기본 주소는 `localhost:3000`이며, 다른 서버가 포트를 사용 중인 경우 다른 포트를 사용하거나 실행이 실패할 수 있습니다.

---

## 🏷️ 커밋 타입 가이드

| 타입 | 설명           | 예시                                  |
|------|----------------|---------------------------------------|
| feat | 새로운 기능 추가 | `feat: 설문 결과 페이지 구성 추가`     |
| fix  | 버그 수정       | `fix: 일정 추천 시 null 응답 처리`     |
| docs | 주석 및 문서     | `docs: README에 OSS 라이센스 추가` |

---

## 📌 프로젝트 개요

**Travia**는 여행을 계획하는 사용자에게  
AI(Gemini)를 활용해 여행 성향에 맞는 도시를 추천하고,  
사용자의 여행 기간에 맞춰 **일자별 여행 일정표**를 자동 생성해주는 웹앱입니다.

---

## 🧠 핵심 기술

| 파트 | 기술 스택 |
|------|-----------|
| Frontend | **Tanstack Start + React**, TypeScript |
| Backend | **FastAPI**, **MySQL** |
| AI | **Gemini API (Google Generative AI)** |
| 기타 | JSON 통신, Docker (컨테이너화), 환경변수 관리 등 |

---

## ✨ 주요 기능

- ✅ 간단한 단답형 설문 입력 (카드 UI + 예시 제시)
- ✅ 사용자 성향 기반 세계 여행지 2~3곳 추천
- ✅ 입력한 여행 **기간에 맞춰 하루 3개 장소 일정표 자동 생성**
- ✅ 카드 형식의 결과 출력 UI
- ✅ 전체 프로젝트는 웹앱으로 진행 (반응형 UI 예정)
- ✅ 개발 단계에서는 Docker 컨테이너화, 배포는 추후 확정

---

## 📝 설문 항목

사용자는 아래 항목을 단답형으로 입력합니다.  
질문 아래에 예시를 표시해 사용자 편의를 고려합니다.

| 항목 | 설명 |
|------|------|
| 동행 | 혼자 / 친구 / 연인 / 가족 |
| 여행 스타일 | 감성 / 액티비티 / 먹방 / 문화 체험 등 (복수 가능) |
| 여행 기간 | 예: 3박 4일 (입력값에 따라 일정 수 자동 계산) |
| 운전 여부 | 가능 / 대중교통 이용 |
| 예산 | 대략적인 총 금액 입력 |
| 선호 기후 | 따뜻한 곳 / 선선한 곳 / 눈 내리는 곳 등 |
| 대륙 선호 | 아시아 / 유럽 / 미주 / 상관없음 |
| 하루 활동 밀도 | 느긋하게 / 적당히 / 빡세게 |

---

## 💾 Gemini 응답 포맷 예시 (JSON)

```json
{
  "recommendations": [
    {
      "city": "바르셀로나",
      "country": "스페인",
      "reason": "감성적이고 호주 여행하기 좋은 분위기, 따뜻한 기후와 맛집이 풍림",
      "schedule": {
        "day_1": [
          { "time": "10:00", "activity": "고딕 지구 산책" },
          { "time": "13:00", "activity": "보케리아 시장 타파스 점심" },
          { "time": "17:00", "activity": "카사 바트요 관람" }
        ],
        "day_2": [
          { "time": "10:00", "activity": "몬주익 언덕 트랭 타기" },
          { "time": "13:00", "activity": "현지 식당에서 점심" },
          { "time": "17:00", "activity": "바르셀로네타 해방 산책" }
        ],
        "day_3": [],
        "day_4": []
      }
    }
  ]
}
```

---

## 📄 Open Source License

### MIT License

[React](https://react.dev) | [Tanstack Start](https://tanstack.com/start/latest/docs/framework/react/overview) | [TailwindCSS](https://tailwindcss.com) | [shadcn UI](https://ui.shadcn.com/)

**React**

Copyright (c) Meta Platforms, Inc. and affiliates.

**Tanstack Start**

Copyright (c) 2021-present Tanner Linsley

**TailwindCSS**

Copyright (c) Tailwind Labs, Inc.

**shadcn UI**

Copyright (c) 2023 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### ISC License

[Lucide Icons](https://lucide.dev/icons/)

Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

### SIL OFL License

[학교안심 우주](https://copyright.keris.or.kr/idx) ([CDN](https://noonnu.cc/font_page/1223))

Copyright (c) 2023 KERIS, YoonDesign ([https://copyright.keris.or.kr/wft/fntDwnldView?fntGrpId=GFT202301120000000000006]).  


This Font Software is licensed under the SIL Open Font License, Version 1.1.  
This license is copied below, and is also available with a FAQ at:  
[https://openfontlicense.org]

\----------------------------------------------------------------------

#### SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007

\----------------------------------------------------------------------

&nbsp;

PREAMBLE
-----------

The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
-----------

"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
-----------

Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
-----------

This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
-----------

THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.

