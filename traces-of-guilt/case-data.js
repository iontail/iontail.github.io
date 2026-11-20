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
      "사고 직전부터 불이 다시 켜질 때까지 천문관에 있던 사람은 소장과 사무국장 마거릿 헤일, 기술실장 아서 리드, 선임연구원 클라이브 베넷, 과학 전문 기자 줄리언 머서, 이렇게 다섯 명뿐이었습니다."
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
      position: [2.25, 68.5],
      notes: ["console-check"]
    },
    {
      title: "목격자 증언 A",
      action: "증언 확인하기",
      mapLabel: "증언",
      image: illustrations.testimonyA,
      position: [4, 94.8],
      notes: ["reid-interview"]
    },
    {
      title: "목격자 증언 B",
      image: illustrations.testimonyB,
      notes: ["witness-crosscheck"]
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
      location: "office",
      notes: ["reporter-notes", "cipher-guide"]
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
  evidenceNotes: {
    "console-check": {
      title: "사고 직후 장비 점검 기록",
      paragraphs: [
        { text: "첨부 도판에는 조작대의 구성과 표기가 나와 있다. 사고 직후 현장에서 확인한 회전 손잡이는 역회전 위치에 있었다. 이 장비는 조작대에서 손으로 역회전 위치를 선택하는 순간에만 중앙 구동부에서 짧은 걸림음이 두 번 난다. 실내등 스위치는 왼쪽 벽에 따로 있고, 장비가 흔들리거나 실내등이 켜져도 회전 손잡이는 움직이지 않았다." },
        { text: "투영기 안에는 번호 없는 시험용 건판이 끼워져 있었다. 관측 사진 대조 기록으로 확인했다. 소장의 손에서 회수한 두 장은 리허설용 Ⅰ번과 Ⅱ번이며, 서랍의 폐기 건판 P-07은 별도의 반납 기록이다." },
        { text: "회전 손잡이 아래 금속 막대에서 가는 금을 확인했다. 금이 생긴 시점은 확인하지 못했다." }
      ]
    },
    "reid-interview": {
      title: "아서 리드의 추가 진술",
      paragraphs: [
        { text: "처음 기준별을 맞췄을 때는 평소 방향으로 돌아갔어요. 첫 화면을 띄우기 직전에 베넷 씨가 슬라이드를 직접 끼우는 걸 봤어요. 그 뒤 소장님이 Ⅰ번을 가져오라고 소리치실 때까지, 투영기 가까이 간 사람은 없었습니다." },
        { text: "정상 Ⅰ번을 건넨 뒤, 소장님이 울타리 안으로 들어가는 걸 봤어요. 가까이 있던 베넷 씨에게 그 말을 전했더니 ‘알았어요’라고 답했어요. 저는 다시 객석 뒤 상자로 돌아갔습니다." },
        { text: "저는 소장님에게 투영기 일을 배웠어요. 소장님은 P-07 케이스가 비었다는 걸 확인한 뒤 다음 달부터 나오지 말라고 하셨어요. 그 말씀은 리허설 전에 들었습니다." }
      ]
    },
    "witness-crosscheck": {
      title: "충돌 순간의 진술 대조",
      paragraphs: [
        { speaker: "마거릿 헤일", text: "객석 뒤에서 줄리언의 소매를 붙잡고 있었어요. 천장에서 내려오는 빛에 바로 옆의 줄리언과 상자를 닫던 리드 씨가 보였어요. 그때 안쪽에서 짧은 소리가 두 번 나자마자 큰 충돌음이 났어요." },
        { speaker: "줄리언 머서", text: "제가 카메라를 든 채였을 때 마거릿이 제 소매를 잡았고 리드는 제 발 옆에서 상자 뚜껑을 붙들고 있었어요. 짧은 소리 두 번과 그 뒤 충돌음을 들을 때까지 셋 다 객석 뒤에 있었어요." }
      ]
    },
    "reporter-notes": {
      title: "줄리언 머서의 취재 메모",
      paragraphs: [
        { text: "교정쇄를 쓰기 전 베넷의 날짜가 적힌 관측 장부와 건판을 함께 확인했다. 같은 별밭의 관측 사진을 비교해 새 광점을 처음 찾은 사람은 베넷이었다. 리드는 그 사진을 천문관에서 띄울 수 있도록 베넷과 함께 시연을 준비했다." },
        { text: "암전 직전 소장이 베넷에게 ‘발표에서 자네 이름을 빼겠네’라고 말했다. 베넷은 ‘그 광점을 먼저 찾은 건 접니다’라고 답했다. 소장은 그 자리에선 발표에 누구 이름을 올릴지 말하지 않았다." }
      ]
    },
    "cipher-guide": { title: "문양 해독표", cipher: true }
  },
  hints: [
    "진행표에 적힌 순서와 실제 리허설이 일치하는지 확인해 보세요.",
    "기자가 찍은 리허설 사진과 서랍 속 관측 자료 대조표를 비교해 보세요. 두 자료에서 어떤 사실을 확인할 수 있을까요?",
    "교정쇄 옆 편지는 누구에게 보내려던 걸까요? 짐작한 이름을 ‘To.’ 뒤의 문양에 한 글자씩 대입해 보면, 암호의 규칙을 찾을 수 있을지도 몰라요.",
    "소리가 나기 직전의 증언을 나란히 읽어 보세요. 각자가 있던 자리와 보고 들은 내용을 비교하면, 서로 맞지 않는 대목이 있나요?"
  ],
  suspects: [
    { id: "margaret", name: "마거릿 헤일", role: "사무국장 겸 공동 설립자", portrait: "suspects/margaret.svg?v=character-faces", relationship: "에드워드의 배우자. 함께 세운 연구소에서 결재권과 장부를 넘길 처지였어요." },
    { id: "arthur", name: "아서 리드", role: "천문관 기술실장", portrait: "suspects/arthur.svg", relationship: "소장에게 장비 운용을 배웠고 베넷과 시연을 준비했어요. 빈 건판 케이스가 발각돼 해고를 통보받았어요." },
    { id: "clive", name: "클라이브 베넷", role: "선임연구원", portrait: "suspects/clive.svg", relationship: "에드워드의 옛 제자이자 새 천체를 처음 발견한 연구원. 발표에서 이름이 빠질 상황이었어요." },
    { id: "julian", name: "줄리언 머서", role: "과학 전문 기자", portrait: "suspects/julian.svg", relationship: "발표를 취재하는 기자. 소장은 후원자에게 보낸 편지를 돌려주는 조건으로 기사 수정을 요구하려 했어요." }
  ],
  answer: {
    practice: false,
    question: "에드워드 헤일을 살해한 사람은 누구인가요?",
    suspectId: "clive",
    explanation: "투영기가 역회전으로 바뀌는 소리가 난 순간, 세 용의자는 객석 뒤에 있었고 에드워드는 울타리 안에 있었어요. 장비 점검 기록과 두 사람의 진술을 맞추면 그 순간 조작대에서 방향을 바꿀 수 있었던 사람은 클라이브 베넷이에요.",
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
        text: "같은 배율의 인화지에서 300 thou와 7,620 microns는 같은 길이예요. 정상 Ⅱ번 인화물에는 화살촉 너머에 광점이 있어요. 리허설 사진의 같은 자리는 비어 있어요."
      },
      {
        image: illustrations.photo,
        alt: "화살표와 거리 표기가 떠 있는 교체 전 투영 화면",
        title: "화살표가 떴을 때의 실제 화면",
        text: "마거릿은 후반에 나오는 화살표를 보고 리허설이 끝날 때쯤이라고 생각했어요. 사진을 대조하면 그 표시가 정상 Ⅱ번과 다른 화면 위에 떠 있었음을 알 수 있어요. 이 차이는 그때 소장이 왜 정상 Ⅰ번을 다시 찾았는지 설명할 실마리예요."
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
        title: "사고 뒤 투영기에서 나온 건판",
        text: "점검 기록을 보면 투영기에 남아 있던 것은 번호 없는 건판이었어요. 소장의 손에 든 두 장은 예정된 Ⅰ번과 Ⅱ번이었죠. 소장은 잘못 들어간 건판을 Ⅰ번으로 바꾸려다 울타리 안에서 쓰러졌어요.",
        notes: ["console-check"]
      },
      {
        image: "planetarium/solution/09-meeting-agenda.jpg",
        alt: "후원금 결재와 장부 이관이 적힌 차기 운영 회의 안건",
        title: "마거릿의 운영권과 발소리",
        text: "마거릿은 에드워드의 배우자이자 공동 설립자예요. 에드워드는 발표 뒤 집을 나가겠다고 했고, 회의 안건에는 마거릿의 결재권과 장부를 소장에게 넘긴다고 적혀 있었어요. 마거릿에게는 부부 관계와 연구소 운영권이 모두 걸려 있었어요."
      },
      {
        image: "planetarium/solution/10-plate-return.jpg",
        alt: "P-07의 재계량 값 0.94 kg에 표시가 된 건판 반납 기록",
        title: "리드가 숨긴 건판",
        text: "리드가 한 장 반납했다고 기록한 P-07의 실측값 0.94 kg은 빈 케이스의 무게였어요. 소장은 이를 확인하고 해고를 통보했어요. 오전 정기 결재와 베넷이 본 오후 출입은 서로 다른 일이에요. P-07도 리허설용 Ⅰ번·Ⅱ번과 따로 관리됐어요.",
        notes: ["reid-interview"]
      },
      {
        image: "planetarium/solution/11-julian-testimony.jpg",
        alt: "객석 통로에서 사진을 찍었고 소장실에 다시 가지 않았다는 줄리언의 증언",
        title: "줄리언이 사건 직전에 한 일",
        text: "줄리언은 베넷의 관측 장부와 건판을 확인하고 발견 기사를 썼어요. 교정쇄를 소장실에 놓고 나온 뒤, 객석 통로에서 천장을 찍었어요. 책상에 남은 암호 편지는 소장이 기자에게 무엇을 바꾸게 하려 했는지 알려 줘요.",
        notes: ["reporter-notes"]
      },
      {
        image: "planetarium/solution/12-cipher-addressee.jpg",
        alt: "줄리언 머서의 기자 이름과 To.로 시작하는 암호 편지",
        title: "수신인 이름으로 암호 풀기",
        text: "교정쇄의 ‘줄리언 머서’를 편지의 To. 뒤에 대입하면 수신인을 알 수 있어요. ‘줄’의 ㅈ·ㅜ·ㄹ이 첫 음절의 문양 세 개와 맞아요. 교정쇄에 딸린 문양 해독표로 이 방식을 본문에 적용할 수 있어요.",
        notes: ["cipher-guide"]
      },
      {
        image: "planetarium/solution/13-cipher-letter.jpg",
        alt: "기사 교정쇄 옆에 남은 문양 암호 편지",
        title: "편지에는 발견자를 바꾸라고 쓰여 있어요",
        text: "편지는 “발견자는 내 이름으로 바꿔. 일이 끝나면 네가 후원자에게 보낸 그 편지는 돌려주지.”라고 읽혀요. 줄리언의 과거 편지가 기사 수정을 압박하는 수단이었어요. 이번 지시는 소장실 책상에 남아 있었고, 줄리언은 교정쇄를 둔 뒤 방에 돌아가지 않았다고 했어요."
      },
      {
        image: "planetarium/solution/14-letter-and-notice.jpg",
        alt: "발견자 이름을 바꾸라는 암호 편지 본문과 에드워드 헤일의 연임 심사 통지서",
        title: "소장이 공로를 원했던 이유",
        text: "공문에는 에드워드가 직접 주도한 연구 실적을 입증해야 연임할 수 있다고 적혀 있어요. 이름을 바꾸라는 편지를 함께 보면 소장이 옛 제자 베넷의 공로를 가져가려 한 이유가 설명돼요. 기자는 암전 직전 소장이 베넷에게 발표에서 이름을 빼겠다고 말하는 걸 들었어요.",
        notes: ["reporter-notes"]
      },
      {
        image: "planetarium/solution/15-bennett-testimony.jpg",
        alt: "암전 직전 소장을 봤고 충돌 때 스위치 앞이었다고 말한 베넷의 증언",
        title: "같은 소리를 들은 세 사람",
        text: "마거릿과 줄리언은 서로 닿을 만큼 가까이 있었고, 바로 곁에서 리드가 상자를 닫고 있었어요. 두 사람은 짧은 소리 두 번에 이어 큰 충돌음이 나는 동안 세 사람 모두 객석 뒤에 있었다고 진술했어요.",
        notes: ["witness-crosscheck"]
      },
      {
        image: "planetarium/solution/16-schedule-and-testimony.jpg",
        alt: "암전 담당 리드와 리허설 A 담당 베넷이 적힌 진행표, 당일 조명을 맡았다는 베넷의 증언",
        title: "누가 첫 건판을 끼웠을까요?",
        text: "진행표에서 첫 사진 담당은 베넷이고 암전 담당은 리드예요. 베넷은 당일 조명도 맡았다고 했어요. 리드는 베넷이 첫 건판을 끼웠고 소장의 Ⅰ번 요청까지 아무도 접근하지 않았다고 했죠. 점검에서 투영기에 남아 있던 건판은 시험판으로 확인됐어요.",
        notes: ["reid-interview", "console-check"]
      },
      {
        image: "planetarium/solution/08-console-warning.jpg",
        alt: "투영기 조작대 도해의 정회전, 정지, 역회전 표기",
        title: "짧은 소리 두 번이 가리키는 순간",
        text: "점검 기록을 보면 짧은 걸림음 두 번은 조작대에서 역회전으로 바꾼 순간에 났어요. 곧바로 충돌음이 날 때까지 마거릿, 줄리언, 리드는 함께 객석 뒤에 있었고 소장은 울타리 안에 있었어요. 현장에 있던 다섯 명 중 조작대에서 방향을 바꿀 수 있었던 사람은 베넷뿐이에요.",
        notes: ["console-check", "witness-crosscheck"]
      },
      {
        image: "planetarium/solution/17-projection-platform.jpg",
        alt: "천문관 중앙 투영기와 난간, 그 옆에 쓰러진 에드워드 헤일",
        title: "충돌 순간의 재구성",
        text: "조작대에는 작동 전에 울타리 안을 확인하라는 문구가 있어요. 리드가 소장이 Ⅰ번을 들고 안으로 들어갔다고 알리자 베넷은 알아들었다고 답했어요. 베넷은 소장이 안에 있음을 알고도 회전 방향을 바꿨어요. 소장은 울타리에 걸려 넘어지며 머리를 부딪쳐 숨졌어요.",
        notes: ["reid-interview"]
      },
      {
        image: illustrations.scene,
        alt: "사고가 난 투영기와 천문관에 있던 네 용의자",
        title: "3번 용의자 클라이브 베넷",
        text: "암호 편지와 연임 공문은 베넷이 발견 공로를 빼앗길 상황을 설명해요. 첫 건판을 끼운 목격담은 소장이 울타리 안으로 들어가게 된 계기를 밝혀 줘요. 점검 기록과 두 사람의 진술을 맞추면, 벽의 조명 스위치 앞에서 기다렸다는 베넷의 설명도 실제 동선과 어긋나요."
      }
    ]
  }
};
