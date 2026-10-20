# Durex Fetherlite – “Nhẹ Như Bay” (prototype)

Microsite 5 trang, mobile-first, dựng từ thiết kế Stitch (“Weightless Intimacy”), tài liệu UI Handoff và bộ asset của chiến dịch.

**Stack:** Vite · React 19 + TypeScript (TSX) · Tailwind CSS v4 · Motion (framer-motion) · React Router

## Chạy

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # xuất bản tĩnh vào dist/
```

## Cấu trúc

```
public/assets/        ảnh đã tối ưu WebP + video hero
src/index.css         design tokens (@theme) + glassmorphism + keyframes floating/pulse
src/data/content.ts   nội dung: sản phẩm, review, bài viết, FAQ, leaderboard, link Shopee/Lazada
src/components/       Layout (header, bottom nav, drawer, footer), Sheet, CTA, bóng bay SVG
src/pages/            Home · Products · Offers (mini-game) · Guides · Support
```

| Route        | Trang                                   |
| ------------ | --------------------------------------- |
| `/`          | Trạm Cất Cánh (Home)                    |
| `/san-pham`  | Bí Mật Sự Nhẹ Nhàng (Products)          |
| `/uu-dai`    | Phòng Chờ Bay (Mini-game & Ưu đãi)      |
| `/cam-nang`  | Góc Tự Tin Cất Cánh (Blog)              |
| `/ho-tro`    | Trạm Hỗ Trợ Kín Đáo (FAQ & Contact)     |

## Song ngữ VI / EN

- Nút **VI | EN** ở header (và trong menu mobile, cổng 18+). Lựa chọn được lưu trong `localStorage` (`durex-lang`).
- `src/i18n.tsx`: `LangProvider`, `useLang()`, `useT({ vi, en })`, `useTitle()`.
- Chữ dùng chung + nội dung (sản phẩm, bài viết, quiz, chính sách) ở `src/data/content.ts`; chữ riêng từng trang nằm trong hằng `T = { vi, en }` đầu mỗi file trang.
- Thêm chữ mới: thêm key ở **cả** `vi` và `en` – dùng một key chỉ có ở một bên thì `npx tsc --noEmit` sẽ báo lỗi.

Form, chat, leaderboard đều là dữ liệu giả lập phía client – chưa nối backend.
