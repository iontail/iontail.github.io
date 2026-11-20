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
        image: "planetarium/solution/01-rehearsal-schedule.jpg",
        alt: "19시 49분 리허설 A와 19시 56분 리허설 B가 적힌 진행표",
        title: "예정된 리허설 순서",
        text: "19시 49분에는 Ⅰ번으로 발견 전 사진을 띄우고, 19시 56분에는 Ⅱ번으로 발견 후 사진을 보여줄 예정이었어요. 화살표와 거리는 Ⅱ번 화면을 확인한 뒤에 표시하기로 했어요."
      },
      {
        image: "planetarium/solution/02-margaret-testimony.jpg",
        alt: "천장을 보고 리허설이 거의 끝났다고 생각한 마거릿의 증언",
        title: "마거릿이 본 것은 화살표",
        text: "마거릿은 천장을 보고 리허설이 거의 끝났다고 생각했어요. 진행표대로라면 화살표는 후반에 나오는 표시예요. 정작 그때 어떤 사진 위에 화살표가 떠 있었는지 살펴볼 차례예요."
      },
      {
        image: "planetarium/solution/03-projected-arrow.jpg",
        alt: "명왕성 옆 화살표에 300 thou라고 표시된 리허설 사진",
        title: "카메라에 남은 화면",
        text: "줄리언의 사진에는 명왕성 옆에 화살표와 300 thou라는 표기가 찍혀 있어요. 서랍 속 인화물에도 거리 기록이 남아 있어요. 두 자료가 가리키는 곳을 비교해 보세요."
      },
      {
        image: "planetarium/solution/04-photo-comparison.jpg",
        alt: "리허설 사진의 300 thou 화살표와 정상 Ⅱ번 인화물의 7,620 microns 기록 및 광점 비교",
        title: "같은 거리, 서로 다른 화면",
        text: "300 thou와 7,620 microns는 같은 거리예요. 정상 Ⅱ번 인화물에서 화살촉 너머에 작은 광점이 보여요. 리허설 사진의 화살촉 바로 너머는 비어 있어요."
      },
      {
        image: illustrations.photo,
        alt: "화살표와 거리 표기가 떠 있는 교체 전 투영 화면",
        title: "화살표가 떴을 때의 실제 화면",
        text: "후반용 표시가 정상 Ⅱ번과 다른 사진 위에 떠 있었어요. 마거릿이 리허설이 거의 끝났다고 생각한 이유도 이 표시로 설명돼요. 화면이 어긋난 걸 알아챈 소장은 무엇을 요구했을까요?"
      },
      {
        image: "planetarium/solution/06-reid-testimony.jpg",
        alt: "소장에게서 제대로 된 1번을 가져오라는 말을 들은 리드의 증언",
        title: "예정에 없던 Ⅰ번 전달",
        text: "첫 사진이 뜬 뒤 소장이 “리드, 제대로 된 1번 가져와!”라고 외쳤어요. 리드는 객석 뒤에서 정상 Ⅰ번을 꺼내 통로 입구에서 소장에게 건넸어요. 진행표에서 다음에 쓸 슬라이드는 Ⅱ번이에요. 소장은 왜 Ⅰ번을 급히 다시 받았을까요?"
      },
      {
        image: "planetarium/solution/07-slide-handoff.jpg",
        alt: "리드가 Ⅰ번을 소장에게 건넸다는 증언과 소장의 손에 남은 Ⅰ번과 Ⅱ번 슬라이드",
        title: "소장은 이미 Ⅱ번을 가지고 있었어요",
        text: "소장의 손에는 다음 순서에 쓸 Ⅱ번과 리드에게서 받은 Ⅰ번이 함께 남아 있었어요. 예정대로였다면 가지고 있던 Ⅱ번으로 넘어갈 수 있었어요. 정상 Ⅰ번을 급히 다시 받았다는 건 첫 화면에 문제가 생겨 바로잡으려 했다는 단서예요."
      },
      {
        image: "planetarium/solution/08-console-warning.jpg",
        alt: "투영기 조작대의 회전 구동 레버와 울타리 안을 확인하라는 주의 문구",
        title: "교체 중에 장비가 움직였어요",
        text: "조작대에는 작동 전에 울타리 안이 비었는지 확인하라고 적혀 있어요. 문제의 순간 소장은 슬라이드를 바꾸러 안에 들어가 있었어요. 이제 교체 상황을 알고 조작대에 접근할 기회가 있었던 사람이 누군지 살펴봐요."
      },
      {
        image: "planetarium/solution/09-meeting-agenda.jpg",
        alt: "후원금 결재와 장부 이관이 적힌 차기 운영 회의 안건",
        title: "마거릿의 운영권과 발소리",
        text: "회의 안건에는 마거릿의 결재권과 장부를 소장에게 넘긴다고 적혀 있어요. 소장은 발표 뒤 집을 나갈 계획도 밝혔어요. 마거릿은 충돌 직전 객석을 지나며 급한 발소리를 들었다고 했어요. 이 진술은 발소리와 충돌음의 순서를 짚어 줘요."
      },
      {
        image: "planetarium/solution/10-plate-return.jpg",
        alt: "P-07의 재계량 값 0.94 kg에 표시가 된 건판 반납 기록",
        title: "리드가 숨긴 건판",
        text: "리드는 P-07을 한 장 반납했다고 기록했어요. 실측값 0.94 kg은 빈 케이스의 무게와 같았어요. 이 기록은 폐기 예정 건판의 행방에 관한 단서예요. 리드는 충돌이 나기 전에 정상 Ⅰ번을 건네고 객석 뒤로 돌아갔다고 했어요."
      },
      {
        image: "planetarium/solution/11-julian-testimony.jpg",
        alt: "객석 통로에서 사진을 찍었고 소장실에 다시 가지 않았다는 줄리언의 증언",
        title: "줄리언이 사건 직전에 한 일",
        text: "줄리언은 리허설 전에 교정쇄를 소장실에 놓고 나왔어요. 객석 통로에서 천장을 찍고 카메라를 내리기 전에 충돌음을 들었다고 했어요. 소장실 책상에 남은 암호 편지는 줄리언과 사건을 어떻게 연결할까요?"
      },
      {
        image: "planetarium/solution/12-cipher-addressee.jpg",
        alt: "줄리언 머서의 기자 이름과 To.로 시작하는 암호 편지",
        title: "수신인 이름으로 암호 풀기",
        text: "교정쇄의 취재 기자 이름인 ‘줄리언 머서’를 편지의 To. 뒤에 대입해 보세요. ‘줄’을 ㅈ·ㅜ·ㄹ로 나누면 첫 음절의 문양 세 개와 맞아요. 같은 방식으로 대응표를 따라 본문을 읽을 수 있어요."
      },
      {
        image: "planetarium/solution/13-cipher-letter.jpg",
        alt: "기사 교정쇄 옆에 남은 문양 암호 편지",
        title: "편지에는 발견자를 바꾸라고 쓰여 있어요",
        text: "편지는 “발견자는 내 이름으로 바꿔. 일이 끝나면 네가 후원자에게 보낸 그 편지는 돌려주지.”라고 읽혀요. 줄리언은 지시를 받도록 적힌 사람이에요. 책상에 남은 편지는 소장이 발표에서 무엇을 바꾸려 했는지 보여 줘요."
      },
      {
        image: "planetarium/solution/14-letter-and-notice.jpg",
        alt: "발견자 이름을 바꾸라는 암호 편지 본문과 에드워드 헤일의 연임 심사 통지서",
        title: "소장이 공로를 원했던 이유",
        text: "연임 심사 통지서는 에드워드가 직접 주도한 연구 실적을 입증하라고 요구해요. 발견자 이름을 바꾸라는 편지와 함께 보면, 소장이 베넷의 발견을 자기 실적으로 발표하려 한 이유가 드러나요. 베넷은 이번 발표로 발견 공로를 잃을 처지였어요."
      },
      {
        image: "planetarium/solution/15-bennett-testimony.jpg",
        alt: "암전 직전 소장을 봤고 충돌 때 스위치 앞이었다고 말한 베넷의 증언",
        title: "베넷은 언제 자리를 옮겼을까요?",
        text: "리드는 첫 사진이 뜬 뒤 베넷이 자기 옆에서 발견 이야기를 했다고 했어요. 베넷은 충돌음을 들었을 때 스위치 앞에 있었다고 했어요. 두 진술 사이에 베넷이 언제, 어디로 움직였는지가 남은 질문이에요."
      },
      {
        image: "planetarium/solution/16-schedule-and-testimony.jpg",
        alt: "암전 담당 리드와 리허설 A 담당 베넷이 적힌 진행표, 당일 조명을 맡았다는 베넷의 증언",
        title: "슬라이드와 암전에 모두 관여한 사람",
        text: "진행표에는 기준별 정렬과 암전 담당이 리드, 첫 관측 사진 담당이 베넷으로 적혀 있어요. 베넷은 당일 조명도 맡았다고 했어요. 두 단서를 같이 보면 베넷이 첫 사진과 불이 꺼지는 시점에 모두 관여할 수 있었음을 알 수 있어요."
      },
      {
        image: "planetarium/solution/17-projection-platform.jpg",
        alt: "천문관 중앙 투영기와 난간, 그 옆에 쓰러진 에드워드 헤일",
        title: "충돌 순간의 재구성",
        text: "사건을 재구성하면 베넷은 잘못된 슬라이드를 미리 끼워 두었어요. 리드가 정상 Ⅰ번을 건네고 객석 뒤로 돌아간 사이, 소장은 투영기 곁에서 교체를 시작했어요. 베넷이 투영기를 역회전시키자 소장은 울타리에 걸려 뒤로 넘어지며 머리를 부딪쳐 숨졌어요."
      },
      {
        image: illustrations.scene,
        alt: "사고가 난 투영기와 천문관에 있던 네 용의자",
        title: "3번 용의자 클라이브 베넷",
        text: "소장은 이미 다음에 쓸 Ⅱ번을 가지고 있었어요. 정상 Ⅰ번을 급히 다시 받은 일과 사진에 남은 어긋난 화면을 연결하면, 소장이 왜 투영기에 다가갔는지 설명돼요. 진행표와 증언은 베넷의 기회를, 편지와 공문은 베넷이 빼앗길 발견 공로를 보여 줘요. 사건의 정답은 3번 용의자 클라이브 베넷이에요."
      }
    ]
  }
};
