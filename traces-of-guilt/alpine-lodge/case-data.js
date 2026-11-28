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
    steps: [
      {
        title: "식사 뒤 거실에서 들린 언쟁",
        image: "alpine-lodge/witnesses.png", alt: "네 사람의 증언과 클라라가 언쟁을 들었다는 문장",
        frame: [5, 14, 90, 79], underlines: [[35.6, 27.6, 78, 27.6]],
        text: "클라라는 식사 뒤 남자들이 언쟁하는 소리를 들었어요. 사건과 관련된 언쟁이라면 빅터와 파울을 먼저 살펴볼 수 있어요."
      },
      {
        title: "마라가 들은 빅터의 통화",
        image: "alpine-lodge/witnesses.png", alt: "빅터가 낮은 감정가와 약속한 몫을 이야기했다는 마라의 증언",
        frame: [6, 34, 88, 19], underlines: [[9.6, 39.8, 64.3, 39.8], [9.6, 42.3, 50.8, 42.3]],
        text: "마라는 빅터가 산장을 싸게 감정해 주고 그 대가로 돈을 받기로 했다는 통화를 들었어요."
      },
      {
        title: "빅터는 요한과 자주 다퉜어요",
        image: "alpine-lodge/witnesses.png", alt: "감정가로 다퉜지만 시각은 기억나지 않는다는 빅터의 증언",
        frame: [6, 54, 88, 19], underlines: [[46, 64.9, 77.2, 64.9], [29.8, 67.35, 72, 67.35]],
        text: "빅터는 감정이 객관적이었다고 주장했어요. 요한과 여러 번 다퉜지만, 클라라가 들은 언쟁이 그 다툼이었는지는 알 수 없어요."
      },
      {
        title: "파울이 밝힌 방문 이유",
        image: "alpine-lodge/witnesses.png", alt: "작별 인사를 하러 산장에 왔다는 파울의 증언",
        frame: [6, 74, 88, 19], underlines: [[9.6, 84.3, 45.3, 84.3]],
        text: "파울은 작별 인사를 하러 왔다고 했어요. 이 증언에선 요한과 다툴 이유가 드러나지 않아요."
      },
      {
        title: "클라라가 아버지와 다툰 이유",
        image: "alpine-lodge/witnesses.png", alt: "산장을 팔고 도시로 가자고 했다는 클라라의 증언",
        frame: [6, 14, 88, 19], underlines: [[29.8, 22.4, 89.2, 22.4]],
        text: "클라라는 아버지와 산장 매각 문제로 다퉜어요. 저녁 언쟁에 주목하면 확인할 사람은 빅터와 파울이에요."
      },
      {
        title: "교회 앞에 선 두 사람",
        image: "alpine-lodge/solution/church-photo.png", alt: "벽난로 오른쪽 액자 속 젊은 요한과 파울",
        frame: [0, 0, 100, 100], circles: [[50, 38.1, 4.3, 5.45]],
        text: "옛 사진 속 요한과 파울은 같은 교회 앞에 나란히 서 있어요. 두 사람은 오래전부터 알고 지냈어요."
      },
      {
        title: "종탑과 배지의 문양",
        image: "alpine-lodge/solution/church-photo.png", alt: "젊은 요한과 파울의 배지와 교회 종탑 문양",
        frame: [21, 30, 77, 61], circles: [[50, 38.1, 4.3, 5.45], [36.8, 76.1, 2.5, 3.2], [85.1, 71.8, 2.5, 3.2]],
        text: "두 사람의 옷에 달린 배지에는 교회 종탑과 같은 ‘날개 달린 종’ 문양이 있어요."
      },
      {
        title: "눈 위에 떨어진 배지",
        image: "alpine-lodge/solution/badge-detail.png", alt: "베란다 왼쪽 난간 밑 눈에 떨어진 배지",
        frame: [0, 0, 100, 100], circles: [[18.7, 48.3, 9.8, 8.3]],
        text: "베란다 왼쪽 난간 아래 눈 위에서 같은 문양의 배지가 발견됐어요."
      },
      {
        title: "파울의 옷에는 배지가 없어요",
        image: "alpine-lodge/main.png", alt: "옛 사진에서 배지가 달렸던 자리가 비어 있는 파울의 재킷",
        frame: [60.6, 42.7, 11.8, 14], circles: [[66.9, 50.45, 1.05, 1.38]],
        text: "옛 사진에서 배지가 달렸던 자리가 지금은 비어 있어요. 추락 현장에 떨어진 배지는 파울을 가리켜요."
      },
      {
        title: "번호가 없는 104호 자리",
        image: "alpine-lodge/drawer.png", alt: "두 줄의 서랍 중 104호 자리에만 번호가 없는 모습",
        frame: [11, 67, 77, 30], circles: [[25.4, 87.9, 4.15, 3.4]],
        text: "왼쪽 아래는 순서상 104호예요. 그 서랍에만 번호 대신 검은 사각형이 붙어 있어요."
      },
      {
        title: "열쇠 묶음에도 빠진 104호",
        image: "alpine-lodge/reception.png", alt: "101호, 102호, 103호, 105호, 106호 접수대 열쇠",
        frame: [33.5, 3, 21, 18], circles: [[43.7, 12.2, 7.7, 6.9]],
        text: "접수대 열쇠 다섯 개 중 104호만 빠져 있어요. 서랍장과 열쇠 묶음에서 같은 번호가 사라졌어요."
      },
      {
        title: "부러진 난간의 핏자국",
        image: "alpine-lodge/veranda.png", alt: "베란다의 부러진 난간 기둥에 묻은 피",
        frame: [37, 50.4, 25, 19.5], circles: [[42.1, 60.4, 2.15, 4.75]],
        text: "난간에는 피가 묻어 있어요. 요한이 추락하기 전에 이미 다쳤는지 확인할 단서가 더 필요해요."
      },
      {
        title: "벽난로 안의 검게 탄 흔적",
        image: "alpine-lodge/fireplace.png", alt: "벽난로 오른쪽 장작 옆의 검게 탄 흔적",
        frame: [54.1, 82.5, 17.5, 17.5], circles: [[62.9, 93.9, 2.4, 1.65]],
        text: "장작 오른쪽에 손가락처럼 보이는 검게 탄 흔적이 있어요."
      },
      {
        title: "두 흔적은 어떻게 이어질까요?",
        comparison: [
          {
            image: "alpine-lodge/solution/drawer-detail.png", alt: "104호 서랍 황동판에 붙은 사각형", label: "104호 서랍",
            frame: [0, 0, 100, 100], circles: [[54.25, 56.5, 10.55, 8.5]]
          },
          {
            image: "alpine-lodge/fireplace.png", alt: "벽난로 안쪽의 검게 탄 흔적", label: "벽난로 흔적",
            frame: [54.1, 82.5, 17.5, 17.5], circles: [[62.9, 93.9, 2.4, 1.65]]
          }
        ],
        question: true,
        text: "번호 대신 붙은 검은 사각형은 무슨 장치일까요? 역할을 알면 벽난로의 흔적도 이해할 수 있어요."
      },
      {
        title: "검은 사각형의 정체",
        image: "alpine-lodge/solution/drawer-detail.png", alt: "열쇠 구멍 옆 검은 지문 인식부",
        frame: [0, 0, 100, 100], circles: [[54.25, 56.5, 10.55, 8.5]],
        text: "사각형은 지문 인식부예요. 104호 서랍의 잠금장치는 산장 주인 요한과 연결돼 있었어요."
      },
      {
        title: "교회 장식에 숨은 열쇠",
        image: "alpine-lodge/solution/ornament-detail.png", alt: "황동 교회의 종 문양 위에 숨은 열쇠",
        frame: [7, 9, 63, 63], circles: [[33, 48.4, 12, 4.25]],
        text: "황동 장식의 종 문양 위에 열쇠가 숨어 있어요. 산장 주인 요한과 그의 오랜 지인 파울이 이곳을 잘 알았어요."
      },
      {
        title: "깨진 판자 밑에 켜진 글자",
        image: "alpine-lodge/solution/carpet-detail.png", alt: "카펫 아래 깨진 판자 틈의 ENTRIEGELT 표시",
        label: "ENTRIEGELT · 잠금 해제", frame: [10, 16, 74, 74], circles: [[44.7, 46.95, 11.35, 5.1]],
        text: "‘ENTRIEGELT’는 ‘잠금 해제’예요. 비상용품 칸 아래에 잠금장치가 달린 비밀칸이 있었어요."
      },
      {
        title: "비밀칸에서 찾던 것",
        image: "alpine-lodge/fireplace.png", alt: "벽난로 위 오른쪽의 고리 달린 도구",
        frame: [12.6, 25.1, 32, 32], circles: [[31.3, 41.3, 2.2, 13.0]],
        text: "벽난로 위 오른쪽 도구와 깨진 판자가 눈에 띄어요. 열린 비밀칸에서 무엇을 찾으려 했는지는 편지에 나와요."
      },
      {
        title: "편지 가운데에 숨은 문장",
        image: "alpine-lodge/letter.png", alt: "편지에서 세로 접힘에 걸치는 열 단어에 그어진 붉은 밑줄",
        frame: [27, 15.5, 45.5, 43.5],
        underlines: [
          [48.5, 19.8, 52, 19.8], [47.9, 23.55, 51.4, 23.55],
          [47.6, 27.3, 51.2, 27.3], [49.8, 31.05, 53.3, 31.05],
          [48.7, 34.8, 52.3, 34.8], [49.1, 38.55, 52.6, 38.55],
          [48.2, 42.3, 51.75, 42.3], [48.7, 46.05, 52.3, 46.05],
          [46.85, 49.8, 50.45, 49.8], [47.9, 53.55, 51.55, 53.55]
        ],
        text: [
          "‘내년’과 ‘주렁주렁’ 뒤의 간격이 넓어요. 가운데 접힌 선에 걸치는 단어를 차례로 읽어요.",
          "내일 도시 목표 실행 / 오늘 재료 준비 / 날개 달린 열쇠"
        ]
      },
      {
        title: "번진 서명과 장부의 이름",
        comparison: [
          {
            image: "alpine-lodge/letter.png", alt: "편지 서명에 남은 gel과 ke", label: "편지의 서명",
            frame: [53.7, 65, 17.8, 14.1], circles: [[62.3, 72, 1.65, 1.8], [68.6, 72, 1.43, 1.8]]
          },
          {
            image: "alpine-lodge/reception.png", alt: "12월 24일 장부에 적힌 플뤼겔 글로케", label: "12월 24일 장부",
            frame: [35, 41.8, 27.4, 21.7], underlines: [[39.8, 54.4, 46.6, 54.4]]
          }
        ],
        text: "서명에 남은 ‘gel’과 ‘ke’와 맞는 이름은 12월 24일 장부의 ‘플뤼겔 글로케’예요."
      },
      {
        title: "비어 있는 104호 퇴실 칸",
        image: "alpine-lodge/reception.png", alt: "104호의 금일 퇴실예정과 비어 있는 입·퇴실 칸",
        frame: [43.5, 43, 18.5, 19.2], underlines: [[54.4, 54.4, 60.45, 54.4]],
        circles: [[52.1, 53.2, 1.72, 1.65]],
        text: "‘퇴실’은 물건을 확보해 전달까지 마쳤다는 표시예요. 폭설로 전달하지 못해 퇴실 칸이 비어 있어요."
      },
      {
        title: "플뤼겔 글로케의 뜻",
        image: "alpine-lodge/reception.png", alt: "인터넷에서 검색할 한글 이름 플뤼겔 글로케",
        label: "Flügel · 날개 / Glocke · 종", frame: [35.1, 45.1, 15.8, 15],
        underlines: [[39.8, 54.4, 46.6, 54.4]],
        text: "‘플뤼겔 글로케’를 인터넷에 검색하면 독일어 표기 Flügel Glocke를 찾을 수 있어요. 이 이름은 ‘날개 달린 종’을 가리켜요."
      },
      {
        title: "종탑에서 다시 만난 이름",
        image: "alpine-lodge/solution/church-photo.png", alt: "옛 사진 속 종탑의 날개 달린 종 문양",
        frame: [38.6, 24, 22.8, 24], circles: [[50, 38.1, 4.3, 5.45]],
        text: "옛 사진 속 교회 종탑에도 날개 달린 종이 있어요. 장부의 이름이 바로 이 문양을 가리켜요."
      },
      {
        title: "지도에서 붉게 표시된 도시",
        image: "alpine-lodge/map-closeup.png", alt: "인근 도시 옆 붉은 표식이 원으로 강조된 지도",
        frame: [25, 20, 73, 73.5], circles: [[82.2, 76.4, 3.7, 4.65]],
        text: "편지와 지도를 대조하면 조직이 25일에 인근 도시를 겨냥했고, 필요한 물건을 산장에 숨겨뒀음을 알 수 있어요."
      },
      {
        title: "같은 조직에 속한 두 사람",
        image: "alpine-lodge/solution/church-photo.png", alt: "같은 날개 달린 종 배지를 단 요한과 파울",
        frame: [21.5, 59.5, 77, 30], circles: [[36.8, 76.1, 2.5, 3.2], [85.1, 71.8, 2.5, 3.2]],
        text: "조직의 이름과 두 사람의 배지가 맞아떨어져요. 요한과 파울은 모두 ‘날개 달린 종’의 일원이었어요."
      },
      {
        title: "클라라가 꿈을 펼치고 싶었던 도시",
        image: "alpine-lodge/witnesses.png", alt: "도시에서 디자이너로 일하고 싶다는 클라라의 증언",
        frame: [26.5, 15.5, 67, 15.7], underlines: [[54.5, 22.36, 89.2, 22.36], [29.8, 24.85, 32.5, 24.85]],
        text: "그 도시는 클라라가 디자이너로 일하고 싶어 한 곳이에요. 요한이 지령을 거부한 이유가 여기에 있어요."
      },
      {
        title: "산장에 찾아온 파울",
        image: "alpine-lodge/main.png", alt: "산장 창가의 파울과 그 뒤에서 보이는 부러진 베란다 난간",
        frame: [58, 38, 19.5, 30], circles: [[65.3, 55.8, 4.1, 12.3]],
        text: "요한이 물건을 넘기지 않자 파울은 산장에 와서 그를 추궁했어요. 파울은 베란다에서 요한을 밀었어요."
      }
    ],
    story: [
      "요한 켈러와 파울 슈타이너는 오랫동안 같은 교회에 다녔고, 교회의 문양을 쓰는 비밀 조직 ‘날개 달린 종’에도 함께 속해 있었어요. 조직은 12월 25일에 인근 도시를 공격할 계획을 세웠고, 요한에게 산장에 숨겨둔 물건을 24일까지 넘기라는 지령을 보냈어요. 겉보기엔 성탄 인사였지만 편지 가운데에 지시가 숨어 있었어요. 장부의 104호는 임무를 기록하는 자리였고, ‘퇴실’은 물건의 확보와 전달이 모두 끝났다는 뜻이었어요.",
      "요한의 딸 클라라는 스키 강사 일을 그만두고 그 도시에서 디자이너로 일하고 싶어 했어요. 요한은 산장을 팔자는 딸과 다퉜지만, 딸이 꿈을 펼치려는 도시를 공격하는 일에는 협조하지 않기로 했어요. 그는 산장 비밀칸에 보관하던 물건을 넘기지 않았어요.",
      "24일 저녁, 파울은 작별 인사를 하러 왔다며 산장에 들어왔어요. 저녁 식사가 끝난 뒤 파울은 거실에서 요한에게 왜 물건을 넘기지 않았는지 따졌어요. 방에 있던 클라라가 들은 남자들의 언쟁은 두 사람의 목소리였어요. 마라가 식사 전에 들은 빅터의 통화는 산장을 헐값에 사들이려는 별개의 거래였어요.",
      "요한은 끝까지 협조를 거부했어요. 몸싸움 끝에 요한은 다친 채 베란다로 나왔고, 파울은 그를 난간 너머로 밀었어요. 요한은 아래 절벽으로 추락해 숨졌고, 파울의 옷에 달려 있던 배지는 베란다 난간 밑 눈 위로 떨어졌어요.",
      "그날 밤 파울은 비밀칸에 있던 물건을 확보했어요. 하지만 폭설로 산장 밖으로 이어지는 길이 막혀 전달할 수 없었어요. 그래서 104호 장부에는 예정만 남았어요. 다음 날 아침, 요한의 시신이 베란다 아래에서 발견됐어요."
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
