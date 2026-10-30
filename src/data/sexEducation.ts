import type { Localized } from '../i18n'

export interface MythItem {
  id: string
  myth: Localized<string>
  fact: Localized<string>
  detail: Localized<string>
  icon: string
}

export interface CondomStep {
  step: number
  title: Localized<string>
  desc: Localized<string>
  warning?: Localized<string>
  icon: string
}

export interface ConsentPrinciple {
  letter: string
  word: Localized<string>
  title: Localized<string>
  desc: Localized<string>
  icon: string
}

export interface EduArticle {
  id: 'myths' | 'consent' | 'condoms101'
  sourceName: string
  sourceOrg: string
  sourceUrl: string
  badge: Localized<string>
  title: Localized<string>
  subtitle: Localized<string>
  readTime: Localized<string>
  summary: Localized<string>
}

export const EDU_ARTICLES: Record<EduArticle['id'], EduArticle> = {
  myths: {
    id: 'myths',
    sourceName: 'Five Common Sexual Health Myths Debunked',
    sourceOrg: 'Boston University (BU Today)',
    sourceUrl: 'https://www.bu.edu/articles/2024/sexual-health-myths-debunked/',
    badge: {
      vi: 'Giải Mã Khoa Học · Boston University',
      en: 'Medical Debunk · Boston University',
    },
    title: {
      vi: '5 Lầm Tưởng Phổ Biến Về Sức Khỏe Tình Dục & Sự Thật Khoa Học',
      en: 'Five Common Sexual Health Myths Debunked: Facts vs Fiction',
    },
    subtitle: {
      vi: 'Bác sĩ và chuyên gia y tế giải mã những quan niệm sai lầm dễ dẫn đến mang thai ngoài ý muốn và bệnh lây qua đường tình dục.',
      en: 'Medical experts debunk persistent myths that lead to unwanted pregnancies and sexually transmitted infections.',
    },
    readTime: { vi: '4 phút đọc', en: '4 min read' },
    summary: {
      vi: 'Nhiều quan niệm truyền miệng như "xuất tinh ngoài là an toàn" hay "đeo 2 bao để chắc ăn" thực chất làm tăng nguy cơ tổn thương và rủi ro sức khỏe. Cùng xem sự thật khoa học!',
      en: 'Common folklore like the pull-out method or double-bagging actually increases risk. Here is what science and clinicians say.',
    },
  },
  consent: {
    id: 'consent',
    sourceName: 'Sexual Consent & Boundaries Communication among Adolescents',
    sourceOrg: 'Viện Y Tế Quốc Gia Hoa Kỳ (PMC / NCBI)',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10195043/',
    badge: {
      vi: 'Nghiên Cứu Y Khoa · PMC / NCBI',
      en: 'Clinical Study · NIH / PMC / NCBI',
    },
    title: {
      vi: 'Giao Tiếp Về Đồng Thuận (Consent) & Ranh Giới Cá Nhân Cho Người Trẻ',
      en: 'Communication About Sexual Consent, Refusal & Safe Boundaries',
    },
    subtitle: {
      vi: 'Hiểu đúng về sự đồng thuận tự nguyện: Im lặng không phải là đồng ý, và bạn luôn có quyền nói "Không" bất kỳ lúc nào.',
      en: 'Understanding affirmative consent: Silence is not consent, and you always hold the absolute right to set boundaries.',
    },
    readTime: { vi: '5 phút đọc', en: '5 min read' },
    summary: {
      vi: 'Nghiên cứu từ Đại học Minnesota chỉ ra rằng sự tự tin giao tiếp cởi mở và tôn trọng ranh giới là yếu tố cốt lõi của mối quan hệ lành mạnh, không áp lực.',
      en: 'Research highlights how affirmative verbal communication prevents unwanted experiences and fosters mutual trust.',
    },
  },
  condoms101: {
    id: 'condoms101',
    sourceName: 'Condoms 101: Everything You Need To Know About Condoms',
    sourceOrg: 'Durex New Zealand Official Guide',
    sourceUrl: 'https://www.durex.co.nz/explore-sex/condoms-101/',
    badge: {
      vi: 'Cẩm Nang Thực Hành · Durex 101',
      en: 'Practical Masterclass · Durex 101',
    },
    title: {
      vi: 'Condoms 101: 4 Bước Dùng Bao Cao Su Chuẩn Xác & An Toàn Tuyệt Đối',
      en: 'Condoms 101: The 4-Step Golden Rule to Using Condoms Correctly',
    },
    subtitle: {
      vi: 'Hướng dẫn chuẩn chỉnh từ khâu kiểm tra hạn sử dụng, xé gói, xác định chiều cuộn, bóp núm đến xử lý sau khi quan hệ.',
      en: 'The definitive guide covering expiry check, tear notch, roll direction, teat pinch, and proper disposal.',
    },
    readTime: { vi: '3 phút đọc', en: '3 min read' },
    summary: {
      vi: 'Khi sử dụng đúng cách, bao cao su bảo vệ tới 98% khỏi mang thai ngoài ý muốn và các bệnh STIs. Nắm vững 4 bước vàng để tự tin làm chủ cuộc yêu.',
      en: 'When used correctly, condoms are 98% effective against unintended pregnancies and STIs. Master the 4 golden steps.',
    },
  },
}

export const MYTHS_DATA: MythItem[] = [
  {
    id: 'pullout',
    icon: 'block',
    myth: {
      vi: 'Lầm tưởng 1: "Xuất tinh ngoài (Pull-out) là biện pháp ngừa thai an toàn."',
      en: 'Myth 1: "The pull-out method is a reliable form of birth control."',
    },
    fact: {
      vi: 'Sự thật: Xuất tinh ngoài có tỷ lệ thất bại rất cao (~22%) và KHÔNG ngừa được bệnh lây truyền qua đường tình dục (STIs).',
      en: 'Fact: Withdrawal has a high real-world failure rate (~22%) and offers ZERO protection against STIs.',
    },
    detail: {
      vi: 'Dịch hưng phấn tiền tinh dịch (pre-cum) tiết ra trước khi xuất tinh vẫn có thể chứa tinh trùng sống sót. Trong khoảnh khắc cao trào, việc rút kịp thời là rất khó kiểm soát. Hãy luôn kết hợp bao cao su để được bảo vệ kép.',
      en: 'Pre-ejaculatory fluid ("pre-cum") can contain viable sperm. In the heat of the moment, perfect timing is difficult. Always rely on condoms for STI and pregnancy protection.',
    },
  },
  {
    id: 'period',
    icon: 'water_drop',
    myth: {
      vi: 'Lầm tưởng 2: "Quan hệ trong ngày đèn đỏ (kỳ kinh nguyệt) thì không thể có thai."',
      en: 'Myth 2: "You cannot get pregnant during your period."',
    },
    fact: {
      vi: 'Sự thật: Vẫn hoàn toàn có thể thụ thai trong kỳ kinh nguyệt.',
      en: 'Fact: Pregnancy can still occur during menstruation.',
    },
    detail: {
      vi: 'Tinh trùng có khả năng sống sót trong đường sinh sản nữ tới 5 ngày. Nếu chu kỳ kinh nguyệt ngắn hoặc bạn rụng trứng sớm ngay sau kỳ kinh, tinh trùng vẫn còn sống để thụ tinh với trứng.',
      en: 'Sperm can survive inside the female reproductive tract for up to 5 days. With shorter cycles or early ovulation, sperm may still fertilize an egg released shortly after bleeding.',
    },
  },
  {
    id: 'sti_symptoms',
    icon: 'visibility_off',
    myth: {
      vi: 'Lầm tưởng 3: "Chỉ khi có triệu chứng đau rát, lở loét thì mới lây bệnh tình dục (STI)."',
      en: 'Myth 3: "You can only transmit an STI if you have visible symptoms."',
    },
    fact: {
      vi: 'Sự thật: Đa số các ca nhiễm STI (chlamydia, lậu, HPV, herpes) không hề có triệu chứng rõ rệt.',
      en: 'Fact: Most STIs (chlamydia, gonorrhea, HPV, HSV) are asymptomatic "silent infections".',
    },
    detail: {
      vi: 'Một người hoàn toàn có thể trông khoẻ mạnh, cảm thấy bình thường nhưng vẫn mang mầm bệnh và vô tình lây cho bạn tình. Khám sức khỏe định kỳ và dùng bao cao su là lá chắn bảo vệ duy nhất.',
      en: 'People can look and feel completely healthy while carrying and unknowingly passing an infection. Regular screening and consistent condom use are the only real shields.',
    },
  },
  {
    id: 'double_condom',
    icon: 'warning',
    myth: {
      vi: 'Lầm tưởng 4: "Đeo cùng lúc 2 bao cao su sẽ nhân đôi độ an toàn."',
      en: 'Myth 4: "Wearing two condoms at once gives double the protection."',
    },
    fact: {
      vi: 'Sự thật: Đeo 2 bao cùng lúc làm tăng nguy cơ rách bao do lực ma sát cọ xát giữa hai lớp cao su!',
      en: 'Fact: "Double-bagging" creates intense latex friction that causes both condoms to tear!',
    },
    detail: {
      vi: 'Chỉ đeo DUY NHẤT 1 chiếc bao cao su chất lượng cao cho mỗi lần quan hệ. Durex được kiểm tra điện tử 100% từng chiếc để đảm bảo độ bền tối ưu mà không cần chồng lớp.',
      en: 'Always use exactly ONE high-quality condom. Durex condoms are 100% electronically tested for tensile strength. Layering them causes friction tears.',
    },
  },
  {
    id: 'toilet_seat',
    icon: 'sanitizer',
    myth: {
      vi: 'Lầm tưởng 5: "Có thể bị lây nhiễm bệnh tình dục từ bồn cầu công cộng."',
      en: 'Myth 5: "You can catch STIs from sitting on a public toilet seat."',
    },
    fact: {
      vi: 'Sự thật: Vi khuẩn và virus STI không thể sống ngoài môi trường cơ thể người đủ lâu để lây qua bề mặt bồn cầu.',
      en: 'Fact: STI pathogens cannot survive outside human host tissue long enough for fomite transmission.',
    },
    detail: {
      vi: 'STIs chỉ lây lan qua quan hệ tình dục không an toàn (qua đường âm đạo, hậu môn hoặc miệng) và tiếp xúc trực tiếp da-kề-da vùng sinh dục, chứ không lây qua bồn cầu hay vật dụng thông thường.',
      en: 'STIs require direct sexual contact involving mucous membranes or bodily fluids. Public toilet surfaces do not transmit STIs.',
    },
  },
]

export const CONSENT_FRIES: ConsentPrinciple[] = [
  {
    letter: 'F',
    word: { vi: 'Freely Given', en: 'Freely Given' },
    title: { vi: 'Tự nguyện hoàn toàn', en: 'Freely Given' },
    desc: {
      vi: 'Đồng thuận phải xuất phát từ mong muốn tự nhiên của cả hai, không có áp lực, thao túng tâm lý (guilt-tripping), đe dọa hay nài nỉ dai dẳng.',
      en: 'Consent must be a choice made without pressure, manipulation, guilt-tripping, intoxication, or power dynamics.',
    },
    icon: 'sentiment_very_satisfied',
  },
  {
    letter: 'R',
    word: { vi: 'Reversible', en: 'Reversible' },
    title: { vi: 'Có thể rút lại bất cứ lúc nào', en: 'Reversible Any Time' },
    desc: {
      vi: 'Dù bạn đã nói "Có" lúc đầu, bạn luôn có quyền đổi ý và nói "Dừng lại" ở bất kỳ giây phút nào. Đối phương phải lập tức tôn trọng và dừng lại ngay.',
      en: 'Saying yes earlier never obligates you to continue. You have the total right to change your mind and stop at any moment.',
    },
    icon: 'replay',
  },
  {
    letter: 'I',
    word: { vi: 'Informed', en: 'Informed' },
    title: { vi: 'Hiểu rõ và minh bạch', en: 'Informed' },
    desc: {
      vi: 'Cả hai đều trung thực về tình trạng sức khỏe, luôn chuẩn bị bao cao su bảo vệ và hiểu rõ hành động mình sắp làm cùng nhau.',
      en: 'Both partners are honest about their health status, protection methods (condoms), and what sexual activity is happening.',
    },
    icon: 'info',
  },
  {
    letter: 'E',
    word: { vi: 'Enthusiastic', en: 'Enthusiastic' },
    title: { vi: 'Hào hứng và tích cực', en: 'Enthusiastic' },
    desc: {
      vi: 'Quan hệ chỉ trọn vẹn khi cả hai thực sự muốn tham gia. Sự im lặng, ngập ngừng, nằm im hoặc thở dài KHÔNG PHẢI là đồng ý.',
      en: 'Sex should be about shared desire. Hesitation, passivity, silence or "going along" is NOT consent. Only an active YES means yes.',
    },
    icon: 'auto_awesome',
  },
  {
    letter: 'S',
    word: { vi: 'Specific', en: 'Specific' },
    title: { vi: 'Cụ thể cho từng hành vi', en: 'Specific' },
    desc: {
      vi: 'Đồng ý nắm tay hay hôn không có nghĩa là đồng ý cởi đồ hay quan hệ. Mỗi bước đều cần có sự trao đổi và đồng thuận riêng.',
      en: 'Agreeing to kissing or touching does not mean consent to intercourse. Every progression requires its own explicit check-in.',
    },
    icon: 'checklist',
  },
]

export const CONDOM_STEPS: CondomStep[] = [
  {
    step: 1,
    title: {
      vi: 'Bước 1: Kiểm tra hạn sử dụng & Xé gói cẩn thận',
      en: 'Step 1: Check Expiry & Tear Open with Care',
    },
    desc: {
      vi: 'Kiểm tra hạn sử dụng trên vỏ bao và bóp nhẹ để cảm nhận túi khí đệm bên trong còn nguyên. Dùng tay xé nhẹ nhàng theo đường khía răng cưa ở mép gói.',
      en: 'Check the EXP date on the foil and feel for the air cushion. Gently tear along the serrated edge using your fingers.',
    },
    warning: {
      vi: 'Tuyệt đối KHÔNG dùng răng, kéo hoặc móng tay nhọn vì sẽ làm rách hoặc xước bao cao su.',
      en: 'NEVER use teeth, scissors, or sharp fingernails which can puncture microscopic holes in the latex.',
    },
    icon: 'inventory_2',
  },
  {
    step: 2,
    title: {
      vi: 'Bước 2: Xác định chiều cuộn & Bóp núm đầu bao',
      en: 'Step 2: Check Roll Direction & Pinch the Teat',
    },
    desc: {
      vi: 'Vành cuốn phải nằm ở mặt ngoài (trông giống như một chiếc mũ len beanie). Dùng ngón cái và ngón trỏ bóp chặt núm nhỏ ở đầu bao để tống toàn bộ không khí ra ngoài.',
      en: 'Ensure the rolled rim is facing outward like a beanie hat. Firmly pinch the teat (tip) with thumb and forefinger to squeeze out trapped air.',
    },
    warning: {
      vi: 'Đuổi không khí giúp tạo khoảng trống chứa tinh dịch, tránh áp suất làm vỡ bao khi xuất tinh.',
      en: 'Pinching the tip prevents air bubbles that cause the condom to burst under friction.',
    },
    icon: 'pan_tool_alt',
  },
  {
    step: 3,
    title: {
      vi: 'Bước 3: Đặt lên đầu và vuốt đều xuống tận gốc',
      en: 'Step 3: Roll Down to the Very Base',
    },
    desc: {
      vi: 'Đặt bao lên đầu "cậu bé" khi đang cương cứng hoàn toàn. Vẫn giữ nhẹ núm đầu bao, dùng tay còn lại nhẹ nhàng vuốt vành cuộn trượt đều xuống hết chiều dài tận gốc.',
      en: 'Place on the erect penis head. While still holding the teat, roll the condom smoothly down the full shaft to the base.',
    },
    warning: {
      vi: 'Nếu bao bị ngược chiều hoặc tuột trong khi yêu: vứt đi và thay ngay một bao mới!',
      en: 'If the condom is inside out or slips off during intercourse, throw it away and start fresh with a new one.',
    },
    icon: 'vertical_align_bottom',
  },
  {
    step: 4,
    title: {
      vi: 'Bước 4: Giữ gốc bao khi rút ra & Xử lý vệ sinh',
      en: 'Step 4: Hold Base, Pull Out & Bin It',
    },
    desc: {
      vi: 'Ngay sau khi xuất tinh và khi vẫn còn cương cứng, dùng ngón tay giữ chắc mép gốc bao rồi từ từ rút ra khỏi bạn tình. Thắt nút miệng bao, quấn khăn giấy và bỏ vào thùng rác.',
      en: 'Right after ejaculation while still erect, hold the condom firmly at the base before withdrawing. Tie a knot, wrap in tissue and throw in the bin.',
    },
    warning: {
      vi: 'Tuyệt đối KHÔNG xả bao cao su vào bồn cầu vì cao su không tan trong nước và gây ô nhiễm tắc cống.',
      en: 'NEVER flush condoms down the toilet as latex does not dissolve and damages plumbing/marine life.',
    },
    icon: 'delete_sweep',
  },
]
