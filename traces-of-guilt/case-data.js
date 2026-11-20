const illustrations = {
  scene: "planetarium/main.png?v=rehearsal-slide-handoff",
  testimonyA: "planetarium/witnesses-01.png?v=witness-proof",
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
      position: [12.7, 19.25],
      compactPosition: [12.7, 18]
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
    { id: "margaret", name: "마거릿 헤일", role: "사무국장 겸 공동 설립자", portrait: "suspects/margaret.svg?v=character-faces", relationship: "에드워드의 배우자. 함께 세운 연구소에서 결재권과 장부를 넘길 처지였어요." },
    { id: "arthur", name: "아서 리드", role: "천문관 기술실장", portrait: "suspects/arthur.svg", relationship: "베넷과 오랫동안 일했어요. 리드가 서명한 건판 반납 기록에는 빈 케이스에 해당하는 무게가 적혀 있어요." },
    { id: "clive", name: "클라이브 베넷", role: "선임연구원", portrait: "suspects/clive.svg", relationship: "에드워드의 옛 제자이자 새 천체를 처음 발견한 연구원. 발표에서 이름이 빠질 상황이었어요." },
    { id: "julian", name: "줄리언 머서", role: "과학 전문 기자", portrait: "suspects/julian.svg", relationship: "발표를 취재하는 기자. 소장은 후원자에게 보낸 편지를 돌려주는 조건으로 기사 수정을 요구하려 했어요." }
  ],
  answer: {
    practice: false,
    question: "에드워드 헤일을 살해한 사람은 누구인가요?",
    suspectId: "clive",
    explanation: "베넷은 잘못된 Ⅰ번을 끼워 리드가 조작대를 비우게 했어요. 리드가 정상 Ⅰ번을 찾으러 간 사이, 소장은 투영기에 다가갔고 베넷은 어둠 속에서 역회전 레버를 당겼어요. 소장이 자기 이름으로 발표하려던 발견은 베넷의 성과였어요.",
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
        text: "19시 49분에는 투영기에 먼저 끼운 Ⅰ번으로 발견 전 사진을 띄울 예정이었어요. Ⅱ번은 19시 53분에 장착하고 19시 56분에 보여주는 순서였죠. 화살표와 거리는 Ⅱ번 화면을 확인한 뒤에 표시하기로 했어요."
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
        image: "planetarium/solution/06-reid-testimony.jpg?v=witness-proof",
        alt: "소장에게서 제대로 된 1번을 가져오라는 말을 들은 리드의 증언",
        title: "소장이 예정에 없던 Ⅰ번을 찾았어요",
        text: "첫 사진이 뜬 뒤 소장이 “리드, 제대로 된 1번 가져와!”라고 외쳤어요. 리드는 객석 뒤 상자에서 정상 Ⅰ번을 꺼냈어요. 소장에게 가려던 중 투영기 쪽에서 충돌음을 들었고, 그때까지 슬라이드를 건네지 못했어요."
      },
      {
        image: "planetarium/solution/07-slide-handoff.jpg?v=witness-proof",
        alt: "정상 Ⅰ번을 꺼낸 리드의 증언과 소장의 손에 남은 두 슬라이드",
        title: "소장의 손에 있던 Ⅰ번은 어디서 왔을까요?",
        text: "첫 화면에 쓸 Ⅰ번은 이미 투영기에 들어 있었으니, 소장이 챙길 건 다음 순서의 Ⅱ번뿐이었어요. 실제로 소장의 손에는 Ⅱ번이 남아 있었어요. 같이 쥔 Ⅰ번은 어디서 왔을까요? 리드는 정상 Ⅰ번을 건네지 못했어요. 소장의 손에 있던 Ⅰ번은 잘못된 첫 화면을 띄웠던 슬라이드예요. 소장이 투영기에서 직접 빼냈어요."
      },
      {
        image: "planetarium/solution/08-console-warning.jpg",
        alt: "투영기 조작대의 회전 구동 레버와 울타리 안을 확인하라는 주의 문구",
        title: "교체 도중 투영기가 움직였어요",
        text: "조작대에는 작동 전에 울타리 안이 비었는지 확인하라고 적혀 있어요. 소장이 울타리 안에서 잘못 끼워진 Ⅰ번을 뺐을 때, 리드는 정상 Ⅰ번을 찾으러 조작대를 떠난 상태였어요. 조작대가 빈 동안 소장은 투영기 바로 곁에 있었어요."
      },
      {
        image: "planetarium/solution/09-meeting-agenda.jpg",
        alt: "후원금 결재와 장부 이관이 적힌 차기 운영 회의 안건",
        title: "마거릿이 잃을 것",
        text: "에드워드는 발표 뒤 집을 나가겠다고 했고, 회의 안건에는 마거릿의 결재권과 장부를 소장에게 넘긴다고 적혀 있어요. 마거릿을 의심할 이유는 충분해요. 증언을 시간순으로 읽으면 마거릿이 객석에 들어섰을 때 이미 화면이 떠 있었어요. 그녀는 커피를 든 채 의자 등받이를 더듬다가 급한 발소리와 충돌음을 차례로 들었다고 했어요."
      },
      {
        image: "planetarium/solution/10-plate-return.jpg",
        alt: "P-07의 재계량 값 0.94 kg에 표시가 된 건판 반납 기록",
        title: "리드가 서명한 건판 반납 기록",
        text: "리드가 한 장을 반납했다고 기록한 P-07의 실측값은 빈 케이스의 무게인 0.94 kg과 같아요. 장비를 다룰 줄 아는 리드가 건판까지 숨겼을 가능성이 있어 먼저 의심할 만해요. 충돌 직전에는 소장의 요청으로 객석 뒤에 가서 정상 Ⅰ번을 꺼냈어요. 그 요청 때문에 리드가 조작대를 비웠다는 점이 중요해요."
      },
      {
        image: "planetarium/solution/11-julian-testimony.jpg",
        alt: "객석 통로에서 사진을 찍었고 소장실에 다시 가지 않았다는 줄리언의 증언",
        title: "줄리언이 사건 직전에 한 일",
        text: "줄리언은 리허설 전에 기사 교정쇄를 소장실에 두고 나왔어요. 불이 꺼진 뒤에는 객석 통로에서 천장을 찍었고, 카메라를 내리기도 전에 충돌음을 들었다고 했어요. 그녀를 의심하게 만드는 건 책상에 남은 암호 편지예요."
      },
      {
        image: "planetarium/solution/12-cipher-addressee.jpg",
        alt: "줄리언 머서의 기자 이름과 To.로 시작하는 암호 편지",
        title: "수신인 이름으로 암호 풀기",
        text: "교정쇄의 ‘줄리언 머서’를 편지의 To. 뒤에 대입하면 수신인을 알 수 있어요. ‘줄’의 ㅈ·ㅜ·ㄹ이 첫 음절의 문양 세 개와 맞아요. 위의 비밀암호 대응표로 같은 방식을 본문에 적용할 수 있어요."
      },
      {
        image: "planetarium/solution/13-cipher-letter.jpg",
        alt: "기사 교정쇄 옆에 남은 문양 암호 편지",
        title: "편지에는 발견자를 바꾸라고 쓰여 있어요",
        text: "편지는 “발견자는 내 이름으로 바꿔. 일이 끝나면 네가 후원자에게 보낸 그 편지는 돌려주지.”라고 읽혀요. 줄리언에게도 자신을 압박하던 소장을 원망할 이유가 있었어요. 이번 지시는 책상에 남아 있었고, 충돌 직전 줄리언의 동선은 객석에서 찍은 사진과 이어져요."
      },
      {
        image: "planetarium/solution/14-letter-and-notice.jpg",
        alt: "발견자 이름을 바꾸라는 암호 편지 본문과 에드워드 헤일의 연임 심사 통지서",
        title: "소장이 공로를 원했던 이유",
        text: "공문에는 에드워드가 직접 주도한 연구 실적을 입증해야 연임할 수 있다고 적혀 있어요. 발견자 이름을 자기 이름으로 바꾸라는 편지를 함께 보면, 소장이 베넷의 발견을 자기 실적으로 발표하려 한 이유가 드러나요."
      },
      {
        image: "planetarium/solution/15-bennett-testimony.jpg",
        alt: "암전 직전 소장을 봤고 충돌 때 스위치 앞이었다고 말한 베넷의 증언",
        title: "베넷은 어디에 있었을까요?",
        text: "베넷은 벽의 조명 스위치 앞에서 기다리다 충돌음을 들었다고 했어요. 리드는 불이 꺼진 뒤 첫 사진이 떴을 때 베넷이 조작대 앞 자기 곁에서 발견 이야기를 했다고 해요. 현장 그림에서 스위치와 조작대는 서로 떨어져 있어요. 베넷의 말에는 암전 중 조작대에 있었던 시간이 빠져 있어요."
      },
      {
        image: "planetarium/solution/16-schedule-and-testimony.jpg",
        alt: "암전 담당 리드와 리허설 A 담당 베넷이 적힌 진행표, 당일 조명을 맡았다는 베넷의 증언",
        title: "슬라이드, 조명, 조작대가 한 사람에게 이어져요",
        text: "첫 관측 사진의 담당자는 베넷이에요. 암전 담당은 진행표에 리드로 적혀 있지만, 베넷은 당일 조명을 자신이 맡았다고 했어요. 리드가 잘못된 첫 화면 때문에 자리를 뜰 때 베넷은 조작대 곁에 있었어요. 슬라이드를 준비하고, 불을 끄고, 비게 될 조작대까지 쓸 기회가 한 사람에게 모여요."
      },
      {
        image: "planetarium/solution/lever-crack.png",
        alt: "회전 구동 레버의 손잡이 고리 아래 금속 막대에 난 가는 금",
        title: "발소리 뒤에 남은 레버의 흔적",
        text: "마거릿은 누군가 급히 달리는 소리를 들었고, 곧바로 충돌음이 났어요. 조작대 그림에서 레버 손잡이 고리 아래를 보면 금속 막대에 가는 금이 있어요. 급히 달려와 레버를 세게 당겼다는 재구성과 맞아떨어지는 두 흔적이에요."
      },
      {
        image: "planetarium/solution/17-projection-platform.jpg",
        alt: "천문관 중앙 투영기와 난간, 그 옆에 쓰러진 에드워드 헤일",
        title: "충돌 순간의 재구성",
        text: "베넷은 Ⅰ번을 바꿔 두면 소장이 리드에게 정상 슬라이드를 가져오라고 할 걸 노렸어요. 리드가 자리를 비우고 소장이 잘못된 슬라이드를 빼러 들어가자 베넷은 어둠 속에서 조작대로 달려가 역회전 레버를 세게 당겼어요. 소장은 울타리에 걸려 뒤로 넘어지며 판에 머리를 부딪쳤어요. 베넷은 충돌 뒤에 불을 켰어요."
      },
      {
        image: illustrations.scene,
        alt: "사고가 난 투영기와 천문관에 있던 네 용의자",
        title: "3번 용의자 클라이브 베넷",
        text: "마거릿에게는 운영권, 리드에게는 사라진 건판, 줄리언에게는 협박 편지가 걸려 있었어요. 베넷만은 첫 화면을 준비했고, 암전을 맡았고, 정상 Ⅰ번을 찾으러 리드가 떠나는 순간 조작대 곁에 있었어요. 암호 편지와 연임 공문은 왜 그날 행동했는지 설명해요. 리드를 움직이게 한 슬라이드부터 충돌 뒤 불을 켜기까지, 사건 전체를 설명하는 사람은 베넷이에요."
      }
    ]
  }
};
