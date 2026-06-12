import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/9321f5ab-0b14-4f20-8ca3-62ea93d79d82/files/ba2ae751-05e7-4844-8976-ce50fbb4a153.jpg";

const MODELS = [
  { name: "Kugoo S1 / S2 / S3", desc: "Бюджетные городские модели, широкая база запчастей" },
  { name: "Kugoo S3 Pro", desc: "Улучшенная версия с увеличенной батареей и мощностью" },
  { name: "Kugoo M2 Pro", desc: "Внедорожный самокат с двойной подвеской" },
  { name: "Kugoo G-Booster", desc: "Мощный двухмоторный самокат, ремонт любой сложности" },
  { name: "Kugoo Kirin B2", desc: "Складной компактный самокат с встроенным сиденьем" },
  { name: "Kugoo Max Speed", desc: "Скоростная модель, настройка контроллера и батареи" },
];

const SERVICES = [
  { icon: "Zap", title: "Замена батареи Kugoo", desc: "Оригинальные и совместимые аккумуляторы для всех моделей Kugoo", price: "от 2 800 ₽" },
  { icon: "Settings", title: "Ремонт мотор-колеса", desc: "Перемотка, замена подшипников, магнитов, восстановление обмотки", price: "от 1 900 ₽" },
  { icon: "Cpu", title: "Замена контроллера", desc: "Диагностика и замена ESC-контроллера на оригинальный или аналог", price: "от 2 200 ₽" },
  { icon: "Monitor", title: "Ремонт дисплея", desc: "Замена экрана, восстановление подсветки и кнопок управления", price: "от 800 ₽" },
  { icon: "Wrench", title: "Механический ремонт", desc: "Рама, вилка, дека, складной механизм, колёса и покрышки", price: "от 600 ₽" },
  { icon: "Wifi", title: "Прошивка и разблокировка", desc: "Снятие ограничений скорости 25 км/ч, настройка под себя", price: "от 1 500 ₽" },
  { icon: "AlertTriangle", title: "Ремонт после воды", desc: "Чистка, сушка, восстановление платы после попадания влаги", price: "от 1 200 ₽" },
  { icon: "Shield", title: "Гарантийная диагностика", desc: "Полная проверка всех систем, письменный отчёт о состоянии", price: "бесплатно" },
];

const PROBLEMS = [
  { q: "Самокат не включается", a: "Чаще всего проблема в батарее или BMS-плате. Решается за 1–2 часа." },
  { q: "Не едет / мотор не крутится", a: "Диагностируем контроллер, мотор и датчик Холла. Ремонт от 1 900 ₽." },
  { q: "Быстро разряжается батарея", a: "Восстановим ёмкость или заменим изношенные ячейки аккумулятора." },
  { q: "Мигает красным и пищит", a: "Считываем код ошибки и устраняем причину. Диагностика бесплатно." },
  { q: "Тормоза не работают", a: "Регулировка или замена тормозных колодок, тросов, дискового тормоза." },
  { q: "Скрипит и вибрирует", a: "Проверим и подтянем все соединения, заменим изношенные подшипники." },
];

const MASTERS = [
  { name: "Алексей К.", spec: "Kugoo — основная специализация", exp: "7 лет", avatar: "⚡" },
  { name: "Дмитрий Р.", spec: "Механика, тюнинг Kugoo", exp: "5 лет", avatar: "🔧" },
];

const NAV_ITEMS = [
  { label: "Главная", href: "/" },
  { label: "Услуги", href: "/#services" },
  { label: "О нас", href: "/#about" },
  { label: "Галерея", href: "/#gallery" },
  { label: "Блог", href: "/#blog" },
  { label: "Контакты", href: "/#contacts" },
];

export default function KugooRepair() {
  const [openProblem, setOpenProblem] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: "rgba(10,13,20,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,255,178,0.1)" }}>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--neon-green), var(--neon-cyan))" }}>
            <Icon name="Zap" size={16} className="text-black" />
          </div>
          <span className="font-black text-xl tracking-tight" style={{ fontFamily: "'Exo 2', sans-serif", color: "white" }}>
            Volt<span className="neon-text">Fix</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <Link key={item.label} to={item.href} className="nav-link text-sm font-medium">{item.label}</Link>
          ))}
        </div>
        <a href="#kugoo-booking" className="hidden md:block neon-btn px-5 py-2 rounded-lg text-sm">
          Записаться
        </a>
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 pt-20 px-6 flex flex-col gap-4"
          style={{ background: "rgba(10,13,20,0.98)", backdropFilter: "blur(20px)" }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.label} to={item.href} onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold py-3 border-b nav-link"
              style={{ fontFamily: "'Exo 2', sans-serif", borderColor: "rgba(0,255,178,0.1)" }}>
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* BREADCRUMB */}
      <div className="pt-24 pb-0 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          <Link to="/" className="hover:text-white transition-colors">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <span style={{ color: "var(--neon-green)" }}>Ремонт Kugoo</span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero-gradient grid-bg pt-8 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-xs font-semibold uppercase tracking-widest"
              style={{ background: "rgba(0,255,178,0.1)", border: "1px solid rgba(0,255,178,0.3)", color: "var(--neon-green)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse-neon" style={{ background: "var(--neon-green)" }} />
              Специализируемся на Kugoo
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6"
              style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Ремонт<br />
              электросамокатов<br />
              <span className="neon-text">Kugoo</span>
            </h1>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}>
              Чиним все модели Kugoo: S1, S3, M2 Pro, G-Booster и другие.
              Оригинальные запчасти на складе, гарантия 6 месяцев на все работы.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#kugoo-booking" className="neon-btn px-8 py-4 rounded-xl text-base inline-flex items-center gap-2">
                <Icon name="Calendar" size={18} />
                Записаться на ремонт
              </a>
              <a href="tel:+74951234567" className="px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 font-semibold"
                style={{ border: "1px solid rgba(255,255,255,0.15)", color: "white" }}>
                <Icon name="Phone" size={18} />
                Позвонить
              </a>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { icon: "Clock", text: "Экспресс от 1 часа" },
                { icon: "Shield", text: "Гарантия 6 мес." },
                { icon: "Package", text: "Запчасти в наличии" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-sm"
                  style={{ color: "rgba(255,255,255,0.6)" }}>
                  <Icon name={b.icon} size={15} style={{ color: "var(--neon-green)" }} />
                  {b.text}
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 rounded-3xl"
              style={{ background: "radial-gradient(circle at center, rgba(0,255,178,0.12) 0%, transparent 70%)" }} />
            <img src={HERO_IMG} alt="Ремонт Kugoo" className="w-full rounded-3xl object-cover animate-float"
              style={{ height: "460px", border: "1px solid rgba(0,255,178,0.2)", boxShadow: "0 0 60px rgba(0,255,178,0.12)" }} />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* MODELS */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--neon-green)" }}>Все модели</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Какие Kugoo мы ремонтируем
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {MODELS.map((m, i) => (
              <div key={i} className="glass-card p-5 rounded-xl">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: "rgba(0,255,178,0.1)" }}>
                  <Icon name="Bike" size={16} style={{ color: "var(--neon-green)" }} />
                </div>
                <div className="font-bold mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>{m.name}</div>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* SERVICES */}
      <section className="py-20 px-6 md:px-12" style={{ background: "rgba(0,255,178,0.02)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--neon-green)" }}>Прайс-лист</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Услуги по ремонту Kugoo
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s, i) => (
              <div key={i} className="glass-card p-5 rounded-xl group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(0,255,178,0.1)", border: "1px solid rgba(0,255,178,0.15)" }}>
                  <Icon name={s.icon} size={18} style={{ color: "var(--neon-green)" }} />
                </div>
                <h3 className="font-bold mb-2 text-sm" style={{ fontFamily: "'Exo 2', sans-serif" }}>{s.title}</h3>
                <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.6" }}>{s.desc}</p>
                <div className="font-bold neon-text text-sm">{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* PROBLEMS FAQ */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--neon-green)" }}>Частые проблемы</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Что сломалось у вашего Kugoo?
            </h2>
          </div>
          <div className="space-y-3">
            {PROBLEMS.map((p, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setOpenProblem(openProblem === i ? null : i)}>
                <div className="flex items-center justify-between p-5">
                  <span className="font-semibold" style={{ fontFamily: "'Exo 2', sans-serif" }}>{p.q}</span>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ml-4 transition-transform duration-300"
                    style={{ background: "rgba(0,255,178,0.1)", transform: openProblem === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                    <Icon name="Plus" size={14} style={{ color: "var(--neon-green)" }} />
                  </div>
                </div>
                {openProblem === i && (
                  <div className="px-5 pb-5 text-sm animate-slide-up" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {p.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* MASTERS */}
      <section className="py-20 px-6 md:px-12" style={{ background: "rgba(0,255,178,0.02)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--neon-green)" }}>Команда</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Мастера по Kugoo
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {MASTERS.map((m, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl text-center">
                <div className="text-5xl mb-4">{m.avatar}</div>
                <div className="text-xl font-bold mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>{m.name}</div>
                <div className="text-sm neon-text font-semibold mb-3">{m.spec}</div>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Опыт: {m.exp}</div>
                <div className="flex justify-center mt-3 gap-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400">★</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* BOOKING */}
      <section id="kugoo-booking" className="py-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--neon-green)" }}>Онлайн-запись</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Записаться на ремонт Kugoo
            </h2>
            <p className="mt-3" style={{ color: "rgba(255,255,255,0.45)" }}>Оставьте заявку — перезвоним в течение 15 минут</p>
          </div>

          {sent ? (
            <div className="glass-card p-10 rounded-2xl text-center" style={{ border: "1px solid rgba(0,255,178,0.3)" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(0,255,178,0.15)", border: "2px solid var(--neon-green)" }}>
                <Icon name="Check" size={30} style={{ color: "var(--neon-green)" }} />
              </div>
              <h3 className="text-2xl font-black mb-2 neon-text" style={{ fontFamily: "'Exo 2', sans-serif" }}>Заявка принята!</h3>
              <p style={{ color: "rgba(255,255,255,0.6)" }}>Мы перезвоним вам в течение 15 минут</p>
            </div>
          ) : (
            <div className="glass-card p-8 rounded-2xl">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Ваше имя</label>
                  <input className="dark-input" placeholder="Иван Иванов" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Телефон</label>
                  <input className="dark-input" placeholder="+7 (999) 000-00-00" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Модель самоката</label>
                  <select className="dark-select" value={model} onChange={e => setModel(e.target.value)}>
                    <option value="">Выберите модель</option>
                    {MODELS.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                    <option value="Другая модель">Другая модель</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Опишите проблему</label>
                  <textarea className="dark-input resize-none" rows={3} placeholder="Не включается, не едет, пищит..." />
                </div>
                <button onClick={() => name && phone && setSent(true)} className="w-full neon-btn py-4 rounded-xl text-base">
                  Отправить заявку
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 md:px-12" style={{ borderTop: "1px solid rgba(0,255,178,0.1)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--neon-green), var(--neon-cyan))" }}>
              <Icon name="Zap" size={14} className="text-black" />
            </div>
            <span className="font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>Volt<span className="neon-text">Fix</span></span>
          </Link>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>© 2026 VoltFix. Ремонт электросамокатов Kugoo в Москве</p>
          <Link to="/" className="text-sm nav-link flex items-center gap-1">
            <Icon name="ArrowLeft" size={14} /> На главную
          </Link>
        </div>
      </footer>
    </div>
  );
}
