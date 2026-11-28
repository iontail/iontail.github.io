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
    explanation: "범인은 4번 용의자 파울 슈타이너예요. 베란다에 떨어진 배지는 파울을 추락 현장에 연결해요. 두 사람이 왜 그날 만났는지는 서랍장, 편지, 장부, 지도를 차례로 대조하면 드러나요.",
    steps: [
      {
        title: "저녁 식사 뒤, 거실에서 들린 언쟁",
        image: "alpine-lodge/witnesses.png",
        alt: "클라라, 마라, 빅터, 파울의 증언 전체",
        text: "클라라는 식사 뒤 방에서 쉬다가 거실에서 언쟁을 들었고, 남자들의 목소리 같았다고 했어요. 그 소리가 요한의 죽음과 관련 있다면, 먼저 두 남자 용의자인 빅터와 파울을 살펴볼 수 있어요."
      },
      {
        title: "마라가 들은 빅터의 통화",
        image: "alpine-lodge/witnesses.png",
        alt: "마라가 식사 전에 들은 통화에 대한 증언",
        label: "마라의 증언", origin: [42, 43], zoom: 1.12,
        text: "마라는 식사 전에 빅터가 통화하는 걸 들었어요. 빅터는 산장을 싸게 감정해 줄 테니 상대가 그 가격에 사들이고, 약속한 몫을 달라고 했어요. 낮은 감정가는 누군가와 미리 짠 거래였을 가능성이 있어요."
      },
      {
        title: "빅터와 요한은 여러 번 다퉜어요",
        image: "alpine-lodge/witnesses.png",
        alt: "낮은 감정가와 요한의 반발을 설명하는 빅터의 증언",
        label: "빅터의 증언", origin: [60, 69], zoom: 1.12,
        text: "빅터는 객관적인 기준으로 감정했다고 주장했어요. 요한은 35년을 살아온 산장을 헐값에 평가했다고 반발했고, 빅터도 그날 가격 때문에 여러 번 부딪혔다고 인정했어요. 정확한 시각을 기억하지 못했으니 클라라가 저녁에 들은 언쟁이 빅터와 요한의 것이었는지는 확인할 수 없어요."
      },
      {
        title: "파울의 증언에는 갈등이 드러나지 않아요",
        image: "alpine-lodge/witnesses.png",
        alt: "산장에 온 이유와 하룻밤 묵은 경위를 말하는 파울의 증언",
        label: "파울의 증언", origin: [42, 96], zoom: 1.12,
        text: "파울은 요한과 오랫동안 같은 교회에 다녔고, 요한이 떠나기 전에 인사하려고 찾아왔다고 했어요. 식사 뒤에는 눈이 많이 내려 산장에서 묵었다고 했죠. 이 진술만으로 두 사람이 다툴 이유는 찾기 어려워요."
      },
      {
        title: "클라라가 서두른 이유는 도시였어요",
        image: "alpine-lodge/witnesses.png",
        alt: "아버지와 다툰 이유와 도시에서의 꿈을 밝히는 클라라의 증언",
        label: "클라라의 증언", origin: [60, 17], zoom: 1.12,
        text: "클라라는 산장을 팔고 도시로 나가 디자이너로 일하고 싶었어요. 서둘러 떠나자며 아버지와 다퉜지만, 그 말만으로 살인 동기를 설명하기는 어려워요. 클라라가 들은 남자들의 언쟁이 사건과 이어졌다고 보고, 빅터와 파울을 현장 단서와 대조해 봐요."
      },
      {
        title: "오래전부터 같은 교회에 다닌 두 사람",
        image: "alpine-lodge/fireplace.png",
        alt: "벽난로 오른쪽 액자 속 젊은 요한과 파울",
        origin: [89, 36], zoom: 2.85,
        text: "벽난로 오른쪽 사진에는 젊은 요한과 파울이 교회 앞에 나란히 서 있어요. 파울이 말한 오랜 인연을 사진에서도 확인할 수 있어요."
      },
      {
        title: "교회 문양과 같은 배지",
        image: "alpine-lodge/fireplace.png",
        alt: "옛 사진 속 두 사람의 가슴과 뒤편 교회의 문양",
        origin: [88, 41], zoom: 3.05,
        text: "사진 속 두 사람의 가슴을 보면 같은 배지가 달려 있어요. 배지에는 뒤편 교회에서 볼 수 있는 날개 달린 종 문양이 새겨져 있어요."
      },
      {
        title: "왼쪽 난간 밑에 떨어진 배지",
        image: "alpine-lodge/veranda.png",
        alt: "베란다 왼쪽 난간 아래 눈 위의 금속 배지",
        origin: [0, 77], zoom: 7.6, spot: [12.25, 67.5],
        text: "베란다 왼쪽 아래를 확대하면 눈 위에 작은 배지가 보여요. 옛 사진에서 확인한 문양과 일치해요. 이제 이 배지가 누구의 옷에서 떨어졌는지 살펴봐요."
      },
      {
        title: "지금 파울의 옷에는 배지가 없어요",
        comparison: [
          { image: "alpine-lodge/fireplace.png", alt: "옛 사진에서 배지를 달고 있는 파울", label: "옛 사진의 파울", origin: [100, 49], zoom: 4.25 },
          { image: "alpine-lodge/main.png", alt: "현재 배지가 보이지 않는 파울의 재킷", label: "현재의 파울", origin: [73, 48], zoom: 4.15 }
        ],
        text: "옛 사진에서 파울이 배지를 달았던 자리를 산장 전경에서 확인하면 지금은 비어 있어요. 떨어진 배지와 대조하면 두 남자 중 추락 현장에 연결되는 사람은 파울이에요. 그런데 파울은 왜 오랜 지인인 요한을 찾아왔을까요?"
      },
      {
        title: "104호 자리의 서랍만 모양이 달라요",
        image: "alpine-lodge/drawer.png",
        alt: "호실 번호 대신 검은 사각형이 있는 왼쪽 아래 서랍",
        origin: [24, 97], zoom: 2.4,
        text: "위쪽은 101호부터 103호, 아래쪽에는 105호와 106호가 있어요. 순서대로라면 104호인 왼쪽 아래 서랍에는 번호가 없고, 열쇠 구멍 오른쪽에 검은 사각형이 있어요."
      },
      {
        title: "접수대에도 104호 열쇠가 없어요",
        image: "alpine-lodge/reception.png",
        alt: "104호가 빠진 접수대의 객실 열쇠 묶음",
        origin: [62, 0], zoom: 2.2,
        text: "접수대 위쪽에는 101호, 102호, 103호, 105호, 106호 열쇠가 묶여 있어요. 104호만 빠져 있다는 사실은 서랍장의 빈 번호와 맞아떨어져요. 이 두 단서만으로는 104호가 어떤 곳인지 알기 어려워요."
      },
      {
        title: "부러진 난간에 남은 핏자국",
        image: "alpine-lodge/veranda.png",
        alt: "베란다에서 부러진 난간과 기둥에 묻은 피",
        origin: [48, 67], zoom: 2.65,
        text: "추락 지점의 난간에 피가 묻어 있어요. 난간에 닿기 전에 이미 다친 곳이 있었다면 설명할 수 있는 흔적이에요. 요한이 언제 다쳤는지 다른 장면에서 단서를 찾아봐요."
      },
      {
        title: "벽난로에 남은 흔적",
        image: "alpine-lodge/fireplace.png",
        alt: "벽난로 안쪽 오른편에 남아 있는 검게 탄 흔적",
        origin: [69, 100], zoom: 4.3,
        text: "장작 오른쪽에 손가락처럼 보이는 검게 탄 흔적이 있어요. 난간의 핏자국과 함께 보면 요한이 추락하기 전에 다쳤을 가능성이 생겨요. 이 흔적은 왜 벽난로 안에 있을까요?"
      },
      {
        title: "벽난로의 흔적과 사각형의 관계",
        comparison: [
          { image: "alpine-lodge/drawer.png", alt: "104호 위치의 열쇠 구멍 옆 검은 사각형", label: "104호 자리의 서랍", origin: [20, 97], zoom: 4.5 },
          { image: "alpine-lodge/fireplace.png", alt: "장작 오른쪽에 남은 검게 탄 흔적", label: "벽난로 속 흔적", origin: [69, 100], zoom: 4.3 }
        ],
        question: true,
        text: "번호가 없는 서랍에는 검은 사각형이 있고, 벽난로에는 손가락처럼 보이는 흔적이 남아 있어요. 사각형이 어떤 역할을 하는지 알아야 두 단서가 왜 함께 놓였는지 설명할 수 있어요."
      },
      {
        title: "사각형은 지문 인식부였어요",
        image: "alpine-lodge/drawer.png",
        alt: "번호가 빠진 서랍의 황동판과 검은 사각형",
        origin: [20, 96], zoom: 5, spot: [52.5, 62.5],
        text: "104호 자리의 검은 사각형은 지문 인식부예요. 겉보기에는 객실 열쇠용 서랍이지만 이 칸에는 별도의 잠금장치가 있었어요. 벽난로의 흔적과 함께 보면 누군가가 산장 주인 요한에게 접근해야 했던 이유를 짐작할 수 있어요."
      },
      {
        title: "교회 장식에 숨은 작은 열쇠",
        image: "alpine-lodge/drawer.png",
        alt: "서랍장 위 황동 교회 장식에서 보이는 작은 열쇠",
        origin: [31, 60], zoom: 3.45,
        text: "서랍장 위 황동 교회 장식을 자세히 보면 작은 열쇠가 보여요. 낯선 손님이 지나가면서 알아보기 어려운 자리예요. 산장 주인 요한은 그 위치를 알았을 가능성이 높고, 오랜 지인 파울도 어디에 있는지 알 만한 사람이에요."
      },
      {
        title: "깨진 나무 틈에서 읽히는 글자",
        image: "alpine-lodge/carpet.png",
        alt: "카펫 아래 수납공간 앞쪽의 깨진 판자와 잠금 해제 표시",
        label: "ENTRIEGELT · 잠금 해제", origin: [57, 81], zoom: 5.2, spot: [45, 55],
        text: "깨진 판자 틈에 독일어 표시 ‘ENTRIEGELT’가 보여요. 뜻은 ‘잠금 해제’예요. 평범한 비상용품 수납공간 아래에 잠금장치가 달린 비밀칸이 더 있었던 거예요."
      },
      {
        title: "비밀칸에서 무엇이 사라졌을까요?",
        comparison: [
          { image: "alpine-lodge/fireplace.png", alt: "벽난로 위 도구 두 개 가운데 오른쪽 도구", label: "벽난로 위 오른쪽 도구", origin: [27, 40], zoom: 3.7 },
          { image: "alpine-lodge/carpet.png", alt: "카펫 아래 수납공간 앞쪽의 깨진 판자", label: "비밀칸 앞 깨진 판자", origin: [57, 81], zoom: 3.6 }
        ],
        text: "벽난로 위 오른쪽 도구와 비밀칸 앞의 파손 흔적을 함께 살펴봐요. 잠금이 풀렸다는 표시까지 있으니, 누군가 비밀칸에 접근해 물건을 가져갔을 가능성이 있어요. 그 물건이 왜 중요했는지는 편지에서 실마리가 나와요."
      },
      {
        title: "편지 가운데를 따라 읽어요",
        image: "alpine-lodge/letter.png",
        alt: "편지의 위아래 표식을 세로선으로 이은 모습",
        guide: [50, 17, 54],
        text: "평범한 안부 편지처럼 읽히지만 ‘내년’과 ‘목표’ 사이, ‘주렁주렁’과 ‘달린’ 사이가 유난히 넓어요. 일부 단어를 가운데에 맞추려고 벌린 간격이에요. 위아래 접힘 표식을 잇고 선에 걸친 어절을 위에서부터 읽으면 ‘내일 도시 목표 실행 / 오늘 재료 준비 / 날개 달린 열쇠’가 나와요."
      },
      {
        title: "남은 서명 조각을 장부와 대조해요",
        comparison: [
          { image: "alpine-lodge/letter.png", alt: "번진 서명에서 읽히는 gel과 ke", label: "편지의 불완전한 서명", origin: [68, 74], zoom: 4.35 },
          { image: "alpine-lodge/reception.png", alt: "12월 24일자 플뤼겔 글로케의 104호 기록", label: "12월 24일 숙박 장부", origin: [49, 55], zoom: 4 }
        ],
        text: "편지의 서명은 번져 있지만 앞 단어 끝의 ‘gel’과 뒤 단어 끝의 ‘ke’는 남아 있어요. 12월 24일자 장부 이름 중 두 조각에 모두 들어맞는 건 ‘플뤼겔 글로케(Flügel Glocke)’예요."
      },
      {
        title: "104호에는 퇴실 예정만 남아 있어요",
        image: "alpine-lodge/reception.png",
        alt: "플뤼겔 글로케, 104호, 금일 퇴실예정이 적힌 행",
        origin: [53, 54], zoom: 3.35,
        text: "플뤼겔 글로케의 객실은 수상한 104호예요. 기록 날짜인 24일에 퇴실할 예정이었지만, 조사하는 25일 아침까지 장부에 퇴실 표시가 없어요. 실제로 방을 떠났는지는 장부만으로 확인할 수 없어요."
      },
      {
        title: "플뤼겔 글로케는 ‘날개 달린 종’을 가리켜요",
        image: "alpine-lodge/reception.png",
        alt: "숙박 장부에 적힌 이름 플뤼겔 글로케",
        label: "Flügel · 날개 / Glocke · 종", origin: [49, 55], zoom: 4,
        text: "독일어 Flügel은 ‘날개’, Glocke는 ‘종’이에요. 두 단어를 합친 이 사건의 이름은 ‘날개 달린 종’을 가리켜요. 산장에서 이미 이 모양을 본 적이 있어요."
      },
      {
        title: "이름과 교회 문양이 일치해요",
        comparison: [
          { image: "alpine-lodge/fireplace.png", alt: "옛 사진 속 교회 종탑의 날개 달린 종 문양", label: "교회 종탑", origin: [85, 35], zoom: 5 },
          { image: "alpine-lodge/drawer.png", alt: "황동 교회 모형의 날개 달린 종 문양", label: "산장의 황동 장식", origin: [34, 55], zoom: 4.6 }
        ],
        text: "벽난로 옛 사진 속 교회 종탑과 산장의 황동 장식에 날개 달린 종이 보여요. 장부의 이름과 편지의 서명은 파울과 요한이 함께 다니던 교회의 문양을 가리켜요."
      },
      {
        title: "붉은 표식이 향하는 곳은 인근 도시",
        image: "alpine-lodge/map-closeup.png",
        alt: "산장 지도에서 인근 도시를 가리키는 붉은 표시",
        origin: [95, 91], zoom: 1.29,
        text: "지도에서 붉은 표식이 향하는 곳은 인근 도시예요. 편지의 날짜는 24일이니 ‘내일 도시 목표 실행’은 25일을 가리켜요. 지도와 편지를 함께 읽으면 ‘날개 달린 종’이 도시를 겨냥한 계획을 세웠고, 그 계획에 필요한 물건을 24일까지 준비하라는 지시를 남겼음을 알 수 있어요. 잠금이 풀린 비밀칸은 그 물건이 산장에 숨겨져 있었을 가능성을 보여줘요."
      },
      {
        title: "같은 문양이 파울과 요한을 연결해요",
        image: "alpine-lodge/fireplace.png",
        alt: "같은 문양의 배지를 단 젊은 요한과 파울",
        origin: [88, 41], zoom: 3.05,
        text: "편지에 이름을 남긴 조직과 두 사람이 단 배지는 같은 문양을 써요. 여기에 104호 기록과 산장의 비밀칸을 함께 보면, 파울과 요한이 그 문양을 쓰는 조직의 일원이었다는 해석이 가능해요."
      },
      {
        title: "도시는 클라라가 꿈꾸던 곳이었어요",
        image: "alpine-lodge/witnesses.png",
        alt: "도시에서 디자이너로 일하고 싶다고 한 클라라의 증언",
        label: "클라라의 증언", origin: [60, 17], zoom: 1.12,
        text: "클라라는 인근 도시에서 디자이너로 일하고 싶었어요. 처음에는 그 꿈이 부녀가 다툰 이유로 보였죠. 편지와 지도를 읽고 나면 같은 꿈이 요한이 도시를 겨냥한 계획에 협조하지 않았을 이유가 돼요."
      },
      {
        title: "파울이 찾아온 진짜 이유",
        comparison: [
          { image: "alpine-lodge/main.png", alt: "산장 전경 속 파울 슈타이너", label: "4번 용의자 파울", origin: [72, 51], zoom: 2.85 },
          { image: "alpine-lodge/veranda.png", alt: "베란다의 파손된 난간과 추락 지점", label: "요한이 추락한 베란다", origin: [48, 67], zoom: 2.65 }
        ],
        text: "요한은 조직에 물건을 넘기라는 요구를 받았지만, 딸이 꿈을 펼치려던 도시가 위험해지자 협조를 거부했을 가능성이 커요. 파울은 전달이 이뤄지지 않자 직접 산장에 와 요한을 추궁했고, 베란다에서 요한을 추락시켰어요. 현장의 배지는 파울을, 편지와 지도는 두 사람이 대립한 이유를, 잠금이 풀린 비밀칸은 파울이 산장에서 찾으려 한 것을 가리켜요."
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
