import{_ as s,c as a,o as n,N as l}from"./chunks/framework.67628f14.js";const A=JSON.parse('{"title":"시작","description":"","frontmatter":{},"headers":[{"level":2,"title":"목표","slug":"목표","link":"#목표","children":[{"level":3,"title":"추가 목표","slug":"추가-목표","link":"#추가-목표","children":[]},{"level":3,"title":"TODO","slug":"todo","link":"#todo","children":[]}]},{"level":2,"title":"피드백","slug":"피드백","link":"#피드백","children":[{"level":3,"title":"인지된 문제점","slug":"인지된-문제점","link":"#인지된-문제점","children":[]},{"level":3,"title":"Typescript 적용","slug":"typescript-적용","link":"#typescript-적용","children":[{"level":4,"title":"typescript는 현재 단계에선 overhead가 크다","slug":"typescript는-현재-단계에선-overhead가-크다","link":"#typescript는-현재-단계에선-overhead가-크다","children":[]}]}]},{"level":2,"title":"vitepress 정보","slug":"vitepress-정보","link":"#vitepress-정보","children":[{"level":3,"title":"Routing","slug":"routing","link":"#routing","children":[]},{"level":3,"title":"internal link","slug":"internal-link","link":"#internal-link","children":[]}]},{"level":2,"title":"파일 포맷팅","slug":"파일-포맷팅","link":"#파일-포맷팅","children":[{"level":4,"title":"internal link 컨버팅","slug":"internal-link-컨버팅","link":"#internal-link-컨버팅","children":[]},{"level":4,"title":"파일 생성","slug":"파일-생성","link":"#파일-생성","children":[]},{"level":4,"title":"디렉토리별 index 파일 생성","slug":"디렉토리별-index-파일-생성","link":"#디렉토리별-index-파일-생성","children":[]},{"level":3,"title":"markdown-it (실패)","slug":"markdown-it-실패","link":"#markdown-it-실패","children":[]},{"level":3,"title":"file system","slug":"file-system","link":"#file-system","children":[]}]},{"level":2,"title":"사이드바","slug":"사이드바","link":"#사이드바","children":[]}],"relativePath":"개발/vitepress/프로젝트-정리.md"}'),e={name:"개발/vitepress/프로젝트-정리.md"},p=l(`<h1 id="시작" tabindex="-1">시작 <a class="header-anchor" href="#시작" aria-hidden="true">#</a></h1><p><a href="/개발/vitepress/obsidian으로-블로그를-만들어보자!.html">obsidian으로 블로그를 만들어보자!</a></p><h1 id="과정" tabindex="-1">과정 <a class="header-anchor" href="#과정" aria-hidden="true">#</a></h1><h2 id="목표" tabindex="-1">목표 <a class="header-anchor" href="#목표" aria-hidden="true">#</a></h2><p>이번 작업의 필수 목표는 아래와 같습니다.</p><blockquote><p>Obsidian으로 작성한 md 파일들 그대로 vitepress에 사용할 수있게 해보자!</p></blockquote><ol><li>internal link <ol><li>Obsidian의 내부 경로는 \`\` .</li><li>vitepress는 절대 경로 혹은 상대 경로만 지원 <code>[이름](/경로) or [이름](../경로)</code><ol><li>markdown-it 으로 markdown 파일을 html으로 변환</li><li>Follows the <strong><a href="http://spec.commonmark.org/" target="_blank" rel="noreferrer">CommonMark spec</a></strong><ol><li><a href="https://vuepress.vuejs.org/guide/#how-it-works" target="_blank" rel="noreferrer">source</a></li></ol></li></ol></li><li>1을 2로 변환</li></ol></li><li>file naming <ol><li>Obsidian은 파일명, 디렉토리 명 등에 공백이 들어가도 무방함</li><li>vitepress는 파일명, 디렉토리 명으로 url를 생성함</li><li>따라서 공백을 문자로 변환해야함 (&#39; &#39; -&gt; dash or underscore )</li></ol></li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">1.  --&gt; [파일](/경로/파일)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">2. /폴더 입니다/파일 입니다.md -&gt; /폴더_입니다/파일_입니다.md</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>위 사항들이 필수적으로 갖추어져야 유의미하게 obsidian으로 작성된 md 파일들을 그대로 vitepress에 적용할 수 있습니다.</p><h3 id="추가-목표" tabindex="-1">추가 목표 <a class="header-anchor" href="#추가-목표" aria-hidden="true">#</a></h3><p>블로그 및 프로젝트가가 더욱 맛잇어지는 추가 요소들입니다.</p><ol><li>package 화 <ol><li>기껏 만들었으니 모두다 사용할 수 있게</li><li><ul><li>test script 화</li></ul></li></ol></li><li>각 디렉토리별 index.md 파일 자동 생성 <ol><li>vitepress는 각 하위 디렉터리에 포함된 모든 index.md 파일을 해당 디렉토리 경로 + / 에 노출될 html을 생성합니다.</li><li>각 디렉토리의 허브역할을 할 수 있게끔 해당 디렉토리에 포함된 모든 하위 디렉토리, 파일들의 링크가 담긴 index.md를 <em>자동으로 생성</em> 하는 것</li></ol></li><li>사이드바 <ol><li>사이드 바에 들어가는 요소들도 자동으로 생성할수 있게끔</li><li></li></ol></li><li>타입스크립트 적용 <ol><li>디버깅 용이</li></ol></li><li>이미지 링크의 사이즈 조정 <ol><li><a href="https://github.com/tatsy/markdown-it-imsize" target="_blank" rel="noreferrer">https://github.com/tatsy/markdown-it-imsize</a></li></ol></li></ol><h3 id="todo" tabindex="-1">TODO <a class="header-anchor" href="#todo" aria-hidden="true">#</a></h3><ul><li>[x] 내 깃허브 관리 <ul><li>[x] 함부로 수정 불가능하게 <ul><li>[x] 처음 초기 세팅이 그렇게 되어있음</li></ul></li></ul></li><li>[ ] package.json script 로 test.js 실행할때 인자 넘겨서 원하는 테스트 실행할수 있게끔</li><li>[ ] 각 디렉토리별 index.md 파일을 자동으로 생성 (허브)</li><li>[ ] 사이드 헤더 좀더 많은 뎁스 (현재는 ## 만 보임)</li><li>[x] 공백이 포함된 파일명등의 부적절한 파일명들을 일관된 규칙으로 포맷팅 <ul><li>[x] 공백을 &#39;-&#39; 로 포맷팅함</li></ul></li><li>[x] 사이드바 config 자동 생성</li><li>[ ] vitepress 잘못된 url 홈으로 리다이렉팅</li></ul><h2 id="피드백" tabindex="-1">피드백 <a class="header-anchor" href="#피드백" aria-hidden="true">#</a></h2><h3 id="인지된-문제점" tabindex="-1">인지된 문제점 <a class="header-anchor" href="#인지된-문제점" aria-hidden="true">#</a></h3><ol><li>동일한 파일명과 동일한 디렉토리 명을 가질 경우</li></ol><h3 id="typescript-적용" tabindex="-1">Typescript 적용 <a class="header-anchor" href="#typescript-적용" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">여러 형태의 string들이 생겼는데, 이를 타입으로 명확하게 관리하고 싶다!</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>프로젝트를 진행하면서 모두 같은 string type이지만, convert 된 string, 안된 string, path, link 등등 여러 종류의 string이 존재했습니다.</p><p>이를 함수 인자로 넘길 때 타입 체크가 모두 string으로 되었기에 제 프로젝트에서는 사실상 타입 통제가 안되고 있었습니다.</p><p>이를 해결하기 위해 필요한 특수한 string type 별로 데이터 String을 상속 받은 Class를 만드는 방법을 고려했습니다. <em>cc miles</em></p><p>Example:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">OriginalFilePath</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#A6ACCD;">super</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">convertToOriginalPath</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VitepressFilePath</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">VitepressFilePath</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">super</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toString</span><span style="color:#F07178;">())</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VitepressFilePath</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">value</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#A6ACCD;">super</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">convertToOriginalPath</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">OriginalFilePath</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">OriginalFilePath</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">super</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toString</span><span style="color:#F07178;">())</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h4 id="typescript는-현재-단계에선-overhead가-크다" tabindex="-1">typescript는 현재 단계에선 overhead가 크다 <a class="header-anchor" href="#typescript는-현재-단계에선-overhead가-크다" aria-hidden="true">#</a></h4><p>프로젝트 복잡도가 높지 않고, 블로그를 완성시키는것이 더욱 중요하기에 typescript 적용은 우선 보류 다만 위의 각 string을 class화 시켜서 관리하는 방법을 적용</p><p>class 화 시킬 타겟</p><ol><li>original <ol><li>file</li></ol></li><li></li></ol><h2 id="vitepress-정보" tabindex="-1">vitepress 정보 <a class="header-anchor" href="#vitepress-정보" aria-hidden="true">#</a></h2><h3 id="routing" tabindex="-1">Routing <a class="header-anchor" href="#routing" aria-hidden="true">#</a></h3><p><a href="https://vitepress.dev/guide/routing#root-and-source-directory" target="_blank" rel="noreferrer">vitepress Routing</a></p><p>vitepress는 <code>파일 기반 라우팅</code>을 사용합니다.</p><p><code>source directory</code> 는 위의 <code>파일 기반 라우팅</code>을 적용할 디렉토리입니다. 이 디렉토리에 담긴 원본 md 파일들과 디렉토리 구조를 통해 vitepress가 사이트를 랜더링합니다.</p><pre><code>source directory의 path는 config.js에서 변경할 수 있습니다.
</code></pre><p><code>project directory</code>는 vitepress 기능이 담겨있는 <code>.vitepress</code> 디렉토리가 위치한 디렉토리입니다.</p><h3 id="internal-link" tabindex="-1">internal link <a class="header-anchor" href="#internal-link" aria-hidden="true">#</a></h3><blockquote><p>You can use both absolute and relative paths when linking between pages</p></blockquote><p><em>abosult path</em></p><p>vitepress의 절대 경로는 source directory 부터 시작합니다.</p><p>기본 설정에서는 project root와 source는 동일합니다.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">├─ docs                    # source directory</span></span>
<span class="line"><span style="color:#A6ACCD;">│  ├─ index.md</span></span>
<span class="line"><span style="color:#A6ACCD;">│  └─ intro</span></span>
<span class="line"><span style="color:#A6ACCD;">│     └─ getting-started.md</span></span>
<span class="line"><span style="color:#A6ACCD;">└─ ...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">docs/index.md --&gt; /index.html (accessible as /) </span></span>
<span class="line"><span style="color:#A6ACCD;">docs/intro/getting-started.md --&gt; /intro/getting-started.html</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">in markdown:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">[링크 이름](/index)</span></span>
<span class="line"><span style="color:#A6ACCD;">[링크 이름2](/intro/getting-started)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="파일-포맷팅" tabindex="-1">파일 포맷팅 <a class="header-anchor" href="#파일-포맷팅" aria-hidden="true">#</a></h2><p>custom-convert branch</p><p>node의 파일시스템을 사용하여 특정 디렉토리에 연동되어있는 obsidian으로 작성된 md 파일들을 필요한 부분들은 변경한 후에 vitepress에서 사용될 위치에 파일들을 생성합니다.</p><p>이 과정은 script로 등록하여 관리합니다.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">node ...파일경로 &amp;&amp; yarn build</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="internal-link-컨버팅" tabindex="-1">internal link 컨버팅 <a class="header-anchor" href="#internal-link-컨버팅" aria-hidden="true">#</a></h4><ul><li>[x] 절대경로가 vitepress 기준으로 무엇인지 <ul><li>[ ] &#39;/&#39;부터 시작 (최상위 index 파일의 절대경로는 = /index.md)</li></ul></li></ul><p>필요사항:</p><ol><li>각 파일별 vitepress에 맞는 <code>절대경로</code> 생성</li><li>각 <code>파일 명칭</code>과 <code>1</code>의 <code>절대경로</code>를 Map으로 관리</li><li>존재하는 모든 md파일들을 순화하면서 <code>파일 명칭</code>들을 2의 Map에서 <code>절대경로</code>를 가져와 변경</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"> --&gt; [파일](./경로/파일)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="파일-생성" tabindex="-1">파일 생성 <a class="header-anchor" href="#파일-생성" aria-hidden="true">#</a></h4><ul><li>[ ] 파일시스템으로 파일을 생성하는 방법</li></ul><p>internal link 컨버팅이 완료된 md 파일들을 <code>docs</code> 내부에 자신의 경로에 맞게 생성하는 작업</p><h4 id="디렉토리별-index-파일-생성" tabindex="-1">디렉토리별 index 파일 생성 <a class="header-anchor" href="#디렉토리별-index-파일-생성" aria-hidden="true">#</a></h4><p><em>제일 후 순위</em></p><h3 id="markdown-it-실패" tabindex="-1">markdown-it (실패) <a class="header-anchor" href="#markdown-it-실패" aria-hidden="true">#</a></h3><p>markdown-it-obsidian branch</p><p><em>다만 해당 코드의 동작 방식을 참고할 만함</em></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">\bvitepress는 마크다운 본연의 매우 정석적인 anchor를 사용하는 방식으로 link를 생성합니다. </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">vitepress가 markdown-it으로 md 파일을 html로 변환하는데 이때 []() 구조의 링크를 a태그의 href에 들어가 있는 절대경로 혹은 상대경로를 통해 vue의 routing으로 연결함. </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">따라서 단순히 파일명이 들어가 있는 Obsidian 방식의  형식은 markdown-it 시점에서 절대 경로 생성이 불가. 디렉토리 전체를 참조하여 각 파일의 절대 경로를 생성하는 방식이 필요.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>vitepress는 markdown 파일들을 markdown-it 라는 라이브러리를 사용해서 포맷팅한다. 이곳에 플러그인으로 markdown-it-obsidian을 추가한다면 옵시디언의 파일 링크 형식을 직접 포맷팅하지 않아도 될 수도 있다.</p><p>MarkdownIt$1</p><h3 id="file-system" tabindex="-1">file system <a class="header-anchor" href="#file-system" aria-hidden="true">#</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">readFileSync</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> option)</span></span>
<span class="line"></span></code></pre></div><p>path는 절대 경로 혹은 path.resolve() 함수로 만들어진 경로</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">readdirSync</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> option)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// option {withFileTypes: true}</span></span>
<span class="line"></span></code></pre></div><p>주어진 <code>path</code>의 <code>directory</code>를 읽어옵니다. 해당 디렉토리의 파일리스트를 반환합니다.</p><p><code>withFileTypes</code> 옵션이 있는 경우, <code>Dirent</code> 객체로 배열의 요소들을 반환합니다.</p><h2 id="사이드바" tabindex="-1">사이드바 <a class="header-anchor" href="#사이드바" aria-hidden="true">#</a></h2><blockquote><p>목표: 파일들에 따라 자동으로 사이드바가 생성되게끔하기</p></blockquote><p><em>추가 목표: 각 디렉토리에서 해당 디렉토리의 하위 디렉토리만 보이게하고 상위 디렉토리 링크가 최상단에 보이게</em></p><p>각 디렉토리는 sidebarItem을 만듬 각 파일은 sidebarLink를 만듬</p><p>이를 nested된 구조로 생성하여 .vitepress/config에서 import해서 사용</p><p>2023/03/27 완!</p><p>sidebarConfig.json 파일을 생성해서 config에서 import하는 방식으로 사용</p><ul><li>[ ] 문제점 <ul><li>[ ] &#39; &#39;쉼표가 포함된 url 이슈 , 없는 페이지라고 뜸</li><li>[ ] url 컨버팅이 필요</li></ul></li></ul>`,76),t=[p];function i(o,r,c,d,h,y){return n(),a("div",null,t)}const u=s(e,[["render",i]]);export{A as __pageData,u as default};
