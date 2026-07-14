/**
 * Kiki - Internet Operations Portfolio - Frontend Logic
 */

/* Navigation */
(function() {
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  window.closeMobileMenu = () => {
    mobileMenu.classList.add('hidden');
  };

  const sections = ['hero', 'experience', 'projects', 'ai-chat', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 300) current = id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  });
})();

/* AI Chat */
(function() {
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const loadingEl = document.getElementById('loadingIndicator');
  const clearBtn = document.getElementById('clearChatBtn');

  function addMessage(role, content) {
    const isUser = role === 'user';
    const div = document.createElement('div');
    div.className = 'message-enter flex items-start gap-3 ' + (isUser ? 'flex-row-reverse' : '');

    const avatar = document.createElement('div');
    avatar.className = 'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold shrink-0';
    if (isUser) {
      avatar.style.cssText = 'background:#F1F5F9; color:#475569;';
      avatar.textContent = 'You';
    } else {
      avatar.style.cssText = 'background:linear-gradient(135deg,#3B82F6,#2563EB); color:white;';
      avatar.textContent = 'AI';
    }

    const bubble = document.createElement('div');
    bubble.className = 'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed';
    bubble.textContent = content;

    if (isUser) {
      bubble.style.cssText = 'background:#0F172A; color:white; border-radius:16px 16px 4px 16px;';
    } else {
      bubble.style.cssText = 'background:white; border:1px solid #E2E8F0; color:#475569; border-radius:16px 16px 16px 4px;';
    }

    div.appendChild(avatar);
    div.appendChild(bubble);
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  window.sendMessage = async function() {
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.disabled = true;
    sendBtn.disabled = true;
    chatInput.value = '';

    addMessage('user', text);
    loadingEl.classList.remove('hidden');
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      addMessage('assistant', res.ok ? data.reply : (data.error || 'Sorry, unable to respond at this time'));
    } catch {
      addMessage('assistant', 'Network connection failed. Please check your connection and try again.');
    } finally {
      loadingEl.classList.add('hidden');
      chatInput.disabled = false;
      sendBtn.disabled = false;
      chatInput.focus();
    }
  };

  clearBtn.addEventListener('click', () => {
    const children = chatMessages.children;
    while (children.length > 1) chatMessages.removeChild(children[children.length - 1]);
    chatMessages.scrollTop = 0;
  });

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  sendBtn.addEventListener('click', sendMessage);
})();

/* Card fade-in animation keyframes */
(function() {
  const s = document.createElement('style');
  s.textContent = '@keyframes cardFadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}';
  document.head.appendChild(s);
})();

console.log('Kiki - Internet Operations Portfolio');
