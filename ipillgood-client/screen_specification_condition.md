# 화면 명세서 (컨디션 도메인)

| 화면 이름 | Route Path | Page Components | 주요 기능 | 담당자 |
| :--- | :--- | :--- | :--- | :--- |
| **컨디션 메인** | `/condition` | `ConditionCheckPage` | • 주차별 컨디션 꺾은선 그래프 및 상세 정보 팝업 노출<br>• 이번 달 평균 활력, 평균 수면 시간, 영양제 섭취 요약 정보 제공<br>• 주간 컨디션 체크(활력/수면) 팝업 모달 연동 | 임혜윤 |
| **건강 상태 선택** | `/condition/health-status` | `HealthStatusSelectionPage` | • 8대 신체 계통(대분류) 및 세부 부위(소분류) 선택<br>• 선택 상태 유효성 검증 시 결과 페이지 이동 CTA 활성화 | 임혜윤 |
| **건강 상태 추천 결과** | `/condition/health-status/result` | `HealthResultPage` | • 선택한 부위의 감퇴 원인 분석 텍스트 제공<br>• 개인 맞춤형 추천 영양 성분 카드 목록 및 상세 이동 링크 제공 | 임혜윤 |

<br>

# API 연동 여부 및 상태관리 방식 (컨디션 도메인)

| 화면 이름 | API 연동 여부 | 상태 관리 방식 | 관련 API | 담당자 |
| :--- | :--- | :--- | :--- | :--- |
| **컨디션 메인** | `Mock Data` | `Zustand` (`useConditionStore`) | • `GET /api/v1/conditions/current-week` (이번 주 상태 조회)<br>• `GET /api/v1/conditions/monthly-records` (월별 그래프 조회)<br>• `GET /api/v1/conditions/weekly-records/{recordId}` (주차 상세 조회)<br>• `POST /api/v1/conditions/weekly-records` (주간 컨디션 저장)<br>• `POST /api/v1/conditions/popup-logs/auto-shown` (자동 노출 기록)<br>• `PATCH /api/v1/conditions/popup-logs/current-week/dismissed` (팝업 닫힘 기록) | 임혜윤 |
| **건강 상태 선택** | `Mock Data` | `useState` | • `GET /api/v1/health-concerns/categories` (건강 상태 카테고리 목록 조회) | 임혜윤 |
| **건강 상태 추천 결과** | `Mock Data` | `미사용` | • `GET /api/v1/health-concerns/recommendations` (추천 성분 조회) | 임혜윤 |

<br>

# 공통 컴포넌트 관리표 (게게/나혜윤 담당 항목 상세)

| 컴포넌트 명 | 설명 | 사용 위치 | 담당자 |
| :--- | :--- | :--- | :--- |
| **Input** | 텍스트 입력창 공통 컴포넌트 (라벨링, 에러/성공 메시지 출력 및 비밀번호 보임/숨김 눈아이콘 토글 기능 내장) | 회원가입(`SignupInputStep`), 마이페이지 프로필 관리(`ProfileSection`, `PasswordChangeSheet`), UI 예제 페이지 | 게게/나혜윤 |
| **ItemCard** | 상품 및 영양소 요약을 위한 공통 카드 컴포넌트 (상단 원형 썸네일 이미지, 타이틀 명, 하단 설명글 수직 카드 배치) | UI 예제 페이지 (`example/page.tsx`) | 게게/나혜윤 |
