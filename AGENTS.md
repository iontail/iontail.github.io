# Agent Guide for `iontail.github.io`

이 레포지토리는 Chanhee Lee의 개인 GitHub Pages 사이트다. Academic Pages / Minimal Mistakes 계열 Jekyll 테마를 기반으로 하지만, 템플릿 예시 콘텐츠와 생성 도구는 정리되어 있다.

## 핵심 구조

- `_pages/about.md`: 홈 화면 원본. 소개, Education, Experience, Projects, Awards가 직접 작성되어 있다.
- `_pages/publications.html`: publications 목록 페이지. 현재 `_publications/`에 항목이 없으면 안내 문구를 보여준다.
- `_config.yml`: 사이트 메타데이터, author profile, Jekyll 설정, publications 컬렉션 설정.
- `_data/navigation.yml`: 상단 메뉴. 현재 `Publications`만 활성화되어 있다.
- `_layouts/default.html`: 최상위 HTML shell.
- `_layouts/single.html`: 일반 page/publication 상세 레이아웃.
- `_layouts/archive.html`: 목록형 페이지 wrapper.
- `_includes/`: header, sidebar, SEO, footer, archive item 등 Liquid 조각.
- `_sass/_custom.scss`: 이 사이트 고유의 홈/profile/CV형 섹션 스타일.
- `assets/css/main.scss`: Sass 진입점.
- `assets/js/_main.js`, `assets/js/theme.js`: JS 원본.
- `assets/js/main.min.js`: 실제로 로드되는 JS 번들.
- `images/`: profile image와 favicon.
- `files/`: CV와 프로젝트 PDF.
- `_site/`: Jekyll 빌드 산출물. 직접 수정하지 않는다.

## 작업 전 안전 규칙

1. `git status --short`로 현재 변경사항을 먼저 확인한다.
2. 사용자 변경으로 보이는 파일은 덮어쓰거나 되돌리지 않는다.
3. `rm` 명령어로 파일이나 디렉터리를 삭제해야 할 때는 반드시 사용자에게 먼저 허락을 받고 진행한다.
4. `_site/`, `.sass-cache/`, `.jekyll-cache/`, `.DS_Store`는 원본이 아닌 생성/캐시 파일이다.
5. `_config.yml` 변경 후에는 Jekyll 서버를 재시작해야 한다.

## 로컬 실행

```bash
bundle install
bundle exec jekyll serve -l -H localhost
```

브라우저에서 `http://localhost:4000`을 확인한다.

## 검증

- HTML/Jekyll 렌더링 확인: `bundle exec jekyll build`
- JS 원본 변경 시 번들 갱신: `npm run build:js`
- diff 품질 확인: `git diff --check`

## 콘텐츠 수정 위치

| 요청 | 수정 위치 |
| --- | --- |
| 홈 소개/이력/프로젝트/수상 수정 | `_pages/about.md` |
| 홈 레이아웃/간격/반응형 스타일 수정 | `_sass/_custom.scss` |
| 이름, bio, email, GitHub 등 author 정보 수정 | `_config.yml`의 `author` |
| 상단 메뉴 수정 | `_data/navigation.yml` |
| publication 페이지 동작 수정 | `_pages/publications.html`, `_includes/archive-single.html` |
| publication 추가 | `_publications/*.md`, 필요 시 `files/` |
| CV PDF 교체 | `files/cv.pdf` |
| favicon/profile 이미지 교체 | `images/` |
| 공통 header/footer/sidebar 수정 | `_includes/masthead.html`, `_includes/footer.html`, `_includes/sidebar.html`, `_includes/author-profile.html` |
| 공통 page layout 수정 | `_layouts/default.html`, `_layouts/single.html`, `_layouts/archive.html` |
| JS 동작 수정 | `assets/js/_main.js`, 이후 `npm run build:js` |

## Publications 형식

새 publication은 `_publications/`에 Markdown 파일로 추가한다.

```yaml
---
title: "Paper Title"
collection: publications
category: manuscripts
permalink: /publication/YYYY-MM-DD-slug
excerpt: "Short summary"
date: YYYY-MM-DD
venue: "Venue Name"
paperurl: "/files/paper.pdf"
slidesurl: "/files/slides.pdf"
bibtexurl: "/files/ref.bib"
citation: "Author. (Year). Title. Venue."
---
```

`category`는 `_config.yml`의 `publication_category` key와 맞춘다. 현재 key는 `books`, `manuscripts`, `conferences`다.

## 스타일/자산 주의

- 사이트 고유 스타일은 가능한 `_sass/_custom.scss`에 둔다.
- `assets/css/main.scss`는 Sass import 진입점이다.
- `assets/js/main.min.js`만 브라우저에서 로드된다. JS 원본을 바꾸면 반드시 번들을 다시 만든다.
- 내부 링크는 현재 루트 사이트 기준으로 `/files/name.pdf`, `/images/name.png` 패턴을 쓴다.

