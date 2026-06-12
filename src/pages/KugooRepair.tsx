import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/9321f5ab-0b14-4f20-8ca3-62ea93d79d82/files/ba2ae751-05e7-4844-8976-ce50fbb4a153.jpg";

const MODEL_GROUPS = [
  {
    category: "Городские (S-серия)",
    img: "https://cdn.poehali.dev/projects/9321f5ab-0b14-4f20-8ca3-62ea93d79d82/files/c69a0eba-2213-4baf-924c-771385830f8b.jpg",
    models: [
      { name: "Kugoo S1", desc: "Базовая модель, 250 Вт, до 30 км/ч" },
      { name: "Kugoo S2", desc: "Улучшенные тормоза, складной руль" },
      { name: "Kugoo S3", desc: "Самая популярная модель серии, надёжная" },
      { name: "Kugoo S3 Pro", desc: "Увеличенная батарея 374 Вт·ч, 10 А·ч" },
      { name: "Kugoo S4", desc: "Мощность 350 Вт, улучшенная подвеска" },
    ],
  },
  {
    category: "Внедорожные (M-серия)",
    img: "https://cdn.poehali.dev/projects/9321f5ab-0b14-4f20-8ca3-62ea93d79d82/files/10c9189c-efe4-4175-b4bf-5a1dd1502181.jpg",
    models: [
      { name: "Kugoo M2 Pro", desc: "Двойная подвеска, 10-дюймовые колёса" },
      { name: "Kugoo M4 Pro", desc: "500 Вт, внедорожная резина, большой запас хода" },
      { name: "Kugoo Xima E1", desc: "Мощный мотор 800 Вт, гидравлика" },
    ],
  },
  {
    category: "Двухмоторные",
    img: "https://cdn.poehali.dev/projects/9321f5ab-0b14-4f20-8ca3-62ea93d79d82/files/2accad3f-d493-465d-a6eb-85a40993fed3.jpg",
    models: [
      { name: "Kugoo G-Booster", desc: "2×1000 Вт, до 70 км/ч, двойной привод" },
      { name: "Kugoo G2 Pro", desc: "2×500 Вт, мощная батарея 48 В 20 А·ч" },
      { name: "Kugoo Kirin Master", desc: "Флагманская модель, до 80 км пробега" },
    ],
  },
  {
    category: "Складные (Kirin-серия)",
    img: "https://cdn.poehali.dev/projects/9321f5ab-0b14-4f20-8ca3-62ea93d79d82/files/7e5cabe5-aba3-4cef-82ae-bf5af437cc7c.jpg",
    models: [
      { name: "Kugoo Kirin B1", desc: "Бюджетный компактный самокат" },
      { name: "Kugoo Kirin B2", desc: "Со встроенным сиденьем, для города" },
      { name: "Kugoo Kirin M4 Pro", desc: "Мощность 500 Вт, пневмо-колёса" },
      { name: "Kugoo Kirin T01", desc: "Трёхколёсная модель, устойчивость" },
    ],
  },
  {
    category: "Скоростные",
    img: "https://cdn.poehali.dev/projects/9321f5ab-0b14-4f20-8ca3-62ea93d79d82/files/72d2f346-0b81-480c-a4a6-bcac780a1238.jpg",
    models: [
      { name: "Kugoo Max Speed", desc: "800 Вт, до 45 км/ч, спортивный" },
      { name: "Kugoo RS", desc: "1200 Вт, гоночный, быстрый разгон" },
      { name: "Kugoo X1", desc: "Мощный фонарь, подвеска спереди" },
    ],
  },
];

const SERVICE_GROUPS = [
  {
    group: "Аккумулятор",
    icon: "Zap",
    items: [
      { title: "Диагностика батареи", price: "бесплатно", time: "30 мин" },
      { title: "Восстановление ёмкости (балансировка)", price: "от 900 ₽", time: "1–2 часа" },
      { title: "Замена отдельных ячеек", price: "от 1 500 ₽", time: "2–3 часа" },
      { title: "Полная замена батареи", price: "от 2 800 ₽", time: "1–2 часа" },
      { title: "Замена BMS-платы", price: "от 1 200 ₽", time: "1 час" },
      { title: "Ремонт разъёма зарядки", price: "от 400 ₽", time: "30 мин" },
    ],
  },
  {
    group: "Электромотор",
    icon: "Settings",
    items: [
      { title: "Диагностика мотор-колеса", price: "бесплатно", time: "30 мин" },
      { title: "Замена подшипников мотора", price: "от 800 ₽", time: "1 час" },
      { title: "Перемотка статора", price: "от 2 500 ₽", time: "3–5 часов" },
      { title: "Замена датчиков Холла", price: "от 700 ₽", time: "1 час" },
      { title: "Полная замена мотор-колеса", price: "от 1 900 ₽", time: "1–2 часа" },
      { title: "Ремонт проводки мотора", price: "от 500 ₽", time: "1 час" },
    ],
  },
  {
    group: "Электроника",
    icon: "Cpu",
    items: [
      { title: "Диагностика контроллера", price: "бесплатно", time: "30 мин" },
      { title: "Перепрошивка контроллера", price: "от 1 500 ₽", time: "1 час" },
      { title: "Замена ESC-контроллера", price: "от 2 200 ₽", time: "1–2 часа" },
      { title: "Замена / ремонт дисплея", price: "от 800 ₽", time: "1 час" },
      { title: "Ремонт кнопок и подсветки", price: "от 400 ₽", time: "30 мин" },
      { title: "Замена тормозных ручек с датчиком", price: "от 600 ₽", time: "30 мин" },
      { title: "Восстановление после воды", price: "от 1 200 ₽", time: "2–4 часа" },
      { title: "Замена проводки (полная)", price: "от 1 800 ₽", time: "2–3 часа" },
    ],
  },
  {
    group: "Механика",
    icon: "Wrench",
    items: [
      { title: "Регулировка тормозов", price: "от 300 ₽", time: "30 мин" },
      { title: "Замена тормозных колодок", price: "от 400 ₽", time: "30 мин" },
      { title: "Замена дискового тормоза", price: "от 700 ₽", time: "1 час" },
      { title: "Замена камеры / покрышки", price: "от 500 ₽", time: "30 мин" },
      { title: "Ремонт складного механизма", price: "от 600 ₽", time: "1 час" },
      { title: "Замена рулевой трубки", price: "от 900 ₽", time: "1–2 часа" },
      { title: "Ремонт / замена деки", price: "от 1 500 ₽", time: "2 часа" },
      { title: "Замена подшипников колёс", price: "от 500 ₽", time: "1 час" },
    ],
  },
  {
    group: "Тюнинг",
    icon: "Wifi",
    items: [
      { title: "Снятие ограничения скорости", price: "от 1 500 ₽", time: "1 час" },
      { title: "Настройка режимов езды", price: "от 800 ₽", time: "30 мин" },
      { title: "Установка LED-подсветки", price: "от 1 000 ₽", time: "1–2 часа" },
      { title: "Установка сигнализации", price: "от 2 000 ₽", time: "2 часа" },
      { title: "Апгрейд батареи (увеличение ёмкости)", price: "от 4 500 ₽", time: "3–5 часов" },
    ],
  },
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
        style={{ background: "rgba(10,13,20,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,107,26,0.1)" }}>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #FF6B1A, #FF8C42)" }}>
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
              style={{ fontFamily: "'Exo 2', sans-serif", borderColor: "rgba(255,107,26,0.1)" }}>
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
          <span style={{ color: "#FF6B1A" }}>Ремонт Kugoo</span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero-gradient grid-bg pt-8 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-xs font-semibold uppercase tracking-widest"
              style={{ background: "rgba(255,107,26,0.1)", border: "1px solid rgba(255,107,26,0.3)", color: "#FF6B1A" }}>
              <span className="w-2 h-2 rounded-full animate-pulse-neon" style={{ background: "#FF6B1A" }} />
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
              <a href="tel:+79533334004" className="px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 font-semibold"
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
                  <Icon name={b.icon} size={15} style={{ color: "#FF6B1A" }} />
                  {b.text}
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 rounded-3xl"
              style={{ background: "radial-gradient(circle at center, rgba(255,107,26,0.12) 0%, transparent 70%)" }} />
            <img src={HERO_IMG} alt="Ремонт Kugoo" className="w-full rounded-3xl object-cover animate-float"
              style={{ height: "460px", border: "1px solid rgba(255,107,26,0.2)", boxShadow: "0 0 60px rgba(255,107,26,0.12)" }} />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* MODELS */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#FF6B1A" }}>Все модели</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Какие Kugoo мы ремонтируем
            </h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Работаем со всей линейкой Kugoo — от бюджетных до флагманских
            </p>
          </div>
          <div className="space-y-5">
            {MODEL_GROUPS.map((group, gi) => (
              <div key={gi} className="glass-card rounded-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Photo */}
                  <div className="relative md:w-56 h-44 md:h-auto flex-shrink-0 overflow-hidden">
                    <img src={group.img} alt={group.category}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to right, transparent 60%, rgba(10,13,20,0.6) 100%)" }} />
                    <div className="absolute inset-0 md:hidden"
                      style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(10,13,20,0.8) 100%)" }} />
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 px-5 py-3"
                      style={{ borderBottom: "1px solid rgba(255,107,26,0.1)", background: "rgba(255,107,26,0.04)" }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(255,107,26,0.12)", border: "1px solid rgba(255,107,26,0.2)" }}>
                        <Icon name="Bike" size={13} style={{ color: "#FF6B1A" }} />
                      </div>
                      <h3 className="font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>{group.category}</h3>
                      <span className="ml-auto text-xs px-2 py-1 rounded-full"
                        style={{ background: "rgba(255,107,26,0.1)", color: "#FF6B1A" }}>
                        {group.models.length} модели
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-px"
                      style={{ background: "rgba(255,255,255,0.04)" }}>
                      {group.models.map((m, mi) => (
                        <div key={mi} className="flex items-start gap-3 px-5 py-3 transition-colors"
                          style={{ background: "var(--dark-bg)" }}
                          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,26,0.04)")}
                          onMouseLeave={e => (e.currentTarget.style.background = "var(--dark-bg)")}>
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "rgba(255,107,26,0.5)" }} />
                          <div>
                            <div className="font-bold text-sm mb-0.5" style={{ fontFamily: "'Exo 2', sans-serif" }}>{m.name}</div>
                            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{m.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 text-center p-4 rounded-xl text-sm"
            style={{ background: "rgba(255,107,26,0.05)", border: "1px solid rgba(255,107,26,0.12)", color: "rgba(255,255,255,0.5)" }}>
            Нет вашей модели в списке? Позвоните — скорее всего, мы её тоже ремонтируем
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* SERVICES */}
      <section className="py-20 px-6 md:px-12" style={{ background: "rgba(255,107,26,0.02)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#FF6B1A" }}>Прайс-лист</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Услуги по ремонту Kugoo
            </h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Диагностика всегда бесплатна</p>
          </div>
          <div className="space-y-6">
            {SERVICE_GROUPS.map((group, gi) => (
              <div key={gi} className="glass-card rounded-2xl overflow-hidden">
                {/* Group header */}
                <div className="flex items-center gap-3 px-6 py-4"
                  style={{ borderBottom: "1px solid rgba(255,107,26,0.1)", background: "rgba(255,107,26,0.04)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(255,107,26,0.12)", border: "1px solid rgba(255,107,26,0.2)" }}>
                    <Icon name={group.icon} size={17} style={{ color: "#FF6B1A" }} />
                  </div>
                  <h3 className="font-black text-lg" style={{ fontFamily: "'Exo 2', sans-serif" }}>{group.group}</h3>
                  <span className="ml-auto text-xs px-2 py-1 rounded-full"
                    style={{ background: "rgba(255,107,26,0.1)", color: "#FF6B1A" }}>
                    {group.items.length} услуг
                  </span>
                </div>
                {/* Items table */}
                <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  {group.items.map((item, ii) => (
                    <div key={ii} className="flex items-center justify-between px-6 py-3 transition-colors"
                      style={{ borderColor: "rgba(255,255,255,0.05)" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,26,0.03)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(255,107,26,0.4)" }} />
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>{item.title}</span>
                      </div>
                      <div className="flex items-center gap-6 flex-shrink-0 ml-4">
                        <span className="text-xs hidden sm:block" style={{ color: "rgba(255,255,255,0.35)" }}>
                          <Icon name="Clock" size={11} className="inline mr-1" />{item.time}
                        </span>
                        <span className="font-bold text-sm neon-text min-w-[90px] text-right">{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between p-5 rounded-xl"
            style={{ background: "rgba(255,107,26,0.05)", border: "1px solid rgba(255,107,26,0.15)" }}>
            <div className="flex items-center gap-3">
              <Icon name="Info" size={18} style={{ color: "#FF6B1A" }} />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                Точная стоимость определяется после бесплатной диагностики
              </p>
            </div>
            <a href="#kugoo-booking" className="neon-btn px-6 py-3 rounded-xl text-sm whitespace-nowrap">
              Записаться на диагностику
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* PROBLEMS FAQ */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#FF6B1A" }}>Частые проблемы</p>
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
                    style={{ background: "rgba(255,107,26,0.1)", transform: openProblem === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                    <Icon name="Plus" size={14} style={{ color: "#FF6B1A" }} />
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
      <section className="py-20 px-6 md:px-12" style={{ background: "rgba(255,107,26,0.02)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#FF6B1A" }}>Команда</p>
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
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#FF6B1A" }}>Онлайн-запись</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Записаться на ремонт Kugoo
            </h2>
            <p className="mt-3" style={{ color: "rgba(255,255,255,0.45)" }}>Оставьте заявку — перезвоним в течение 15 минут</p>
          </div>

          {sent ? (
            <div className="glass-card p-10 rounded-2xl text-center" style={{ border: "1px solid rgba(255,107,26,0.3)" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(255,107,26,0.15)", border: "2px solid #FF6B1A" }}>
                <Icon name="Check" size={30} style={{ color: "#FF6B1A" }} />
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
                    {MODEL_GROUPS.flatMap(g => g.models).map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
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
      <footer className="py-10 px-6 md:px-12" style={{ borderTop: "1px solid rgba(255,107,26,0.1)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #FF6B1A, #FF8C42)" }}>
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