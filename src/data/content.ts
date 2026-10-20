import type { Lang, Localized } from '../i18n'

export const STORES = {
  shopee: { name: 'Shopee Mall', dot: '#EE4D2D', url: 'https://shopee.vn/durex.officialstore' },
  lazada: {
    name: 'Lazada LazMall',
    dot: '#0F146D',
    url: 'https://www.lazada.vn/shop/durex?path=index.htm&lang=en&pageTypeId=1',
  },
} as const

export type StoreKey = keyof typeof STORES

export const NAV: { to: string; icon: string; label: Localized<string> }[] = [
  { to: '/', icon: 'air', label: { vi: 'Trang Chủ', en: 'Home' } },
  { to: '/san-pham', icon: 'category', label: { vi: 'Sản Phẩm', en: 'Products' } },
  { to: '/uu-dai', icon: 'celebration', label: { vi: 'Ưu Đãi', en: 'Offers' } },
  { to: '/cam-nang', icon: 'menu_book', label: { vi: 'Cẩm Nang', en: 'Guides' } },
  { to: '/ho-tro', icon: 'support_agent', label: { vi: 'Hỗ Trợ', en: 'Support' } },
]

export type ProductId = 'fetherlite' | 'classic' | 'pleasuremax' | 'performa'

export const PRODUCTS: { id: ProductId; name: string; img: string; tint: string; tagline: Localized<string> }[] = [
  {
    id: 'fetherlite',
    name: 'Fetherlite',
    img: '/assets/p-fetherlite.webp',
    tint: 'from-[#ffb4ac] to-[#e51b24]',
    tagline: { vi: 'Siêu mỏng – cảm giác chân thật', en: 'Ultra thin – true-to-life feel' },
  },
  {
    id: 'classic',
    name: 'Classic',
    img: '/assets/p-classic.webp',
    tint: 'from-[#a1c9ff] to-[#0077cd]',
    tagline: { vi: 'Ôm khít – tự tin mọi lúc', en: 'Close fit – confident every time' },
  },
  {
    id: 'pleasuremax',
    name: 'Pleasuremax',
    img: '/assets/p-pleasuremax.webp',
    tint: 'from-[#ffd9e5] to-[#d6337a]',
    tagline: { vi: 'Gân & gai – thêm kích thích', en: 'Ribbed & dotted – extra stimulation' },
  },
  {
    id: 'performa',
    name: 'Performa',
    img: '/assets/p-performa.webp',
    tint: 'from-[#c0c7d4] to-[#2c3134]',
    tagline: { vi: 'Kéo dài khoảnh khắc thăng hoa', en: 'Make the moment last longer' },
  },
]

export const productById = (id: ProductId) => PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0]

export const PACKS: { id: '3' | '12'; price: number; was: number; label: Localized<string>; note?: Localized<string> }[] = [
  { id: '3', price: 59000, was: 69000, label: { vi: 'Hộp 3 cái', en: 'Pack of 3' } },
  {
    id: '12',
    price: 189000,
    was: 255000,
    label: { vi: 'Hộp 12 cái', en: 'Pack of 12' },
    note: { vi: 'Tiết kiệm 25%', en: 'Save 25%' },
  },
]

export type PackId = (typeof PACKS)[number]['id']

export const REVIEWS: Localized<{ name: string; when: string; text: string; via: string }[]> = {
  vi: [
    {
      name: 'Minh Anh & Hoàng T.',
      when: '2 ngày trước',
      text: 'Đúng như tên gọi Fetherlite, cảm giác chạm thật đến bất ngờ, cả hai tụi mình đều quên mất là đang dùng bao luôn á!',
      via: 'Đã mua Hộp 12 cái tại Shopee Mall',
    },
    {
      name: 'Hải Đăng (26t)',
      when: '1 tuần trước',
      text: 'Giao hàng đóng gói cực kỳ kín đáo, hộp sang trọng. Gel bôi trơn vừa phải, mượt mà và không hề nghe mùi hoá chất.',
      via: 'Đã mua tại Durex Official Store',
    },
    {
      name: 'Thu Trang & N.',
      when: '2 tuần trước',
      text: 'Bạn trai bảo đeo vào rất dễ, ôm khít không sợ rơi tuột. Cảm giác ấm áp truyền nhiệt cực kỳ rõ rệt.',
      via: 'Đã mua Hộp 3 cái tại Lazada Mall',
    },
    {
      name: 'Quốc Bảo (23t)',
      when: '3 tuần trước',
      text: 'Lần đầu mua online mà shipper không biết mình mua gì luôn. Mỏng nhẹ thật sự, sẽ mua lại.',
      via: 'Đã mua Hộp 12 cái tại Lazada Mall',
    },
  ],
  en: [
    {
      name: 'Minh Anh & Hoàng T.',
      when: '2 days ago',
      text: 'True to the Fetherlite name – it feels surprisingly real. We both forgot we were even using one!',
      via: 'Bought a Pack of 12 on Shopee Mall',
    },
    {
      name: 'Hải Đăng (26)',
      when: '1 week ago',
      text: 'Super discreet packaging and a classy box. The lube is just right – smooth, with no chemical smell at all.',
      via: 'Bought at Durex Official Store',
    },
    {
      name: 'Thu Trang & N.',
      when: '2 weeks ago',
      text: 'My boyfriend says it goes on easily and fits snugly without slipping. You can really feel the warmth.',
      via: 'Bought a Pack of 3 on Lazada Mall',
    },
    {
      name: 'Quốc Bảo (23)',
      when: '3 weeks ago',
      text: 'First time buying online and the courier had no idea what was inside. Genuinely thin and light – will buy again.',
      via: 'Bought a Pack of 12 on Lazada Mall',
    },
  ],
}

export type Category = 'all' | 'pleasure' | 'consent' | 'wellness'

export const CATEGORIES: { id: Category; label: Localized<string> }[] = [
  { id: 'all', label: { vi: 'Tất cả', en: 'All Guides' } },
  { id: 'pleasure', label: { vi: 'Khoái cảm & Kỹ thuật', en: 'Pleasure & Technique' } },
  { id: 'consent', label: { vi: 'Giao tiếp & Đồng thuận', en: 'Communication & Consent' } },
  { id: 'wellness', label: { vi: 'Sức khỏe & An toàn', en: 'Wellness & Safety' } },
]

type ArticleText = { title: string; excerpt: string; takeaway: string; body: { h?: string; p: string }[] }

export type Article = {
  id: string
  category: Exclude<Category, 'all'>
  minutes: number
  img: string
  likes: number
  text: Localized<ArticleText>
}

export const ARTICLES: Article[] = [
  {
    id: 'top-3-tu-the',
    category: 'pleasure',
    minutes: 4,
    img: '/assets/ad-more-play.webp',
    likes: 2310,
    text: {
      vi: {
        title: 'Top 3 tư thế để cuộc yêu “nhẹ tênh”, sâu sắc từng điểm chạm',
        excerpt:
          'Khám phá những tư thế kết hợp cùng dòng bao siêu mỏng Fetherlite, giúp tối đa hoá sự gắn kết cơ thể mà không tốn quá nhiều sức lực.',
        takeaway: 'Tư thế nâng cao hông góc 30 độ kết hợp nhịp thở chậm giúp kích thích sâu đồng điệu, tạo cảm giác lơ lửng như bay bổng.',
        body: [
          { p: 'Sự “nhẹ nhàng” không nằm ở việc làm ít đi, mà ở việc cả hai cùng thả lỏng và cảm nhận nhiều hơn. Dưới đây là 3 gợi ý giúp hai bạn kết nối sâu mà không mỏi mệt.' },
          { h: '1. Thìa ôm (Spooning)', p: 'Nằm nghiêng ôm nhau từ phía sau – nhịp chậm, da kề da tối đa. Rất hợp cho buổi sáng lười biếng hay khi cả hai đã mệt.' },
          { h: '2. Hoa sen (Lotus)', p: 'Ngồi đối diện, ôm lấy nhau và giữ ánh mắt. Chuyển động nhỏ nhưng cảm xúc lớn – hơi thở đồng điệu là chìa khoá.' },
          { h: '3. Nâng hông 30°', p: 'Kê một chiếc gối mỏng dưới hông giúp góc chạm tự nhiên hơn. Kết hợp nhịp thở chậm tạo cảm giác lơ lửng như bay bổng.' },
          { p: 'Mẹo nhỏ: bao siêu mỏng như Fetherlite giúp truyền nhiệt tốt hơn, nhưng vẫn nên dùng thêm gel gốc nước nếu cảm thấy khô.' },
        ],
      },
      en: {
        title: 'Top 3 positions for a “light as air” moment that goes deep',
        excerpt:
          'Positions that pair perfectly with ultra-thin Fetherlite – maximum closeness, minimum effort.',
        takeaway: 'Raising the hips about 30° and slowing your breathing creates deep, in-sync stimulation – like floating.',
        body: [
          { p: 'Being “light” isn’t about doing less – it’s about both of you relaxing and feeling more. Here are 3 ideas for deep connection without the fatigue.' },
          { h: '1. Spooning', p: 'Lie on your sides, wrapped up from behind – slow rhythm, maximum skin-to-skin. Perfect for lazy mornings or when you’re both tired.' },
          { h: '2. Lotus', p: 'Sit facing each other, hold on and keep eye contact. Small movements, big feelings – breathing in sync is the key.' },
          { h: '3. The 30° hip lift', p: 'A thin pillow under the hips makes the angle feel more natural. Add slow breathing for that floating sensation.' },
          { p: 'Tip: ultra-thin condoms like Fetherlite transfer warmth better, but add a water-based lube if things feel dry.' },
        ],
      },
    },
  },
  {
    id: 'mo-loi-dung-bao',
    category: 'consent',
    minutes: 3,
    img: '/assets/ad-feel-closer.webp',
    likes: 1400,
    text: {
      vi: {
        title: 'Nghệ thuật mở lời dùng “áo mưa” không sượng trân',
        excerpt: 'Biến khoảnh khắc bảo vệ sức khỏe thành một phần quyến rũ của khúc dạo đầu qua những câu thoại tự nhiên và tâm lý.',
        takeaway: 'Nhắc chuyện dùng bao từ trước – bằng một tin nhắn nhẹ nhàng – giúp cả hai chủ động và không bị gián đoạn cảm xúc.',
        body: [
          { p: '“Sự tự tin khi chuẩn bị bao cao su không làm giảm cảm xúc; ngược lại, nó thể hiện sự tôn trọng tuyệt đối và bản lĩnh của người trưởng thành.” — Chuyên gia Tâm lý & Sức khỏe Tình dục Durex Care' },
          { h: 'Nói trước, đừng đợi “đến lúc”', p: 'Một tin nhắn nhẹ nhàng trong ngày như “Tối nay mình mang Fetherlite nhé?” giúp cả hai chủ động và không bị gián đoạn cảm xúc.' },
          { h: 'Biến nó thành trò chơi', p: 'Để nửa kia tự tay giúp bạn đeo bao – vừa an toàn vừa là một phần của màn dạo đầu.' },
          { h: 'Câu thoại gợi ý', p: '“Anh/em muốn mình được thả lỏng hoàn toàn, mà muốn vậy thì phải an toàn trước đã.”' },
        ],
      },
      en: {
        title: 'How to bring up condoms without the awkwardness',
        excerpt: 'Turn protection into a sexy part of foreplay with natural, thoughtful lines.',
        takeaway: 'Mention condoms ahead of time – a light text is enough – so you’re both prepared and the mood never breaks.',
        body: [
          { p: '“Being confident about having a condom ready doesn’t kill the mood – it shows complete respect and maturity.” — Durex Care Sexual Health & Psychology Expert' },
          { h: 'Say it early – don’t wait for “the moment”', p: 'A casual text during the day like “Bringing Fetherlite tonight?” keeps you both in control and the mood uninterrupted.' },
          { h: 'Make it playful', p: 'Let your partner help put it on – safe, and part of the foreplay.' },
          { h: 'A line to try', p: '“I want us to be able to fully let go – and that starts with being safe.”' },
        ],
      },
    },
  },
  {
    id: 'consent-chia-khoa',
    category: 'wellness',
    minutes: 5,
    img: '/assets/ad-better-together.webp',
    likes: 1870,
    text: {
      vi: {
        title: 'Sự đồng thuận (Consent) – Chìa khóa thăng hoa',
        excerpt: 'Khi cả hai cùng cảm thấy an toàn và được lắng nghe, mọi giác quan sẽ mở rộng để đón nhận thăng hoa mãnh liệt nhất.',
        takeaway: 'Đồng thuận là cuộc trò chuyện liên tục – bằng lời, ánh mắt và cơ thể – chứ không phải một câu hỏi một lần.',
        body: [
          { p: 'Đồng thuận không phải là một câu hỏi một lần, mà là cuộc trò chuyện liên tục – bằng lời, bằng ánh mắt và bằng cơ thể.' },
          { h: 'Quy tắc Đèn Giao Thông', p: 'Quy ước tín hiệu đỏ – vàng – xanh: “xanh” là tiếp tục, “vàng” là chậm lại, “đỏ” là dừng ngay. Đơn giản và không ai phải ngại.' },
          { h: 'Lắng nghe ánh mắt', p: '90% phản hồi đến từ ngôn ngữ hình thể và tiếng thở. Hãy để ý và hỏi lại khi không chắc.' },
          { h: 'Có quyền đổi ý', p: '“Có” lúc trước không có nghĩa là “có” mãi mãi. Tôn trọng mọi thay đổi là nền tảng của sự tin tưởng.' },
        ],
      },
      en: {
        title: 'Consent – the key to real pleasure',
        excerpt: 'When you both feel safe and heard, every sense opens up to the most intense pleasure.',
        takeaway: 'Consent is an ongoing conversation – with words, eyes and body – not a one-time question.',
        body: [
          { p: 'Consent isn’t a one-time question. It’s an ongoing conversation – in words, in eye contact and in body language.' },
          { h: 'The traffic-light rule', p: 'Agree on red – yellow – green: green means keep going, yellow means slow down, red means stop now. Simple, and nobody has to feel awkward.' },
          { h: 'Read the eyes', p: '90% of feedback comes from body language and breathing. Pay attention, and ask again when you’re not sure.' },
          { h: 'Changing your mind is OK', p: 'A “yes” earlier doesn’t mean “yes” forever. Respecting every change is the foundation of trust.' },
        ],
      },
    },
  },
  {
    id: 'kham-pha-cung-nhau',
    category: 'pleasure',
    minutes: 4,
    img: '/assets/ad-explore-together.webp',
    likes: 980,
    text: {
      vi: {
        title: 'Khám phá cùng nhau: ý tưởng hẹn hò làm mới cảm xúc',
        excerpt: 'Từ buổi picnic ngắm mây đến đêm massage tại gia – những gợi ý giúp hai bạn “cất cánh” khỏi lối mòn.',
        takeaway: 'Thân mật bắt đầu từ trước khi bước vào phòng ngủ.',
        body: [
          { p: 'Thân mật bắt đầu từ trước khi bước vào phòng ngủ. Thử ngay vài ý tưởng sau:' },
          { h: 'Đêm massage', p: 'Nến thơm, nhạc nhẹ và 20 phút thư giãn cho nhau – không vội vàng.' },
          { h: 'Picnic ngắm mây', p: 'Một buổi chiều nằm ngắm trời, kể nhau nghe về những điều mình thích.' },
          { h: 'Thư tay bí mật', p: 'Viết cho nhau một điều muốn thử – và cùng nhau quyết định.' },
        ],
      },
      en: {
        title: 'Explore together: date ideas to refresh the spark',
        excerpt: 'From cloud-watching picnics to an at-home massage night – ideas to help you both take off from routine.',
        takeaway: 'Intimacy starts long before the bedroom.',
        body: [
          { p: 'Intimacy starts long before the bedroom. Try a few of these:' },
          { h: 'Massage night', p: 'Scented candles, soft music and 20 unhurried minutes for each other.' },
          { h: 'Cloud-watching picnic', p: 'An afternoon lying under the sky, telling each other what you love.' },
          { h: 'Secret notes', p: 'Write each other one thing you’d like to try – and decide together.' },
        ],
      },
    },
  },
  {
    id: 'chon-gel',
    category: 'wellness',
    minutes: 3,
    img: '/assets/ad-small-moments.webp',
    likes: 760,
    text: {
      vi: {
        title: 'Chọn gel bôi trơn đúng cách cho bao siêu mỏng',
        excerpt: 'Gốc nước, gốc silicone hay gốc dầu? Hiểu đúng để vừa êm ái vừa an toàn cho bao cao su latex.',
        takeaway: 'Chỉ dùng gel gốc nước hoặc silicone với bao latex – tuyệt đối tránh dầu.',
        body: [
          { p: 'Bôi trơn đúng giúp giảm ma sát, tăng khoái cảm và giảm nguy cơ rách bao.' },
          { h: 'Nên dùng', p: 'Gel gốc nước (Durex Play Classic, Aloe Vera, Warming) hoặc gel gốc silicone y tế.' },
          { h: 'Tuyệt đối tránh', p: 'Vaseline, dầu dừa, lotion dưỡng thể – chất béo làm phân rã latex chỉ sau khoảng 60 giây.' },
        ],
      },
      en: {
        title: 'Choosing the right lube for ultra-thin condoms',
        excerpt: 'Water, silicone or oil-based? Get it right for comfort – and for latex safety.',
        takeaway: 'Only use water- or silicone-based lube with latex – never oil.',
        body: [
          { p: 'The right lube reduces friction, increases pleasure and lowers the risk of breakage.' },
          { h: 'Use', p: 'Water-based gels (Durex Play Classic, Aloe Vera, Warming) or medical-grade silicone gels.' },
          { h: 'Never use', p: 'Vaseline, coconut oil or body lotion – oils break down latex in about 60 seconds.' },
        ],
      },
    },
  },
  {
    id: 'loi-noi-nho',
    category: 'consent',
    minutes: 2,
    img: '/assets/ad-play-your-way.webp',
    likes: 640,
    text: {
      vi: {
        title: 'Những lời nói nhỏ khiến người ấy thấy an toàn',
        excerpt: 'Một câu hỏi thăm đúng lúc có sức mạnh hơn mọi màn dạo đầu.',
        takeaway: 'Những câu hỏi ngắn giúp người kia biết họ đang được lắng nghe.',
        body: [
          { p: '“Em thấy ổn không?”, “Mình chậm lại nhé?”, “Anh thích như vậy không?” – những câu ngắn giúp người kia biết họ đang được lắng nghe.' },
          { h: 'Sau cuộc yêu', p: 'Đừng quên dành vài phút ôm nhau và chia sẻ cảm nhận. Đó là lúc sự gắn kết được “neo” lại.' },
        ],
      },
      en: {
        title: 'Small words that make your partner feel safe',
        excerpt: 'A well-timed check-in is more powerful than any foreplay.',
        takeaway: 'Short questions let your partner know they’re being heard.',
        body: [
          { p: '“Are you okay?”, “Should we slow down?”, “Do you like that?” – short questions that let your partner know they’re being heard.' },
          { h: 'Afterwards', p: 'Take a few minutes to cuddle and share how it felt. That’s when your connection gets anchored.' },
        ],
      },
    },
  },
]

export const QUIZ: Localized<{ q: string; options: { label: string; score: ProductId }[] }[]> = {
  vi: [
    {
      q: 'Bạn ưu tiên điều gì nhất?',
      options: [
        { label: 'Cảm giác chân thật, mỏng nhẹ', score: 'fetherlite' },
        { label: 'Ôm khít, an tâm tuyệt đối', score: 'classic' },
        { label: 'Thêm kích thích mới lạ', score: 'pleasuremax' },
        { label: 'Kéo dài thời gian', score: 'performa' },
      ],
    },
    {
      q: 'Buổi hẹn lý tưởng của hai bạn?',
      options: [
        { label: 'Nhẹ nhàng, lãng mạn', score: 'fetherlite' },
        { label: 'Quen thuộc, ấm áp', score: 'classic' },
        { label: 'Phiêu lưu, bất ngờ', score: 'pleasuremax' },
        { label: 'Chậm rãi, không vội', score: 'performa' },
      ],
    },
    {
      q: 'Một từ mô tả “cuộc yêu” bạn muốn?',
      options: [
        { label: 'Bay bổng', score: 'fetherlite' },
        { label: 'Tin tưởng', score: 'classic' },
        { label: 'Bùng nổ', score: 'pleasuremax' },
        { label: 'Bền bỉ', score: 'performa' },
      ],
    },
  ],
  en: [
    {
      q: 'What matters most to you?',
      options: [
        { label: 'A natural, ultra-thin feel', score: 'fetherlite' },
        { label: 'A close fit and total peace of mind', score: 'classic' },
        { label: 'Something new and stimulating', score: 'pleasuremax' },
        { label: 'Making it last longer', score: 'performa' },
      ],
    },
    {
      q: 'Your ideal date?',
      options: [
        { label: 'Soft and romantic', score: 'fetherlite' },
        { label: 'Familiar and cozy', score: 'classic' },
        { label: 'Adventurous and surprising', score: 'pleasuremax' },
        { label: 'Slow and unhurried', score: 'performa' },
      ],
    },
    {
      q: 'One word for the intimacy you want?',
      options: [
        { label: 'Weightless', score: 'fetherlite' },
        { label: 'Trust', score: 'classic' },
        { label: 'Explosive', score: 'pleasuremax' },
        { label: 'Lasting', score: 'performa' },
      ],
    },
  ],
}

export const LEADERBOARD: { name: string; balloon: Localized<string>; meters: number; shares: number }[] = [
  { name: 'Minh Khang & Thu Uyên', balloon: { vi: 'Bóng hạc hồng', en: 'Pink crane' }, meters: 3420, shares: 128 },
  { name: 'Hoàng Nam S.', balloon: { vi: 'Bóng hươu xanh', en: 'Blue giraffe' }, meters: 2890, shares: 96 },
  { name: 'Linh Đan & Huy', balloon: { vi: 'Bóng thỏ hồng', en: 'Pink bunny' }, meters: 2640, shares: 84 },
  { name: 'Bảo Ngọc', balloon: { vi: 'Bóng tim xanh', en: 'Blue heart' }, meters: 2310, shares: 61 },
  { name: 'Tuấn & Vy', balloon: { vi: 'Bóng thỏ xanh', en: 'Blue bunny' }, meters: 2105, shares: 57 },
  { name: 'Khánh Linh', balloon: { vi: 'Bóng tim hồng', en: 'Pink heart' }, meters: 1980, shares: 44 },
  { name: 'Đức Anh', balloon: { vi: 'Bóng hươu xanh', en: 'Blue giraffe' }, meters: 1760, shares: 39 },
]

export type PolicyKind = 'privacy' | 'terms' | 'delivery' | 'rules'

export const POLICIES: Localized<Record<PolicyKind, { title: string; sections: { h?: string; p: string }[] }>> = {
  vi: {
    privacy: {
      title: 'Chính sách bảo mật',
      sections: [
        { p: 'Durex tôn trọng tuyệt đối quyền riêng tư của bạn. Microsite này chỉ thu thập thông tin tối thiểu cần thiết để gửi ưu đãi và phản hồi thắc mắc.' },
        { h: 'Thông tin thu thập', p: 'Họ tên và email/số điện thoại khi bạn nhận E-Voucher; nội dung câu hỏi khi bạn gửi thắc mắc ẩn danh (không bắt buộc danh tính).' },
        { h: 'Mục đích sử dụng', p: 'Gửi mã ưu đãi, cẩm nang sức khỏe (nếu bạn đồng ý) và phản hồi từ chuyên gia. Không chia sẻ cho bên thứ ba vì mục đích quảng cáo.' },
        { h: 'Lưu trữ & xoá', p: 'Lịch sử chat ẩn danh tự xoá sau 24 giờ. Bạn có thể yêu cầu xoá dữ liệu bất cứ lúc nào qua hotline 1800 1088.' },
      ],
    },
    terms: {
      title: 'Điều khoản sử dụng',
      sections: [
        { p: 'Nội dung trên microsite dành cho người từ 18 tuổi trở lên và mang tính giáo dục, tham khảo – không thay thế tư vấn y khoa.' },
        { h: 'Sử dụng hợp lệ', p: 'Không sử dụng microsite cho mục đích gian lận, spam hoặc gây ảnh hưởng tới trải nghiệm của người dùng khác.' },
        { h: 'Sở hữu trí tuệ', p: 'Hình ảnh, nhãn hiệu Durex và nội dung chiến dịch thuộc quyền sở hữu của Reckitt. Vui lòng không sao chép khi chưa được phép.' },
      ],
    },
    delivery: {
      title: 'Chính sách giao hàng kín đáo',
      sections: [
        { p: 'Mọi đơn hàng mua qua kênh chính hãng được đóng gói bảo mật 100%.' },
        { h: 'Đóng gói', p: 'Hộp carton trơn, không logo, không in tên sản phẩm; dán tem niêm phong chống can thiệp.' },
        { h: 'Hoá đơn & nhãn vận chuyển', p: 'Chỉ ghi “Phụ kiện tiêu dùng cá nhân”. Người giao hàng không biết nội dung bên trong.' },
        { h: 'Thời gian', p: 'Giao hoả tốc 2 giờ tại nội thành Hà Nội & TP.HCM; 1–3 ngày với các tỉnh thành khác.' },
      ],
    },
    rules: {
      title: 'Thể lệ “Bơm bóng nhận quà”',
      sections: [
        { h: 'Thời gian', p: 'Từ 20/10/2026 đến hết 31/12/2026. Chương trình dành cho người từ 18 tuổi trở lên, cư trú tại Việt Nam.' },
        { h: 'Cách chơi', p: 'Nhấn giữ để bơm bóng. Thả bóng khi áp suất trong vùng 70–92% để nhân đôi độ cao. Bơm quá 100% bóng sẽ nổ và không được tính điểm.' },
        { h: 'Giải thưởng', p: 'Mọi người chơi hoàn thành ít nhất 1 lượt bay nhận E-Voucher 20% cho Durex Fetherlite. Top 3 Bảng Vàng mỗi ngày nhận thêm voucher 50% / 30% / 20%.' },
        { h: 'Xếp hạng', p: 'Bảng Vàng xếp theo tổng độ cao bay trong ngày. Trường hợp bằng điểm, ưu tiên người có nhiều lượt chia sẻ hơn.' },
        { h: 'Lưu ý', p: 'Mỗi email/số điện thoại nhận tối đa 1 voucher. Durex có quyền huỷ kết quả nếu phát hiện gian lận.' },
      ],
    },
  },
  en: {
    privacy: {
      title: 'Privacy Policy',
      sections: [
        { p: 'Durex fully respects your privacy. This microsite only collects the minimum information needed to send offers and answer your questions.' },
        { h: 'What we collect', p: 'Your name and email/phone when you claim an E-Voucher; your question when you send an anonymous enquiry (no identity required).' },
        { h: 'How we use it', p: 'To send voucher codes, health guides (if you opt in) and expert replies. Never shared with third parties for advertising.' },
        { h: 'Storage & deletion', p: 'Anonymous chat history is deleted automatically after 24 hours. You can request deletion at any time via the 1800 1088 hotline.' },
      ],
    },
    terms: {
      title: 'Terms of Use',
      sections: [
        { p: 'Content on this microsite is for adults aged 18+ and is educational – it does not replace medical advice.' },
        { h: 'Acceptable use', p: 'Do not use the microsite for fraud, spam or anything that affects other users’ experience.' },
        { h: 'Intellectual property', p: 'Images, the Durex trademark and campaign content are owned by Reckitt. Please do not copy without permission.' },
      ],
    },
    delivery: {
      title: 'Discreet Delivery Policy',
      sections: [
        { p: 'Every order placed through official channels is packed with 100% privacy.' },
        { h: 'Packaging', p: 'Plain carton with no logo or product name, sealed with tamper-evident tape.' },
        { h: 'Invoice & shipping label', p: 'Only states “Personal consumer accessories”. The courier never knows what’s inside.' },
        { h: 'Timing', p: '2-hour express delivery in inner Hanoi & Ho Chi Minh City; 1–3 days elsewhere.' },
      ],
    },
    rules: {
      title: '“Pump & Win” Official Rules',
      sections: [
        { h: 'Period', p: 'From 20 Oct 2026 to 31 Dec 2026. Open to residents of Vietnam aged 18 and over.' },
        { h: 'How to play', p: 'Press and hold to inflate. Release while the pressure is in the 70–92% zone to double your altitude. Go past 100% and the balloon pops – no points.' },
        { h: 'Prizes', p: 'Everyone who completes at least one flight gets a 20% E-Voucher for Durex Fetherlite. The daily Top 3 on the Hall of Fame also win 50% / 30% / 20% vouchers.' },
        { h: 'Ranking', p: 'The Hall of Fame ranks total altitude for the day. Ties go to the player with more shares.' },
        { h: 'Notes', p: 'One voucher per email/phone number. Durex may void results if cheating is detected.' },
      ],
    },
  },
}

/** Shared UI strings used by layout, sheets and gates. */
export const UI = {
  vi: {
    menuOpen: 'Mở menu',
    menuClose: 'Đóng menu',
    close: 'Đóng',
    buy: 'Mua hàng',
    home: 'Durex – Trang chủ',
    skip: 'Bỏ qua đến nội dung chính',
    campaign: 'Chiến dịch “Nhẹ Như Bay” · Durex Fetherlite',
    language: 'Ngôn ngữ',
    buyTitle: 'Chọn kênh mua chính hãng',
    buySub: 'Đóng gói bảo mật 100% – che tên sản phẩm',
    buyAt: 'Mua tại',
    redirecting: (s: string) => `Đang chuyển tới ${s}…`,
    shareTitle: 'Chia Sẻ Tế Nhị',
    shareSub: 'Gửi kiến thức yêu an toàn đến nửa kia hoặc bạn bè',
    partner: 'Người Thương',
    copy: 'Sao Chép',
    copied: 'Đã Chép!',
    linkCopied: 'Đã sao chép liên kết',
    tiktokHint: 'Đã sao chép link – dán vào TikTok nhé',
    footerAbout: 'Chạm nhẹ yêu sâu. Durex Fetherlite – siêu mỏng, vô hình, cho từng khoảnh khắc thăng hoa an toàn.',
    follow: 'Theo dõi chúng tôi',
    policies: 'Điều khoản & chính sách',
    legal:
      '© 2026 Reckitt Benckiser. Bao cao su giúp phòng tránh thai và giảm nguy cơ lây nhiễm bệnh qua đường tình dục khi sử dụng đúng cách. Đọc kỹ hướng dẫn sử dụng trước khi dùng.',
    ageTitle: 'Bạn đã đủ 18 tuổi chưa?',
    ageBody: 'Microsite này chứa nội dung giáo dục về sức khỏe tình dục, dành cho người từ 18 tuổi trở lên.',
    ageYes: 'Tôi đã đủ 18 tuổi',
    ageNo: 'Chưa đủ 18 tuổi',
    ageBlockedTitle: 'Hẹn gặp lại bạn sau nhé!',
    ageBlockedBody: 'Nội dung này chưa phù hợp với bạn. Nếu cần hỗ trợ về sức khỏe, hãy trò chuyện với bố mẹ, thầy cô hoặc nhân viên y tế đáng tin cậy.',
    ageBack: 'Quay lại',
    loading: 'Đang cất cánh…',
    notFoundTitle: 'Lạc đường trên mây rồi!',
    notFoundBody: 'Trang bạn tìm đã bay đi đâu mất. Quay về trạm cất cánh nhé.',
    backHome: 'Về Trang Chủ',
  },
  en: {
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    close: 'Close',
    buy: 'Shop',
    home: 'Durex – Home',
    skip: 'Skip to main content',
    campaign: '“Light as a Feather” campaign · Durex Fetherlite',
    language: 'Language',
    buyTitle: 'Choose an official store',
    buySub: '100% discreet packaging – product name hidden',
    buyAt: 'Buy on',
    redirecting: (s: string) => `Taking you to ${s}…`,
    shareTitle: 'Share Discreetly',
    shareSub: 'Send safe-love tips to your partner or friends',
    partner: 'My Partner',
    copy: 'Copy',
    copied: 'Copied!',
    linkCopied: 'Link copied',
    tiktokHint: 'Link copied – paste it into TikTok',
    footerAbout: 'Touch lightly, love deeply. Durex Fetherlite – ultra thin, barely there, for every safe and blissful moment.',
    follow: 'Follow us',
    policies: 'Terms & policies',
    legal:
      '© 2026 Reckitt Benckiser. Condoms help prevent pregnancy and reduce the risk of sexually transmitted infections when used correctly. Read the instructions before use.',
    ageTitle: 'Are you 18 or older?',
    ageBody: 'This microsite contains sexual health education intended for adults aged 18 and over.',
    ageYes: 'I’m 18 or older',
    ageNo: 'I’m under 18',
    ageBlockedTitle: 'See you later!',
    ageBlockedBody: 'This content isn’t right for you yet. If you need health support, talk to a parent, teacher or a trusted health worker.',
    ageBack: 'Go back',
    loading: 'Taking off…',
    notFoundTitle: 'Lost in the clouds!',
    notFoundBody: 'The page you’re looking for has floated away. Let’s head back to the departure gate.',
    backHome: 'Back to Home',
  },
} satisfies Localized<Record<string, unknown>>

export const formatVnd = (n: number, lang: Lang = 'vi') => n.toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US') + '₫'
