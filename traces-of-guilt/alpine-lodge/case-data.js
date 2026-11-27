export const alpineLodge = {
  title: "알프스 산장의 비밀",
  scene: {
    title: "산장 전경",
    period: "알프스 산장",
    image: "alpine-lodge/main.jpg",
    description: [
      "알프스 산장의 주인 요한 켈러가 베란다 아래 절벽 밑에서 숨진 채 발견됐습니다. 베란다에서 추락한 것으로 보입니다. 요한은 전날 저녁부터 모습을 보이지 않았고, 밤새 내린 눈에 산장으로 이어지는 길이 막혔습니다.",
      "산장에는 요한의 딸이자 스키 강사인 클라라 켈러, 번역가 마라 바이스, 부동산 감정평가사 빅터 하르트, 마을 교회 목사 파울 슈타이너가 남아 있습니다."
    ],
    objective: "산장 안팎을 살피고 네 사람의 증언을 대조해 전날 저녁에 무슨 일이 있었는지 알아보세요."
  },
  hints: [
    "접수대 장부를 살펴보세요. 묵고 있는 사람과 객실을 서로 연결할 수 있을까요?",
    "벽난로에 놓인 두 사진을 비교해 보세요. 어떤 인물들이 함께 찍혀 있나요?",
    "베란다 난간 아래를 자세히 살펴보세요. 작은 물건의 문양을 어디에서 본 적 있나요?",
    "벤치에서 찾은 편지의 위아래를 살펴보세요. 두 표식의 위치를 기준으로 편지를 다시 읽어 보세요."
  ],
  suspects: [
    { id: "clara", name: "클라라 켈러", portrait: "alpine-lodge/suspects/clara.png", role: "스키 강사", relationship: "요한의 딸" },
    { id: "mara", name: "마라 바이스", portrait: "alpine-lodge/suspects/mara.png", role: "번역가", relationship: "산장에 자주 묵는 단골 손님" },
    { id: "viktor", name: "빅터 하르트", portrait: "alpine-lodge/suspects/viktor.png", role: "부동산 감정평가사", relationship: "산장 감정 업무로 요한을 만난 사이" },
    { id: "paul", name: "파울 슈타이너", portrait: "alpine-lodge/suspects/paul.png", role: "마을 교회 목사", relationship: "요한의 오랜 지인" }
  ],
  answer: {
    question: "요한 켈러의 죽음과 관련해 누구를 지목하시겠어요?",
    suspectId: "paul",
    explanation: "범인은 4번 용의자 파울 슈타이너예요. 베란다 눈 위에서 발견된 배지에는 옛 사진 속 파울의 배지와 같은 날개 달린 종이 새겨져 있어요. 현재 파울의 옷에는 그 배지가 보이지 않아요. 파손된 난간과 핏자국까지 함께 보면, 요한이 추락한 곳에 파울이 있었을 가능성이 가장 높아요.",
    steps: [
      {
        title: "추락 현장은 베란다였어요",
        image: "alpine-lodge/veranda.jpg",
        alt: "가운데 난간이 부서진 산장 베란다",
        text: "요한은 베란다 아래 절벽 밑에서 발견됐어요. 베란다 가운데 난간이 부서져 있고, 그 옆 기둥에는 핏자국이 남아 있어요. 요한이 추락하기 직전에 무슨 일이 있었는지 추적할 출발점이에요."
      },
      {
        title: "다툼만으로는 범인을 고를 수 없어요",
        image: "alpine-lodge/witnesses.png",
        alt: "클라라, 마라, 빅터, 파울의 증언",
        text: "클라라는 산장 매각 문제로 요한과 다퉜어요. 빅터도 낮은 감정가 때문에 요한과 마찰이 있었고, 마라는 빅터의 통화와 식사 후 남자들의 언쟁을 들었다고 했어요. 누구의 목소리였는지나 베란다에 누가 있었는지는 이 증언만으로 확인하기 어려워요."
      },
      {
        title: "옛 사진에 같은 배지가 있어요",
        image: "alpine-lodge/fireplace.jpg",
        alt: "벽난로 위 스키 사진과 요한·파울의 옛 사진",
        text: "교회 앞에서 찍은 옛 사진을 보면 젊은 요한과 파울이 둘 다 날개 달린 종 배지를 달고 있어요. 뒤쪽 교회 종탑에도 같은 문양이 보여요. 이 사진이 베란다에서 주운 물건을 알아볼 수 있게 해줘요."
      },
      {
        title: "떨어진 배지와 파울의 옷",
        comparison: [
          { image: "alpine-lodge/veranda.jpg", alt: "베란다 왼쪽 난간 아래 눈 위에 떨어진 배지", origin: [0, 77], zoom: 7.6, spot: [12.25, 67.5] },
          { image: "alpine-lodge/main.jpg", alt: "현재 파울의 재킷 가슴 부분", origin: [72, 51], zoom: 3.1 }
        ],
        text: "베란다 난간 아래 눈에 떨어진 배지는 사진 속 배지와 같은 문양이에요. 산장 전경에서 현재 파울의 재킷을 보면 배지가 없어요. 요한도 옛 사진에서는 같은 배지를 달고 있으므로 문양만으로 소유자를 가릴 수는 없어요. 현재 파울의 옷까지 대조할 때, 배지가 요한의 추락 현장에 파울을 연결하는 단서가 돼요."
      },
      {
        title: "장부의 이름을 편지와 비교해요",
        image: "alpine-lodge/reception.jpg",
        alt: "12월 24일 기록과 객실 열쇠가 놓인 접수대",
        text: "장부에는 마라와 빅터 외에 104호의 ‘플뤼겔 글로케’가 적혀 있어요. 그 이름은 편지에 남은 서명 조각과 함께 볼 단서예요. 장부만으로 104호를 사용한 사람의 신원까지 특정할 수는 없어요."
      },
      {
        title: "안부 편지에 숨은 지령",
        image: "alpine-lodge/letter.png",
        alt: "벤치에서 찾은 성탄 안부 편지",
        text: "편지 위아래의 짧은 표식을 잇고, 선에 걸치는 단어를 위에서부터 읽으면 평범한 안부 문장 사이에 도시를 겨냥한 지령이 숨어 있어요. 장부와 편지를 함께 보면 산장에서 벌어진 일이 매각 갈등보다 더 넓게 얽혀 있었음을 알 수 있어요."
      },
      {
        title: "파울을 지목하는 이유",
        image: "alpine-lodge/main.jpg",
        alt: "창가에 목사 파울이 서 있는 산장 전경",
        text: "파울은 작별 인사와 심방을 위해 산장을 방문해 하룻밤 묵었다고 했어요. 그런 방문 경위와 별개로, 옛 사진과 현재의 옷, 추락 현장의 배지가 파울을 베란다에 연결해요. 이야기는 파울이 베란다에서 요한을 추락시킨 것으로 재구성할 수 있어요. 구체적인 동기와 추락 직전의 행동은 도판에 남은 단서로 확인되는 범위까지만 설명할 수 있어요."
      }
    ]
  },
  clues: [
    { title: "왼쪽 서랍장", image: "alpine-lodge/drawer.jpg", action: "서랍장 살펴보기", mapLabel: "서랍장", position: [3, 61] },
    { title: "탁자 위 지도", image: "alpine-lodge/map.png", action: "지도 살펴보기", mapLabel: "지도", position: [25, 67] },
    { title: "용의자 증언", image: "alpine-lodge/witnesses.png", action: "증언 확인하기", mapLabel: "증언", position: [70, 53] },
    { title: "베란다 전경", image: "alpine-lodge/veranda.jpg", action: "베란다 살펴보기", mapLabel: "베란다", position: [56, 32] },
    { title: "벽난로 사진", image: "alpine-lodge/fireplace.jpg", action: "벽난로 사진 보기", mapLabel: "사진", position: [19, 28] },
    { title: "카펫 아래 바닥", image: "alpine-lodge/carpet.jpg", action: "카펫 살펴보기", mapLabel: "카펫", position: [60, 82] },
    { title: "산장 접수대", image: "alpine-lodge/reception.jpg", action: "접수대 살펴보기", mapLabel: "접수대", position: [7, 85] },
    { title: "벤치에서 찾은 편지", image: "alpine-lodge/letter.png", action: "의자 탐색하기", mapLabel: "의자", position: [16, 77] }
  ]
};
