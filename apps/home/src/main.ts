import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  app.innerHTML = `
    <main class="home-shell" aria-labelledby="site-title">
      <p class="eyebrow">logone72.github.io</p>
      <h1 id="site-title">logone72</h1>
      <p class="intro">더 쉽고 더 나은 방식을 고민하는 프론트엔드 개발자입니다.</p>
      <a class="blog-link" href="/blog/">Blog</a>
    </main>
  `;
}
