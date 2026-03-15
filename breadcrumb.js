(() => {
  const STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap');

    #__breadcrumb-bar {
      --bc-bg: #0d0d0d;
      --bc-text: #888;
      --bc-link: #e0e0e0;
      --bc-accent: #5b8aff;
      --bc-sep: #333;
      --bc-font: 'IBM Plex Mono', monospace;
      --bc-height: 38px;

      all: initial;
      display: flex;
      align-items: center;
      gap: 8px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--bc-height);
      padding: 0 20px;
      background: var(--bc-bg);
      border-bottom: 1px solid var(--bc-sep);
      font-family: var(--bc-font);
      font-size: 11px;
      z-index: 99999;
      box-sizing: border-box;
      letter-spacing: 0.04em;
    }

    #__breadcrumb-bar * {
      all: unset;
      font-family: var(--bc-font);
      font-size: 11px;
      letter-spacing: 0.04em;
    }

    #__breadcrumb-bar a {
      color: var(--bc-link);
      text-decoration: none;
      cursor: pointer;
      transition: color 0.15s ease;
    }

    #__breadcrumb-bar a:hover {
      color: var(--bc-accent);
    }

    #__breadcrumb-bar .bc-sep {
      color: var(--bc-sep);
      margin: 0 2px;
      user-select: none;
    }

    #__breadcrumb-bar .bc-current {
      color: var(--bc-text);
    }

    #__breadcrumb-bar .bc-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--bc-accent);
      display: inline-block;
      margin-right: 10px;
      flex-shrink: 0;
      animation: bc-pulse 2.5s ease-in-out infinite;
    }

    @keyframes bc-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    #__breadcrumb-spacer {
      height: 38px;
      display: block;
    }
  `;

  function getTitle() {
    // Priority: data-breadcrumb-title on <body> → <title> tag → pathname fallback
    const bodyAttr = document.body && document.body.getAttribute('data-breadcrumb-title');
    if (bodyAttr) return bodyAttr;
    if (document.title) return document.title;
    const parts = location.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || 'Prototype';
  }

  function getHomeHref() {
    // data-breadcrumb-home on <body> overrides the default
    const bodyAttr = document.body && document.body.getAttribute('data-breadcrumb-home');
    if (bodyAttr) return bodyAttr;
    // Walk up to find index.html relative to current path
    return '../index.html';
  }

  function inject() {
    // Inject styles
    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);

    // Build breadcrumb bar
    const bar = document.createElement('div');
    bar.id = '__breadcrumb-bar';

    const dot = document.createElement('span');
    dot.className = 'bc-dot';

    const homeLink = document.createElement('a');
    homeLink.href = getHomeHref();
    homeLink.textContent = 'Prototype Playground';

    const sep = document.createElement('span');
    sep.className = 'bc-sep';
    sep.textContent = '/';

    const current = document.createElement('span');
    current.className = 'bc-current';
    current.textContent = getTitle();

    bar.appendChild(dot);
    bar.appendChild(homeLink);
    bar.appendChild(sep);
    bar.appendChild(current);

    // Spacer so page content isn't hidden under the fixed bar
    const spacer = document.createElement('div');
    spacer.id = '__breadcrumb-spacer';

    document.body.insertBefore(spacer, document.body.firstChild);
    document.body.insertBefore(bar, document.body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
