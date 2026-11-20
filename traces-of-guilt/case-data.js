export const caseFile = {
  title: "천문관의 마지막 리허설",
  scene: {
    title: "애스터 천문관",
    period: "1932년 영국 · 애스터 천문연구소",
    description: "새 행성 발표 리허설 중, 연구소장 에드워드 헤일은 갑자기 돌아간 투영기에 밀려 난간에 머리를 부딪혀 숨졌습니다.",
    objective: "현장과 증언을 살펴보고 범인을 찾아보세요.",
    image: "planetarium/main.png"
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
      position: [10, 30]
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
      image: "planetarium/office.png",
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
    { id: "margaret", portrait: "suspects/margaret.svg" },
    { id: "arthur", portrait: "suspects/arthur.svg" },
    { id: "clive", portrait: "suspects/clive.svg" },
    { id: "julian", portrait: "suspects/julian.svg" }
  ],
  answer: {
    practice: true,
    question: "천문관 기술실장은 누구인가요?",
    suspectId: "arthur",
    explanation: "기술실장은 투영기의 운용과 정비를 맡아요. 이 결과는 제출 기능을 확인하는 연습 문제에 해당해요.",
    video: {
      // Add the edited MP4 as src and, if available, Korean WebVTT as captions.
      src: "",
      poster: "planetarium/photo.png"
    },
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
