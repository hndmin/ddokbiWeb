<script>
  import Nav from '../lib/Nav.svelte';
  import Footer from '../lib/Footer.svelte';
  import { slide } from 'svelte/transition';
  import {
    ShoppingCart,
    CalendarCheck,
    ThumbsUp,
    Search,
    Star,
    Plus,
    ArrowRight,
    Download,
    UserPlus,
    Share2,
    CreditCard,
    Clock,
    ChevronRight,
  } from '@lucide/svelte';

  const navMenu = [
    { label: '서비스 소개', href: '#services' },
    { label: '파트너사', href: '#partners' },
    { label: '후기 & FAQ', href: '#reviews' },
  ];

  const useDdokbi = () => window.useDdokbi?.();

  const services = [
    {
      icon: ShoppingCart,
      title: '구매',
      desc: '온라인 플랫폼은 많고 회원가입·결제는 번거롭습니다. 똑비가 대신 처리해드려요.',
      tags: ['의류', '식료품', '배달', '장보기', '선물'],
    },
    {
      icon: CalendarCheck,
      title: '예약 & 예매',
      desc: '복잡한 예약도 전화 한 통처럼 간단하게. 일정만 알려주세요.',
      tags: ['항공·기차·버스', '택시', '숙소·렌터카', '공연·전시·스포츠'],
    },
    {
      icon: ThumbsUp,
      title: '추천',
      desc: '무엇을 고를지 고민될 때, 믿을 수 있는 추천으로 선택을 도와드립니다.',
      tags: ['맛집', '카페', '여행지', '상품'],
    },
    {
      icon: Search,
      title: '검색',
      desc: '일상에 필요한 정보를 대신 찾아 알기 쉽게 정리해드립니다.',
      tags: ['취미·생활', '행정·세무·법률', '의료시설'],
    },
  ];

  const partners = [
    { name: '매쉬업엔젤스', logo: '/assets/logo_mashup.png' },
    { name: '인하공업전문대학교 비서학과', logo: '/assets/logo_inha.png' },
    { name: '시니어벤처협회', logo: '/assets/logo_senior_venture.png' },
    { name: '코리안시니어즈', logo: '/assets/logo_korean_seniors.png' },
  ];

  const conversations = [
    {
      img: '/assets/service_hero.jpg',
      msgs: [
        { from: 'user', text: '기차표 예매 좀 부탁해요' },
        { from: 'bot', text: '네, 내일 오전 서울-부산 KTX 2매 예매해드릴게요.' },
        { from: 'bot', mini: true, text: '예매 완료했어요. 좌석은 8호차 3A·3B 입니다.' },
      ],
    },
    {
      img: '/assets/tour_domestic.jpg',
      msgs: [
        { from: 'user', text: '손주 주려는데 홍삼 제일 싼 곳 찾아줘' },
        { from: 'bot', text: '여러 쇼핑몰을 비교했어요. A몰이 23% 더 저렴해요.' },
        { from: 'bot', mini: true, text: '주문까지 완료했어요. 모레 도착 예정입니다.' },
      ],
    },
    {
      img: '/assets/tour_solo.jpg',
      msgs: [
        { from: 'user', text: '내일 정형외과 예약 좀 해줄래요?' },
        { from: 'bot', text: '가까운 튼튼정형외과로 내일 10시 예약 잡아드릴게요.' },
        { from: 'bot', mini: true, text: '예약 완료! 아침에 잊지 않게 알려드릴게요.' },
      ],
    },
    {
      img: '/assets/tour_companion.png',
      msgs: [
        { from: 'user', text: '가족 모임할 식당 예약하고 싶어요' },
        { from: 'bot', text: '근처 한정식집 4인 자리를 토요일 6시로 알아봤어요.' },
        { from: 'bot', mini: true, text: '예약 확정됐어요. 주차도 가능하다고 하네요.' },
      ],
    },
  ];

  const nConvo = conversations.length;
  let convo = $state(0); // 0..nConvo (nConvo = cloned first slide for seamless loop)
  let animate = $state(true);
  const activeIdx = $derived(convo % nConvo);
  let resetTimer;
  const advance = () => {
    animate = true;
    convo += 1;
    if (convo === nConvo) {
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        animate = false;
        convo = 0;
      }, 560);
    }
  };
  const gotoConvo = (i) => {
    clearTimeout(resetTimer);
    animate = true;
    convo = i;
  };

  // Chat typing playback for the active conversation
  let revealCount = $state(0); // messages fully revealed
  let typing = $state(''); // partial text of the message currently being typed
  let settled = $state({}); // bot message indices whose color has settled to primary-600
  const activeMsgs = $derived(conversations[activeIdx].msgs);
  const totalChars = $derived(activeMsgs.reduce((s, m) => s + m.text.length, 0));
  const doneChars = $derived(
    activeMsgs.slice(0, revealCount).reduce((s, m) => s + m.text.length, 0) + typing.length
  );
  const progress = $derived(totalChars ? doneChars / totalChars : 0);

  // Visible messages for the active conversation (so the bubble can be the sole
  // keyed child of the #each, required by animate:flip)
  const visibleMsgs = $derived.by(() => {
    const out = [];
    for (let mi = 0; mi < activeMsgs.length; mi++) {
      if (mi < revealCount || (mi === revealCount && typing !== '')) {
        out.push({
          mi,
          from: activeMsgs[mi].from,
          text: mi < revealCount ? activeMsgs[mi].text : typing,
          isTyping: mi === revealCount,
        });
      }
    }
    return out;
  });

  $effect(() => {
    const msgs = conversations[activeIdx].msgs; // tracked dependency
    revealCount = 0;
    typing = '';
    settled = {};
    let cancelled = false;
    let timer;
    const settleTimers = [];
    const typeMessage = (mi) => {
      if (cancelled) return;
      if (mi >= msgs.length) {
        timer = setTimeout(() => !cancelled && advance(), 1600); // pause, then next convo
        return;
      }
      const text = msgs[mi].text;
      let ci = 0;
      const typeChar = () => {
        if (cancelled) return;
        ci += 1;
        if (ci === 1 && msgs[mi].from === 'bot') {
          // 0.5s after this bubble appears, settle its color to primary-600
          settleTimers.push(
            setTimeout(() => {
              if (!cancelled) settled = { ...settled, [mi]: true };
            }, 500)
          );
        }
        typing = text.slice(0, ci);
        if (ci < text.length) {
          timer = setTimeout(typeChar, 42);
        } else {
          revealCount = mi + 1;
          typing = '';
          timer = setTimeout(() => typeMessage(mi + 1), 700); // pause between bubbles
        }
      };
      timer = setTimeout(typeChar, 420); // delay before the bubble appears
    };
    typeMessage(0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      settleTimers.forEach(clearTimeout);
    };
  });

  // Animate a bubble's height: from 0 on appear (which pushes the bubbles above
  // it up smoothly in the bottom-anchored list), and on each line-wrap as it types
  function smoothHeight(node) {
    let anim = null;
    const easing = 'cubic-bezier(0.2, 0.7, 0.2, 1)';
    const run = (from, to) => {
      if (anim) anim.cancel();
      anim = node.animate(
        [{ height: `${from}px` }, { height: `${to}px` }],
        { duration: 240, easing }
      );
      anim.onfinish = anim.oncancel = () => {
        anim = null;
        prev = node.offsetHeight;
      };
    };
    let prev = node.offsetHeight; // layout height, unaffected by transforms
    run(0, prev); // appear: grow from 0 → full, lifting the bubbles above
    const ro = new ResizeObserver(() => {
      if (anim) return; // ignore frames caused by our own running animation
      const next = node.offsetHeight;
      if (Math.abs(next - prev) < 0.5) return; // width-only change → skip
      const from = prev;
      prev = next;
      run(from, next);
    });
    ro.observe(node);
    return {
      destroy: () => {
        ro.disconnect();
        if (anim) anim.cancel();
      },
    };
  }

  const reviews = [
    { text: '우리 아들들도 다 찾아봤는데 똑비가 가장 저렴한 걸 찾아주네요. 싸게 살 수 있게 해줘서 고마워요.', name: '최OO', meta: '65세 · 여성' },
    { text: '똑비의 따뜻한 출·퇴근 인사에 하루 시작과 마무리가 든든해요. 진짜 이제 똑비 없는 하루가 상상이 안되네요~', name: '정OO', meta: '56세 · 여성' },
    { text: '쇼핑이랑 예약할 때 매번 회원가입과 결제가 너무 복잡해 포기하기도 했는데, 이제 똑비가 있으니 일상이 편해졌어요. 시간도 아껴주니 제 시간이 더 많아진 느낌이에요!', name: '김OO', meta: '62세 · 여성' },
    { text: '자식·남편한테 부탁 안 해도 된다는 생각에 진짜 평생 똑비만 의지하면서 살 수 있겠다 생각이 들어요.', name: '김OO', meta: '63세 · 여성' },
    { text: '사고 싶은 걸 인터넷으로 사본 적도 없는데, 똑비 덕분에 처음으로 사봤어요. 이젠 말만 하면 해주니까 생필품 다 똑비 시키네요.', name: '윤OO', meta: '77세 · 남성' },
  ];

  const faqs = [
    { icon: UserPlus, q: '회원가입은 어떻게 하나요?', a: 'Google Play 스토어에서 "똑비"를 검색해 앱을 설치하고 가입을 진행하시면 됩니다.' },
    { icon: Share2, q: '지인에게 추천해주고 싶은데요?', a: '똑비에게 초대를 요청하시면 카카오톡 또는 문자로 간편하게 공유해드립니다.' },
    { icon: CreditCard, q: '결제는 어떻게 하나요?', a: '계좌이체 또는 신용카드 결제가 가능합니다.' },
    { icon: Clock, q: '주말에도 근무하나요?', a: '평일 오전 9시~오후 6시에 운영하며, 주말·공휴일 요청은 다음 영업일에 신속히 처리해드립니다.' },
  ];

  let openFaq = $state(0);
  const toggle = (i) => (openFaq = openFaq === i ? -1 : i);
</script>

<Nav
  logo="/assets/logo_metlife_default.png"
  logoAlt="MetLife × 똑비"
  logoHeight={30}
  menu={navMenu}
  ctaLabel="똑비 바로 이용하기"
  ctaOnClick={useDdokbi}
/>

<!-- HERO -->
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-copy">
      <span class="pill"><span class="dot"></span> 메트라이프 360Future 회원 전용</span>
      <h1>시니어 일상의<br />똑똑한 비서, 똑비</h1>
      <p class="hero-sub">
        급변하는 세상 속 앞서가는 당신의 일상을 똑비가 만들어드립니다.
        귀찮고 소소한 요청, 이제 똑똑한 비서 똑비에게 맡기세요.
      </p>
      <div class="hero-actions">
        <button type="button" class="btn btn-primary btn-lg" onclick={useDdokbi}>똑비 바로 이용하기</button>
        <a class="btn btn-outline btn-lg" href="#services">서비스 살펴보기</a>
      </div>
      <p class="hero-disclaimer">
        똑비 서비스 운영 및 이용과 관련된 책임은<br />
        (주)토끼와두꺼비에 있습니다.
      </p>
    </div>
    <div class="hero-art">
      <div class="hero-carousel">
        <div class="hero-window">
          <div
            class="hero-track"
            style="transform: translateX(-{convo * 100}%); transition: {animate
              ? 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)'
              : 'none'};"
          >
            {#each [...conversations, conversations[0]] as c, si}
              <div class="hero-slide">
                <div class="chat">
                  <div class="chat-head">
                    <img class="chat-ava" src="/assets/profile.jpg" alt="똑비 프로필" />
                    <span class="chat-id">
                      <strong>똑비</strong>
                      <span>똑똑한 비서</span>
                    </span>
                  </div>
                  <div class="chat-msgs">
                    {#if si === convo}
                      {#each visibleMsgs as b (b.mi)}
                        <div
                          class="bubble {b.from}"
                          class:typing={b.isTyping}
                          class:settled={b.from === 'bot' && settled[b.mi]}
                          use:smoothHeight
                        >
                          {b.text}
                        </div>
                      {/each}
                    {:else}
                      {#each c.msgs as b}
                        <div class="bubble {b.from}" class:settled={b.from === 'bot'}>{b.text}</div>
                      {/each}
                    {/if}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <button class="hero-arrow next" onclick={advance} aria-label="다음 대화">
          <ChevronRight size={22} />
        </button>
      </div>

      <div class="chat-progress">
        {#each conversations as _, i}
          <button
            class="pbar"
            onclick={() => gotoConvo(i)}
            aria-label={`${i + 1}번째 대화`}
          >
            <span
              class="pbar-fill"
              style="width: {i < activeIdx ? 100 : i === activeIdx ? progress * 100 : 0}%;"
            ></span>
          </button>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section class="section" id="services">
  <div class="container">
    <div class="sec-head">
      <h2>똑비의 4가지 비서서비스</h2>
      <p>구매부터 검색까지, 일상의 번거로움을 똑비가 대신합니다.</p>
    </div>
    <div class="svc-grid">
      {#each services as s}
        {@const Icon = s.icon}
        <div class="svc-card">
          <span class="svc-icon"><Icon size={24} /></span>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
          <div class="svc-tags">
            {#each s.tags as t}<span>{t}</span>{/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- PARTNERS -->
<section class="section band" id="partners">
  <div class="container">
    <div class="sec-head">
      <h2>파트너사</h2>
    </div>
    <div class="partner-row">
      {#each partners as p}
        <div class="partner-chip">
          <img src={p.logo} alt={p.name} loading="lazy" />
          <span class="partner-name">{p.name}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- REVIEWS -->
<section class="section" id="reviews">
  <div class="container">
    <div class="sec-head">
      <h2>똑비와 함께한 회원님들 후기</h2>
      <p>똑비를 통해 편리하고 스마트한 삶을 경험한 회원님들의 후기입니다.</p>
    </div>
    <div class="review-grid">
      {#each reviews as r}
        <figure class="review-card">
          <div class="stars" aria-hidden="true">
            {#each Array(5) as _}<Star size={16} fill="var(--accent)" color="var(--accent)" />{/each}
          </div>
          <blockquote>{r.text}</blockquote>
          <figcaption><strong>{r.name}</strong><span>{r.meta}</span></figcaption>
        </figure>
      {/each}
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section band">
  <div class="container narrow">
    <div class="sec-head">
      <h2>자주 묻는 질문</h2>
    </div>
    <div class="faq-list">
      {#each faqs as f, i}
        <div class="faq-item" class:open={openFaq === i}>
          <button class="faq-q" onclick={() => toggle(i)} aria-expanded={openFaq === i}>
            <span class="faq-q-text">
              <span class="faq-icon"><f.icon size={20} /></span>
              {f.q}
            </span>
            <span class="faq-mark">
              <Plus size={20} />
            </span>
          </button>
          {#if openFaq === i}
            <div class="faq-a" transition:slide={{ duration: 280 }}>{f.a}</div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- START CTA -->
<section class="section" id="start">
  <div class="container">
    <div class="start-card">
      <h2>지금 바로 똑비를 시작하세요</h2>
      <p>Google Play 스토어에서 "똑비"를 검색해 설치하면 끝. 메트라이프 360Future 회원이라면 누구나 이용할 수 있어요.</p>
      <div class="hero-actions center">
        <a class="btn btn-primary btn-lg" href="https://play.google.com/store/search?q=%EB%98%91%EB%B9%84" target="_blank" rel="noopener">
          <Download size={18} /> 똑비 앱 설치하기
        </a>
        <a class="btn btn-outline btn-lg" href="/index.html">
          똑비 홈으로 <ArrowRight size={18} />
        </a>
      </div>
      <p class="hours">운영시간 평일 09:00 – 18:00 · 주말·공휴일 요청은 다음 영업일 처리</p>
    </div>
  </div>
</section>

<Footer />

<style>
  /* HERO */
  .hero {
    padding: 150px 0 120px;
  }
  .hero-inner {
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: 32px;
    align-items: center;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--accent-soft);
    color: var(--primary-700);
    font-weight: 700;
    font-size: var(--fs-body2);
    padding: 9px 16px;
    border-radius: 999px;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
  }
  .hero h1 {
    font-size: clamp(2.4rem, 5.5vw, 4rem);
    line-height: 1.2;
    margin: 28px 0 10px;
    color: var(--fg);
  }
  .hero-sub {
    font-size: clamp(1.05rem, 2.2vw, 1.25rem);
    color: var(--fg-muted);
    max-width: 480px;
    margin-bottom: 44px;
  }
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .hero-actions.center {
    justify-content: center;
  }
  .hero-disclaimer {
    margin: 16px 2px 0 0;    
    font-size: var(--fs-caption);
    line-height: 1.5;
    color: var(--fg-subtle);
  }
  .hero-art {
    position: relative;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .hero-carousel {
    position: relative;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
  }
  .hero-window {
    position: relative;
    overflow: hidden;
    padding: 48px 24px;
  }
  /* White gradient masks so neighbouring cards fade instead of hard-clipping */
  .hero-window::before,
  .hero-window::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 26px;
    z-index: 1;
    pointer-events: none;
  }
  .hero-window::before {
    left: 0;
    background: linear-gradient(to right, var(--bg), transparent);
  }
  .hero-window::after {
    right: 0;
    background: linear-gradient(to left, var(--bg), transparent);
  }
  .hero-track {
    display: flex;
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .hero-slide {
    min-width: 100%;
    padding: 0 10px;
  }
  .chat {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 24px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 0px;
    box-shadow:
      0 24px 48px -18px rgba(16, 24, 32, 0.28),
      0 8px 20px -10px rgba(16, 24, 32, 0.16);
  }
  .chat-head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px;
    border-bottom: 1px solid var(--border);
  }
  .chat-ava {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }
  .chat-id {
    display: flex;
    flex-direction: column;
    line-height: 1.3;
  }
  .chat-id strong {
    font-weight: 700;
    color: var(--fg);
    font-size: var(--fs-body1);
  }
  .chat-id span {
    font-size: var(--fs-caption);
    color: var(--fg-subtle);
  }
  .chat-msgs {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 9px;
    height: 250px;
    padding: 18px;
    background: linear-gradient(150deg, #fff 0%, rgba(255, 255, 255, 0) 100%),
      var(--primary-50);
  }
  .bubble {
    padding: 11px 14px;
    border-radius: 16px;
    font-size: var(--fs-body2);
    line-height: 1.5;
    max-width: 86%;
    overflow: hidden;
    animation: bubble-in 0.34s ease backwards;
  }
  @keyframes bubble-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  /* 똑비 bubble: tail on top-left, accent while typing, settles to primary-600 */
  .bubble.bot {
    background: var(--accent);
    color: #fff;
    align-self: flex-start;
    border-top-left-radius: 4px;
    transition: background 0.4s ease;
  }
  .bubble.bot.settled {
    background: var(--primary-600);
  }
  .bubble.user {
    /* background: var(--bg-subtle); */
    background-color: #fff;
    color: var(--fg);
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }
  .bubble.typing::after {
    content: '';
    display: inline-block;
    width: 2px;
    height: 1em;
    margin-left: 2px;
    vertical-align: -2px;
    background: currentColor;
    animation: caret-blink 0.8s steps(1) infinite;
  }
  @keyframes caret-blink {
    50% {
      opacity: 0;
    }
  }
  .hero-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--fg);
    box-shadow: 0 6px 16px -6px rgba(16, 24, 32, 0.22), 0 2px 6px rgba(16, 24, 32, 0.1);
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: background 0.18s ease, transform 0.12s ease;
    z-index: 2;
  }
  .hero-arrow:hover {
    background: var(--bg-muted);
  }
  .hero-arrow:active {
    transform: translateY(-50%) scale(0.92);
  }
  .hero-arrow.next {
    right: -14px;
  }
  .chat-progress {
    display: flex;
    gap: 6px;
    margin: 10px 40px 0;
    padding: 0 14px;
  }
  .pbar {
    flex: 1;
    height: 4px;
    border-radius: 999px;
    border: none;
    padding: 0;
    background: var(--border);
    cursor: pointer;
    overflow: hidden;
  }
  .pbar-fill {
    display: block;
    height: 100%;
    width: 0;
    border-radius: 999px;
    background: var(--accent);
    transition: width 0.12s linear;
  }

  /* Section heads */
  .band {
    background: var(--bg-muted);
  }
  .sec-head {
    text-align: center;
    max-width: 640px;
    margin: 0 auto 56px;
  }
  .sec-head h2 {
    font-size: clamp(2rem, 4.2vw, 2.9rem);
    line-height: 1.22;
    margin-bottom: 14px;
    color: var(--fg);
  }
  .sec-head p {
    color: var(--fg-muted);
    font-size: clamp(1.02rem, 2vw, 1.18rem);
  }

  /* Services */
  .svc-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .svc-card {
    background: var(--bg);
    border-radius: 24px;
    padding: 36px;
    box-shadow: var(--shadow-sm);
    transition: box-shadow 0.18s ease, transform 0.18s ease;
  }
  .svc-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-3px);
  }
  .svc-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: var(--accent-soft);
    color: var(--accent);
    margin-bottom: 18px;
  }
  .svc-card h3 {
    font-size: var(--fs-title2);
    margin-bottom: 10px;
    color: var(--fg);
  }
  .svc-card p {
    color: var(--fg-muted);
    margin-bottom: 20px;
    font-size: var(--fs-body1);
  }
  .svc-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .svc-tags span {
    font-size: var(--fs-body2);
    font-weight: 600;
    color: var(--fg-muted);
    background: var(--bg-subtle);
    padding: 7px 14px;
    border-radius: 999px;
  }

  /* Partners */
  .partner-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
  .partner-chip {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: var(--bg);
    border-radius: 16px;
    padding: 24px 28px 20px;
    box-shadow: var(--shadow-sm);
  }
  .partner-chip img {
    height: 40px;
    width: auto;
    max-width: 180px;
    object-fit: contain;
  }
  .partner-name {
    font-weight: 700;
    font-size: 14px;
    color: var(--fg-muted);
    text-align: center;
  }

  /* Reviews */
  .review-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .review-card {
    margin: 0;
    background: var(--bg);
    border-radius: 24px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: var(--shadow-sm);
  }
  .stars {
    display: flex;
    gap: 3px;
  }
  .review-card blockquote {
    margin: 0;
    font-size: var(--fs-title5);
    line-height: 1.6;
    color: var(--fg);
    flex: 1;
  }
  .review-card figcaption {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-top: 1px dashed var(--gray-100);
    margin: 0 -30px;
    padding: 16px 30px 0;
  }
  .review-card figcaption strong {
    color: var(--fg);
  }
  .review-card figcaption span {
    color: var(--fg-subtle);
    font-size: var(--fs-body2);
  }

  /* FAQ */
  .narrow {
    max-width: 760px;
  }
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .faq-item {
    background: var(--bg);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }
  .faq-item.open {
    box-shadow: var(--shadow-md);
  }
  .faq-q {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 22px 26px;
    background: none;
    border: none;
    font-family: inherit;
    font-size: var(--fs-title5);
    font-weight: 700;
    color: var(--fg);
    cursor: pointer;
    text-align: left;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }
  .faq-q:focus-visible {
    outline: none;
  }
  .faq-q-text {
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }
  .faq-icon {
    display: inline-flex;
    flex-shrink: 0;
    color: var(--gray-300);
  }
  .faq-mark {
    display: inline-flex;
    flex-shrink: 0;
    color: var(--accent);
    transition: transform 0.28s ease;
  }
  .faq-item.open .faq-mark {
    transform: rotate(135deg);
  }
  .faq-a {
    /* margin: 0 26px; */
    margin: 0 26px 0 57px;
    padding: 18px 0 24px;
    border-top: 1px solid var(--gray-50);
    color: var(--fg-muted);
    line-height: 1.6;
  }

  /* Start CTA */
  .start-card {
    background: linear-gradient(145deg, var(--primary-500) 0%, var(--primary-700) 100%);
    border-radius: 28px;
    padding: 72px 48px;
    text-align: center;
    color: #fff;
    box-shadow: var(--shadow-md);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .start-card h2 {
    font-size: clamp(1.9rem, 4vw, 2.6rem);
    color: #fff;
    margin: 0 0 9px;
  }
  .start-card > p {
    color: rgba(255, 255, 255, 0.92);
    max-width: 520px;
    margin: 0 auto 40px;
    font-size: clamp(1.02rem, 2vw, 1.18rem);
    line-height: 1.6;
  }
  .start-card .btn-primary {
    background: #fff;
    color: var(--primary-700);
  }
  .start-card .btn-primary:hover {
    background: var(--primary-50);
  }
  .start-card .btn-outline {
    background: transparent;
    color: #fff;
    border-color: rgba(255, 255, 255, 0.6);
  }
  .start-card .btn-outline:hover {
    background: rgba(255, 255, 255, 0.14);
    color: #fff;
  }
  .hours {
    margin: 32px 0 0;
    padding-top: 24px;
    /* border-top: 1px solid rgba(255, 255, 255, 0.18); */
    font-size: var(--fs-body2);
    color: rgba(255, 255, 255, 0.82);
  }

  @media (max-width: 900px) {
    .hero {
      padding: 72px 0 90px;
    }
    .hero-inner {
      grid-template-columns: minmax(0, 1fr);
      gap: 0;
    }
    .hero-art {
      order: -1;
      min-height: auto;
    }
    .hero-copy {
      padding-top: 20px;
      text-align: center;
    }
    .hero-sub {
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 24px;
    }
    .hero-actions {
      justify-content: center;
    }
    .chat-progress {
      max-width: 120px;
      margin-left: auto;
      margin-right: auto;
      padding: 0;
    }
    .hero-slide {
      padding: 0 4px;
    }
    .hero-window {
      padding-bottom: 24px;
    }
    .hero h1 {
      margin-top: 20px;
    }
    .pill {
      font-size: var(--fs-caption);
      padding: 6px 12px;
      gap: 6px;
    }
    .svc-grid,
    .review-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .start-card {
      padding: 52px 24px;
    }
    /* Two-button groups: equal full-width buttons on mobile */
    .hero-actions {
      flex-direction: column;
      align-items: stretch;
    }
    .hero-actions .btn {
      width: 100%;
      justify-content: center;
    }
    /* Partner cards: one per row, full width on mobile */
    .partner-chip {
      width: 100%;
    }
  }
</style>
