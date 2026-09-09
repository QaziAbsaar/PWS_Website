/* PAF-IAST Welfare Society — front-end interactions and GitHub-managed content. */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.site-nav');
  var topButton = document.querySelector('.back-top');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function updateScrollState() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
    if (topButton) topButton.classList.toggle('show', window.scrollY > 500);
  }
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
  if (topButton) topButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (item) { observer.observe(item); });
  } else {
    reveals.forEach(function (item) { item.classList.add('visible'); });
  }

  var params = new URLSearchParams(window.location.search);
  var interest = params.get('interest');
  var interestSelect = document.querySelector('[name="interest"]');
  if (interest && interestSelect && ['membership', 'volunteering', 'partnership'].indexOf(interest) !== -1) {
    interestSelect.value = interest;
  }

  function formToMail(form) {
    var fields = new FormData(form);
    var kind = form.getAttribute('data-form-kind') || 'enquiry';
    var selectedInterest = fields.get('interest') || 'general enquiry';
    var lines = [
      'Hello PAF-IAST Welfare Society,',
      '',
      'I am writing through the Welfare Society website.',
      ''
    ];
    fields.forEach(function (value, key) {
      if (key !== 'consent' && value) {
        lines.push(key.replace(/([A-Z])/g, ' $1') + ': ' + value);
      }
    });
    lines.push('', 'Thank you.');
    var subject = (kind === 'application' ? 'Welfare Society — interest in ' : 'Welfare Society — ') + selectedInterest;
    var status = form.querySelector('.form-status');
    if (status) status.textContent = 'Your email app should open with your message ready to send. Please review it, then press Send.';
    window.location.href = 'mailto:info@paf-iast.edu.pk?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
  }

  document.querySelectorAll('[data-mail-form]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (form.reportValidity()) formToMail(form);
    });
  });

  document.querySelectorAll('[data-accordion-button]').forEach(function (button) {
    button.addEventListener('click', function () {
      var row = button.closest('.accordion-item');
      var isOpen = row.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });

  function escapeHTML(value) {
    return String(value || '').replace(/[&<>'"]/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character];
    });
  }

  function initials(name) {
    return String(name || 'WS').split(/\s+/).filter(Boolean).slice(0, 2).map(function (part) {
      return part.charAt(0).toUpperCase();
    }).join('');
  }

  function contentImagePath(source) {
    if (!source) return '';
    if (/^(https?:|data:)/i.test(source)) return source;
    return source.replace(/^\/+/, '');
  }

  function renderTeam(team) {
    var grid = document.getElementById('team-grid');
    if (!grid || !Array.isArray(team) || !team.length) return;
    grid.innerHTML = team.map(function (member) {
      var name = escapeHTML(member.name);
      var role = escapeHTML(member.role);
      var source = contentImagePath(member.image);
      var alt = escapeHTML(member.alt || (member.name ? member.name + ', ' + (member.role || 'Welfare Society team member') : 'Welfare Society team member'));
      var portrait = source
        ? '<img class="person-image" src="' + escapeHTML(source) + '" alt="' + alt + '" loading="lazy">'
        : '<span class="initials" aria-hidden="true">' + initials(member.name) + '</span>';
      return '<article class="person' + (source ? ' has-image' : '') + '">' + portrait + '<div><h3>' + name + '</h3><p>' + role + '</p></div></article>';
    }).join('');
  }

  function renderGallery(gallery) {
    var grid = document.getElementById('gallery-grid');
    if (!grid || !Array.isArray(gallery) || !gallery.length) return;
    var usableItems = gallery.filter(function (item) { return item && item.image; });
    if (!usableItems.length) return;
    grid.classList.add('gallery-photo-grid');
    grid.innerHTML = usableItems.map(function (item) {
      var source = contentImagePath(item.image);
      var caption = escapeHTML(item.caption);
      var alt = escapeHTML(item.alt || item.caption || 'PAF-IAST Welfare Society activity');
      return '<figure class="gallery-photo"><img src="' + escapeHTML(source) + '" alt="' + alt + '" loading="lazy"><figcaption>' + caption + '</figcaption></figure>';
    }).join('');
  }

  function renderEvents(events) {
    var section = document.getElementById('managed-events');
    var grid = document.getElementById('events-grid');
    if (!section || !grid || !Array.isArray(events) || !events.length) return;
    grid.innerHTML = events.map(function (event) {
      var source = contentImagePath(event.image);
      var cover = source
        ? '<img src="' + escapeHTML(source) + '" alt="' + escapeHTML(event.alt || event.title || 'Welfare Society event') + '" loading="lazy">'
        : '<div class="event-image-fallback" aria-hidden="true">W</div>';
      return '<article class="published-event">' + cover + '<div><span>' + escapeHTML(event.status || 'Society activity') + '</span><h3>' + escapeHTML(event.title) + '</h3><p class="event-meta">' + escapeHTML(event.date) + (event.location ? ' · ' + escapeHTML(event.location) : '') + '</p><p>' + escapeHTML(event.description) + '</p></div></article>';
    }).join('');
    section.hidden = false;
  }

  function loadManagedContent() {
    fetch('content/site.json', { cache: 'no-store' })
      .then(function (response) { return response.ok ? response.json() : null; })
      .then(function (content) {
        if (!content) return;
        renderTeam(content.team);
        renderGallery(content.gallery);
        renderEvents(content.events);
      })
      .catch(function () {
        /* Public pages retain their carefully designed fallback content if content is temporarily unavailable. */
      });
  }
  loadManagedContent();
}());
