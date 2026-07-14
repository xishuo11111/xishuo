/**
 * i18n - Internationalization for Resume Portfolio
 * Complete zh/en language switching with localStorage persistence
 */

// ====== Static Text Dictionary ======
window.I18N_DICT = {
  zh: {
    'nav-home': '\u9996\u9875',
    'nav-about': '\u5173\u4E8E',
    'nav-projects': '\u9879\u76EE',
    'nav-aiChat': 'AI \u804A\u5929',
    'nav-contact': '\u8054\u7CFB\u6211',
    'mobile-nav-home': '\u9996\u9875',
    'mobile-nav-about': '\u5173\u4E8E',
    'mobile-nav-projects': '\u9879\u76EE',
    'mobile-nav-aiChat': 'AI \u804A\u5929',
    'mobile-nav-contact': '\u8054\u7CFB\u6211',
    'hero-title': 'Kiki \u7684\u4E2A\u4EBA\u4F5C\u54C1\u96C6',
    'hero-viewProjects': '\u67E5\u770B\u9879\u76EE',
    'hero-aiResumeChat': 'AI \u7B80\u5386\u54A8\u8BE2',
    'exp-label': '\u7ECF\u5386',
    'exp-heading': '\u5B9E\u4E60\u7ECF\u5386',
    'exp-education': '\u6559\u80B2',
    'exp-school': '\u4E09\u4E9A\u5927\u5B66',
    'exp-period': '2022 - 2026',
    'exp-degree': '\u8BA1\u7B97\u673A\u79D1\u5B66 - \u672C\u79D1 - GPA 3.5',
    'exp-tools': '\u5DE5\u5177',
    'tool-python': 'Python',
    'tool-analysis': '\u5206\u6790',
    'tool-sql': 'SQL',
    'tool-extract': '\u63D0\u53D6',
    'tool-excel': 'Excel',
    'tool-pivot': '\u6570\u636E\u900F\u89C6\u8868',
    'tool-powerbi': 'Power BI',
    'tool-viz': '\u53EF\u89C6\u5316',
    'tool-axure': 'Axure RP9',
    'tool-proto': '\u539F\u578B',
    'tool-crm': 'CRM',
    'tool-user': '\u7528\u6237\u7BA1\u7406',
    'proj-label': '\u9879\u76EE',
    'proj-heading': '\u9879\u76EE\u4F5C\u54C1\u96C6',
    'ai-label': 'AI \u7B80\u5386\u804A\u5929',
    'ai-heading': 'AI \u7B80\u5386\u95EE\u7B54',
    'ai-subtitle': '\u5173\u4E8E\u6211\u7684\u80CC\u666F\u4FE1\u606F\uFF0C\u53EF\u4EE5\u968F\u65F6\u5411AI\u54A8\u8BE2\u3002',
    'ai-assistant': '\u7B80\u5386\u52A9\u624B',
    'ai-assistant-desc': '\u57FA\u4E8E\u771F\u5B9E\u7B80\u5386\u6570\u636E',
    'ai-input': '\u8F93\u5165\u4F60\u7684\u95EE\u9898...',
    'ai-footer': '\u4EC5\u57FA\u4E8E\u7B80\u5386\u6570\u636E\u8FDB\u884C\u56DE\u7B54',
    'ai-welcome': '\u4F60\u597D\uFF01\u6211\u662F Kiki \u7684\u7B80\u5386\u52A9\u624B\uFF0C\u53EF\u4EE5\u968F\u65F6\u54A8\u8BE2\u5173\u4E8E\u7B80\u5386\u7684\u95EE\u9898\u3002',
    'contact-label': '\u8054\u7CFB',
    'contact-heading': '\u8054\u7CFB\u6211',
    'contact-email': '\u90AE\u7BB1',
    'contact-phone': '\u7535\u8BDD',
    'contact-wechat': '\u5FAE\u4FE1',
    'contact-native': '\u7C4D\u8D2F',
    'footer-copyright': '2025 Kiki - \u4E92\u8054\u7F51\u8FD0\u8425\u4F5C\u54C1\u96C6',
    'footer-tagline': '\u6570\u636E\u9A71\u52A8 - \u589E\u957F\u5BFC\u5411',
    'clear-title': '\u6E05\u9664\u5BF9\u8BDD',
    'send-label': '\u53D1\u9001',
    'menu-label': '\u83DC\u5355',
    'lang-switch': '\u5207\u6362\u8BED\u8A00',
    'lang-zh': '\u4E2D\u6587',
    'lang-en': 'English',
  },
  en: {
    'nav-home': 'Home',
    'nav-about': 'About',
    'nav-projects': 'Projects',
    'nav-aiChat': 'AI Chat',
    'nav-contact': 'Contact',
    'mobile-nav-home': 'Home',
    'mobile-nav-about': 'About',
    'mobile-nav-projects': 'Projects',
    'mobile-nav-aiChat': 'AI Chat',
    'mobile-nav-contact': 'Contact',
    'hero-title': "Kiki's Personal Portfolio",
    'hero-viewProjects': 'View Projects',
    'hero-aiResumeChat': 'AI Resume Chat',
    'exp-label': 'Experience',
    'exp-heading': 'Internship Experience',
    'exp-education': 'Education',
    'exp-school': 'Sanya Univ.',
    'exp-period': '2022 - 2026',
    'exp-degree': 'CS - Bachelor - GPA 3.5',
    'exp-tools': 'Tools',
    'tool-python': 'Python',
    'tool-analysis': 'Analysis',
    'tool-sql': 'SQL',
    'tool-extract': 'Extract',
    'tool-excel': 'Excel',
    'tool-pivot': 'Pivot',
    'tool-powerbi': 'Power BI',
    'tool-viz': 'Viz',
    'tool-axure': 'Axure RP9',
    'tool-proto': 'Proto',
    'tool-crm': 'CRM',
    'tool-user': 'User',
    'proj-label': 'Projects',
    'proj-heading': 'Project Portfolio',
    'ai-label': 'AI Resume Chat',
    'ai-heading': 'AI Resume Q&A',
    'ai-subtitle': 'Ask about my background. AI answers based strictly on real resume data.',
    'ai-assistant': 'Resume Assistant',
    'ai-assistant-desc': 'Based on real resume data',
    'ai-input': 'Ask me anything...',
    'ai-footer': 'AI answers based on resume data only.',
    'ai-welcome': 'Hi! I am Kiki\'s resume assistant. Ask me about experiences, projects, skills, and more.',
    'contact-label': 'Contact',
    'contact-heading': 'Contact',
    'contact-email': 'Email',
    'contact-phone': 'Phone',
    'contact-wechat': 'WeChat',
    'contact-native': 'Native Place',
    'footer-copyright': '2025 Kiki - Internet Operations Portfolio',
    'footer-tagline': 'Data-driven - Growth-focused',
    'clear-title': 'Clear conversation',
    'send-label': 'Send',
    'menu-label': 'Menu',
    'lang-switch': 'Switch language',
    'lang-zh': '中文',
    'lang-en': 'English',
  }
};

// ====== Dynamic Content Data (Experience + Projects) ======
window.I18N_DATA = {
  experiences: {
    en: [
      {
        company: 'Wukong Teacher',
        role: 'Strategy Operations',
        period: '2026.02 - 2026.05',
        items: [
          'Collaborated with CM and regional teams, optimized user segmentation and referral strategy, referral scale +22%, paid conversion +15%',
          'Created region-specific referral campaigns based on overseas user data, user engagement +18%, 7-day retention +6%'
        ]
      },
      {
        company: 'imeanAI',
        role: 'Overseas Product Ops',
        period: '2025.06 - 2025.09',
        items: [
          'Built LTV/retention/conversion monitoring system with Grafana, drove Booking conversion +20%',
          'Led "AI Smart Itinerary" product feature, planning efficiency +50%, check conversion +20%'
        ]
      },
      {
        company: 'Ctrip Group',
        role: 'Business Operations',
        period: '2024.10 - 2025.01',
        items: [
          'Optimized supplier scheduling, holiday inventory utilization +20%, GMV +15% QoQ',
          'Negotiated with 10+ suppliers, launched 8 promotional events with 1M+ GMV'
        ]
      },
      {
        company: 'Ele.me',
        role: 'Merchant Operations',
        period: '2024.06 - 2024.09',
        items: [
          'Managed stratified merchants (KA/CKA/FML, 105 total), top merchant GMV +220% (6% above industry avg)',
          'Designed 3D evaluation model, signing success rate 68% (vs district avg 55%), 7 new stores hit 100K+'
        ]
      }
    ],
    zh: [
      {
        company: '悟空中文',
        role: '\u7B56\u7565\u8FD0\u8425',
        period: '2026.02 - 2026.05',
        items: [
          '\u4E0ECM\u53CA\u533A\u57DF\u56E2\u961F\u534F\u4F5C\uFF0C\u4F18\u5316\u7528\u6237\u5206\u5C42\u4E0E\u63A8\u8350\u7B56\u7565\uFF0C\u63A8\u8350\u89C4\u6A21+22%\uFF0C\u4ED8\u8D39\u8F6C\u5316+15%',
          '\u57FA\u4E8E\u6D77\u5916\u7528\u6237\u6570\u636E\u521B\u5EFA\u533A\u57DF\u5B9A\u5236\u63A8\u8350\u6D3B\u52A8\uFF0C\u7528\u6237\u53C2\u4E0E\u5EA6+18%\uFF0C7\u65E5\u7559\u5B58+6%'
        ]
      },
      {
        company: 'imeanAI',
        role: '\u6D77\u5916\u4EA7\u54C1\u8FD0\u8425',
        period: '2025.06 - 2025.09',
        items: [
          '\u4F7F\u7528Grafana\u6784\u5EFALTV/\u7559\u5B58/\u8F6C\u5316\u76D1\u63A7\u4F53\u7CFB\uFF0C\u63D0\u5347Booking\u8F6C\u5316\u7387+20%',
          '\u4E3B\u5BFCAI\u667A\u80FD\u884C\u7A0B\u4EA7\u54C1\u529F\u80FD\uFF0C\u89C4\u5212\u6548\u7387+50%\uFF0C\u8BA2\u5355\u8F6C\u5316+20%'
        ]
      },
      {
        company: '\u643A\u7A0B\u96C6\u56E2',
        role: '\u4E1A\u52A1\u8FD0\u8425',
        period: '2024.10 - 2025.01',
        items: [
          '\u4F18\u5316\u4F9B\u5E94\u5546\u6392\u73ED\uFF0C\u8282\u5047\u65E5\u5E93\u5B58\u5229\u7528\u7387+20%\uFF0CGMV+15%',
          '\u8C08\u522410+\u5BB6\u4F9B\u5E94\u5546\uFF0C\u63A8\u51FA8\u573A\u4FC3\u9500\u6D3B\u52A8\uFF0CGMV\u7A81\u7834100\u4E07'
        ]
      },
      {
        company: '\u997F\u4E86\u4E48',
        role: '\u5546\u6237\u8FD0\u8425',
        period: '2024.06 - 2024.09',
        items: [
          '\u7BA1\u7406\u5206\u5C42\u5546\u6237(KA/CKA/FML\uFF0C\u5171105\u5BB6)\uFF0C\u5C3E\u90E8\u5546\u6237GMV+12%\uFF086%\u9AD8\u4E8E\u884C\u4E1A\u5747\u503C\uFF09',
          '\u8BBE\u8BA13D\u8BC4\u4F30\u6A21\u578B\uFF0C\u7B7E\u7EA6\u6210\u529F\u738768%\uFF08\u533A\u57DF\u5747\u503C55%\uFF09\uFF0C7\u5BB6\u65B0\u5546\u6237GMV\u7A81\u7834\u5341\u4E07\u5355'
        ]
      }
    ]
  },
  projects: {
    en: [
      { title: 'Referral Growth Strategy', company: 'Wukong Teacher', desc: 'Optimized user segmentation and referral full-chain conversion', metrics: ['Scale +22%', 'Conversion +15%'] },
      { title: 'AI Smart Itinerary', company: 'imeanAI', desc: 'Wrote PRD for NLP-driven dynamic itinerary planning feature', metrics: ['Efficiency +50%', 'Check Conv +20%'] },
      { title: 'Holiday Promo Matrix', company: 'Ctrip Group', desc: 'Negotiated with 10+ suppliers, 8 events with 1M+ GMV', metrics: ['GMV 1M+', 'Orders +40%'] },
      { title: 'Merchant Tier Ops', company: 'Ele.me', desc: 'Built traffic+subsidy tiered growth strategy for merchants', metrics: ['Top GMV +220%', 'Sign Rate 68%'] }
    ],
    zh: [
      { title: '\u63A8\u8350\u589E\u957F\u7B56\u7565', company: '悟空中文', desc: '\u4F18\u5316\u7528\u6237\u5206\u5C42\u4E0E\u63A8\u8350\u5168\u94FE\u8DEF\u8F6C\u5316', metrics: ['\u89C4\u6A21+22%', '\u8F6C\u5316+15%'] },
      { title: 'AI\u667A\u80FD\u884C\u7A0B', company: 'imeanAI', desc: '\u7F16\u5199NLP\u9A71\u52A8\u7684\u52A8\u6001\u884C\u7A0B\u89C4\u5212\u529F\u80FDPRD', metrics: ['\u6548\u7387+50%', '\u8BA2\u5355\u8F6C\u5316+20%'] },
      { title: '\u8282\u5047\u65E5\u4FC3\u9500\u77E9\u9635', company: '\u643A\u7A0B\u96C6\u56E2', desc: '\u8C08\u522410+\u5BB6\u4F9B\u5E94\u5546\uFF0CIP\u8054\u540D\u6D3B\u52A8\uFF0CGMV\u7A81\u7834100\u4E07', metrics: ['GMV 100\u4E07+', '\u8BA2\u5355+40%'] },
      { title: '\u5546\u6237\u5206\u5C42\u8FD0\u8425', company: '\u997F\u4E86\u4E48', desc: '\u6784\u5EFA\u6D41\u91CF+\u8865\u8D34\u5206\u5C42\u589E\u957F\u7B56\u7565', metrics: ['\u5C3E\u90E8GMV+12%', '\u7B7E\u7EA6\u738768%'] }
    ]
  }
};

// ====== Current language state ======
let currentLang = localStorage.getItem('lang') || 'zh';

// ====== Render experience cards ======
function renderExperiences(lang) {
  const container = document.getElementById('experienceTimeline');
  if (!container) return;

  // Clear children but keep the timeline bar
  const bar = container.querySelector('.absolute.left-\\[5px\\]');
  while (container.children.length > 1) container.removeChild(container.lastChild);
  if (container.firstChild) container.innerHTML = '<div class="absolute left-[5px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#3B82F6] to-[#93C5FD]"></div>';

  const data = window.I18N_DATA.experiences[lang];
  data.forEach((exp, idx) => {
    const item = document.createElement('div');
    item.className = 'relative pl-1';
    item.style.animation = 'cardFadeIn 0.5s ease ' + (idx * 0.08) + 's forwards';
    item.style.opacity = '0';

    let html = [
      '<div class="absolute left-[-17px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#3B82F6] border-2 border-white shadow-sm"></div>',
      '<div class="bg-white border border-[#E2E8F0] rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">',
      '  <div class="flex items-baseline justify-between gap-2 mb-1">',
      '    <span class="text-sm font-semibold text-[#0F172A]">' + exp.company + '</span>',
      '    <span class="text-xs font-medium text-[#3B82F6]">' + exp.role + '</span>',
      '    <span class="text-xs text-[#94A3B8] shrink-0">' + exp.period + '</span>',
      '  </div>',
      '  <ul class="space-y-0.5 pl-0">',
      exp.items.map(function(itemText) {
        return '<li class="flex items-start gap-1.5 text-xs text-[#475569] leading-snug"><span class="mt-[4px] w-1 h-1 rounded-full bg-[#3B82F6] shrink-0"></span><span>' + itemText + '</span></li>';
      }).join(''),
      '</ul>',
      '</div>'
    ].join('');
    item.innerHTML = html;
    container.appendChild(item);
  });
}

// ====== Render project cards ======
function renderProjects(lang) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const data = window.I18N_DATA.projects[lang];
  data.forEach(function(p, i) {
    const card = document.createElement('div');
    card.className = 'project-card rounded-xl p-5 sm:p-6 bg-white border border-[#F1F5F9] transition-all opacity-0';
    card.style.animation = 'cardFadeIn 0.5s ease ' + (i * 0.08) + 's forwards';

    card.innerHTML = [
      '<div class="flex items-center gap-2 mb-3">',
      '  <span class="company-tag text-xs">' + p.company + '</span>',
      '</div>',
      '<h3 class="font-semibold text-sm sm:text-base mb-1.5 text-[#0F172A]">' + p.title + '</h3>',
      '<p class="text-xs leading-relaxed mb-4 text-[#64748B]">' + p.desc + '</p>',
      '<div class="flex flex-wrap gap-2">',
      p.metrics.map(function(m) { return '<span class="metric-badge">' + m + '</span>'; }).join(''),
      '</div>'
    ].join('');

    grid.appendChild(card);
  });
}

// ====== Apply language to all static elements ======
function applyStaticText(lang) {
  const dict = window.I18N_DICT[lang] || window.I18N_DICT.en;

  // Update data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      // Handle different element types
      if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
        el.setAttribute('placeholder', dict[key]);
      } else if (el.tagName === 'IMG') {
        el.setAttribute('alt', dict[key]);
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Update title attribute on elements with data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
    const key = el.getAttribute('data-i18n-title');
    if (dict[key] !== undefined) {
      el.setAttribute('title', dict[key]);
    }
  });

  // Update aria-label on elements with data-i18n-aria
  document.querySelectorAll('[data-i18n-aria]').forEach(function(el) {
    const key = el.getAttribute('data-i18n-aria');
    if (dict[key] !== undefined) {
      el.setAttribute('aria-label', dict[key]);
    }
  });

  // Update both the first welcome message and chat input placeholder
  const chatInput = document.getElementById('chatInput');
  if (chatInput) chatInput.setAttribute('placeholder', dict['ai-input']);

  // Update the first welcome message in chat
  const chatMessages = document.getElementById('chatMessages');
  if (chatMessages) {
    const firstBubble = chatMessages.querySelector('.max-w-\\[85\\%\\]');
    if (firstBubble) firstBubble.textContent = dict['ai-welcome'];
  }

  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
}

// ====== Update language dropdown button ======
function updateDropdownButton(lang) {
  const flag = lang === 'zh' ? '\uD83C\uDDE8\uD83C\uDDF3' : '\uD83C\uDDEC\uD83C\uDDE7';
  const label = lang === 'zh' ? '\u4E2D\u6587' : 'English';

  // Desktop dropdown button
  const desktopBtn = document.querySelector('nav .relative > button');
  if (desktopBtn) {
    desktopBtn.innerHTML = '<span class="text-sm leading-none">' + flag + '</span><span class="text-xs font-medium">' + label + '</span><svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2.5 3.5L5 6.5L7.5 3.5"/></svg>';
  }

  // Desktop dropdown options: highlight current
  const desktopOptions = document.querySelectorAll('nav .relative .p-1\\.5 button');
  if (desktopOptions.length >= 2) {
    desktopOptions[0].innerHTML = '<span class="text-sm leading-none">\uD83C\uDDE8\uD83C\uDDF3</span><span class="font-medium">\u4E2D\u6587</span>';
    desktopOptions[1].innerHTML = '<span class="text-sm leading-none">\uD83C\uDDEC\uD83C\uDDE7</span><span>English</span>';
    if (lang === 'zh') {
      desktopOptions[0].className = 'flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-[#0F172A] bg-[#F1F5F9] transition-colors cursor-pointer';
      desktopOptions[1].className = 'flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors cursor-pointer';
    } else {
      desktopOptions[0].className = 'flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors cursor-pointer';
      desktopOptions[1].className = 'flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-[#0F172A] bg-[#F1F5F9] transition-colors cursor-pointer';
    }
  }

  // Mobile buttons
  const mobileZhBtn = document.querySelector('#mobileMenu .flex.items-center.justify-center button:first-child');
  const mobileEnBtn = document.querySelector('#mobileMenu .flex.items-center.justify-center button:last-child');
  if (mobileZhBtn) {
    mobileZhBtn.className = 'flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium ' + (lang === 'zh' ? 'bg-[#F1F5F9] text-[#0F172A]' : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]') + ' cursor-pointer';
    mobileZhBtn.innerHTML = '<span class="text-base leading-none">\uD83C\uDDE8\uD83C\uDDF3</span><span>\u4E2D\u6587</span>';
  }
  if (mobileEnBtn) {
    mobileEnBtn.className = 'flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium ' + (lang === 'en' ? 'bg-[#F1F5F9] text-[#0F172A]' : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]') + ' cursor-pointer';
    mobileEnBtn.innerHTML = '<span class="text-base leading-none">\uD83C\uDDEC\uD83C\uDDE7</span><span>English</span>';
  }
}

// ====== Main language switch function (exposed globally) ======
window.setLanguage = function(lang) {
  if (lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);

  applyStaticText(lang);
  updateDropdownButton(lang);
  renderExperiences(lang);
  renderProjects(lang);

  // Custom event for other scripts
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
};

// ====== Get current language ======
window.getCurrentLang = function() { return currentLang; };

// ====== Toggle dropdown visibility ======
function toggleDropdown(show) {
  const panel = document.querySelector('nav .relative > div:last-child');
  if (!panel) return;
  if (show === true) {
    panel.classList.remove('opacity-0', 'invisible');
    panel.classList.add('opacity-100', 'visible');
  } else {
    panel.classList.remove('opacity-100', 'visible');
    panel.classList.add('opacity-0', 'invisible');
  }
}

// ====== Initialize on DOMContentLoaded ======
document.addEventListener('DOMContentLoaded', function() {
  // Apply saved language
  applyStaticText(currentLang);
  updateDropdownButton(currentLang);
  renderExperiences(currentLang);
  renderProjects(currentLang);

  // Wire up desktop dropdown toggle (click instead of hover)
  const dropdownBtn = document.querySelector('nav .relative > button');
  if (dropdownBtn) {
    dropdownBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const panel = this.parentElement.querySelector('div:last-child');
      if (panel) {
        const isOpen = !panel.classList.contains('opacity-0');
        toggleDropdown(!isOpen);
      }
    });
  }

  // Wire up desktop language option buttons
  const desktopOptions = document.querySelectorAll('nav .relative .p-1\\.5 button');
  desktopOptions.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const isZh = this.querySelector('span:last-child').textContent.trim() === '\u4E2D\u6587';
      window.setLanguage(isZh ? 'zh' : 'en');
      toggleDropdown(false);
    });
  });

  // Wire up mobile language buttons
  const mobileZhBtn = document.querySelector('#mobileMenu .flex.items-center.justify-center button:first-child');
  const mobileEnBtn = document.querySelector('#mobileMenu .flex.items-center.justify-center button:last-child');
  if (mobileZhBtn) {
    mobileZhBtn.addEventListener('click', function() {
      window.setLanguage('zh');
    });
  }
  if (mobileEnBtn) {
    mobileEnBtn.addEventListener('click', function() {
      window.setLanguage('en');
    });
  }

  // Click outside to close dropdown
  document.addEventListener('click', function(e) {
    const group = document.querySelector('nav .relative');
    if (group && !group.contains(e.target)) {
      toggleDropdown(false);
    }
  });
});

console.log('i18n loaded, current language:', currentLang);

