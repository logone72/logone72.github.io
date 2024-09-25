import{_ as r,c as a,a4 as t,o as i}from"./chunks/framework.DzR0mKe-.js";const g=JSON.parse('{"title":"obsidian으로 작성하는 VitePress 블로그","description":"","frontmatter":{},"headers":[],"relativePath":"블로그/obsidian으로_작성하는_VitePress_블로그.md","filePath":"블로그/obsidian으로_작성하는_VitePress_블로그.md","lastUpdated":1727241000000}'),s={name:"블로그/obsidian으로_작성하는_VitePress_블로그.md"};function o(n,e,l,p,h,d){return i(),a("div",null,e[0]||(e[0]=[t('<h1 id="obsidian으로-작성하는-vitepress-블로그" tabindex="-1">obsidian으로 작성하는 VitePress 블로그 <a class="header-anchor" href="#obsidian으로-작성하는-vitepress-블로그" aria-label="Permalink to &quot;obsidian으로 작성하는 VitePress 블로그&quot;">​</a></h1><p><img src="https://obsidian.md/images/screenshot-1.0-hero-combo.png" alt=""></p><p>이 블로그는 로컬에서 사용하는 <a href="https://obsidian.md/" target="_blank" rel="noreferrer">옵시디언</a>이라고 하는 마크다운 에디터에서 작성한 내용이 자동으로 배포까지 되고 있습니다. 한 명의 개발자로서 개인 학습, 실무 개발 등을 통해 얻어 온 것을 쉽고 간편하게 공유하기 위한 결과물입니다.</p><p>이 글에서는 왜 옵시디언을 기반으로 <a href="https://vitepress.dev/" target="_blank" rel="noreferrer">VitePress</a>로 만들어지는 블로그를 구성하게 된 이유와 방법까지 이야기해보려고 합니다!</p><h2 id="옵시디언" tabindex="-1">옵시디언? <a class="header-anchor" href="#옵시디언" aria-label="Permalink to &quot;옵시디언?&quot;">​</a></h2><blockquote><p>옵시디언은 마크다운 에디터로, 개인적인 노트나 지식을 관리하기 위한 도구입니다. 메모와 문서를 마크다운 형식으로 작성하고, 노트 간의 관계를 그래프로 시각화할 수 있는 기능이 특징입니다.</p></blockquote><h3 id="주요-특징" tabindex="-1">주요 특징 <a class="header-anchor" href="#주요-특징" aria-label="Permalink to &quot;주요 특징&quot;">​</a></h3><ol><li><strong>마크다운 지원</strong>: 순수 텍스트 형식인 마크다운을 사용하여 메모를 작성할 수 있습니다.</li><li><strong>링크 기능</strong>: 노트 간의 연결을 쉽게 할 수 있어, 마치 위키와 같은 구조를 만들 수 있습니다.</li><li><strong>그래프 보기</strong>: 노트 간의 연결 관계를 그래프 형태로 시각화하여, 지식 네트워크를 쉽게 탐색할 수 있습니다.</li><li><strong>플러그인</strong>: 다양한 플러그인을 통해 기능을 확장할 수 있습니다. 사용자의 필요에 맞게 커스터마이징할 수 있습니다.</li><li><strong>로컬 저장</strong>: 노트가 로컬 파일로 저장되기 때문에, 보안과 데이터 소유권 측면에서 장점을 가집니다.</li></ol><h3 id="내가-옵시디언을-선택한-이유" tabindex="-1">내가 옵시디언을 선택한 이유 <a class="header-anchor" href="#내가-옵시디언을-선택한-이유" aria-label="Permalink to &quot;내가 옵시디언을 선택한 이유&quot;">​</a></h3><p>개발자에게 꾸준한 기록은 선택이 아닌 필수라고 생각합니다. 하지만 코드를 작성하기도 바쁜데 거기에 기록까지 하려고 하니, 반드시 남겨야하는 기록도 하기 싫어지는 상황까지 치달았습니다.</p><p>제게 필요했던 기능은 다음과 같습니다.</p><ol><li>여러 디바이스에서 작성한 기록들이 공유된다.</li><li>빠르게 기록을 할 수 있고, 쉽게 수정할 수 있다.</li><li>필요에 따라서 쉽게 기록들을 분류할 수 있다.</li><li>기능이 단순하면서도, 필요한만큼 추가 할 수 있다.</li></ol><p>기존에는 1번이 중요하다 생각해서 노션, 티스토리 블로그 등을 사용했으나, 2, 3, 4번 목적에는 적합하지 않았습니다.</p><p>하지만 옵시디언은 이 모든 목적에 부합했습니다.</p><ol><li>obsidian-git 플러그인을 사용해 자동으로 github를 통해 여러 기기에서 공유가 됩니다.</li><li>로컬에서 인터넷 연결 없이 구동되기에 빠르게 메모를 할 수 있습니다.</li><li>로컬 파일들을 폴더 단위로 관리하는 방식이고, 옵시디언의 사이드바에서 이를 한 눈에 보고 쉽게 폴더를 변경해서 분류할 수 있습니다.</li><li>플러그인을 통해 다양한 기능을 추가할 수 있을 뿐, 순정은 심플 그 자체입니다. 이를 통해 기록에 대한 심리적인 장벽을 낮추어, 더욱 자주 많이 기록 할 수 있었습니다.</li></ol><h3 id="개발자-블로그를-옵시디언으로-할-수-없을까" tabindex="-1">개발자 블로그를 옵시디언으로 할 수 없을까? <a class="header-anchor" href="#개발자-블로그를-옵시디언으로-할-수-없을까" aria-label="Permalink to &quot;개발자 블로그를 옵시디언으로 할 수 없을까?&quot;">​</a></h3><p>블로그에 메모를 하던 시절, 글을 작성하고 포스팅한 이후에 알게된 사실을 추가하거나 수정하려고 했을 때 큰 불편함을 느꼈었습니다. <strong>옵시디언에서는 다수의 파일을 쉽게 넘나들면서 빠르게 수정</strong>할 수 있었기에, 이 장점을 블로그에도 적용되게 하고 싶었습니다.</p><p>단순한 방법으로는 로컬 옵시디언에서 작성한 내용을 블로그에 복사 붙여넣기로 포스팅하는 방식이 있습니다. 하지만 이 방식은 불편했습니다. 저는 <strong>로컬 옵시디언에서 글을 작성하거나 수정하면, 추가 절차 없이 바로 블로그에 포스팅 되는 것을 원했습니다.</strong></p><p>obsidian에서는 publish 서비스를 제공하고 있습니다. 하지만 <em>유료입니다.</em> 한 명의 개발자로서 이렇게 확장성이 좋은 에디터를 사용하면서 유료 구독 서비스를 사용하는 것은 옳지 않게 느껴졌습니다.</p><p>이때 공유를 위해 사용하고 있던 obsidian-git를 통해 가능성을 느끼고 조사를 시작했고 방법을 찾았습니다.</p><p>obsidian-git를 통해 repository에 push 될 때마다 정적 사이트 생성기와 github actions를 사용하면 됐습니다. 그리고 정적 사이트 생성기로 VitePress를 선택했습니다.</p><h3 id="vitepress" tabindex="-1">VitePress! <a class="header-anchor" href="#vitepress" aria-label="Permalink to &quot;VitePress!&quot;">​</a></h3><p>Jekyll 등의 다른 정적 사이트 생성기 대신 VitePress를 선택한 이유는 간단합니다. 기본 테마가 제가 선호하는 옵시디언과 매우 유사하기 때문입니다. 옵시디언 스타일의 블로그를 운영하고 싶었는데, VitePress는 이를 기본으로 제공하여 더 이상 다른 옵션을 찾을 필요성을 느끼지 않았습니다.</p><p>또한, VitePress는 기본적으로 사이드바 | 콘텐츠 | ToC 형식으로 구성되어 있어 커스터마이징할 부분이 적어 접근성이 뛰어납니다. 특히, 기본 테마가 기술 문서에 최적화되어 있어 <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">Vite</a>, <a href="https://rollupjs.org/" target="_blank" rel="noreferrer">Rollup</a>, <a href="https://pinia.vuejs.org/" target="_blank" rel="noreferrer">Pinia</a>, <a href="https://vueuse.org/" target="_blank" rel="noreferrer">VueUse</a>, <a href="https://vitest.dev/" target="_blank" rel="noreferrer">Vitest</a>, <a href="https://d3js.org/" target="_blank" rel="noreferrer">D3</a>, <a href="https://unocss.dev/" target="_blank" rel="noreferrer">UnoCSS</a>, <a href="https://iconify.design/" target="_blank" rel="noreferrer">Iconify</a>등 다양한 공식 문서 사이트 제작에 이미 널리 사용되고 있습니다.</p><h2 id="how-to" tabindex="-1">How to? <a class="header-anchor" href="#how-to" aria-label="Permalink to &quot;How to?&quot;">​</a></h2><p>이제부터 어떻게 지금의 블로그를 구성을 했는지 이야기하겠습니다. 자세한 내용과 과정은 다른 글에서 작성할 예정입니다.</p><h3 id="옵시디언-플러그인" tabindex="-1">옵시디언 플러그인 <a class="header-anchor" href="#옵시디언-플러그인" aria-label="Permalink to &quot;옵시디언 플러그인&quot;">​</a></h3><p><a href="https://github.com/Vinzent03/obsidian-git" target="_blank" rel="noreferrer">obsidian git</a>을 통해 github pages를 위한 repository로 자동으로 배포합니다.</p><p><a href="https://github.com/ozntel/obsidian-link-converter/tree/maina" target="_blank" rel="noreferrer">obsidian-link-convert (LInk converter)</a>로 옵시디언의 wiki link 방식의 link들을 vitepress 라우팅에 맞는 markdown link 에 path는 absolute하게 컨버팅합니다.</p><h3 id="vitepress-구성" tabindex="-1">VitePress 구성 <a class="header-anchor" href="#vitepress-구성" aria-label="Permalink to &quot;VitePress 구성&quot;">​</a></h3><p><a href="https://vitepress.dev/guide/deploy#github-pages" target="_blank" rel="noreferrer">VitePress 공식 문서</a>를 참고해서 github pages를 위한 repository를 구성하면 됩니다.</p><p>추가로 <a href="https://github.com/jooy2/vitepress-sidebar?tab=readme-ov-file" target="_blank" rel="noreferrer">vitepress-sidebar</a>로 deploy 시 마다 VitePress sidebar config를 자동으로 생성 할 수 있게 합니다.</p>',32)]))}const f=r(s,[["render",o]]);export{g as __pageData,f as default};
