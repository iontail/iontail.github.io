export const caseFile = {
  title: "천문관의 마지막 리허설",
  scene: {
    title: "애스터 천문관",
    period: "1932년 영국 · 애스터 천문연구소",
    description: [
      "새 행성의 발견을 알릴 역사적인 발표가 예정된 날이었습니다. 애스터 천문관에서 마지막 리허설이 진행되던 중 연구소장 에드워드 헤일이 숨졌습니다.",
      "당시 현장에는 연구소 사무국장 마거릿 헤일, 천문관 기술실장 아서 리드, 선임연구원 클라이브 베넷, 과학 전문 기자 줄리언 머서가 있었습니다."
    ],
    objective: "발표는 취소됐습니다. 현장의 단서와 네 사람의 증언을 대조해 그날의 리허설을 재구성해 보세요.",
    image: "planetarium/main.png?v=rehearsal-slide-handoff"
  },
  clues: [
    {
      title: "연구소장 집무실",
      action: "소장실 둘러보기",
      mapLabel: "소장실",
      image: "planetarium/office.png?v=desk-details",
      position: [72, 18.5],
      align: "end",
      map: "office"
    },
    {
      title: "투영기 조작대",
      action: "조작대 확인하기",
      mapLabel: "조작대",
      image: "planetarium/console.png?v=clue-art-refresh",
      position: [2.25, 68.5]
    },
    {
      title: "목격자 증언 A",
      action: "증언 확인하기",
      mapLabel: "증언",
      image: "planetarium/witnesses-01.png?v=rehearsal-slide-handoff",
      position: [4, 94.8]
    },
    {
      title: "목격자 증언 B",
      image: "planetarium/witnesses-02.png?v=character-faces"
    },
    {
      title: "연구소장실 서랍",
      action: "서랍 확인하기",
      mapLabel: "서랍",
      image: "planetarium/drawer.png?v=clue-art-refresh",
      position: [50, 93],
      align: "end",
      location: "office"
    },
    {
      title: "기사 교정쇄",
      action: "교정쇄 확인하기",
      mapLabel: "교정쇄",
      image: "planetarium/proof.png?v=desk-details",
      position: [57, 65],
      align: "end",
      location: "office"
    },
    {
      title: "리허설 진행표",
      action: "진행표 확인하기",
      mapLabel: "진행표",
      image: "planetarium/schedule.png?v=clue-art-refresh",
      position: [12.7, 36.7],
      compactPosition: [12.7, 37.7]
    },
    {
      title: "리허설 사진",
      action: "리허설 사진 보기",
      mapLabel: "사진",
      image: "planetarium/photo.png?v=clue-art-refresh",
      position: [96, 70.5],
      compactPosition: [98.5, 70.5],
      align: "end"
    }
  ],
  hints: [
    "진행표에 적힌 순서와 실제 리허설이 일치하는지 확인해 보세요.",
    "기자가 찍은 리허설 사진과 서랍 속 관측 자료 대조표를 비교해 보세요. 두 자료에서 어떤 사실을 확인할 수 있을까요?",
    "교정쇄 옆 편지는 누구에게 보내려던 걸까요? 짐작한 이름을 ‘To.’ 뒤의 문양에 한 글자씩 대입해 보면, 암호의 규칙을 찾을 수 있을지도 몰라요.",
    "소리가 나기 직전의 증언을 나란히 읽어 보세요. 각자가 있던 자리와 보고 들은 내용을 비교하면, 서로 맞지 않는 대목이 있나요?"
  ],
  suspects: [
    { id: "margaret", name: "마거릿 헤일", role: "사무국장 겸 공동 설립자", portrait: "suspects/margaret.svg?v=character-faces" },
    { id: "arthur", name: "아서 리드", role: "천문관 기술실장", portrait: "suspects/arthur.svg" },
    { id: "clive", name: "클라이브 베넷", role: "선임연구원", portrait: "suspects/clive.svg" },
    { id: "julian", name: "줄리언 머서", role: "과학 전문 기자", portrait: "suspects/julian.svg" }
  ],
  answer: {
    practice: false,
    question: "에드워드 헤일을 살해한 사람은 누구인가요?",
    suspectId: "clive",
    explanation: "에드워드 헤일은 클라이브 베넷이 발견한 새 천체를 자신의 성과로 발표하려 했어요. 베넷은 발견 공로를 빼앗기는 걸 막으려 에드워드를 살해했어요.",
    video: {
      // Add the edited MP4 as src and, if available, Korean WebVTT as captions.
      src: "",
      poster: "planetarium/photo.png?v=clue-art-refresh"
    },
    stepsTitle: "장면별 해설 예시",
    steps: [
      {
        image: "planetarium/schedule.png?v=clue-art-refresh",
        alt: "나무 게시판에 집게로 고정한 진행표",
        title: "리허설 진행표",
        text: "진행표에는 리허설의 예정 순서와 시간을 기록해요."
      },
      {
        image: "planetarium/photo.png?v=clue-art-refresh",
        alt: "별이 비친 천장 앞에 투영기의 검은 윤곽이 보이는 사진",
        title: "기자의 리허설 사진",
        text: "기자의 카메라에 당시 투영 화면이 담겼어요."
      },
      {
        image: "planetarium/console.png?v=clue-art-refresh",
        alt: "원형 계기판 세 개와 오른쪽의 긴 손잡이가 달린 조작대",
        title: "투영기 조작대",
        text: "조작대에서 리허설에 사용한 손잡이와 스위치를 살펴볼 수 있어요."
      }
    ]
  }
};
