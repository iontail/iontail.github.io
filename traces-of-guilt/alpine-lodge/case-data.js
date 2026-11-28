export const alpineLodge = {
  title: "알프스 산장의 비밀",
  scene: {
    title: "산장 전경",
    period: "알프스 산장",
    image: "alpine-lodge/main.png",
    description: [
      "알프스 산장의 주인 요한 켈러가 베란다 아래 절벽 밑에서 숨진 채 발견됐습니다. 베란다에서 추락한 것으로 보입니다. 요한은 전날 저녁부터 모습을 보이지 않았고, 밤새 내린 눈에 산장으로 이어지는 길이 막혔습니다.",
      "산장에는 요한의 딸이자 스키 강사인 클라라 켈러, 번역가 마라 바이스, 부동산 감정평가사 빅터 하르트, 마을 교회 목사 파울 슈타이너가 남아 있습니다."
    ],
    objective: "산장 안팎을 살피고 네 사람의 증언을 대조해 전날 저녁에 무슨 일이 있었는지 알아보세요."
  },
  hints: [
    "벽난로 사진 속 인물들을 살펴보세요. 누가 함께 찍혔고, 어떤 관계였을까요?",
    "베란다 사진 속 울타리와 눈을 자세히 살펴 단서를 찾아보세요. 요한을 밀어 떨어뜨렸다면, 울타리에 핏자국은 왜 남았을까요? 발견한 흔적을 다른 단서들과 함께 놓고 생각해 보세요.",
    "편지에 띄어쓰기가 유난히 넓은 곳이 있어요. 작성자가 특정 단어를 가운데에 놓으려고 한 건 아닐까요? 그 배치를 단서로 편지를 다시 읽어 보세요.",
    "편지를 보낸 사람의 이름을 접수대 장부에 적힌 이름과 대조해 보세요."
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
    explanation: "정답은 4번 용의자 파울 슈타이너예요. 베란다 난간과 눈 위의 배지로 추락 현장을 살피고, 벽난로 사진과 현재 파울의 옷을 대조하면 그를 현장에 연결할 수 있어요. 숙박 장부와 편지는 산장 안에서 또 다른 일이 진행되고 있었음을 보여줘요.",
    steps: [
      {
        title: "시간대를 먼저 좁혀요",
        image: "alpine-lodge/main.png",
        alt: "사건 다음 날 아침의 산장 전경",
        text: "요한은 전날 저녁부터 모습을 보이지 않다가 베란다 아래 절벽 밑에서 발견됐어요. 접수대 장부의 마지막 기록과 의자에 끼워진 편지에는 12월 24일이 적혀 있어요. 두 자료를 함께 보면 우리가 조사하는 산장 장면은 성탄절 아침이고, 돌아봐야 할 시간은 전날 저녁이에요."
      },
      {
        title: "클라라와 빅터에게도 갈등이 있었어요",
        image: "alpine-lodge/witnesses.png",
        alt: "네 사람의 증언이 적힌 도판",
        text: "클라라는 아버지에게 산장을 팔고 도시로 떠나자고 했다가 다퉜어요. 빅터의 낮은 감정가도 요한의 반발을 샀고, 마라는 빅터가 낮게 감정해 주는 대가로 수익금을 요구하는 통화를 들었다고 했어요. 이 증언은 두 사람을 의심할 이유를 보여주지만, 추락이 일어난 곳과 연결하려면 별도의 흔적이 필요해요."
      },
      {
        title: "마라가 들은 목소리의 범위를 확인해요",
        image: "alpine-lodge/witnesses.png",
        alt: "마라와 파울의 진술이 포함된 용의자 증언",
        origin: [51, 39],
        zoom: 1.75,
        text: "마라는 저녁 식사 뒤에 거실에서 남자들의 언쟁을 들은 것 같다고 말했어요. 그녀가 들은 건 목소리였고, 그 인물들이 베란다까지 갔는지는 보지 못했어요. 파울은 요한을 찾아왔다가 폭설로 묵었다고 했어요. 각 진술이 확인해 주는 장소와 시간을 구분하면 누가 추락 현장에 있었는지 확인할 단서가 필요하다는 걸 알 수 있어요."
      },
      {
        title: "두 사진에서 인물들의 관계가 보여요",
        comparison: [
          { image: "alpine-lodge/fireplace.png", alt: "스키장에서 함께 찍힌 요한, 클라라, 파울과 뒤쪽의 빅터", label: "스키장 사진", origin: [47, 42], zoom: 3.12 },
          { image: "alpine-lodge/fireplace.png", alt: "교회 앞에 나란히 선 젊은 요한과 파울", label: "교회 앞 사진", origin: [89, 36], zoom: 2.85 }
        ],
        text: "스키장 사진의 앞줄에는 요한, 클라라, 파울이 있고 뒤쪽에는 빅터가 지나가요. 교회 앞에서 찍은 옛 사진에는 젊은 요한과 파울이 나란히 서 있어요. 파울은 이번에 처음 찾아온 손님이 아니라 요한의 오랜 지인이었어요. 옛 사진에 있는 두 사람의 가슴과 교회 종탑을 더 자세히 보면 같은 종 문양이 보여요."
      },
      {
        title: "부서진 난간과 핏자국",
        image: "alpine-lodge/veranda.png",
        alt: "베란다 가운데 파손된 난간과 기둥의 핏자국",
        origin: [48, 67],
        zoom: 2.65,
        text: "베란다 가운데 난간이 부러져 있고, 기울어진 기둥에 핏자국이 남아 있어요. 시신이 발견된 절벽과 이어지는 곳이라 요한이 어디서 추락했는지 좁힐 수 있어요. 이 흔적을 발견한 다음에는 난간만 보지 말고 눈 덮인 바닥도 살펴봐야 해요."
      },
      {
        title: "눈 위의 작은 금속 물건",
        image: "alpine-lodge/veranda.png",
        alt: "왼쪽 난간 밑 눈 위의 작은 금속 배지",
        origin: [0, 77],
        zoom: 7.6,
        spot: [12.25, 67.5],
        text: "베란다 왼쪽 난간 아래, 눈 위에 푸른 금속 배지가 떨어져 있어요. 배지의 날개 달린 종은 벽난로 옛 사진과 교회 종탑에서 본 문양이에요. 눈에 묻힌 작은 배지가 추락 장소와 사진 속 인물들을 이어 줘요."
      },
      {
        title: "요한과 파울 모두 같은 배지를 달았어요",
        image: "alpine-lodge/fireplace.png",
        alt: "교회 사진 속 요한과 파울의 가슴에 달린 종 배지",
        origin: [92, 52],
        zoom: 3.7,
        text: "교회 사진에는 두 사람 모두 배지를 달고 있어요. 그러니 문양을 찾은 다음에는 지금 파울이 입은 옷과 대조해야 해요. 이 비교가 현장에서 발견한 배지가 누구의 것인지 추리할 근거가 돼요."
      },
      {
        title: "떨어진 배지와 현재 파울의 옷을 대조해요",
        comparison: [
          { image: "alpine-lodge/veranda.png", alt: "베란다의 눈 위에 떨어진 배지", label: "베란다에 떨어진 배지", origin: [0, 77], zoom: 7.6, spot: [12.25, 67.5] },
          { image: "alpine-lodge/main.png", alt: "현재 파울의 배지가 보이지 않는 재킷", label: "현재 파울의 재킷", origin: [72, 51], zoom: 3.1 }
        ],
        text: "옛 사진에서 파울은 왼쪽 가슴에 배지를 달고 있지만, 지금 산장 전경의 재킷에서는 그 배지가 보이지 않아요. 파손된 난간과 핏자국으로 좁힌 추락 현장에 그 배지가 떨어져 있다는 점을 함께 보면, 네 용의자 중 파울을 베란다에 연결할 근거가 가장 뚜렷해요."
      },
      {
        title: "숙박 장부의 104호가 눈에 띄어요",
        image: "alpine-lodge/reception.png",
        alt: "숙박 장부 오른쪽의 104호 기록",
        origin: [54, 48],
        zoom: 3.05,
        text: "마라는 102호, 빅터는 103호에 입실한 것으로 적혀 있어요. 104호의 ‘플뤼겔 글로케’ 행에는 입·퇴실 표시가 비어 있고 ‘금일 퇴실예정’이라는 비고가 남아 있어요. 탁자 위에 펼쳐진 열쇠에도 104호 번호가 빠져 있어요. 이 객실 기록은 다른 단서에서 같은 이름이 다시 나오는지 살펴볼 이유가 돼요."
      },
      {
        title: "편지의 서명과 장부의 이름",
        comparison: [
          { image: "alpine-lodge/letter.png", alt: "편지 끝에 남은 서명 gel과 ke", label: "편지 끝의 서명", origin: [68, 74], zoom: 4.35 },
          { image: "alpine-lodge/reception.png", alt: "접수대 장부의 플뤼겔 글로케와 104호", label: "숙박 장부의 104호", origin: [49, 55], zoom: 4.0 }
        ],
        text: "의자에 끼워진 편지 끝에는 잉크가 번져 ‘gel’과 ‘ke’만 남아 있어요. 장부의 ‘플뤼겔 글로케’를 독일어로 적은 Flügel Glocke와 대조하면 남은 글자가 맞아요. 편지와 104호 기록은 같은 이름을 가리켜요. 그 이름을 실제로 누가 사용했는지는 장부에 적혀 있지 않아요."
      },
      {
        title: "편지에서 어느 단어를 읽을지 정해요",
        image: "alpine-lodge/letter.png",
        alt: "의자에 끼워진 편지의 본문 중앙",
        guide: [50, 17, 54],
        text: "편지 위아래의 짧은 표식 사이를 곧게 잇고, 선이 지나가는 단어 전체를 본문 위쪽부터 읽어요. ‘내일 도시 목표 실행 / 오늘 재료 준비 / 날개 달린 열쇠’가 순서대로 드러나요. 탁자 위 지도에서 산장 주변에 표시된 인근 도시는 한 곳이라, 편지의 ‘도시’를 지도 속 지명과 연결해 볼 수 있어요."
      },
      {
        title: "파울을 범인으로 지목해요",
        image: "alpine-lodge/main.png",
        alt: "산장 창가에서 실내를 바라보는 파울",
        origin: [71, 50],
        zoom: 2.85,
        text: "클라라와 빅터가 요한과 부딪힌 이유는 증언에서 드러나요. 마라의 말은 다툼이 있었을 시간대를 좁혀 줘요. 그 가운데 요한이 추락한 장소와 직접 연결되는 물건은 파울과 대조할 수 있는 배지예요. 그래서 사건의 정답은 파울 슈타이너예요. 편지와 장부는 산장의 숨은 사정을 보여주며, 무엇이 파울을 추락 사건으로 이끌었는지와 추락 직전의 정확한 행동은 여전히 추론의 영역이에요."
      }
    ]
  },
  clues: [
    { title: "탁자 위 지도", image: "alpine-lodge/map-closeup.png", action: "지도 살펴보기", mapLabel: "지도", position: [32, 67] },
    { title: "왼쪽 서랍장", image: "alpine-lodge/drawer.png", action: "서랍장 살펴보기", mapLabel: "서랍장", position: [3, 61] },
    { title: "용의자 증언", image: "alpine-lodge/witnesses.png", action: "증언 확인하기", mapLabel: "증언", position: [70, 53] },
    { title: "베란다 전경", image: "alpine-lodge/veranda.png", action: "베란다 살펴보기", mapLabel: "베란다", position: [56, 32] },
    { title: "벽난로 사진", image: "alpine-lodge/fireplace.png", action: "벽난로 사진 보기", mapLabel: "사진", position: [19, 28] },
    { title: "카펫 아래 바닥", image: "alpine-lodge/carpet.png", action: "카펫 살펴보기", mapLabel: "카펫", position: [60, 82] },
    { title: "산장 접수대", image: "alpine-lodge/reception.png", action: "접수대 살펴보기", mapLabel: "접수대", position: [7, 91] },
    { title: "의자에 끼워진 편지", image: "alpine-lodge/letter.png", action: "의자속 편지 탐색하기", mapLabel: "의자속 편지", position: [16, 77] }
  ]
};
