const illustrations = {
  scene: "planetarium/main.png?v=rehearsal-slide-handoff",
  testimonyA: "planetarium/witnesses-01.png?v=rehearsal-slide-handoff",
  testimonyB: "planetarium/witnesses-02.png?v=character-faces",
  schedule: "planetarium/schedule.png?v=clue-art-refresh",
  console: "planetarium/console.png?v=clue-art-refresh",
  photo: "planetarium/photo.png?v=clue-art-refresh",
  drawer: "planetarium/drawer.png?v=clue-art-refresh",
  proof: "planetarium/proof.png?v=desk-details"
};

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
    image: illustrations.scene
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
      image: illustrations.console,
      position: [2.25, 68.5]
    },
    {
      title: "목격자 증언 A",
      action: "증언 확인하기",
      mapLabel: "증언",
      image: illustrations.testimonyA,
      position: [4, 94.8]
    },
    {
      title: "목격자 증언 B",
      image: illustrations.testimonyB
    },
    {
      title: "연구소장실 서랍",
      action: "서랍 확인하기",
      mapLabel: "서랍",
      image: illustrations.drawer,
      position: [50, 93],
      align: "end",
      location: "office"
    },
    {
      title: "기사 교정쇄",
      action: "교정쇄 확인하기",
      mapLabel: "교정쇄",
      image: illustrations.proof,
      position: [57, 65],
      align: "end",
      location: "office"
    },
    {
      title: "리허설 진행표",
      action: "진행표 확인하기",
      mapLabel: "진행표",
      image: illustrations.schedule,
      position: [12.7, 36.7],
      compactPosition: [12.7, 37.7]
    },
    {
      title: "리허설 사진",
      action: "리허설 사진 보기",
      mapLabel: "사진",
      image: illustrations.photo,
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
      poster: illustrations.photo
    },
    cipher: {
      consonants: [
        ["square", 1, "ㄱㄴㄷㄹ"],
        ["triangle", 1, "ㅁㅂㅅㅇ"],
        ["diamond", 1, "ㅈㅊㅋㅌ"],
        ["circle", 1, "ㅍㅎ--"],
        ["square", 2, "ㄲ-ㄸ-"],
        ["triangle", 2, "-ㅃㅆ-"],
        ["diamond", 2, "ㅉ---"]
      ],
      vowels: [
        ["square", 1, "ㅏㅓㅗㅜ"],
        ["triangle", 1, "ㅡㅣㅐㅔ"],
        ["diamond", 1, "ㅘㅝㅚㅟ"],
        ["circle", 1, "ㅢ---"],
        ["square", 2, "ㅑㅕㅛㅠ"],
        ["triangle", 2, "--ㅒㅖ"],
        ["diamond", 2, "ㅙㅞ--"]
      ]
    },
    stepsTitle: "장면별 해설",
    steps: [
      {
        image: illustrations.schedule,
        alt: "19시 49분 리허설 A와 19시 56분 리허설 B가 적힌 진행표",
        crop: [1.7, "50% 67%"],
        title: "예정된 리허설 순서",
        text: "19시 49분에는 Ⅰ번으로 발견 전 사진을 띄우고, 19시 56분에는 Ⅱ번으로 발견 후 사진을 보여줄 예정이었어요. 화살표와 거리는 Ⅱ번 화면을 확인한 뒤에 표시하기로 했어요."
      },
      {
        image: illustrations.testimonyA,
        alt: "천장을 보고 리허설이 거의 끝났다고 생각한 마거릿의 증언",
        crop: [2.4, "0% 14%"],
        title: "마거릿이 본 것은 화살표",
        text: "마거릿은 천장을 보고 리허설이 거의 끝났다고 생각했어요. 화살표는 원래 후반에 나오는 표시였어요. 그때 천장에 어떤 사진이 떠 있었는지는 줄리언의 카메라 기록으로 확인할 수 있어요."
      },
      {
        image: illustrations.photo,
        alt: "명왕성 옆 화살표에 300 thou라고 표시된 리허설 사진",
        crop: [2.4, "48% 18%"],
        title: "카메라에 남은 화면",
        text: "줄리언의 사진에는 명왕성 옆에 화살표와 300 thou라는 표기가 찍혀 있어요. 화살촉 너머를 확대해 보면, 발견한 천체가 있어야 할 자리가 비어 있어요."
      },
      {
        image: illustrations.drawer,
        alt: "서랍의 관측 자료 대조표에 붙은 정상 인화물과 화살촉 너머의 광점",
        crop: [2.35, "80% 39%"],
        title: "정상 Ⅱ번 사진에는 광점이 있어요",
        text: "서랍의 대조표에 적힌 7,620 microns는 300 thou와 같은 거리예요. 정상 Ⅱ번 인화물에는 그 거리에 작은 광점이 있어요. 리허설 사진에서는 같은 위치에 그 빛이 보이지 않아요."
      },
      {
        image: illustrations.photo,
        alt: "화살표와 거리 표기가 떠 있는 교체 전 투영 화면",
        title: "표시와 슬라이드가 어긋났어요",
        text: "후반용 화살표와 거리가 잘못 들어간 슬라이드 위에 먼저 떴어요. 그래서 겉으로는 B 순서처럼 보였지만, 발견한 천체가 보여야 할 자리는 비어 있었어요."
      },
      {
        image: illustrations.testimonyA,
        alt: "소장에게서 제대로 된 1번을 가져오라는 말을 들은 리드의 증언",
        crop: [1.8, "100% 97%"],
        title: "리드가 객석 뒤로 간 이유",
        text: "첫 사진이 뜬 뒤 베넷의 설명을 듣던 리드는 소장이 “리드, 제대로 된 1번 가져와!”라고 외치는 것을 들었어요. 예정에 없던 요청을 받고 객석 뒤로 가서 Ⅰ번을 꺼낸 뒤, 통로 입구에서 소장에게 건넸어요."
      },
      {
        image: illustrations.scene,
        alt: "난간 옆 소장의 손에 남아 있는 슬라이드 두 장",
        crop: [5, "65% 96%"],
        title: "소장의 손에 남은 두 장",
        text: "소장은 정상 Ⅰ번을 받아 투영기 가까이 갔어요. 발견됐을 때 손에는 정상 Ⅰ번과 빼낸 슬라이드가 함께 있었어요. 두 장을 쥔 모습은 교체를 마치기 전에 쓰러졌다는 단서예요."
      },
      {
        image: illustrations.console,
        alt: "투영기 조작대의 회전 구동 레버와 울타리 안을 확인하라는 주의 문구",
        crop: [1.8, "100% 100%"],
        title: "조작대의 안전 문구",
        text: "조작대에는 작동 전에 울타리 안에 사람이 없는지 확인하라고 적혀 있어요. 소장이 교체를 위해 들어간 사이 장비가 움직였고, 마거릿은 급한 발소리 뒤에 충돌음을 들었어요."
      },
      {
        image: illustrations.drawer,
        alt: "후원금 결재와 장부 이관이 적힌 차기 운영 회의 안건",
        crop: [2, "36% 52%"],
        title: "마거릿은 운영권을 잃을 처지였어요",
        text: "에드워드는 발표가 끝나면 집을 나가고 운영 회의도 혼자 맡겠다고 했어요. 서랍의 회의 안건에는 결재권과 장부를 소장에게 넘긴다고 적혀 있어요. 마거릿은 충돌 직전 객석을 지나며 누군가 뛰어가는 소리를 들었다고 했어요."
      },
      {
        image: illustrations.drawer,
        alt: "P-07의 재계량 값 0.94 kg에 표시가 된 건판 반납 기록",
        crop: [2.5, "85% 78%"],
        title: "리드가 숨긴 건판",
        text: "리드가 반납한 P-07은 기록상 한 장이 들어 있어야 하지만, 실측값은 빈 케이스와 같은 0.94 kg이었어요. P-07은 폐기 예정 건판이에요. 리허설에서 리드는 정상 Ⅰ번을 건넨 뒤 객석 뒤에서 충돌음을 들었다고 했어요."
      },
      {
        image: illustrations.testimonyB,
        alt: "객석 통로에서 사진을 찍었고 소장실에 다시 가지 않았다는 줄리언의 증언",
        crop: [2.15, "96% 92%"],
        title: "줄리언의 카메라와 교정쇄",
        text: "줄리언은 교정쇄를 놓고 나온 뒤 객석 통로에서 천장을 찍었어요. 카메라를 내리기 전에 소리가 났다고 했고, 소장실에 다시 가지 않았다고 했어요. 사진에는 줄리언이 본 화면이 남아 있어요."
      },
      {
        image: illustrations.proof,
        alt: "줄리언 머서의 기자 이름과 To.로 시작하는 암호 편지",
        crop: [1.18, "58% 0%"],
        title: "수신인 이름으로 암호 풀기",
        text: "교정쇄의 기자 이름은 줄리언 머서예요. 편지의 To. 뒤에 그 이름을 대입해 보세요. 첫 글자 ‘줄’을 ㅈ·ㅜ·ㄹ로 나누면 각 문양을 어느 자모로 읽어야 할지 실마리를 얻을 수 있어요."
      },
      {
        image: illustrations.proof,
        alt: "기사 교정쇄 옆에 남은 문양 암호 편지",
        crop: [2.25, "98% 29%"],
        title: "편지에는 발견자를 바꾸라고 쓰여 있어요",
        text: "편지는 “발견자는 내 이름으로 바꿔. 일이 끝나면 네가 후원자에게 보낸 그 편지는 돌려주지.”라고 읽혀요. 소장이 기자의 과거를 이용해 기사 수정을 요구하려 했고, 그 지시는 책상 위에 남았어요."
      },
      {
        image: illustrations.proof,
        alt: "교정쇄 밑에 놓인 에드워드 헤일의 연임 심사 통지서",
        crop: [2.35, "80% 100%"],
        title: "소장이 공로를 원했던 이유",
        text: "연임 심사 통지서는 에드워드가 직접 주도한 연구 실적을 입증하라고 요구해요. 이 통지와 편지를 함께 읽으면, 베넷의 발견을 자기 실적으로 발표해 소장 자리를 지키려 했다는 정황이 드러나요."
      },
      {
        image: illustrations.testimonyB,
        alt: "암전 직전 소장을 봤고 충돌 때 스위치 앞이었다고 말한 베넷의 증언",
        crop: [2.35, "0% 18%"],
        title: "베넷의 증언에서 남는 의문",
        text: "베넷은 오후에 리드가 소장실에 들어갔을 때 소장이 부재중이었다고 했어요. 이날 소장을 처음 본 때는 저녁 암전 직전이라고 했죠. 오후에 소장의 부재를 어떻게 알았는지, 충돌 순간 스위치 앞에 있었다는 말을 누가 뒷받침하는지 살펴봐야 해요."
      },
      {
        image: illustrations.schedule,
        alt: "리허설 A의 담당으로 클라이브 베넷이 적힌 진행표",
        crop: [2.2, "76% 62%"],
        title: "슬라이드와 암전에 모두 관여한 사람",
        text: "진행표에서 리허설 A의 관측 사진 담당은 베넷이에요. 예정표에는 암전과 기준별 정렬을 리드가 맡도록 적혀 있어요. 베넷은 당일 불을 끄고 켜는 일을 맡았다고 했으니, 첫 사진과 암전에 모두 관여할 기회가 있었어요."
      },
      {
        image: illustrations.scene,
        alt: "천문관 중앙 투영기와 난간, 그 옆에 쓰러진 에드워드 헤일",
        crop: [1.65, "56% 76%"],
        title: "충돌 순간의 재구성",
        text: "베넷은 잘못된 슬라이드를 미리 끼워 두었어요. 리드가 정상 Ⅰ번을 건네고 객석 뒤로 돌아간 사이, 소장은 투영기 곁에서 교체를 시작했어요. 베넷이 투영기를 역회전시키자 소장은 울타리에 걸려 뒤로 넘어지며 머리를 부딪쳐 숨졌어요."
      },
      {
        image: illustrations.scene,
        alt: "사고가 난 투영기와 천문관에 있던 네 용의자",
        title: "3번 용의자 클라이브 베넷",
        text: "비어 있는 광점 자리와 소장의 손에 남은 두 장은 슬라이드 교체를 설명해요. 암호 편지와 연임 심사 통지는 베넷이 잃을 공로를 보여 줘요. 화면, 교체 시점, 암전에 관여할 기회와 동기를 함께 보면 범인은 3번 용의자 클라이브 베넷이에요."
      }
    ]
  }
};
