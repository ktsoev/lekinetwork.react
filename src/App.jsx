import { useEffect, useRef } from 'react';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #000;
    --accent: #00e5ff;
    --accent2: #7b2fff;
    --text: #e0e0e0;
    --dim: #555;
    --border: rgba(0,229,255,0.12);
    --glow: 0 0 24px rgba(0,229,255,0.25);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Manrope', sans-serif;
    overflow-x: hidden;
  }

  /* ── Background ── */
  .grid-bg {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(0,229,255,0.028) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,229,255,0.028) 1px, transparent 1px);
    background-size: 52px 52px;
  }
  .orb {
    position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
  }
  .orb-1 {
    width: 700px; height: 700px;
    background: radial-gradient(circle, rgba(0,229,255,0.055) 0%, transparent 68%);
    top: -260px; right: -200px;
  }
  .orb-2 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(123,47,255,0.055) 0%, transparent 68%);
    bottom: 60px; left: -160px;
  }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%,100% { opacity: .5; } 50% { opacity: 1; }
  }
  @keyframes scanMove {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  .fu  { animation: fadeUp .75s ease forwards; opacity: 0; }
  .d1  { animation-delay: .08s; }
  .d2  { animation-delay: .22s; }
  .d3  { animation-delay: .38s; }
  .d4  { animation-delay: .52s; }
  .d5  { animation-delay: .68s; }

  /* ── Navbar ── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    padding: 18px 64px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(0,0,0,.75);
    backdrop-filter: blur(22px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    display: flex; align-items: center; gap: 14px; text-decoration: none;
  }
  .nav-logo img {
    width: 38px; height: 38px; object-fit: contain; border-radius: 5px;
  }
  .nav-logo-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 23px; letter-spacing: 4px; color: var(--accent);
    text-shadow: var(--glow);
  }
  nav ul { list-style: none; display: flex; gap: 44px; }
  nav ul li a {
    color: var(--dim); text-decoration: none;
    font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase;
    transition: color .25s;
  }
  nav ul li a:hover { color: var(--accent); }

  /* ── Hero ── */
  .hero {
    position: relative; z-index: 1;
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 130px 64px 80px;
    overflow: hidden;
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 6px 18px;
    border: 1px solid var(--border);
    font-size: 10px; letter-spacing: 3.5px; text-transform: uppercase;
    color: var(--accent); margin-bottom: 36px;
  }
  .hero-tag-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
    animation: pulse 2s infinite;
  }
  .hero h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(64px, 9.5vw, 126px);
    line-height: .88; letter-spacing: 3px;
    margin-bottom: 36px;
  }
  .hero-grad {
    display: block;
    background: linear-gradient(120deg, var(--accent) 0%, var(--accent2) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero p {
    font-size: 15px; line-height: 1.85; color: #777;
    max-width: 480px; font-weight: 300; margin-bottom: 52px;
  }
  /* Corner decorations */
  .corner {
    position: absolute;
    width: 60px; height: 60px;
  }
  .corner--tl { top: 130px; left: 64px; border-top: 1px solid var(--accent); border-left: 1px solid var(--accent); opacity: .3; }
  .corner--br { bottom: 80px; right: 64px; border-bottom: 1px solid var(--accent); border-right: 1px solid var(--accent); opacity: .3; }

  /* Vertical tick */
  .hero-ticks {
    position: absolute; right: 64px; top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 4px; opacity: .18;
  }
  .hero-ticks span { display: block; height: 1px; background: var(--accent); }

  /* ── Button ── */
  .btn {
    display: inline-flex; align-items: center; gap: 12px;
    padding: 15px 40px;
    border: 1px solid var(--accent);
    background: transparent;
    color: var(--accent);
    font-family: 'Manrope', sans-serif;
    font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
    text-decoration: none; cursor: pointer;
    position: relative; overflow: hidden;
    transition: color .3s;
  }
  .btn::after {
    content: ''; position: absolute; inset: 0;
    background: var(--accent);
    transform: translateX(-101%);
    transition: transform .3s ease;
    z-index: -1;
  }
  .btn:hover { color: #000; }
  .btn:hover::after { transform: translateX(0); }

  /* ── Sections ── */
  section {
    position: relative; z-index: 1;
    padding: 110px 64px;
  }
  .sec-label {
    font-size: 10px; letter-spacing: 4px; text-transform: uppercase;
    color: var(--accent); margin-bottom: 14px;
    display: flex; align-items: center; gap: 12px;
  }
  .sec-label::after {
    content: ''; flex: 0 0 36px; height: 1px;
    background: var(--accent); opacity: .45;
  }
  .sec-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(42px, 5vw, 68px); letter-spacing: 2px;
    color: #fff; margin-bottom: 64px;
  }

  /* ── Services ── */
  .services-grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 1px; background: var(--border);
    border: 1px solid var(--border);
  }
  .svc {
    background: #000; padding: 52px 44px;
    position: relative; overflow: hidden;
    transition: background .3s;
  }
  .svc::after {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    transform: scaleX(0) scaleY(1);
    transition: transform .4s ease;
  }
  .svc:hover::after { transform: scaleX(1); }
  .svc:hover { background: rgba(0,229,255,0.022); }
  .svc-num {
    position: absolute; top: 20px; right: 32px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px; color: rgba(0,229,255,.07); line-height: 1;
    user-select: none;
  }
  .svc-icon {
    width: 44px; height: 44px; color: var(--accent); margin-bottom: 26px;
  }
  .svc h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px; letter-spacing: 1.5px;
    color: #fff; margin-bottom: 14px;
  }
  .svc p { font-size: 13.5px; line-height: 1.75; color: #5a5a5a; font-weight: 300; }

  /* ── Pricing ── */
  #pricing { border-top: 1px solid var(--border); }
  .pricing-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1px; background: var(--border);
    border: 1px solid var(--border);
  }
  .plan {
    background: #000; padding: 52px 44px;
    position: relative; overflow: hidden;
    display: flex; flex-direction: column;
    transition: background .3s;
  }
  .plan--featured {
    background: rgba(0,229,255,0.04);
  }
  .plan--featured::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
  }
  .plan-badge {
    align-self: flex-start;
    font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
    color: #000; background: var(--accent);
    padding: 4px 14px; margin-bottom: 30px;
  }
  .plan-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px; letter-spacing: 2px;
    color: #fff; margin-bottom: 8px;
  }
  .plan-desc {
    font-size: 12px; color: #444; line-height: 1.65;
    letter-spacing: 0.3px; margin-bottom: 30px;
  }
  .plan-price {
    display: flex; align-items: baseline; gap: 4px;
    margin-bottom: 36px;
  }
  .plan-price-n {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 62px; color: var(--accent); line-height: 1;
  }
  .plan-price-aside {
    display: flex; flex-direction: column; gap: 3px; padding-bottom: 4px;
  }
  .plan-price-cur { font-size: 18px; color: var(--accent); font-weight: 300; }
  .plan-price-per {
    font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #3a3a3a;
  }
  .plan-features {
    list-style: none; margin-bottom: 44px; flex: 1;
  }
  .plan-features li {
    font-size: 13px; color: #5a5a5a; font-weight: 300;
    padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,.04);
    display: flex; align-items: center; gap: 12px;
  }
  .plan-features li::before {
    content: ''; width: 4px; height: 4px; border-radius: 50%;
    background: var(--accent); opacity: .55; flex-shrink: 0;
  }
  .plan--featured .plan-features li { color: #777; }
  .plan .btn { align-self: flex-start; }

  /* ── About ── */
  #about { background: rgba(0,229,255,.012); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 88px; align-items: center; }
  .about-body p { font-size: 14.5px; line-height: 1.95; color: #6a6a6a; font-weight: 300; margin-bottom: 22px; }
  .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; }
  .stat { border-left: 1px solid var(--border); padding-left: 26px; }
  .stat-n {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px; color: var(--accent); line-height: 1; margin-bottom: 8px;
  }
  .stat-l { font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; color: #444; }

  /* ── Contact ── */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 88px; align-items: start; }
  .contact-info h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 34px; letter-spacing: 2px; color: #fff; margin-bottom: 20px;
  }
  .contact-info > p { font-size: 14px; line-height: 1.8; color: #5a5a5a; margin-bottom: 36px; }
  .c-item {
    display: flex; align-items: center; gap: 16px;
    padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,.04);
  }
  .c-icon {
    width: 34px; height: 34px; border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--accent); font-size: 14px; flex-shrink: 0;
  }
  .c-text { font-size: 13.5px; color: #666; }

  .contact-form { display: flex; flex-direction: column; gap: 14px; }
  .contact-form input, .contact-form textarea {
    width: 100%; background: transparent;
    border: 1px solid rgba(255,255,255,.07);
    padding: 15px 20px;
    color: var(--text);
    font-family: 'Manrope', sans-serif; font-size: 13.5px;
    outline: none; transition: border-color .25s; resize: none;
  }
  .contact-form input::placeholder,
  .contact-form textarea::placeholder { color: #333; }
  .contact-form input:focus,
  .contact-form textarea:focus { border-color: var(--accent); }
  .contact-form textarea { height: 120px; }

  /* ── Footer ── */
  footer {
    position: relative; z-index: 1;
    padding: 36px 64px;
    border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 20px;
  }
  .footer-logo { display: flex; align-items: center; gap: 12px; }
  .footer-logo img { width: 30px; height: 30px; object-fit: contain; border-radius: 4px; }
  .footer-logo-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px; letter-spacing: 4px; color: var(--accent);
  }
  .footer-legal {
    font-size: 11px; color: #383838; letter-spacing: 1px; text-align: center; line-height: 1.9;
  }
  .footer-copy { font-size: 11px; color: #2a2a2a; letter-spacing: 1px; }

  /* ── Responsive ── */
  @media (max-width: 820px) {
    nav { padding: 16px 20px; }
    nav ul { display: none; }
    .nav-logo-name { font-size: 20px; letter-spacing: 3px; }

    .hero { padding: 100px 20px 60px; }
    .hero h1 { font-size: clamp(32px, 10vw, 62px); letter-spacing: 1px; }
    .hero p { font-size: 14px; margin-bottom: 40px; }

    section { padding: 64px 20px; }
    .sec-title { margin-bottom: 40px; }

    .services-grid, .pricing-grid { grid-template-columns: 1fr; }
    .svc { padding: 36px 28px; }
    .plan { padding: 36px 28px; }
    .plan-price-n { font-size: 52px; }

    .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    .stats { gap: 24px; }
    .stat-n { font-size: 42px; }

    footer { padding: 28px 20px; flex-direction: column; align-items: flex-start; gap: 14px; }
    .footer-logo-name { font-size: 18px; letter-spacing: 3px; }
    .footer-legal { text-align: left; }

    .hero-ticks, .corner { display: none; }
  }
`;

/* ── SVG Icons ── */
const IconRoute = () => (
  <svg className="svc-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8" cy="40" r="5"/>
    <circle cx="40" cy="8" r="5"/>
    <path d="M8 35V22a12 12 0 0112-12h8"/>
    <path d="M40 13v14a12 12 0 01-12 12H20"/>
    <path d="M34 2l6 6-6 6"/>
    <path d="M14 42l-6-6 6-6"/>
  </svg>
);

const IconShield = () => (
  <svg className="svc-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M24 4L8 10v14c0 10.5 7.2 19.5 16 22 8.8-2.5 16-11.5 16-22V10L24 4z"/>
    <path d="M17 24l5 5 9-10"/>
  </svg>
);

const IconChart = () => (
  <svg className="svc-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="6,36 16,24 22,30 32,16 42,22"/>
    <path d="M38 12h8v8"/>
    <path d="M6 42h36"/>
  </svg>
);

const IconNodes = () => (
  <svg className="svc-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="24" cy="6"  r="4"/>
    <circle cx="6"  cy="42" r="4"/>
    <circle cx="42" cy="42" r="4"/>
    <line x1="24" y1="10" x2="24" y2="22"/>
    <line x1="24" y1="22" x2="8"  y2="38"/>
    <line x1="24" y1="22" x2="40" y2="38"/>
    <line x1="8"  y1="42" x2="40" y2="42"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

/* ── App ── */
export default function App() {
  return (
    <>
      <style>{css}</style>

      {/* Backgrounds */}
      <div className="grid-bg"/>
      <div className="orb orb-1"/>
      <div className="orb orb-2"/>

      {/* ── Nav ── */}
      <nav>
        <a href="#" className="nav-logo">
          <img src="/logo.jpeg" alt="Leki Networks logo"/>
          <span className="nav-logo-name">LEKI NETWORKS</span>
        </a>
        <ul>
          <li><a href="#services">Услуги</a></li>
          <li><a href="#pricing">Тарифы</a></li>
          <li><a href="#about">О нас</a></li>
          <li><a href="#contact">Контакты</a></li>
        </ul>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="corner corner--tl"/>
        <div className="corner corner--br"/>
        <div className="hero-ticks">
          {[220,160,100,60,30,60,100,160,220].map((w, i) => (
            <span key={i} style={{ width: w }}/>
          ))}
        </div>

        <div>
          <div className="hero-tag fu d1">
            <span className="hero-tag-dot"/>
            Сетевая инфраструктура
          </div>
          <h1 className="fu d2">
            УМНАЯ<br/>
            <span className="hero-grad">ЗАЩИТА</span><br/>
            СЕТЕЙ
          </h1>
          <p className="fu d3">
            Проектируем и сопровождаем высокопроизводительные корпоративные сети.
            Надёжные каналы передачи данных, оптимальный трафик, защищённые соединения.
          </p>
          <a href="#services" className="btn fu d4">
            Наши услуги <ArrowRight/>
          </a>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services">
        <div className="sec-label">Направления</div>
        <h2 className="sec-title">НАШИ УСЛУГИ</h2>
        <div className="services-grid">
          {[
            {
              num: '01', Icon: IconRoute,
              title: 'Маршрутизация сетей',
              text: 'Настройка и поддержка маршрутизации трафика между сегментами корпоративной сети. Оптимальные пути передачи данных с учётом топологии и нагрузки.'
            },
            {
              num: '02', Icon: IconShield,
              title: 'Защищённые сетевые каналы',
              text: 'Построение изолированных зашифрованных каналов передачи данных между сетевыми узлами. Полное соответствие требованиям информационной безопасности.'
            },
            {
              num: '03', Icon: IconChart,
              title: 'Оптимизация трафика',
              text: 'Анализ и управление потоками трафика для снижения задержек и повышения пропускной способности корпоративных каналов связи.'
            },
            {
              num: '04', Icon: IconNodes,
              title: 'Подключение удалённых офисов',
              text: 'Интеграция удалённых офисов и рабочих мест в единую корпоративную инфраструктуру с гарантированным качеством и стабильностью связи.'
            }
          ].map(({ num, Icon, title, text }) => (
            <div key={num} className="svc">
              <span className="svc-num">{num}</span>
              <Icon/>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing">
        <div className="sec-label">Защищённый доступ</div>
        <h2 className="sec-title">ТАРИФЫ</h2>
        <div className="pricing-grid">
          {[
            {
              name: 'Персональный',
              desc: 'Защищённый канал передачи данных для личного использования',
              price: '190',
              features: [
                '1 подключение',
                'Зашифрованный туннель передачи данных',
                'Защита трафика в публичных сетях',
                'Автоматическое установление соединения',
                'Поддержка по email',
              ],
            },
            {
              name: 'Стандарт',
              desc: 'Выделенный сетевой контур для команды с приоритизацией трафика',
              price: '490',
              featured: true,
              badge: 'Популярный',
              features: [
                '5 подключений',
                'Изолированный приоритизированный канал',
                'Защита от утечек DNS',
                'Мониторинг состояния канала',
                'Поддержка 24/7',
              ],
            },
            {
              name: 'Корпоративный',
              desc: 'Персональный сетевой узел выделенной приватной сети для организации',
              price: '990',
              features: [
                '15 подключений',
                'Выделенный узел инфраструктуры',
                'Статический IP-адрес',
                'Полоса пропускания до 1 Гбит/с',
                'Приоритетная поддержка 24/7',
              ],
            },
          ].map(({ name, desc, price, features, featured, badge }) => (
            <div key={name} className={`plan${featured ? ' plan--featured' : ''}`}>
              {badge && <span className="plan-badge">{badge}</span>}
              <div className="plan-name">{name}</div>
              <div className="plan-desc">{desc}</div>
              <div className="plan-price">
                <span className="plan-price-n">{price}</span>
                <div className="plan-price-aside">
                  <span className="plan-price-cur">₽</span>
                  <span className="plan-price-per">/ месяц</span>
                </div>
              </div>
              <ul className="plan-features">
                {features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <a href="#contact" className="btn">Подключить <ArrowRight/></a>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about">
        <div className="about-grid">
          <div>
            <div className="sec-label">Компания</div>
            <h2 className="sec-title">О НАС</h2>
            <div className="about-body">
              <p>
                LEKI Networks — российская компания, специализирующаяся на построении и сопровождении корпоративной сетевой инфраструктуры. Мы работаем с организациями разного масштаба: от малого бизнеса до распределённых холдингов.
              </p>
              <p>
                Наши инженеры обеспечивают стабильную и безопасную передачу данных по каналам любой сложности. Проводим полный цикл работ: проектирование, монтаж, настройку и техническое обслуживание.
              </p>
            </div>
          </div>
          <div className="stats">
            {[
              { n: '5+',   l: 'Лет на рынке' },
              { n: '120+', l: 'Проектов' },
              { n: '99.9%',l: 'Uptime каналов' },
              { n: '24/7', l: 'Поддержка' },
            ].map(({ n, l }) => (
              <div key={l} className="stat">
                <div className="stat-n">{n}</div>
                <div className="stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact">
        <div className="sec-label">Связь</div>
        <h2 className="sec-title">КОНТАКТЫ</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Свяжитесь с нами</h3>
            <p>Расскажите о задачах вашей инфраструктуры — подберём оптимальное решение.</p>
            {[
              { icon: '✉', text: 'info@lekinetwork.ru' },
              { icon: '☎', text: '+7 (495) 000-00-00' },
              { icon: '⌖', text: 'г. Москва' },
            ].map(({ icon, text }) => (
              <div key={text} className="c-item">
                <div className="c-icon">{icon}</div>
                <div className="c-text">{text}</div>
              </div>
            ))}
          </div>
          <form className="contact-form" onSubmit={e => e.preventDefault()}>
            <input type="text"  placeholder="Ваше имя"/>
            <input type="email" placeholder="Email"/>
            <input type="tel"   placeholder="Телефон"/>
            <textarea placeholder="Сообщение или описание задачи"/>
            <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }}>
              Отправить <ArrowRight/>
            </button>
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="footer-logo">
          <img src="/logo.jpeg" alt="Leki Networks"/>
          <span className="footer-logo-name">LEKI NETWORKS</span>
        </div>
        <div className="footer-legal">
          ОГРНИП: 326774600256631&nbsp;&nbsp;|&nbsp;&nbsp;ИНН: 772010342868
        </div>
        <div className="footer-copy">© 2025 LEKI NETWORKS</div>
      </footer>
    </>
  );
}
