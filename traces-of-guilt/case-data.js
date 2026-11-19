export const caseFile = {
  scene: {
    title: "사건 현장",
    description: "녹음실 전체를 둘러보고, 번호를 눌러 물건을 자세히 살펴보세요.",
    image: { source: "recording-room.svg", width: 920, height: 620 }
  },
  clues: [
    {
      title: "벽시계",
      action: "벽시계 자세히 보기",
      description: "시곗바늘과 시계 주변을 확대해 보여주는 페이지입니다.",
      position: [69, 39],
      viewBox: [510, 145, 215, 190]
    },
    {
      title: "릴 케이스",
      action: "릴 케이스 자세히 보기",
      description: "테이프 케이스와 표식을 확대해 보여주는 페이지입니다.",
      position: [58, 70],
      viewBox: [408, 361, 200, 122]
    },
    {
      title: "출입 일지",
      action: "출입 일지 자세히 보기",
      description: "출입 일지의 외형과 내부 기록을 살펴보는 페이지입니다.",
      position: [81, 55],
      viewBox: [673, 305, 120, 120],
      document: true
    },
    {
      title: "조정실 창문",
      action: "조정실 창문 자세히 보기",
      description: "창문과 창문 너머의 공간을 확대해 보여주는 페이지입니다.",
      position: [13, 31],
      viewBox: [8, 100, 150, 280]
    }
  ],
  hints: [
    "시계의 바늘과 멈춘 위치를 살펴보세요.",
    "케이스에 붙어 있는 표식을 확인해 보세요.",
    "출입 일지에서 나중에 비교할 항목을 찾아보세요.",
    "현장 전체 그림으로 돌아가 물건 사이의 위치를 확인해 보세요."
  ],
  suspects: [
    { id: "margaret", name: "마거릿 헤일", portrait: "suspects/margaret.svg" },
    { id: "arthur", name: "아서 리드", portrait: "suspects/arthur.svg" },
    { id: "clive", name: "클라이브 베넷", portrait: "suspects/clive.svg" },
    { id: "julian", name: "줄리언 머서", portrait: "suspects/julian.svg" }
  ],
  answer: {
    practice: true,
    question: "천문관 기술실장은 누구인가요?",
    suspectId: "arthur",
    explanation: "아서 리드는 천문관의 기술실장으로 투영기의 운용과 정비를 맡아요. 이 결과는 제출 기능을 확인하는 연습 문제에 해당해요."
  }
};
