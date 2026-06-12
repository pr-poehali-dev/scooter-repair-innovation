import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/9321f5ab-0b14-4f20-8ca3-62ea93d79d82/files/82692188-8f94-499c-9faa-b6be531cf5a3.jpg";

const SERVICES = [
  { icon: "Zap", title: "Замена батареи", desc: "Восстановим ёмкость или заменим аккумулятор на новый", price: "от 2 500 ₽", time: "1–2 часа" },
  { icon: "Settings", title: "Ремонт мотора", desc: "Диагностика и ремонт мотор-колеса, контроллера", price: "от 1 800 ₽", time: "2–4 часа" },
  { icon: "Shield", title: "Техобслуживание", desc: "Полная диагностика, смазка, регулировка тормозов", price: "от 900 ₽", time: "1 час" },
  { icon: "Cpu", title: "Ремонт электроники", desc: "Замена контроллера, дисплея, проводки", price: "от 1 200 ₽", time: "1–3 часа" },
  { icon: "Wrench", title: "Механический ремонт", desc: "Рама, вилка, руль, колёса, подшипники", price: "от 600 ₽", time: "1–2 часа" },
  { icon: "Wifi", title: "Прошивка и тюнинг", desc: "Снятие ограничений скорости, настройка под себя", price: "от 1 500 ₽", time: "1 час" },
];

const MASTERS = [
  { name: "Алексей К.", spec: "Электрика и батареи", exp: "7 лет", avatar: "⚡" },
  { name: "Дмитрий Р.", spec: "Механика и тюнинг", exp: "5 лет", avatar: "🔧" },
  { name: "Иван М.", spec: "Электроника", exp: "4 года", avatar: "💻" },
];

const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const BLOG_POSTS = [
  { tag: "Советы", title: "Как продлить жизнь аккумулятора электросамоката", date: "5 июня 2026", read: "4 мин", kugoo: false },
  { tag: "Тюнинг", title: "Топ-5 улучшений для городского электросамоката", date: "28 мая 2026", read: "6 мин", kugoo: false },
  { tag: "Обзор", title: "Xiaomi vs Segway: какой самокат чинить проще?", date: "15 мая 2026", read: "8 мин", kugoo: false },
  { tag: "Kugoo", title: "Kugoo S3 Pro: самые частые поломки и как их починить", date: "10 июня 2026", read: "5 мин", kugoo: true },
  { tag: "Kugoo", title: "Как заменить батарею на Kugoo S1 своими руками", date: "3 июня 2026", read: "7 мин", kugoo: true },
  { tag: "Kugoo", title: "Прошивка Kugoo G-Booster: снимаем ограничение скорости", date: "25 мая 2026", read: "6 мин", kugoo: true },
];

const GALLERY_ITEMS = [
  { label: "Замена батареи Xiaomi Pro 2", type: "before-after", img: "https://cdn.poehali.dev/projects/9321f5ab-0b14-4f20-8ca3-62ea93d79d82/files/fb0c7ceb-2251-4b95-9a6c-a7eb973fd31b.jpg" },
  { label: "Восстановление мотор-колеса", type: "repair", img: "https://cdn.poehali.dev/projects/9321f5ab-0b14-4f20-8ca3-62ea93d79d82/files/1ec21660-3037-4e60-885c-933e260cf4b3.jpg" },
  { label: "Кастом-тюнинг Ninebot Max", type: "tuning", img: "https://cdn.poehali.dev/projects/9321f5ab-0b14-4f20-8ca3-62ea93d79d82/files/05dad27e-6713-463e-ba69-5cac80e59500.jpg" },
  { label: "Замена контроллера KingSong", type: "repair", img: "https://cdn.poehali.dev/projects/9321f5ab-0b14-4f20-8ca3-62ea93d79d82/files/b5de461a-cfa8-466e-a8db-25f6bf875266.jpg" },
  { label: "Сборка новой проводки", type: "wiring", img: "https://cdn.poehali.dev/projects/9321f5ab-0b14-4f20-8ca3-62ea93d79d82/files/fb4ed1d7-dbe5-41a3-a54c-a4faef089fad.jpg" },
  { label: "Ремонт рамы после ДТП", type: "frame", img: "https://cdn.poehali.dev/projects/9321f5ab-0b14-4f20-8ca3-62ea93d79d82/files/d669f2ab-0a72-4716-9854-cf1bf1d5623b.jpg" },
];

const STATS = [
  { value: "1 200+", label: "самокатов отремонтировано" },
  { value: "4.9★", label: "средний рейтинг" },
  { value: "98%", label: "клиентов возвращаются" },
  { value: "2 часа", label: "среднее время ремонта" },
];

const NAV_ITEMS = [
  { label: "Главная", href: "#hero" },
  { label: "Услуги", href: "#services" },
  { label: "О нас", href: "#about" },
  { label: "Галерея", href: "#gallery" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMaster, setSelectedMaster] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDone, setBookingDone] = useState(false);
  const [activeGallery, setActiveGallery] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [blogFilter, setBlogFilter] = useState("Все");

  const handleBook = () => {
    if (name && phone && selectedMaster !== null && selectedTime) {
      setBookingDone(true);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: "rgba(10,13,20,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,255,178,0.1)" }}>
        <a href="#hero" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--neon-green), var(--neon-cyan))" }}>
            <Icon name="Zap" size={16} className="text-black" />
          </div>
          <span className="font-black text-xl tracking-tight" style={{ fontFamily: "'Exo 2', sans-serif", color: "white" }}>
            Volt<span className="neon-text">Fix</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <a key={item.label} href={item.href} className="nav-link text-sm font-medium">{item.label}</a>
          ))}
        </div>

        <a href="#booking" className="hidden md:block neon-btn px-5 py-2 rounded-lg text-sm">
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
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold py-3 border-b nav-link" style={{ fontFamily: "'Exo 2', sans-serif", borderColor: "rgba(0,255,178,0.1)" }}>
              {item.label}
            </a>
          ))}
          <a href="#booking" onClick={() => setMenuOpen(false)} className="neon-btn px-6 py-3 rounded-xl text-center mt-4">
            Записаться на ремонт
          </a>
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="hero-gradient grid-bg min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center py-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-xs font-semibold uppercase tracking-widest"
              style={{ background: "rgba(0,255,178,0.1)", border: "1px solid rgba(0,255,178,0.3)", color: "var(--neon-green)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse-neon" style={{ background: "var(--neon-green)" }}></span>
              Принимаем заказы сегодня
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6"
              style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Ремонт<br />
              <span className="neon-text">электро</span><br />
              самокатов
            </h1>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}>
              Профессиональный сервис в Москве. Диагностика за 30 минут,
              гарантия на все работы. Любые марки и модели.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#booking" className="neon-btn px-8 py-4 rounded-xl text-base inline-flex items-center gap-2">
                <Icon name="Calendar" size={18} />
                Записаться онлайн
              </a>
              <a href="tel:+79533334004" className="px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 font-semibold"
                style={{ border: "1px solid rgba(255,255,255,0.15)", color: "white", transition: "all 0.3s" }}>
                <Icon name="Phone" size={18} />
                Позвонить
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-10">
              {STATS.map(s => (
                <div key={s.value} className="glass-card p-4 rounded-xl">
                  <div className="text-2xl font-black neon-text" style={{ fontFamily: "'Exo 2', sans-serif" }}>{s.value}</div>
                  <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(circle at center, rgba(0,255,178,0.15) 0%, transparent 70%)" }}></div>
            <img src={HERO_IMG} alt="Ремонт электросамоката" className="w-full rounded-3xl object-cover animate-float"
              style={{ height: "480px", border: "1px solid rgba(0,255,178,0.2)", boxShadow: "0 0 60px rgba(0,255,178,0.15)" }} />
            <div className="absolute -bottom-4 -left-4 glass-card p-4 rounded-xl" style={{ border: "1px solid rgba(0,255,178,0.3)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,255,178,0.15)" }}>
                  <Icon name="Clock" size={20} className="neon-text" />
                </div>
                <div>
                  <div className="font-bold text-sm neon-text">Экспресс-ремонт</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>от 30 минут</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--neon-green)" }}>Что мы делаем</p>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>Наши услуги</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl cursor-pointer group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(0,255,178,0.1)", border: "1px solid rgba(0,255,178,0.2)" }}>
                  <Icon name={s.icon} size={22} style={{ color: "var(--neon-green)" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>{s.title}</h3>
                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>{s.desc}</p>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="font-bold neon-text">{s.price}</span>
                  <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    <Icon name="Clock" size={13} />
                    {s.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Kugoo banner */}
          <Link to="/remont-kugoo" className="mt-8 flex items-center justify-between p-5 rounded-2xl group cursor-pointer"
            style={{ background: "linear-gradient(135deg, rgba(0,255,178,0.07) 0%, rgba(0,212,255,0.07) 100%)", border: "1px solid rgba(0,255,178,0.2)", transition: "all 0.3s" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,255,178,0.5)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(0,255,178,0.2)")}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: "rgba(0,255,178,0.1)" }}>🛴</div>
              <div>
                <div className="font-bold" style={{ fontFamily: "'Exo 2', sans-serif" }}>Ремонт электросамокатов Kugoo</div>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>S1, S3, M2 Pro, G-Booster и другие модели — подробнее</div>
              </div>
            </div>
            <div className="flex items-center gap-1 neon-text font-semibold text-sm">
              Подробнее <Icon name="ArrowRight" size={16} />
            </div>
          </Link>
        </div>
      </section>

      <div className="section-divider" />

      {/* BOOKING */}
      <section id="booking" className="py-24 px-6 md:px-12" style={{ background: "rgba(0,255,178,0.02)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--neon-green)" }}>Онлайн-запись</p>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>Записаться на ремонт</h2>
            <p className="mt-4" style={{ color: "rgba(255,255,255,0.5)" }}>Выберите удобное время и мастера</p>
          </div>

          {bookingDone ? (
            <div className="glass-card p-10 rounded-2xl text-center" style={{ border: "1px solid rgba(0,255,178,0.3)" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(0,255,178,0.15)", border: "2px solid var(--neon-green)" }}>
                <Icon name="Check" size={30} style={{ color: "var(--neon-green)" }} />
              </div>
              <h3 className="text-2xl font-black mb-2 neon-text" style={{ fontFamily: "'Exo 2', sans-serif" }}>Запись оформлена!</h3>
              <p style={{ color: "rgba(255,255,255,0.6)" }}>Мы свяжемся с вами в ближайшее время для подтверждения</p>
              <button onClick={() => { setBookingDone(false); setBookingStep(1); setSelectedMaster(null); setSelectedTime(null); setName(""); setPhone(""); }}
                className="mt-6 px-6 py-3 rounded-xl text-sm font-semibold"
                style={{ border: "1px solid rgba(0,255,178,0.3)", color: "var(--neon-green)" }}>
                Записаться ещё раз
              </button>
            </div>
          ) : (
            <div className="glass-card p-8 rounded-2xl">
              {/* Steps */}
              <div className="flex items-center gap-3 mb-8">
                {[1, 2, 3].map(step => (
                  <div key={step} className="flex items-center gap-3 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                      ${bookingStep >= step ? "text-black" : "text-white/40"}`}
                      style={{ background: bookingStep >= step ? "var(--neon-green)" : "rgba(255,255,255,0.08)",
                        boxShadow: bookingStep >= step ? "0 0 12px rgba(0,255,178,0.4)" : "none" }}>
                      {bookingStep > step ? <Icon name="Check" size={14} /> : step}
                    </div>
                    <span className="text-sm hidden sm:block" style={{ color: bookingStep >= step ? "white" : "rgba(255,255,255,0.3)" }}>
                      {step === 1 ? "Услуга" : step === 2 ? "Мастер и время" : "Контакты"}
                    </span>
                    {step < 3 && <div className="flex-1 h-px" style={{ background: bookingStep > step ? "var(--neon-green)" : "rgba(255,255,255,0.1)" }} />}
                  </div>
                ))}
              </div>

              {bookingStep === 1 && (
                <div className="animate-slide-up">
                  <h3 className="font-bold mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>Выберите услугу</h3>
                  <div className="space-y-2 mb-6">
                    {SERVICES.map(s => (
                      <label key={s.title} className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all"
                        style={{ border: `1px solid ${selectedService === s.title ? "var(--neon-green)" : "rgba(255,255,255,0.08)"}`,
                          background: selectedService === s.title ? "rgba(0,255,178,0.06)" : "transparent" }}>
                        <input type="radio" name="service" value={s.title} checked={selectedService === s.title}
                          onChange={e => setSelectedService(e.target.value)} className="hidden" />
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all`}
                          style={{ borderColor: selectedService === s.title ? "var(--neon-green)" : "rgba(255,255,255,0.3)" }}>
                          {selectedService === s.title && <div className="w-2 h-2 rounded-full" style={{ background: "var(--neon-green)" }} />}
                        </div>
                        <span className="flex-1 font-medium">{s.title}</span>
                        <span className="text-sm neon-text font-bold">{s.price}</span>
                      </label>
                    ))}
                  </div>
                  <button onClick={() => selectedService && setBookingStep(2)} className="w-full neon-btn py-4 rounded-xl">
                    Далее →
                  </button>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="animate-slide-up">
                  <h3 className="font-bold mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>Выберите мастера</h3>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {MASTERS.map((m, i) => (
                      <div key={i} className={`master-card ${selectedMaster === i ? "selected" : ""}`}
                        onClick={() => setSelectedMaster(i)}>
                        <div className="text-3xl mb-2">{m.avatar}</div>
                        <div className="font-bold text-sm">{m.name}</div>
                        <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>{m.spec}</div>
                        <div className="text-xs mt-1" style={{ color: "var(--neon-green)" }}>Опыт: {m.exp}</div>
                      </div>
                    ))}
                  </div>
                  <h3 className="font-bold mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>Выберите время</h3>
                  <div className="grid grid-cols-5 gap-2 mb-6">
                    {TIME_SLOTS.map(t => (
                      <button key={t} className={`time-slot ${selectedTime === t ? "selected" : ""}`}
                        onClick={() => setSelectedTime(t)}>{t}</button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setBookingStep(1)} className="px-6 py-4 rounded-xl font-semibold"
                      style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}>
                      ← Назад
                    </button>
                    <button onClick={() => selectedMaster !== null && selectedTime && setBookingStep(3)}
                      className="flex-1 neon-btn py-4 rounded-xl">
                      Далее →
                    </button>
                  </div>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="animate-slide-up">
                  <h3 className="font-bold mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>Ваши контакты</h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Ваше имя</label>
                      <input className="dark-input" placeholder="Иван Иванов" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Номер телефона</label>
                      <input className="dark-input" placeholder="+7 (999) 000-00-00" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: "rgba(0,255,178,0.05)", border: "1px solid rgba(0,255,178,0.15)" }}>
                      <div className="text-sm font-semibold mb-2 neon-text">Итог записи:</div>
                      <div className="text-sm space-y-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <div>Услуга: <span className="text-white">{selectedService}</span></div>
                        <div>Мастер: <span className="text-white">{selectedMaster !== null ? MASTERS[selectedMaster].name : ""}</span></div>
                        <div>Время: <span className="text-white">{selectedTime}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setBookingStep(2)} className="px-6 py-4 rounded-xl font-semibold"
                      style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}>
                      ← Назад
                    </button>
                    <button onClick={handleBook} className="flex-1 neon-btn py-4 rounded-xl">
                      Подтвердить запись
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <div className="section-divider" />

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--neon-green)" }}>О компании</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Мы — эксперты<br />по электросамокатам
            </h2>
            <p className="mb-6" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.8" }}>
              С 2018 года мы специализируемся на ремонте электросамокатов всех марок. Наши мастера — сертифицированные специалисты с опытом работы от 4 лет. Используем только оригинальные запчасти.
            </p>
            <div className="space-y-4">
              {[
                { icon: "Award", text: "Гарантия 6 месяцев на все виды работ" },
                { icon: "Clock", text: "Срочный ремонт за 30–60 минут" },
                { icon: "MapPin", text: "Удобная локация в центре Москвы" },
                { icon: "Truck", text: "Бесплатная курьерская доставка" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,255,178,0.1)", border: "1px solid rgba(0,255,178,0.2)" }}>
                    <Icon name={item.icon} size={18} style={{ color: "var(--neon-green)" }} />
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {MASTERS.map((m, i) => (
              <div key={i} className={`glass-card p-6 rounded-2xl ${i === 2 ? "col-span-2" : ""}`}>
                <div className="text-4xl mb-3">{m.avatar}</div>
                <div className="font-bold" style={{ fontFamily: "'Exo 2', sans-serif" }}>{m.name}</div>
                <div className="text-sm neon-text font-semibold">{m.spec}</div>
                <div className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>Опыт: {m.exp}</div>
                <div className="flex mt-3 gap-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-xs">★</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6 md:px-12" style={{ background: "rgba(0,255,178,0.02)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--neon-green)" }}>Наши работы</p>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>Галерея</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <div key={i} onClick={() => setActiveGallery(i === activeGallery ? null : i)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                style={{ height: i % 3 === 1 ? "280px" : "220px", border: `1px solid ${activeGallery === i ? "var(--neon-green)" : "rgba(0,255,178,0.1)"}`, transition: "all 0.3s" }}>
                <img
                  src={item.img}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end p-4"
                  style={{ background: "linear-gradient(to top, rgba(10,13,20,0.92) 0%, rgba(10,13,20,0.2) 50%, transparent 100%)" }}>
                  <div>
                    <span className="text-xs px-2 py-1 rounded-full mb-2 inline-block"
                      style={{ background: "rgba(0,255,178,0.15)", border: "1px solid rgba(0,255,178,0.3)", color: "var(--neon-green)" }}>
                      {item.type}
                    </span>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                  </div>
                </div>
                {activeGallery === i && (
                  <div className="absolute inset-0 transition-all duration-300"
                    style={{ boxShadow: "inset 0 0 30px rgba(0,255,178,0.15)", border: "2px solid var(--neon-green)" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* BLOG */}
      <section id="blog" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--neon-green)" }}>Полезное</p>
              <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>Блог</h2>
            </div>
          </div>
          {/* Filter tabs */}
          <div className="flex gap-2 mb-10 flex-wrap">
            {["Все", "Kugoo", "Советы", "Тюнинг", "Обзор"].map(tab => (
              <button key={tab}
                onClick={() => setBlogFilter(tab)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: blogFilter === tab ? "var(--neon-green)" : "rgba(255,255,255,0.05)",
                  color: blogFilter === tab ? "#0A0D14" : "rgba(255,255,255,0.55)",
                  border: `1px solid ${blogFilter === tab ? "var(--neon-green)" : "rgba(255,255,255,0.1)"}`,
                }}>
                {tab}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.filter(p => blogFilter === "Все" || p.tag === blogFilter).map((post, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
                style={{ border: post.kugoo ? "1px solid rgba(0,255,178,0.25)" : undefined }}>
                <div className="h-40 flex items-center justify-center relative"
                  style={{ background: post.kugoo
                    ? "linear-gradient(135deg, rgba(0,255,178,0.1) 0%, rgba(0,212,255,0.08) 100%)"
                    : "linear-gradient(135deg, rgba(0,255,178,0.06) 0%, rgba(0,212,255,0.06) 100%)" }}>
                  <Icon name={post.kugoo ? "Bike" : "FileText"} size={48} style={{ color: "rgba(0,255,178,0.25)" }} />
                  {post.kugoo && (
                    <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-bold"
                      style={{ background: "rgba(0,255,178,0.15)", border: "1px solid rgba(0,255,178,0.4)", color: "var(--neon-green)" }}>
                      Kugoo
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2 py-1 rounded-full"
                      style={{ background: "rgba(0,255,178,0.1)", border: "1px solid rgba(0,255,178,0.2)", color: "var(--neon-green)" }}>
                      {post.tag}
                    </span>
                    <span className="text-xs flex items-center gap-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                      <Icon name="Clock" size={12} /> {post.read}
                    </span>
                  </div>
                  <h3 className="font-bold mb-3 leading-snug" style={{ fontFamily: "'Exo 2', sans-serif" }}>{post.title}</h3>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{post.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 md:px-12" style={{ background: "rgba(0,255,178,0.02)" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--neon-green)" }}>Связаться</p>
            <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ fontFamily: "'Exo 2', sans-serif" }}>Контакты</h2>
            <div className="space-y-6">
              {[
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Электрозаводская, 21" },
                { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                { icon: "Mail", label: "Email", value: "info@voltfix.ru" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Сб: 9:00 – 20:00" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,255,178,0.1)", border: "1px solid rgba(0,255,178,0.2)" }}>
                    <Icon name={c.icon} size={20} style={{ color: "var(--neon-green)" }} />
                  </div>
                  <div>
                    <div className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{c.label}</div>
                    <div className="font-semibold">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "'Exo 2', sans-serif" }}>Напишите нам</h3>
            <div className="space-y-4">
              <input className="dark-input" placeholder="Ваше имя" />
              <input className="dark-input" placeholder="Email или телефон" />
              <textarea className="dark-input resize-none" rows={4} placeholder="Опишите проблему с самокатом..." />
              <button className="w-full neon-btn py-4 rounded-xl">
                Отправить сообщение
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 md:px-12" style={{ borderTop: "1px solid rgba(0,255,178,0.1)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--neon-green), var(--neon-cyan))" }}>
              <Icon name="Zap" size={14} className="text-black" />
            </div>
            <span className="font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>Volt<span className="neon-text">Fix</span></span>
          </div>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>© 2026 VoltFix. Ремонт электросамокатов в Москве</p>
          <div className="flex gap-4">
            {["vk.com", "t.me", "wa.me"].map((s, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>
                <Icon name={i === 0 ? "Globe" : i === 1 ? "Send" : "MessageCircle"} size={16} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}