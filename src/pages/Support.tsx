import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CtaButton, Icon, Reveal, Sheet } from '../components/ui'
import { HeartBalloon } from '../components/Balloons'
import { useApp } from '../components/AppProvider'
import { useLang, useT, useTitle, type Lang } from '../i18n'

const T = {
  vi: {
    title: 'Hỗ Trợ',
    kicker: 'Trung Tâm Trợ Giúp Kín Đáo 100%',
    h1: 'Trạm Hỗ Trợ Kín Đáo',
    lead: 'Không gian an tâm, riêng tư và thấu hiểu mọi thắc mắc yêu thương của bạn.',
    privacyTitle: 'Cam Kết Bảo Mật 100%',
    exclusive: 'Độc Quyền',
    privacyBody: 'Mọi đơn hàng và thông tin hỗ trợ đều được che chắn tuyệt đối khỏi người giao và xung quanh.',
    pack: [
      { t: 'Đóng Hộp Kín', d: 'Không tên sản phẩm' },
      { t: 'Tem Niêm Phong', d: 'Chống can thiệp mở' },
    ],
    invoice: 'Hóa đơn chỉ ghi:',
    invoiceText: '“Phụ kiện tiêu dùng cá nhân”',
    chat: 'Chat Kín 24/7',
    chatSub: 'Không lưu lịch sử',
    hotline: 'Hotline Ẩn Danh',
    hotlineSub: 'Miễn cước 1800 1088',
    faqTitle: 'Câu Hỏi Thường Gặp',
    faqSub: 'Giải đáp chuyên môn & tế nhị',
    trust: ['Xóa log sau 24h', 'Chuyên gia y tế', 'Thân thiện - Cởi mở'],
    chatSheetSub: 'Ẩn danh · Không lưu lịch sử · Tự xoá sau 24h',
    chatHello: 'Chào bạn 👋 Mình là trợ lý Durex. Cuộc trò chuyện này ẩn danh và không lưu lịch sử. Bạn cần hỗ trợ gì?',
    chatDefault: 'Cảm ơn bạn đã chia sẻ. Chuyên gia của Durex sẽ phản hồi trong vài phút – bạn cứ thoải mái hỏi thêm nhé 💙',
    chatPh: 'Nhập câu hỏi ẩn danh…',
    send: 'Gửi',
    quick: [
      { q: 'Tư vấn chọn size', a: 'Bạn có thể đo chu vi khi cương cứng rồi chia đôi – kết quả gần 52–53mm thì Fetherlite là lựa chọn ôm vừa và mỏng nhẹ nhất 💙' },
      { q: 'Giao hàng có kín không?', a: 'Tuyệt đối kín đáo: hộp trơn, không in tên sản phẩm, hóa đơn ghi “Phụ kiện tiêu dùng cá nhân”.' },
      { q: 'Kiểm tra hàng thật', a: 'Quét mã QR trên hộp và đối chiếu số lô in trên từng bao. Tem 7 màu dập nổi ở đáy hộp là dấu hiệu chính hãng.' },
      { q: 'Bao bị rách thì sao?', a: 'Bình tĩnh nhé. Nên dùng thuốc tránh thai khẩn cấp trong 72h và cân nhắc xét nghiệm. Bạn có thể gọi hotline 1800 1088 để được chuyên gia tư vấn riêng.' },
    ],
    formTitle: 'Gửi Thắc Mắc Ẩn Danh',
    formSub: 'Không yêu cầu họ tên hay số điện thoại cá nhân',
    topic: 'Chủ đề cần tư vấn',
    topics: [
      ['size', 'Tư vấn size & cảm giác (Fetherlite / Invisible)'],
      ['order', 'Bảo mật vận chuyển & giao kín'],
      ['authentic', 'Xác thực tem & mã lô hàng'],
      ['health', 'Kiến thức quan hệ tình dục an toàn'],
      ['other', 'Thắc mắc tế nhị khác'],
    ],
    msg: 'Nội dung câu hỏi bí mật',
    msgPh: 'Nhập câu hỏi của bạn tại đây... Chúng tôi mã hóa 100% nội dung trước khi gửi tới chuyên gia.',
    reply: 'Email hoặc Telegram để nhận hồi đáp riêng (tùy chọn)',
    replyPh: 'vd: user_safe@mail.com hoặc @telegram_nick',
    replyHint: 'Nếu để trống, câu trả lời sẽ hiển thị ngẫu nhiên mã tra cứu trên màn hình sau khi gửi.',
    errMsg: 'Câu hỏi cần ít nhất 10 ký tự để chuyên gia hiểu rõ hơn',
    sending: 'Đang mã hoá…',
    submit: 'Gửi Câu Hỏi Ẩn Danh An Toàn',
    sentToast: 'Thắc mắc đã được mã hoá & gửi tới chuyên gia',
    doneTitle: 'Đã gửi an toàn!',
    doneVia: (c: string) => `Chuyên gia sẽ phản hồi riêng qua ${c}.`,
    doneCode: 'Lưu mã tra cứu dưới đây để xem câu trả lời:',
    another: 'Gửi câu hỏi khác',
  },
  en: {
    title: 'Support',
    kicker: '100% Discreet Help Center',
    h1: 'The Discreet Help Desk',
    lead: 'A safe, private space that understands every question about love.',
    privacyTitle: '100% Privacy Promise',
    exclusive: 'Exclusive',
    privacyBody: 'Every order and support request is fully shielded from couriers and everyone around you.',
    pack: [
      { t: 'Sealed Box', d: 'No product name' },
      { t: 'Tamper Seal', d: 'Tamper-evident' },
    ],
    invoice: 'Invoice only says:',
    invoiceText: '“Personal consumer accessories”',
    chat: 'Private Chat 24/7',
    chatSub: 'No history saved',
    hotline: 'Anonymous Hotline',
    hotlineSub: 'Toll-free 1800 1088',
    faqTitle: 'Frequently Asked Questions',
    faqSub: 'Expert, judgement-free answers',
    trust: ['Logs deleted after 24h', 'Medical experts', 'Friendly & open'],
    chatSheetSub: 'Anonymous · No history · Auto-deletes after 24h',
    chatHello: 'Hi there 👋 I’m the Durex assistant. This chat is anonymous and nothing is saved. How can I help?',
    chatDefault: 'Thanks for sharing. A Durex expert will reply in a few minutes – feel free to ask anything else 💙',
    chatPh: 'Type an anonymous question…',
    send: 'Send',
    quick: [
      { q: 'Help me pick a size', a: 'Measure your girth when erect and halve it – if it’s around 52–53mm, Fetherlite is the snuggest, thinnest fit 💙' },
      { q: 'Is delivery discreet?', a: 'Completely: plain box, no product name, and the invoice only says “Personal consumer accessories”.' },
      { q: 'Check authenticity', a: 'Scan the QR code on the box and match the lot number printed on each condom. The embossed 7-colour seal under the box confirms it’s genuine.' },
      { q: 'What if it breaks?', a: 'Stay calm. Consider emergency contraception within 72 hours and an STI test. Call the 1800 1088 hotline for private expert advice.' },
    ],
    formTitle: 'Ask Anonymously',
    formSub: 'No name or phone number required',
    topic: 'Topic',
    topics: [
      ['size', 'Size & feel advice (Fetherlite / Invisible)'],
      ['order', 'Shipping privacy & discreet delivery'],
      ['authentic', 'Seal & lot-number verification'],
      ['health', 'Safe-sex knowledge'],
      ['other', 'Other sensitive questions'],
    ],
    msg: 'Your private question',
    msgPh: 'Type your question here… We encrypt 100% of it before it reaches our experts.',
    reply: 'Email or Telegram for a private reply (optional)',
    replyPh: 'e.g. user_safe@mail.com or @telegram_nick',
    replyHint: 'Leave it blank and you’ll get a lookup code on screen after sending.',
    errMsg: 'Please write at least 10 characters so our experts can help',
    sending: 'Encrypting…',
    submit: 'Send My Question Anonymously',
    sentToast: 'Your question was encrypted & sent to our experts',
    doneTitle: 'Sent securely!',
    doneVia: (c: string) => `An expert will reply privately via ${c}.`,
    doneCode: 'Save this lookup code to see the answer:',
    another: 'Ask another question',
  },
}

type Faq = { icon: string; iconC: string; q: string; a: ReactNode }

function faqs(lang: Lang): Faq[] {
  const vi = lang === 'vi'
  const sizes: [string, string][] = vi
    ? [
        ['52.5 mm', 'Ôm sát tiêu chuẩn (vd: Fetherlite, Classic)'],
        ['53 mm', 'Phổ thông êm dịu (vd: Invisible)'],
        ['56 mm', 'Thoải mái cực đại (vd: XL, Comfort)'],
      ]
    : [
        ['52.5 mm', 'Standard snug fit (e.g. Fetherlite, Classic)'],
        ['53 mm', 'Everyday comfort (e.g. Invisible)'],
        ['56 mm', 'Maximum room (e.g. XL, Comfort)'],
      ]
  return [
    {
      icon: 'straighten',
      iconC: 'text-tertiary-container',
      q: vi ? 'Làm sao chọn kích thước bao cao su vừa vặn nhất?' : 'How do I choose the right condom size?',
      a: (
        <>
          <p>
            {vi ? 'Durex sử dụng đơn vị ' : 'Durex sizes use '}
            <strong>{vi ? 'Độ rộng danh định (Nominal Width)' : 'Nominal Width'}</strong>:
          </p>
          <div className="grid grid-cols-3 gap-2 pt-1 text-center text-label-sm">
            {sizes.map(([s, d]) => (
              <div key={s} className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-2">
                <span className="block text-label-md font-bold text-primary">{s}</span>
                <span className="font-medium text-on-surface-variant">{d}</span>
              </div>
            ))}
          </div>
          <p className="pt-1 text-[13px] text-on-surface-variant">
            {vi
              ? '*Mẹo nhỏ: Chu vi cương cứng chia đôi sẽ tương đương xấp xỉ kích thước danh định phù hợp để tránh trượt hoặc siết nghẹt.'
              : '*Tip: half your erect girth is roughly the nominal width that fits without slipping or feeling tight.'}
          </p>
        </>
      ),
    },
    {
      icon: 'qr_code_scanner',
      iconC: 'text-primary',
      q: vi ? 'Phân biệt Durex chính hãng và hàng giả như thế nào?' : 'How can I tell genuine Durex from fakes?',
      a: (
        <>
          <p>
            {vi
              ? 'Tất cả sản phẩm Durex chính ngạch tại Việt Nam được bảo vệ qua 3 bước kiểm tra:'
              : 'Every official Durex product in Vietnam can be checked in 3 steps:'}
          </p>
          <ul className="list-disc space-y-1 pl-5 text-[14px] text-on-surface-variant">
            <li>
              <strong>{vi ? 'Tem Chống Giả 7 Màu:' : '7-colour hologram seal:'}</strong>{' '}
              {vi ? 'Dập nổi công nghệ quang học dưới đáy hoặc bên hông hộp.' : 'Embossed optical seal on the bottom or side of the box.'}
            </li>
            <li>
              <strong>{vi ? 'Mã QR Truy Xuất:' : 'Traceable QR code:'}</strong>{' '}
              {vi
                ? 'Quét camera để kiểm tra số lô (Lot Number) và hạn dùng trùng khớp trên từng phôi riêng lẻ.'
                : 'Scan it to check that the lot number and expiry match each individual foil.'}
            </li>
            <li>
              <strong>{vi ? 'Chất liệu bao bì:' : 'Packaging quality:'}</strong>{' '}
              {vi ? 'Mép ép nhiệt sắc sảo, phông chữ in date laser rõ nét, không nhòe mực.' : 'Crisp heat-sealed edges and sharp, smudge-free laser-printed dates.'}
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: 'water_drop',
      iconC: 'text-tertiary-container',
      q: vi ? 'Gel bôi trơn nào an toàn tuyệt đối khi dùng kèm Fetherlite?' : 'Which lubes are safe to use with Fetherlite?',
      a: (
        <>
          <p className="text-[14px] text-on-surface-variant">
            {vi ? (
              <>
                Dòng siêu mỏng <strong>Fetherlite</strong> được làm từ cao su tự nhiên cao cấp. Bạn <strong>NÊN DÙNG</strong> các loại gel gốc nước như{' '}
                <em>Durex Play Classic, Aloe Vera hoặc Warming</em>, hoặc gel gốc silicone y tế.
              </>
            ) : (
              <>
                Ultra-thin <strong>Fetherlite</strong> is made from premium natural latex. <strong>DO USE</strong> water-based gels like{' '}
                <em>Durex Play Classic, Aloe Vera or Warming</em>, or medical-grade silicone gels.
              </>
            )}
          </p>
          <div className="flex items-start gap-2 rounded-2xl bg-error-container/60 p-2.5 text-label-sm text-on-error-container">
            <Icon name="warning" className="shrink-0 text-[18px]" />
            <span>
              <strong>{vi ? 'CẢNH BÁO:' : 'WARNING:'}</strong>{' '}
              {vi
                ? 'Tuyệt đối không dùng chất bôi trơn gốc dầu (Vaseline, dầu dừa, lotion dưỡng thể) vì sẽ làm phân rã mủ cao su latex chỉ sau 60 giây.'
                : 'Never use oil-based lubricants (Vaseline, coconut oil, body lotion) – they break down latex in as little as 60 seconds.'}
            </span>
          </div>
        </>
      ),
    },
    {
      icon: 'local_shipping',
      iconC: 'text-primary',
      q: vi ? 'Đơn hàng có bị lộ tên sản phẩm khi giao không?' : 'Will the product name show on my delivery?',
      a: (
        <p className="text-[14px] text-on-surface-variant">
          {vi
            ? 'Không. Mọi đơn hàng được đóng trong hộp carton trơn, dán tem niêm phong. Hóa đơn và nhãn vận chuyển chỉ ghi “Phụ kiện tiêu dùng cá nhân”. Người giao hàng không biết nội dung bên trong.'
            : 'No. Every order ships in a plain, sealed carton. The invoice and shipping label only say “Personal consumer accessories”, so the courier never knows what’s inside.'}
        </p>
      ),
    },
    {
      icon: 'event',
      iconC: 'text-tertiary-container',
      q: vi ? 'Bảo quản bao cao su thế nào để không giảm chất lượng?' : 'How should I store condoms?',
      a: (
        <p className="text-[14px] text-on-surface-variant">
          {vi
            ? 'Để nơi khô ráo, nhiệt độ phòng, tránh ánh nắng trực tiếp. Không để lâu trong ví hoặc túi quần sau vì ma sát và nhiệt độ cơ thể có thể làm hỏng bao. Luôn kiểm tra hạn sử dụng trước khi dùng.'
            : 'Keep them somewhere dry at room temperature, away from direct sunlight. Don’t leave them in a wallet or back pocket for long – friction and body heat can damage them. Always check the expiry date.'}
        </p>
      ),
    },
  ]
}

function Accordion() {
  const { lang } = useLang()
  const list = faqs(lang)
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-3">
      {list.map((f, i) => {
        const isOpen = open === i
        const panelId = `faq-panel-${i}`
        return (
          <motion.div
            key={i}
            layout
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-lg border border-white/70 p-4 backdrop-blur-lg transition-colors duration-200 ${isOpen ? 'bg-white/75 shadow-cloud' : 'bg-white/40'}`}
          >
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between text-left font-bold text-primary"
              >
                <span className="flex items-center gap-2 pr-2 text-label-lg">
                  <Icon name={f.icon} className={`text-[18px] ${f.iconC}`} />
                  {f.q}
                </span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="shrink-0">
                  <Icon name="expand_more" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2 border-t border-surface-container/60 pt-3 text-body-md text-on-surface">{f.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

type Msg = { from: 'bot' | 'me'; text: string }

function ChatSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT(T)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  const send = (text: string, reply?: string) => {
    if (!text.trim()) return
    setMsgs((m) => [...m, { from: 'me', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { from: 'bot', text: reply ?? t.chatDefault }])
    }, 1100)
  }

  // Greeting follows the current language; the rest is the conversation.
  const all: Msg[] = [{ from: 'bot', text: t.chatHello }, ...msgs]

  return (
    <Sheet open={open} onClose={onClose} title={t.chat} subtitle={t.chatSheetSub}>
      <div aria-live="polite" className="no-scrollbar -mx-2 mb-3 h-[46dvh] space-y-2.5 overflow-y-auto px-2 md:h-80">
        {all.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-3xl px-4 py-2.5 text-sm ${
                m.from === 'me' ? 'rounded-br-md bg-primary text-white' : 'rounded-bl-md bg-surface-container-low text-on-surface'
              }`}
            >
              {m.text}
            </div>
          </motion.div>
        ))}
        {typing && (
          <div className="flex w-fit gap-1 rounded-3xl rounded-bl-md bg-surface-container-low px-4 py-3">
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="h-2 w-2 rounded-full bg-outline"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
              />
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="no-scrollbar -mx-6 mb-3 flex gap-2 overflow-x-auto px-6">
        {t.quick.map((q) => (
          <button
            key={q.q}
            onClick={() => send(q.q, q.a)}
            className="shrink-0 rounded-full border border-primary/30 bg-primary-fixed/60 px-3 py-1.5 text-xs font-semibold text-primary active:scale-95"
          >
            {q.q}
          </button>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
        className="flex items-center gap-2 rounded-full border border-outline-variant/40 bg-surface-container-low p-1.5"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.chatPh}
          aria-label={t.chatPh}
          className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
        />
        <button type="submit" aria-label={t.send} className="flex h-9 w-9 items-center justify-center rounded-full bg-crimson text-white active:scale-90">
          <Icon name="send" className="text-lg" />
        </button>
      </form>
    </Sheet>
  )
}

function EnquiryForm() {
  const t = useT(T)
  const { toast } = useApp()
  const [topic, setTopic] = useState('size')
  const [msg, setMsg] = useState('')
  const [contact, setContact] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [code, setCode] = useState('')
  const [err, setErr] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (msg.trim().length < 10) {
      setErr(true)
      return
    }
    setErr(false)
    setState('sending')
    setTimeout(() => {
      setCode('DX-' + Math.random().toString(36).slice(2, 6).toUpperCase() + '-' + Math.floor(100 + Math.random() * 900))
      setState('done')
      toast(t.sentToast, 'lock')
    }, 1600)
  }

  const reset = () => {
    setMsg('')
    setContact('')
    setState('idle')
  }

  const field =
    'w-full border border-surface-variant bg-white/80 text-[14px] text-on-surface outline-none placeholder:text-outline focus:bg-white focus:ring-2 focus:ring-primary'

  return (
    <section className="rounded-lg border border-white/80 bg-white/45 p-5 shadow-cloud backdrop-blur-xl md:p-6">
      <div className="mb-2 flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <Icon name="mail_lock" className="text-[18px]" />
        </div>
        <div>
          <h2 className="text-headline-md font-bold text-primary">{t.formTitle}</h2>
          <p className="text-label-sm text-on-surface-variant">{t.formSub}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {state !== 'done' ? (
          <motion.form key="form" exit={{ opacity: 0, y: -10 }} className="mt-4 space-y-3.5" onSubmit={submit} noValidate>
            <div>
              <label htmlFor="topic" className="mb-1 block text-label-md text-on-surface">
                {t.topic}
              </label>
              <div className="relative">
                <select
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className={`${field} appearance-none rounded-full px-4 py-2.5 pr-10`}
                >
                  {t.topics.map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
                <Icon name="arrow_drop_down" className="pointer-events-none absolute top-2.5 right-3 text-on-surface-variant" />
              </div>
            </div>
            <div>
              <label htmlFor="msg" className="mb-1 flex justify-between text-label-md text-on-surface">
                <span>{t.msg}</span>
                <span className={`text-label-sm ${msg.length > 480 ? 'text-secondary' : 'text-on-surface-variant'}`}>{msg.length}/500</span>
              </label>
              <textarea
                id="msg"
                rows={3}
                maxLength={500}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={t.msgPh}
                aria-invalid={err || undefined}
                aria-describedby={err ? 'msg-err' : undefined}
                className={`${field} resize-none rounded-lg p-3`}
              />
            </div>
            <div>
              <label htmlFor="reply" className="mb-1 block text-label-md text-on-surface">
                {t.reply}
              </label>
              <div className="relative">
                <Icon name="alternate_email" className="absolute top-2.5 left-3 text-[18px] text-on-surface-variant" />
                <input
                  id="reply"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={t.replyPh}
                  className={`${field} rounded-full py-2 pr-4 pl-10`}
                />
              </div>
              <p className="mt-1 text-[11px] text-on-surface-variant italic">{t.replyHint}</p>
            </div>
            {err && (
              <p id="msg-err" role="alert" className="flex items-center gap-1.5 text-xs font-semibold text-secondary">
                <Icon name="error" className="text-sm" /> {t.errMsg}
              </p>
            )}
            <div className="pt-2">
              <CtaButton type="submit" disabled={state === 'sending'} className="w-full px-6 py-3 text-label-lg">
                {state === 'sending' ? (
                  <>
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="inline-flex">
                      <Icon name="progress_activity" className="text-[20px]" />
                    </motion.span>
                    {t.sending}
                  </>
                ) : (
                  <>
                    <Icon name="send" className="text-[20px]" /> {t.submit}
                  </>
                )}
              </CtaButton>
            </div>
          </motion.form>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 text-center" role="status">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 14 }}
              className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
            >
              <Icon name="verified_user" fill className="text-3xl" />
            </motion.div>
            <h3 className="text-headline-md text-primary">{t.doneTitle}</h3>
            <p className="mt-1 text-sm text-on-surface-variant">{contact ? t.doneVia(contact) : t.doneCode}</p>
            <div className="mx-auto mt-3 w-fit rounded-full border-2 border-dashed border-primary/40 bg-primary-fixed/50 px-6 py-2 font-mono text-lg font-bold tracking-widest text-primary">
              {code}
            </div>
            <button onClick={reset} className="mt-4 text-label-md font-bold text-primary hover:underline">
              {t.another}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export function Support() {
  const t = useT(T)
  useTitle(t.title)
  const [chat, setChat] = useState(false)

  return (
    <div className="mx-auto max-w-lg space-y-5 px-5 pt-4 pb-4 md:max-w-6xl md:px-8 md:pt-8">
      <section className="relative pt-2 pb-1 text-center">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/50 px-3 py-1 text-primary shadow-sm backdrop-blur-md">
          <Icon name="shield" className="text-[16px]" />
          <span className="text-label-sm tracking-wide uppercase">{t.kicker}</span>
        </div>
        <h1 className="text-headline-lg-mobile font-bold tracking-tight text-white drop-shadow-sm md:text-display">{t.h1}</h1>
        <p className="mx-auto mt-1 max-w-xs text-body-md text-white/90 md:max-w-md">{t.lead}</p>
        <div className="relative mx-auto my-3 h-44 w-56 animate-float-slow">
          <HeartBalloon color="pink" className="absolute top-0 left-6 w-20 drop-shadow-[0_12px_24px_rgba(11,74,130,0.22)]" />
          <HeartBalloon
            color="blue"
            className="absolute top-4 right-6 w-16 animate-floating drop-shadow-[0_12px_24px_rgba(11,74,130,0.22)] [animation-delay:-1s]"
          />
          <img
            src="/assets/p-fetherlite.webp"
            alt=""
            className="absolute bottom-0 left-1/2 w-28 -translate-x-1/2 drop-shadow-[0_12px_24px_rgba(11,74,130,0.3)]"
          />
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2 lg:items-start lg:gap-8">
        <div className="space-y-5">
          <Reveal className="rounded-lg border border-white/60 bg-white/35 p-5 text-on-surface shadow-cloud backdrop-blur-xl">
            <div className="flex items-start gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/80 text-primary shadow-sm">
                <Icon name="lock" className="text-[26px]" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-headline-md font-bold text-primary">{t.privacyTitle}</h2>
                  <span className="rounded-full bg-secondary-fixed px-2 py-0.5 text-label-sm text-on-secondary-fixed-variant">{t.exclusive}</span>
                </div>
                <p className="mt-1 text-body-md text-on-surface-variant">{t.privacyBody}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-white/40 pt-3">
              {t.pack.map((x, i) => (
                <div key={x.t} className="flex items-center gap-2 rounded-2xl bg-white/40 p-2.5">
                  <Icon name={i === 0 ? 'inventory_2' : 'verified_user'} className="text-[20px] text-primary" />
                  <div>
                    <p className="text-label-md text-on-surface">{x.t}</p>
                    <p className="text-label-sm text-on-surface-variant">{x.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 rounded-2xl bg-primary-fixed/40 px-3 py-2 text-on-primary-fixed">
              <span className="flex items-center gap-1.5 text-label-sm">
                <Icon name="receipt_long" className="text-[16px]" />
                <span>
                  {t.invoice} <span className="font-bold">{t.invoiceText}</span>
                </span>
              </span>
              <Icon name="check_circle" className="text-[16px]" />
            </div>
          </Reveal>

          <section className="grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setChat(true)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-lg bg-crimson p-4 text-left text-white shadow-crimson"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Icon name="chat" />
                </span>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-300" />
                </span>
              </div>
              <div className="mt-3">
                <h3 className="text-label-lg font-bold">{t.chat}</h3>
                <p className="text-label-sm text-white/85">{t.chatSub}</p>
              </div>
            </motion.button>
            <motion.a
              whileTap={{ scale: 0.95 }}
              href="tel:18001088"
              className="flex flex-col justify-between rounded-lg border border-white/80 bg-white/50 p-4 text-primary shadow-cloud backdrop-blur-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-fixed text-on-primary-fixed">
                <Icon name="call" />
              </span>
              <div className="mt-3">
                <h3 className="text-label-lg font-bold">{t.hotline}</h3>
                <p className="text-label-sm text-on-surface-variant">{t.hotlineSub}</p>
              </div>
            </motion.a>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-headline-md font-bold text-white drop-shadow-sm lg:text-primary lg:drop-shadow-none">{t.faqTitle}</h2>
                <p className="text-label-md text-white/80 lg:text-on-surface-variant">{t.faqSub}</p>
              </div>
              <Icon name="help_center" className="text-white lg:text-primary" />
            </div>
            <Accordion />
          </section>
        </div>

        <div className="space-y-5 lg:sticky lg:top-24">
          <Reveal>
            <EnquiryForm />
          </Reveal>
          <section className="rounded-lg bg-white/25 p-4 text-center backdrop-blur-md">
            <div className="flex items-center justify-around text-primary">
              {['lock_clock', 'health_and_safety', 'sentiment_very_satisfied'].map((icon, idx) => (
                <div key={icon} className="flex items-center">
                  {idx > 0 && <div className="mr-4 h-8 w-px bg-primary/20" />}
                  <div className="flex flex-col items-center">
                    <Icon name={icon} className="mb-1 text-[28px]" />
                    <span className="text-label-sm">{t.trust[idx]}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <ChatSheet open={chat} onClose={() => setChat(false)} />
    </div>
  )
}
