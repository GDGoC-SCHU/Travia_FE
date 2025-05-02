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

- [React](https://react.dev) MIT License
- [Tanstack Start](https://tanstack.com/start/latest/docs/framework/react/overview) MIT License
- [TailwindCSS](https://tailwindcss.com) MIT License
- [shadcn UI](https://ui.shadcn.com/) MIT License
- [학교안심 우주](https://copyright.keris.or.kr/idx) SIL OFL [#CDN](https://noonnu.cc/font_page/1223)

