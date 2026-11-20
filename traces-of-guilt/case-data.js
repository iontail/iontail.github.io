export const caseFile = {
  title: "천문관의 마지막 리허설",
  scene: {
    title: "애스터 천문관",
    period: "1932년 영국 · 애스터 천문연구소",
    description: "새 행성 발표 리허설 중, 연구소장 에드워드 헤일은 갑자기 돌아간 투영기에 밀려 난간에 머리를 부딪혀 숨졌습니다.",
    objective: "현장과 증언을 살펴보고 범인을 찾아보세요.",
    image: "planetarium/main.png?v=wall-schedule"
  },
  clues: [
    {
      title: "목격자 증언 A",
      action: "증언 확인하기",
      mapLabel: "증언",
      image: "planetarium/witnesses-01.png",
      position: [4, 94.8]
    },
    {
      title: "목격자 증언 B",
      image: "planetarium/witnesses-02.png"
    },
    {
      title: "리허설 진행표",
      action: "진행표 확인하기",
      mapLabel: "진행표",
      image: "planetarium/schedule.png",
      position: [12.7, 36.7],
      compactPosition: [12.7, 37.7]
    },
    {
      title: "투영기 조작대",
      action: "조작대 확인하기",
      mapLabel: "조작대",
      image: "planetarium/console.png",
      position: [2.25, 68.5]
    },
    {
      title: "리허설 사진",
      action: "리허설 사진 보기",
      mapLabel: "사진",
      image: "planetarium/photo.png",
      position: [96, 70.5],
      compactPosition: [98.5, 70.5],
      align: "end"
    },
    {
      title: "연구소장 집무실",
      action: "소장실 둘러보기",
      mapLabel: "소장실",
      image: "planetarium/office.png?v=office-illustration",
      position: [72, 18.5],
      align: "end",
      kind: "장소"
    },
    {
      title: "연구소장실 서랍",
      action: "서랍 확인하기",
      mapLabel: "서랍",
      image: "planetarium/drawer.png",
      position: [72, 25.3],
      compactPosition: [94, 11.4],
      align: "end"
    },
    {
      title: "기사 교정쇄",
      action: "교정쇄 확인하기",
      mapLabel: "교정쇄",
      image: "planetarium/proof.png",
      position: [72, 32.1],
      align: "end"
    }
  ],
  hints: [
    "두 증언을 나란히 읽고 각 사람이 직접 보고 들은 내용에 주목하세요.",
    "현장 도판에서 조작대와 투영기, 소장실 문이 어디에 있는지 확인해 보세요.",
    "리허설 진행표와 사진에서 확인할 수 있는 사실을 비교해 보세요.",
    "소장실의 서류와 기사 교정쇄를 함께 살펴보세요."
  ],
  suspects: [
    { id: "margaret", name: "마거릿 헤일", role: "사무국장 겸 공동 설립자", portrait: "suspects/margaret.svg" },
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
      poster: "planetarium/photo.png"
    },
    stepsTitle: "장면별 해설 예시",
    steps: [
      {
        image: "planetarium/schedule.png",
        alt: "나무 게시판에 집게로 고정한 진행표",
        title: "리허설 진행표",
        text: "진행표에는 리허설의 예정 순서와 시간을 기록해요."
      },
      {
        image: "planetarium/photo.png",
        alt: "별이 비친 천장 앞에 투영기의 검은 윤곽이 보이는 사진",
        title: "기자의 리허설 사진",
        text: "기자의 카메라에 당시 투영 화면이 담겼어요."
      },
      {
        image: "planetarium/console.png",
        alt: "원형 계기판 세 개와 오른쪽의 긴 손잡이가 달린 조작대",
        title: "투영기 조작대",
        text: "조작대에서 리허설에 사용한 손잡이와 스위치를 살펴볼 수 있어요."
      }
    ]
  }
};
