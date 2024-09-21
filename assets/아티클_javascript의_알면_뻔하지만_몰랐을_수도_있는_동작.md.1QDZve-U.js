import{_ as a,c as i,a4 as e,o as t}from"./chunks/framework.DzR0mKe-.js";const c=JSON.parse('{"title":"javascript의 알면 뻔하지만 몰랐을 수도 있는 동작","description":"","frontmatter":{},"headers":[],"relativePath":"아티클/javascript의_알면_뻔하지만_몰랐을_수도_있는_동작.md","filePath":"아티클/javascript의_알면_뻔하지만_몰랐을_수도_있는_동작.md","lastUpdated":1726921817000}'),n={name:"아티클/javascript의_알면_뻔하지만_몰랐을_수도_있는_동작.md"};function l(p,s,h,r,o,d){return t(),i("div",null,s[0]||(s[0]=[e(`<h1 id="javascript의-알면-뻔하지만-몰랐을-수도-있는-동작" tabindex="-1">javascript의 알면 뻔하지만 몰랐을 수도 있는 동작 <a class="header-anchor" href="#javascript의-알면-뻔하지만-몰랐을-수도-있는-동작" aria-label="Permalink to &quot;javascript의 알면 뻔하지만 몰랐을 수도 있는 동작&quot;">​</a></h1><p><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--ZDtqrBOj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://github.com/damiancipolat/js_vs_memes/blob/master/doc/js_thanks.png%3Fraw%3Dtrue" alt=""><em>javascript의 유명한 특이 동작들. 이 글에서는 위 사진에는 없는 경우들을 다룬다.</em></p><p>javascript는 우리에게 익숙한 언어지만, 그 속에는 알아두면 유용하지만 쉽게 간과할 수 있는 동작들이 숨어 있다. 어떤 것들은 너무 당연하게 느껴져서 별다른 고민 없이 지나치기도 하고, 또 다른 것들은 특정 상황에서만 드러나기 때문에 한 번도 문제를 겪지 않았다면 알기 어려울 수도 있다. 이번 글에서는 <strong>알면 뻔하지만 몰랐다면 계속 모를 수도 있는 자바스크립트의 동작</strong>들을 살펴보려고 한다.</p><h2 id="배열에-비교-연산자를-사용하면-어떻게-될까" tabindex="-1">배열에 비교 연산자를 사용하면 어떻게 될까 <a class="header-anchor" href="#배열에-비교-연산자를-사용하면-어떻게-될까" aria-label="Permalink to &quot;배열에 비교 연산자를 사용하면 어떻게 될까&quot;">​</a></h2><p><img src="https://www.javascripttutorial.net/wp-content/uploads/2016/11/JavaScript-Comparison-Operators.png" alt=""></p><p>개발 중 실수로 배열인지 모른 채 배열에 대소비교 연산자(<code>&gt;</code>, <code>&lt;</code>)를 적용한 적이 있었다. 단순한 테스트 케이스에서는 정상적으로 작동하는 것처럼 보였기 때문에 문제를 인지하지 못했지만, 이후 배열의 요소가 변하면서 문제가 발생했고, 그제야 오류를 발견할 수 있었다.</p><p>왜 처음에는 문제가 보이지 않았을까?</p><p>결론부터 말하자면, <strong>배열에 비교 연산자가 적용되면 배열이 문자열로 변환되어 비교가 이루어지기 때문</strong>이다.</p><h3 id="상세" tabindex="-1">상세 <a class="header-anchor" href="#상세" aria-label="Permalink to &quot;상세&quot;">​</a></h3><p>javascript 의 비교 연산자(<code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>)는 숫자뿐만 아니라 문자열을 비교하는 데도 사용할 수 있다. 만약 비교 연산자의 피연산자 중 하나가 객체라면, javascript 는 이를 원시 값으로 변환하려고 시도하는데, 이때 비교연산자의 경우 <strong>숫자 우선 변환 알고리즘</strong>(prefer-number algorithm)이 적용된다.</p><p>숫자 우선 변환 알고리즘은 먼저 객체의 <code>.valueOf()</code> 메서드를 호출한다. 만약 반환된 값이 원시 값(숫자, 문자열 등)이면 그 값이 사용된다. 그러나 대부분의 경우 배열의 <code>.valueOf()</code> 메서드는 배열 객체 자체를 반환한다. 이 경우, 자바스크립트는 자동으로 <code>.toString()</code> 메서드를 호출하여 배열을 문자열로 변환한다.</p><p>결과적으로, <strong>배열이 비교 연산자의 피연산자로 사용될 경우 <code>.valueOf()</code> 메서드가 먼저 호출되고, <code>.toString()</code> 메서드가 호출되어 배열이 문자열로 변환</strong>된다.</p><h3 id="예시" tabindex="-1">예시 <a class="header-anchor" href="#예시" aria-label="Permalink to &quot;예시&quot;">​</a></h3><p>예를 들어 <code>[1] &gt; [2]</code>를 비교할 때는 <code>&#39;1&#39; &gt; &#39;2&#39;</code>를 비교하는 것과 같고, <code>[1,2] &gt; [1,1]</code>을 비교할 때는 <code>&#39;1,2&#39; &gt; &#39;1,1&#39;</code>를 비교하는 것이 된다.</p><p>javascript 에서 문자열은 유니코드 코드 포인트를 기준으로 비교되기 때문에:</p><ul><li><code>&#39;1&#39; &gt; &#39;2&#39;</code>는 <code>false</code>로 평가된다.</li><li><code>&#39;1,2&#39; &gt; &#39;1,1&#39;</code>는 <code>true</code>로 평가된다.</li></ul><p>이처럼 배열을 비교할 때 문제가 발생하는 이유는 배열이 자동으로 문자열로 변환되기 때문이다. 배열을 비교할 때는 이러한 변환 과정을 염두에 두고, 정확한 비교를 위해 배열의 각 요소를 명시적으로 처리하는 것이 중요하다.</p><h2 id="finally-vs-return" tabindex="-1">finally vs return <a class="header-anchor" href="#finally-vs-return" aria-label="Permalink to &quot;finally vs return&quot;">​</a></h2><p><code>return</code>은 <strong>함수의 실행을 종료</strong>하고, 주어진 값을 함수 호출 지점으로 반환한다. 반면, <code>finally</code> 블록은 코드의 제어 흐름 상 <strong>반드시 실행</strong>된다.</p><p>그렇다면, <code>finally</code>와 <code>return</code>이 동시에 사용되면 어떤 일이 벌어질까?</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">finally</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;finally&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><strong><code>finally</code> 블록이 먼저 실행</strong>된 후, <code>return</code>이 수행된다.</p><p>즉, <code>finally</code>가 이겼다!</p><p>이 동작은 javascript 의 명세에 정의된 것이기 때문에 특별한 설명이 더 필요하지 않다. 대신, 아래 예시를 통해 <code>finally</code>의 강력함을 직접 확인해보자.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;a&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">finally</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;b&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;&gt;&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;a&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">finally</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;b&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;&gt;&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;&gt;&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a</span></span></code></pre></div><h2 id="x-x-가-true-인-경우가-있다" tabindex="-1">x !== x 가 true 인 경우가 있다? <a class="header-anchor" href="#x-x-가-true-인-경우가-있다" aria-label="Permalink to &quot;x !== x 가 true 인 경우가 있다?&quot;">​</a></h2><p>javascript 에는 값이 일치하는지 확인하기 위한 두 가지 비교 연산자가 있다.</p><ol><li><code>==</code> 동등 비교 연산자</li><li><code>===</code> 일치 비교 연산자</li></ol><p><code>==</code> 동등 비교 연산자는 타입을 자동으로 변환한 후 값을 비교하고, <code>===</code> 일치 비교 연산자는 타입과 값을 모두 엄격하게 비교한다. 그런데 <code>x !== x</code>가 true라니, 이게 가능한 일일까?</p><p>javascript 에서 원시 타입과 객체 타입을 생각해봐도 이런 경우가 존재하기 어려워 보인다. 하지만 정답은 다음과 같다.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NaN</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> !==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> NaN</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // true</span></span></code></pre></div><p>이는 javascript <code>number</code> 타입이 <a href="https://en.wikipedia.org/wiki/IEEE_754" target="_blank" rel="noreferrer">IEEE 754</a>라고 하는 컴퓨터에서 부동소수점을 표현하는 표준을 따르는 배정밀도 64비트 이진 부동소수점 형식 <em>(double-precision 64-bit binary floating-point format)</em> 를 값으로 가지기 때문이다.</p><blockquote><p><a href="https://en.wikipedia.org/wiki/IEEE_754" target="_blank" rel="noreferrer">IEEE 754</a>에서는 ±0, 무한대, 그리고 <code>NaN</code>(Not a Number) 등의 기호를 정의하고, 이 수들에 대한 연산 방식을 규정하고 있다.</p></blockquote><p><img src="https://dandkim.com/static/8da4668def0c4ccef925da76031f29b1/4b190/confused3.jpg" alt=""></p><p>특히, <code>NaN</code>은 수학적으로 정의되지 않는 연산(예: 0을 0으로 나눈 경우)에 대한 결과로, 컴퓨팅 시스템에서 사용된다. 이에 따라 javascript에서는 <code>NaN</code>과 관련된 비교 규칙이 다음과 같이 정의된다.</p><table tabindex="0"><thead><tr><th>NaN ≥ <em>x</em></th><th>NaN ≤ <em>x</em></th><th>NaN &gt; <em>x</em></th><th>NaN &lt; <em>x</em></th><th>NaN = <em>x</em></th><th>NaN ≠ <em>x</em></th></tr></thead><tbody><tr><td>False</td><td>False</td><td>False</td><td>False</td><td>False</td><td>True</td></tr></tbody></table><p>즉, <code>NaN</code>은 어떤 값과 비교해도 항상 <code>false</code>를 반환하므로, <code>NaN !== NaN</code> 역시 <code>true</code>가 된다. 따라서, javascript에서 <code>x !== x</code>가 <code>true</code>로 평가되는 특별한 경우는 바로 <code>NaN</code>일 때이다. 이로 인해 <code>x !== x</code>가 true인 흥미로운 결과를 얻게 된다.</p><p>마지막으로, NaN을 NaN과 일치하는지 비교를 할 때 true 가 반환되는 방법을 소개한다.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Object.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">is</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NaN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NaN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre></div><p><code>Object.is()</code>가 <code>==</code> , <code>===</code> 와 다른 점 중 하나이다. <code>Object.is()</code>는 <code>==</code>처럼 여러 강제가 있지도 않고, <code>===</code>와 다르게 NaN 을 동일하게 비교한다.</p><h2 id="자료-출처" tabindex="-1">자료 출처 <a class="header-anchor" href="#자료-출처" aria-label="Permalink to &quot;자료 출처&quot;">​</a></h2><p><a href="https://stackoverflow.com/questions/62717437/behavior-of-greater-than-and-another-inequality-comparison-operators-on-arra" target="_blank" rel="noreferrer">https://stackoverflow.com/questions/62717437/behavior-of-greater-than-and-another-inequality-comparison-operators-on-arra</a><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness" target="_blank" rel="noreferrer">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness</a><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#the_finally_block" target="_blank" rel="noreferrer">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#the_finally_block</a><a href="https://en.wikipedia.org/wiki/NaN" target="_blank" rel="noreferrer">https://en.wikipedia.org/wiki/NaN</a><a href="https://en.wikipedia.org/wiki/IEEE_754" target="_blank" rel="noreferrer">https://en.wikipedia.org/wiki/IEEE_754</a><a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/is" target="_blank" rel="noreferrer">https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/is</a></p>`,43)]))}const E=a(n,[["render",l]]);export{c as __pageData,E as default};
