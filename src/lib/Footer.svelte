<script>
  import Logo from './Logo.svelte';
  import { ExternalLink } from '@lucide/svelte';
</script>

<footer class="footer">
  <div class="container footer-inner">
    <div class="footer-brand">
      <Logo height={28} />
      <p class="footer-tagline">일상의 소소한 요청, 똑똑한 비서 똑비에게.</p>
    </div>
    <div class="footer-cols">
      <div class="footer-col">
        <span class="footer-head">서비스</span>
        <a href="https://ddokbitour.com" target="_blank" rel="noopener">똑비투어</a>
        <a href="https://ddokbitour.com/kagoshima" target="_blank" rel="noopener">가고시마 한달살기</a>
        <a href="/360f.html" target="_blank" rel="noopener" class="ext-link">
          메트라이프 비서서비스 <ExternalLink size={13} />
        </a>
      </div>
      <div class="footer-col">
        <span class="footer-head">채널</span>
        <a href="https://www.youtube.com/@ddokbi" target="_blank" rel="noopener">유튜브</a>
        <a href="https://www.instagram.com/ddokbi/" target="_blank" rel="noopener">인스타그램</a>
      </div>
      <div class="footer-col">
        <span class="footer-head">운영</span>
        <span class="footer-text">평일 09:00 – 18:00</span>
        <span class="footer-text">주말·공휴일 다음 영업일 처리</span>
      </div>
    </div>
  </div>
  <div class="container footer-base">
    <p>주식회사 토끼와두꺼비 · 사업자등록번호 402-88-02634</p>
    <p class="copy">© {new Date().getFullYear()} 토끼와두꺼비. All rights reserved.</p>
  </div>
</footer>

<style>
  .footer {
    background: var(--bg-muted);
    border-top: 1px solid var(--border);
    padding: 72px 0 40px;
  }
  .footer-inner {
    display: flex;
    flex-wrap: wrap;
    gap: 56px;
    justify-content: space-between;
    padding-bottom: 48px;
  }
  .footer-tagline {
    margin-top: 18px;
    color: var(--fg-muted);
    max-width: 320px;
    font-size: var(--fs-body2);
  }
  .footer-cols {
    display: flex;
    flex-wrap: wrap;
    gap: 56px;
  }
  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .footer-head {
    font-weight: 700;
    color: var(--fg);
    font-size: var(--fs-body2);
    margin-bottom: 4px;
  }
  .footer-col a,
  .footer-text {
    color: var(--fg-muted);
    font-size: var(--fs-body2);
  }
  .footer-col a:hover {
    color: var(--accent);
  }
  .ext-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .ext-link :global(svg) {
    opacity: 0.6;
  }
  .footer-base {
    border-top: 1px solid var(--border);
    padding-top: 28px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px;
  }
  .footer-base p {
    color: var(--fg-subtle);
    font-size: var(--fs-caption);
  }

  @media (max-width: 720px) {
    .footer-inner {
      gap: 40px;
    }
    .footer-cols {
      gap: 40px;
    }
  }
</style>
