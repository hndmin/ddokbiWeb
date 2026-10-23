<script>
  import Nav from '../lib/Nav.svelte';
  import Footer from '../lib/Footer.svelte';
  import Carousel from '../lib/Carousel.svelte';
  import { User, Users, Map, ArrowRight, CirclePlay, ExternalLink } from '@lucide/svelte';

  let scrollY = $state(0);

  const navMenu = [
    { label: '똑비투어', href: 'https://ddokbitour.com', newTab: true },
    { label: '메트라이프 비서서비스', href: '/360f.html', newTab: true },
  ];

  const tourSlides = [
    { img: '/assets/tour_solo.jpg', alt: '1인 여행', caption: '1인 여행', icon: User },
    { img: '/assets/tour_companion.png', alt: '동행 매칭', caption: '동행 매칭', icon: Users },
    { img: '/assets/tour_domestic.jpg', alt: '국내 여행', caption: '국내 여행', icon: Map },
  ];

  const kagoSlides = [
    { img: '/assets/product_kagoshima_a.jpg', alt: '가고시마 한 달 어학당' },
    { img: '/assets/product_kagoshima_b.jpg', alt: '가고시마 클래식' },
    { img: '/assets/product_kagoshima_c.jpg', alt: '가고시마 스위트' },
  ];
</script>

<Nav
  logo="/assets/logo.png"
  logoWhite="/assets/logo_ff.png"
  menu={navMenu}
  useBeforeScroll
  threshold={1200}
/>

<svelte:window bind:scrollY />

<!-- HERO -->
<section class="hero">
  <div class="hero-sticky" style="padding: {Math.min(1, scrollY / 560) * 28}px;">
    <div class="hero-frame" style="border-radius: {Math.min(1, scrollY / 560) * 36}px;">
      <div class="hero-bg" style="transform: translate3d(0, {scrollY * 0.12}px, 0) scale(1.1);">
        <img src="/assets/hero_bg.jpg" alt="" />
      </div>
      <div class="hero-content">
        <h1>여행부터 일상비서까지,<br />똑비가 함께 합니다!</h1>
        <p class="hero-sub">
          1인 여행부터 동행매칭, 국내여행, 그리고 일상의 비서서비스까지.<br />
          똑똑한 여행 파트너 똑비와 시작하세요.
        </p>
        <div class="hero-actions">
          <a class="btn btn-primary btn-lg" href="#tour">똑비투어 둘러보기</a>
          <a class="btn btn-glass btn-lg" href="#metlife">비서서비스 알아보기</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 1. 똑비투어 -->
<section class="section" id="tour">
  <div class="container">
    <div class="sec-head">
      <span class="sec-num">01</span>
      <h2>똑비투어</h2>
    </div>

    <!-- 투어 상품 카드: 텍스트 + 카루셀 -->
    <div class="feature-card">
      <div class="fc-text">
        <h3>1인 여행부터<br />국내여행까지</h3>
        <p>
          혼자 떠나는 자유로움은 그대로, 외로움은 덜어내는 똑비투어.
          취향이 맞는 동행을 매칭하고 국내 곳곳의 여행지를 함께 찾아드립니다.
        </p>
        <a class="btn btn-primary btn-lg" href="https://ddokbitour.com" target="_blank" rel="noopener">
          똑비투어 바로가기 <ArrowRight size={18} />
        </a>
      </div>
      <div class="fc-carousel">
        <Carousel slides={tourSlides} fill />
      </div>
    </div>

    <!-- 가고시마 한달살기 카드: 텍스트 + 카루셀 -->
    <div class="feature-card reverse" id="kagoshima">
      <div class="fc-text">
        <h3>가고시마<br />한달살기</h3>
        <p>
          온천과 화산, 느긋한 일상이 있는 가고시마에서의 한 달.
          똑비와 함께 진짜 현지의 삶을 경험하세요. 유튜브에서 생생한 이야기도 만나보세요.
        </p>
        <div class="fc-actions">
          <a class="btn btn-primary" href="https://ddokbitour.com/kagoshima" target="_blank" rel="noopener">
            한달살기 보기 <ArrowRight size={18} />
          </a>
          <a class="btn btn-outline" href="https://www.youtube.com/@ddokbi" target="_blank" rel="noopener">
            <CirclePlay size={18} /> 똑비 유튜브
          </a>
        </div>
      </div>
      <div class="fc-carousel">
        <Carousel slides={kagoSlides} fill position="center top" />
      </div>
    </div>
  </div>
</section>

<!-- 2. 메트라이프 비서 서비스 -->
<section class="section band" id="metlife">
  <div class="container">
    <div class="sec-head">
      <span class="sec-num">02</span>
      <h2>메트라이프 비서 서비스</h2>
      <p>
        구매·예약·추천·검색까지. 시니어 일상의 소소한 요청을
        똑똑한 비서 똑비가 대신 해결해드립니다.
      </p>
    </div>
    <div class="met-card">
      <div class="met-copy">
        <h3>메트라이프 360Future<br />회원을 위한 비서서비스</h3>
        <p>
          급변하는 세상 속 앞서가는 당신의 일상을 똑비가 만들어드립니다.
          귀찮고 소소한 요청, 이제 똑똑한 비서 똑비에게 맡기세요.
        </p>
        <a class="btn btn-primary btn-lg" href="/360f.html" target="_blank" rel="noopener">
          비서서비스 자세히 보기 <ExternalLink size={18} />
        </a>
      </div>
      <div class="met-visual">
        <img src="/assets/logo_metlife_vertical.png" alt="MetLife × 똑비" />
        <span class="met-chip-label">360Future 회원 전용</span>
      </div>
    </div>
  </div>
</section>

<Footer />

<style>
  /* HERO — full screen, morphs into a card on scroll */
  .hero {
    height: 170vh;
  }
  .hero-sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    box-sizing: border-box;
  }
  .hero-frame {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow: var(--shadow-lg);
    transition: box-shadow 0.3s ease;
  }
  .hero-bg {
    position: absolute;
    inset: -6% 0 0 0;
    z-index: -2;
    will-change: transform;
  }
  .hero-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .hero-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.28) 0%,
      rgba(0, 0, 0, 0.12) 45%,
      rgba(0, 0, 0, 0.34) 100%
    );
  }
  .hero-content {
    padding: 0 24px;
    max-width: 820px;
  }
  .hero h1 {
    font-size: clamp(2.4rem, 6vw, 4.4rem);
    line-height: 1.18;
    margin: 0 0 20px;
    color: #fff;
    text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
  }
  .hero-sub {
    font-size: clamp(1.05rem, 2.2vw, 1.3rem);
    color: rgba(255, 255, 255, 0.92);
    margin-bottom: 36px;
    text-shadow: 0 1px 14px rgba(0, 0, 0, 0.35);
  }
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }
  .hero-actions :global(.btn-glass) {
    background: rgba(255, 255, 255, 0.16);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(6px);
  }
  .hero-actions :global(.btn-glass:hover) {
    background: rgba(255, 255, 255, 0.26);
  }

  /* SECTION HEAD */
  .band {
    background: var(--bg-muted);
  }
  .sec-head {
    max-width: 640px;
    margin: 0 auto 56px;
    text-align: center;
  }
  .sec-num {
    display: inline-block;
    font-size: var(--fs-title5);
    font-weight: 800;
    color: var(--accent);
    letter-spacing: 0.06em;
    margin-bottom: 12px;
  }
  .sec-head h2 {
    font-size: clamp(2rem, 4.2vw, 2.9rem);
    line-height: 1.22;
    margin-bottom: 18px;
    color: var(--fg);
  }
  .sec-head p {
    color: var(--fg-muted);
    font-size: clamp(1.02rem, 2vw, 1.18rem);
  }
  /* FEATURE CARDS (text + carousel) */
  .feature-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
    background: var(--bg);
    border-radius: 28px;
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    min-height: 460px;
    margin-bottom: 28px;
  }
  .feature-card.reverse {
    min-height: 620px;
  }
  .feature-card:last-child {
    margin-bottom: 0;
  }
  .feature-card.reverse .fc-text {
    order: 2;
  }
  .fc-text {
    padding: 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .fc-carousel {
    position: relative;
    min-height: 0;
  }
  .fc-text h3 {
    font-size: clamp(1.7rem, 3.4vw, 2.4rem);
    line-height: 1.22;
    margin-bottom: 16px;
    color: var(--fg);
  }
  .fc-text p {
    color: var(--fg-muted);
    font-size: var(--fs-title5);
    margin-bottom: 28px;
  }
  .fc-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  /* METLIFE */
  .met-card {
    background: var(--bg);
    border-radius: 28px;
    padding: 56px;
    display: grid;
    grid-template-columns: 1.25fr 0.75fr;
    gap: 56px;
    align-items: center;
    box-shadow: var(--shadow-sm);
  }
  .met-copy h3 {
    font-size: clamp(1.6rem, 3.2vw, 2.1rem);
    line-height: 1.25;
    margin-bottom: 18px;
    color: var(--fg);
  }
  .met-copy p {
    color: var(--fg-muted);
    font-size: var(--fs-body1);
    margin-bottom: 28px;
  }
  .met-visual {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    background: var(--bg-muted);
    border-radius: 24px;
    padding: 36px;
  }
  .met-visual img {
    height: 128px;
    width: auto;
  }
  .met-chip-label {
    font-size: var(--fs-body2);
    font-weight: 700;
    color: var(--accent);
    background: var(--accent-soft);
    padding: 7px 16px;
    border-radius: 999px;
  }

  @media (max-width: 900px) {
    .feature-card,
    .feature-card.reverse {
      grid-template-columns: 1fr;
      min-height: 0;
    }
    .feature-card.reverse .fc-text {
      order: 2;
    }
    .fc-text {
      padding: 36px 28px;
    }
    .fc-carousel {
      height: 300px;
      order: 1;
    }
    .feature-card.reverse .fc-carousel {
      height: 440px;
    }
    .fc-actions {
      justify-content: flex-start;
    }
    .met-card {
      grid-template-columns: 1fr;
      padding: 36px 28px;
      gap: 32px;
      text-align: center;
    }
    .met-visual {
      order: -1;
    }
  }
</style>
