/* ФБУЗ ЦГИЭ — логика сайта. Этот файл редактировать не нужно.
   Весь изменяемый контент лежит в content.js. */
(function () {
  var S = window.SITE || {};
  var C = S.config || {};
  var page = document.body.getAttribute('data-page') || '';

  var ICONS = {
    record: '📝', docs: '📄', results: '🔬', map: '📍', phone: '📞', mail: '✉️', clock: '🕒', pin: '📍'
  };

  /* --- НАВИГАЦИЯ (одно место для всех страниц) --- */
  var NAV = [
    { id: 'home',     title: 'Главная',        href: 'index.html' },
    { id: 'about',    title: 'Об организации', href: 'ob-organizacii.html',
      sub: [
        { title: 'О центре',                       href: 'ob-organizacii.html#razdel-o-centre' },
        { title: 'Руководство',                    href: 'ob-organizacii.html#razdel-rukovodstvo' },
        { title: 'Филиалы', href: 'ob-organizacii.html#razdel-filialy', sub: [
          { title: 'Филиал в городах Кировске, Апатиты и Ковдорском районе',              href: 'filial.html?id=kirovsk' },
          { title: 'Филиал в городе Мончегорске, городе Оленегорске и Ловозерском районе', href: 'filial.html?id=monchegorsk' },
          { title: 'Филиал в Кандалакшском и Терском районах',                            href: 'filial.html?id=kandalaksha' },
          { title: 'Филиал в Печенгском районе',                                          href: 'filial.html?id=pechenga' }
        ] },
        { title: 'Отделы учреждения',              href: 'ob-organizacii.html#razdel-otdely' },
        { title: 'Полезные разделы',               href: 'ob-organizacii.html#razdel-podrazdeleniya' },
        { title: 'Правоустанавливающие документы', href: 'ob-organizacii.html#razdel-dokumenty' },
        { title: 'Контакты',                       href: 'kontakty.html' }
      ] },
    { id: 'uslugi',   title: 'Услуги и цены',  href: 'uslugi.html',
      sub: [
        { title: 'Все услуги',  href: 'uslugi.html' },
        { title: 'Прейскурант', href: 'preyskurant.html' }
      ] },
    { id: 'napravleniya', title: 'Направления', href: 'ilc.html',
      sub: [
        { title: 'ИЛЦ', href: 'ilc.html', sub: [
          { title: 'ИЛЦ — Мурманск',                                                  href: 'statya.html?id=ilc-fbuz-centr-gigieny-i-epidemiologii-v-murmanskoy-oblasti' },
          { title: 'ИЛЦ филиала в городах Кировске, Апатиты и Ковдорском районе',        href: 'statya.html?id=ilc-filiala-fbuz-centr-gigieny-i-epidemiologii-v-murmanskoy-oblasti-v-gorode-monchegorske-v-gorodah-kirovske-apatity-i-kovdoroskom-rayone' },
          { title: 'ИЛЦ филиала в городе Мончегорске, городе Оленегорске и Ловозерском районе', href: 'statya.html?id=ilc-filiala-fbuz-centr-gigieny-i-epidemiologii-v-murmanskoy-oblasti-v-gorode-monchegorske-gorode-olenegorske-i-lovozerskom-rayone' },
          { title: 'ИЛЦ филиала в Кандалакшском и Терском районах',                     href: 'statya.html?id=ilc-filiala-fbuz-centr-gigieny-i-epidemiologii-v-murmanskoy-oblasti-v-kandalakshskom-i-terskom-rayonah' }
        ] },
        { title: 'Орган инспекции',  href: 'organ-inspekcii.html' }
      ] },
    { id: 'zpp',      title: 'Консультационный центр', href: 'zpp.html' },
    { id: 'dokumenty',title: 'Документы',      href: 'dokumenty.html' },
    { id: 'novosti',  title: 'Новости',        href: 'novosti.html' }
  ];

  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
  function $(sel, root) { return (root || document).querySelector(sel); }

  /* --- ШАПКА: topbar + header + nav --- */
  function buildHeader() {
    var mount = $('#site-top');
    if (!mount) return;
    // пункт выпадающего списка; поддерживает 2-й уровень (s.sub)
    function dropItem(s) {
      var a = '<a href="' + s.href + '">' + s.title + '</a>';
      if (s.sub && s.sub.length) {
        var inner = s.sub.map(function (x) { return '<a href="' + x.href + '">' + x.title + '</a>'; }).join('');
        return '<div class="nav-sub has-sub2">' + a + '<div class="nav-drop2">' + inner + '</div></div>';
      }
      return a;
    }
    var navLinks = NAV.map(function (n) {
      var a = '<a href="' + n.href + '"' + (n.id === page ? ' class="active"' : '') + '>' + n.title + '</a>';
      if (n.sub && n.sub.length) {
        var drop = n.sub.map(dropItem).join('');
        return '<div class="nav-item has-sub">' + a + '<div class="nav-drop">' + drop + '</div></div>';
      }
      return a;
    }).join('');

    mount.innerHTML =
      // версия для слабовидящих — панель настроек
      '<div class="bvi-panel"><div class="inner">' +
        '<b>Версия для слабовидящих</b>' +
        '<div class="group">Цвет: <button class="sw1" data-scheme="bw">A</button>' +
          '<button class="sw2" data-scheme="wb">A</button>' +
          '<button class="sw3" data-scheme="by">A</button></div>' +
        '<div class="group">Размер: <button class="fz1" data-fs="1">A</button>' +
          '<button class="fz2" data-fs="2">A</button>' +
          '<button class="fz3" data-fs="3">A</button></div>' +
        '<button data-bvi-off>✕ Обычная версия</button>' +
      '</div></div>' +

      '<div class="topbar"><div class="inner">' +
        '<div class="topbar-left">' +
          '<span>Официальный сайт ' + C.orgShort + ' — подведомственная организация Роспотребнадзора</span>' +
          '<button class="bvi-toggle" data-bvi-on>👁 Версия для слабовидящих</button>' +
        '</div>' +
        '<div class="hotline"><span class="label">ГОРЯЧАЯ ЛИНИЯ</span><span>8-800-555-49-43 (бесплатно)</span></div>' +
      '</div></div>' +

      '<header class="site-header"><div class="header-inner">' +
        '<a class="logo-block" href="index.html">' +
          '<span class="logo-img"><img src="assets/logo.jpg" alt="Герб Роспотребнадзора"></span>' +
          '<span class="logo-text-block">' +
            '<span class="logo-title">Центр гигиены<br>и эпидемиологии</span>' +
            '<span class="logo-sub">в Мурманской области</span>' +
          '</span>' +
        '</a>' +
        '<div class="header-contacts">' +
          '<a class="phone-main" href="tel:' + C.phoneHref + '">' + C.phone + '</a>' +
          '<span class="phone-note">' + C.hours + '</span>' +
          '<a class="btn-call" href="' + C.vkUrl + '" target="_blank" rel="noopener">Записаться</a>' +
        '</div>' +
      '</div></header>' +

      '<nav class="site-nav"><div class="nav-inner">' +
        '<div class="nav-links" id="navLinks">' + navLinks + '</div>' +
        '<button class="nav-toggle" id="navToggle" aria-label="Меню"><span></span><span></span><span></span></button>' +
      '</div></nav>';

    // мобильное меню
    var toggle = $('#navToggle'), links = $('#navLinks');
    if (toggle) toggle.addEventListener('click', function () { links.classList.toggle('open'); });

    bindBvi();
  }

  /* --- ПОДВАЛ --- */
  function buildFooter() {
    var mount = $('#site-bottom');
    if (!mount) return;
    var navList = NAV.map(function (n) { return '<li><a href="' + n.href + '">' + n.title + '</a></li>'; }).join('') +
      '<li><a href="preyskurant.html">Прейскурант</a></li>' +
      '<li><a href="ilc.html">ИЛЦ (лаборатория)</a></li>' +
      '<li><a href="organ-inspekcii.html">Орган инспекции</a></li>' +
      '<li><a href="zpp.html">Защита прав потребителей</a></li>' +
      '<li><a href="licenzii.html">Лицензии</a></li>' +
      '<li><a href="antikorrupciya.html">Противодействие коррупции</a></li>';
    mount.innerHTML =
      '<footer class="site-footer"><div class="footer-inner">' +
        '<div class="footer-brand">' +
          '<a class="logo-block" href="index.html">' +
            '<span class="logo-img"><img src="assets/logo.jpg" alt=""></span>' +
            '<span class="logo-text-block"><span class="logo-title">' + C.orgShort + '</span></span>' +
          '</a>' +
          '<p>Аккредитованная организация Роспотребнадзора. Санитарно-эпидемиологические исследования и услуги населению и организациям Мурманской области.</p>' +
          '<p style="margin-top:14px">' + ICONS.pin + ' ' + C.address + '<br>' + ICONS.mail + ' <a href="mailto:' + C.email + '" style="color:#9cf">' + C.email + '</a></p>' +
        '</div>' +
        '<div><h4>Разделы</h4><ul>' + navList + '</ul></div>' +
        '<div><h4>Полезные ссылки</h4><ul>' +
          '<li><a href="https://www.rospotrebnadzor.ru" target="_blank" rel="noopener">Роспотребнадзор</a></li>' +
          '<li><a href="https://www.gosuslugi.ru" target="_blank" rel="noopener">Госуслуги</a></li>' +
          '<li><a href="' + C.vkUrl + '" target="_blank" rel="noopener">Мы ВКонтакте</a></li>' +
          '<li><a href="files/politika-personalnyh-dannyh.pdf" target="_blank" rel="noopener">Политика обработки перс. данных</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + ' ' + C.orgName + '. Все права защищены.</span><span>' + C.siteName + '</span></div>' +
      '</footer>';
  }

  /* --- ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ --- */
  function store(k, v) { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function bindBvi() {
    var root = document.documentElement;
    function setScheme(s) { root.classList.remove('scheme-bw', 'scheme-wb', 'scheme-by'); if (s) root.classList.add('scheme-' + s); store('bvi-scheme', s); }
    function setFs(n) { root.classList.remove('fs-2', 'fs-3'); if (n === '2' || n === '3') root.classList.add('fs-' + n); store('bvi-fs', n); }
    function on() { root.classList.add('bvi'); if (!read('bvi-scheme')) setScheme('bw'); store('bvi', '1'); }
    function off() { root.classList.remove('bvi'); store('bvi', null); }

    document.querySelectorAll('[data-bvi-on]').forEach(function (b) { b.addEventListener('click', on); });
    document.querySelectorAll('[data-bvi-off]').forEach(function (b) { b.addEventListener('click', off); });
    document.querySelectorAll('[data-scheme]').forEach(function (b) { b.addEventListener('click', function () { setScheme(b.getAttribute('data-scheme')); }); });
    document.querySelectorAll('[data-fs]').forEach(function (b) { b.addEventListener('click', function () { setFs(b.getAttribute('data-fs')); }); });

    if (read('bvi') === '1') { root.classList.add('bvi'); setScheme(read('bvi-scheme') || 'bw'); setFs(read('bvi-fs') || '1'); }
  }

  /* --- РЕНДЕР: услуги --- */
  function renderServices(mount, limit) {
    if (!mount) return;
    var list = (S.services || []).slice(0, limit || 99);
    mount.innerHTML = list.map(function (s) {
      var bg = s.img ? ' style="background-image:url(\'' + s.img + '\')"' : '';
      return '<a class="svc-card reveal" href="usluga.html?id=' + s.key + '">' +
        '<div class="svc-img' + (s.img ? ' has-img' : '') + '"' + bg + '><span class="yellow-accent"></span><span class="svc-img-label">' + s.title + '</span></div>' +
        '<div class="svc-body"><p>' + s.desc + '</p><span class="svc-link">Подробнее →</span></div>' +
      '</a>';
    }).join('');
  }

  /* --- РЕНДЕР: страница одной услуги (usluga.html?id=...) --- */
  function renderUsluga() {
    var mount = $('#usluga'); if (!mount) return;
    var s = (S.services || []).filter(function (x) { return x.key === getParam('id'); })[0];
    if (!s) { mount.innerHTML = '<p>Услуга не найдена.</p>'; return; }
    var ttl = $('#usluga-title'); if (ttl) ttl.textContent = s.title;
    var crumb = $('#usluga-crumb');
    if (crumb) crumb.innerHTML = '<a href="index.html">Главная</a> / <a href="uslugi.html">Услуги и цены</a> / ' + s.title;
    document.title = s.title + ' — ' + (C.orgShort || '');
    var html = '';
    if (s.img) html += '<div class="usluga-hero" style="background-image:url(\'' + s.img + '\')"></div>';
    html += '<div class="article-body">' + (s.detail || []).map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div>';
    var info = '';
    if (s.phones && s.phones.length)
      info += '<div class="contact-item"><span class="contact-icon" data-ico="phone"></span><div><strong>Телефон</strong>' +
        s.phones.map(function (p) { return phoneLinks(p); }).join('<br>') + '</div></div>';
    if (s.priceN)
      info += '<div class="contact-item"><span class="contact-icon" data-ico="tag"></span><div><strong>Цены</strong>' +
        '<a href="preyskurant.html#razdel-' + s.priceN + '">Раздел ' + s.priceN + ' прейскуранта →</a></div></div>';
    if (info)
      html += '<div class="info-block" style="margin:18px 0"><h2>Контакты и цены</h2><div class="contacts-grid">' + info + '</div></div>';
    if (s.docIds && s.docIds.length)
      html += '<div class="info-sec"><h2 class="section-title">Документы и бланки</h2>' + docListByIds(s.docIds) + '</div>';
    if (s.links && s.links.length)
      html += '<div class="info-sec"><h2 class="section-title">Подробнее</h2><ul class="doc-list">' +
        s.links.map(function (l) {
          var ext = /^https?:/.test(l.href);
          return '<li><a class="doc-row" href="' + l.href + '"' + (ext ? ' target="_blank" rel="noopener"' : '') +
            '><span class="doc-icon" data-ico="link"></span><span class="doc-title">' + l.title + '</span><span class="doc-dl">Открыть →</span></a></li>';
        }).join('') + '</ul></div>';
    html += '<div class="ak-hotline">Записаться и уточнить детали: напишите нам <a href="' + (C.vkUrl || '#') +
      '" target="_blank" rel="noopener">ВКонтакте</a> или позвоните по телефону <a href="tel:' + (C.phoneHref || '') + '">' + (C.phone || '') + '</a>.</div>';
    mount.innerHTML = html;
    resolveDocRefs(mount);
  }

  /* --- РЕНДЕР: новости (карточки) --- */
  function renderNews(mount, limit) {
    if (!mount) return;
    var list = (S.news || []).slice(0, limit || 99);
    mount.innerHTML = list.map(function (n) {
      return '<a class="news-card reveal" href="' + C.vkUrl + '" target="_blank" rel="noopener">' +
        '<div class="news-date">' + n.date + '</div>' +
        '<h3>' + n.title + '</h3>' +
        (n.text ? '<p>' + n.text + '</p>' : '') +
        '<div class="news-more">Читать в сообществе →</div>' +
      '</a>';
    }).join('');
  }

  /* --- РЕНДЕР: прайс --- */
  function renderPrices(mount) {
    if (!mount) return;
    mount.innerHTML = (S.priceGroups || []).map(function (g) {
      var rows = g.items.map(function (it) {
        var tbd = /уточн/i.test(it.price) ? ' tbd' : '';
        return '<div class="price-row"><span class="pn">' + it.name + '</span><span class="pv' + tbd + '">' + it.price + '</span></div>';
      }).join('');
      return '<div class="price-group reveal"><h2>' + g.group + '</h2>' + rows + '</div>';
    }).join('');
  }

  /* --- РЕНДЕР: документы (универсально) --- */
  function docListHTML(arr) {
    return '<ul class="doc-list">' + (arr || []).map(function (d) {
      var href = d.file || '#';
      var attr = href !== '#' ? ' href="' + href + '" target="_blank" rel="noopener"' : ' href="#"';
      return '<li><a class="doc-row"' + attr + '>' +
        '<span class="doc-icon">' + d.type + '</span>' +
        '<span class="doc-title">' + d.title + '</span>' +
        '<span class="doc-dl">Открыть ↗</span></a></li>';
    }).join('') + '</ul>';
  }
  function renderDocListInto(mount, arr) {
    if (!mount) return;
    mount.innerHTML = docListHTML(arr);
  }

  /* --- РЕЕСТР ДОКУМЕНТОВ: поиск по id, ссылки по id (data-doc) --- */
  function docById(id) { return (S.documents || []).filter(function (d) { return d.id === id; })[0]; }
  function docListByIds(ids) {
    return docListHTML((ids || []).map(docById).filter(Boolean));
  }
  /* Превращает ссылки <a class="docref" data-doc="id"> в рабочие ссылки на файл
     из реестра (открытие в новой вкладке = предпросмотр). Путь берётся из
     реестра, поэтому заменить файл достаточно в одном месте. */
  function resolveDocRefs(root) {
    (root || document).querySelectorAll('a.docref[data-doc]').forEach(function (a) {
      var d = docById(a.getAttribute('data-doc'));
      if (d) {
        a.setAttribute('href', d.file);
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
        a.classList.remove('docref-missing');
      } else {
        a.classList.add('docref-missing');
        a.removeAttribute('href');
      }
    });
  }

  /* категории документа: строка или массив строк → всегда массив */
  function docCats(d) { return Array.isArray(d.cat) ? d.cat : (d.cat ? [d.cat] : []); }

  /* --- РЕНДЕР: страница «Документы» с поиском и фильтром по категориям --- */
  function renderDocs(mount) {
    if (!mount) return;
    var all = S.documents || [];
    var cats = [];
    all.forEach(function (d) { docCats(d).forEach(function (c) { if (cats.indexOf(c) < 0) cats.push(c); }); });
    var catMount = $('#doc-cats'), input = $('#doc-search-input');
    // читаем начальные значения из URL (?cat=Лицензии или ?q=заявление)
    var state = { q: getParam('q') || '', cat: getParam('cat') || '' };
    function draw() {
      var q = state.q.toLowerCase().trim();
      var list = all.filter(function (d) {
        if (state.cat && docCats(d).indexOf(state.cat) < 0) return false;
        if (q && (d.title || '').toLowerCase().indexOf(q) < 0 && docCats(d).join(' ').toLowerCase().indexOf(q) < 0) return false;
        return true;
      });
      mount.innerHTML = list.length ? docListHTML(list)
        : '<p class="price-note">Ничего не найдено. Измените запрос или напишите нам — подскажем.</p>';
    }
    if (catMount) {
      catMount.innerHTML = '<button class="doc-cat" data-cat="">Все</button>' +
        cats.map(function (c) { return '<button class="doc-cat" data-cat="' + c + '">' + c + '</button>'; }).join('');
      // подсветить активную категорию (в т.ч. из URL)
      catMount.querySelectorAll('.doc-cat').forEach(function (b) {
        if (b.getAttribute('data-cat') === state.cat) b.classList.add('active');
        b.addEventListener('click', function () {
          catMount.querySelectorAll('.doc-cat').forEach(function (x) { x.classList.remove('active'); });
          b.classList.add('active'); state.cat = b.getAttribute('data-cat'); draw();
        });
      });
      if (!state.cat) catMount.querySelector('.doc-cat').classList.add('active');
    }
    if (input) {
      if (state.q) input.value = state.q; // восстановить поисковую строку из URL
      input.addEventListener('input', function () { state.q = input.value; draw(); });
    }
    draw();
    // если пришли с фильтром — прокрутить к списку
    if (state.cat || state.q) setTimeout(function () { mount.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150);
  }

  /* список ссылок (на статьи/разделы) в стиле списка документов */
  function linkListHTML(arr) {
    return '<ul class="doc-list">' + (arr || []).map(function (l) {
      var ic = l.type ? '<span class="doc-icon">' + l.type + '</span>'
                      : '<span class="doc-icon" data-ico="file"></span>';
      return '<li><a class="doc-row" href="' + l.href + '">' + ic +
        '<span class="doc-title">' + l.title + '</span>' +
        '<span class="doc-dl">Открыть →</span></a></li>';
    }).join('') + '</ul>';
  }

  /* --- РЕНДЕР: универсальная страница-раздел (ИЛЦ, орган инспекции, ЗПП) ---
     Берёт ключ из data-page-key и строит страницу из S.pages[ключ].
     Поддерживает: intro, hotline, article (текст из articles.js),
     секции с docs/links, секции-архивы (archive:true). */
  function renderInfoPage() {
    var mount = $('#page-body'); if (!mount) return;
    var key = mount.getAttribute('data-page-key');
    var p = (S.pages || {})[key];
    if (!p) { mount.innerHTML = '<p>Раздел не найден.</p>'; return; }
    var A = window.ARTICLES || {};
    var html = '';
    if (p.intro) html += '<p class="section-subtitle" style="max-width:880px">' + p.intro + '</p>';
    if (p.hotline) html += '<div class="ak-hotline">' + p.hotline + '</div>';
    if (p.article && A[p.article]) html += '<div class="article-body">' + A[p.article].html + '</div>';
    (p.sections || []).forEach(function (sec) {
      var sub = sec.subtitle ? '<p class="section-subtitle">' + sec.subtitle + '</p>' : '';
      if (sec.cards) {
        html += '<div class="info-sec"><h2 class="section-title">' + sec.heading + '</h2>' + sub +
          '<div class="link-cards">' + sec.cards.map(function (c) {
            return '<a href="' + c.href + '"><strong>' + c.title + '</strong>' +
              (c.desc ? '<span>' + c.desc + '</span>' : '') + '</a>';
          }).join('') + '</div></div>';
        return;
      }
      var listHTML = sec.links ? linkListHTML(sec.links)
        : sec.docIds ? docListByIds(sec.docIds) : docListHTML(sec.docs);
      if (sec.archive) {
        html += '<details class="doc-archive"><summary>' + sec.heading + '</summary>' +
          sub + listHTML + '</details>';
      } else {
        html += '<div class="info-sec"><h2 class="section-title">' + sec.heading + '</h2>' +
          sub + listHTML + '</div>';
      }
    });
    if (p.footnote) html += '<p class="price-note">' + p.footnote + '</p>';
    mount.innerHTML = html;
  }

  /* --- РЕНДЕР: страница прейскуранта (preyskurant.html) ---
     Читает Excel-файл прейскуранта ПРЯМО В БРАУЗЕРЕ (через SheetJS).
     Обновление = заменить files/preyskurant.xlsx — без скриптов и кода. */
  function pkFmtPrice(v) {
    if (v === null || v === undefined || v === '') return '';
    var f = (typeof v === 'number') ? v : parseFloat(('' + v).replace(/\s/g, '').replace(',', '.').replace(/[^\d.\-]/g, ''));
    if (!f || f <= 0) return '';
    var r;
    if (Math.abs(f - Math.round(f)) < 0.005) r = String(Math.round(f));
    else r = f.toFixed(2).replace('.', ',');
    r = r.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return r + ' ₽';
  }
  function pkParseSheet(rows, n, sheetName) {
    function cell(x) { return (x === null || x === undefined) ? '' : ('' + x).replace(/\s+/g, ' ').trim(); }
    var C = rows.map(function (r) { return (r || []).map(cell); });
    function isHeaderRow(c) { return c.some(function (v) { return /Наименование/i.test(v); }); }
    var nameCol = -1, priceCol = -1, novatCol = -1, unitCol = -1, codeCol = -1;
    for (var r = 0; r < C.length; r++) {
      if (isHeaderRow(C[r])) {
        C[r].forEach(function (v, ci) {
          if (/Наименование/i.test(v)) nameCol = ci;
          if (/^Цена/i.test(v) && /НДС/i.test(v) && !/без/i.test(v)) priceCol = ci;
          if (/^Цена/i.test(v) && /без/i.test(v)) novatCol = ci;
          if (/Единиц/i.test(v)) unitCol = ci;
          if (/^Код/i.test(v)) codeCol = ci;
        });
        break;
      }
    }
    if (nameCol < 0) nameCol = 2;
    if (priceCol < 0) priceCol = 4;
    if (novatCol < 0) novatCol = priceCol;
    function caps(t) {
      var L = (t.match(/[А-ЯЁA-Zа-яёa-z]/g) || []).length, U = (t.match(/[А-ЯЁA-Z]/g) || []).length;
      return L >= 8 && U / L >= 0.75;
    }
    var out = [];
    for (var r2 = 0; r2 < C.length; r2++) {
      var c2 = C[r2], joined = c2.join(' ').trim();
      if (!joined || isHeaderRow(c2)) continue;
      if (c2.every(function (x) { return x === '' || /^[1-6]$/.test(x); })) continue;
      if (/(РАЗДЕЛ|ПОДРАЗДЕЛ)\s*:/.test(joined)) {
        out.push({ g: c2.reduce(function (a, b) { return b.length > a.length ? b : a; }, ''),
                   lvl: /ПОДРАЗДЕЛ/i.test(joined) ? 'C' : 'B' });
        continue;
      }
      var price = pkFmtPrice(c2[priceCol]); if (!price) price = pkFmtPrice(c2[novatCol]);
      if (!price && caps(joined) && !/ПРЕЙСКУРАНТ|ПЛАТНЫЕ|ДОГОВОР/i.test(joined)) {
        out.push({ g: joined, lvl: 'A' }); continue;
      }
      var name = c2[nameCol] || '';
      if (name && name.length > 3 && price) {
        var it = { t: name, p: price };
        if (unitCol >= 0 && c2[unitCol]) it.u = c2[unitCol];
        if (codeCol >= 0 && c2[codeCol]) it.c = c2[codeCol];
        out.push(it);
      }
    }
    var title = 'Раздел ' + n + (sheetName ? '. ' + ('' + sheetName).trim() : '');
    return { n: n, title: title, rows: out };
  }
  function renderPreyskurant() {
    var list = $('#pk-list'); if (!list) return;
    if (typeof XLSX === 'undefined') { list.innerHTML = '<p class="price-note">Модуль чтения Excel не загрузился.</p>'; return; }
    list.innerHTML = '<p class="price-note">Загрузка прейскуранта…</p>';
    var titles = S.priceSections || [];
    function fetchRows(base, i) {            // пробуем .xls, затем .xlsx
      var exts = ['.xls', '.xlsx'];
      if (i >= exts.length) return Promise.resolve(null);
      return fetch(base + exts[i]).then(function (r) {
        if (!r.ok) return fetchRows(base, i + 1);
        return r.arrayBuffer().then(function (buf) {
          var wb = XLSX.read(buf, { type: 'array' });
          return XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, raw: true, defval: '' });
        });
      }).catch(function () { return fetchRows(base, i + 1); });
    }
    var nums = [1, 2, 3, 4, 5, 6, 7];
    Promise.all(nums.map(function (n) {
      return fetchRows('files/preyskurant-' + n, 0).then(function (rows) {
        return rows ? pkParseSheet(rows, n, titles[n - 1] || '') : null;
      });
    })).then(function (secs) {
      secs = secs.filter(function (s) { return s && s.rows.some(function (x) { return x.t; }); });
      if (!secs.length) throw 0;
      buildPreyskurant(list, secs);
    }).catch(function () {
      list.innerHTML = '<p class="price-note">Не удалось загрузить прейскурант. Проверьте, что файлы ' +
        '<b>files/preyskurant-1.xls … preyskurant-7.xls</b> загружены и содержат столбцы «Наименование» и «Цена».</p>';
    });
  }
  function buildPreyskurant(list, data) {
    var quick = $('#pk-quick');
    if (quick) quick.innerHTML = data.map(function (s) {
      return '<button class="pk-q" data-n="' + s.n + '">Раздел ' + s.n + '</button>';
    }).join('');

    var docsMount = $('#pk-docs');
    if (docsMount) docsMount.innerHTML =
      '<h2 class="section-title" style="font-size:18px;margin-bottom:10px">Документы прейскуранта</h2>' +
      docListByIds(['preyskurant-prikaz', 'preyskurant-tolkovatel', 'razmer-platy']);

    function itemsRows(items) {
      return items.map(function (r) {
        var unit = r.u ? ' <span class="pk-unit">(' + r.u + ')</span>' : '';
        var hay = (r.t + ' ' + (r.c || '')).toLowerCase();
        return '<tr class="pk-item" data-s="' + hay + '">' +
          '<td class="pk-name" data-orig="' + r.t.replace(/"/g, '&quot;') + '">' + r.t + unit + '</td>' +
          '<td class="pk-price">' + r.p + '</td></tr>';
      }).join('');
    }
    function tableWrap(items) {
      return '<div class="pk-table-wrap"><table class="pk-table"><tbody>' + itemsRows(items) + '</tbody></table></div>';
    }
    function gLabel(s) {
      return ('' + s).trim();   // сохраняем подписи «РАЗДЕЛ:» / «ПОДРАЗДЕЛ:» как в исходнике
    }
    function countItems(g) {
      return (g.items ? g.items.length : 0) + (g.subs ? g.subs.reduce(function (a, s) { return a + countItems(s); }, 0) : 0);
    }
    function nodeAcc(g, depth) {
      var cls = 'pk-sub' + (depth === 1 ? ' pk-sub2' : depth >= 2 ? ' pk-sub2 pk-sub3' : '');
      var subs = (g.subs || []).filter(function (s) { return countItems(s) > 0; });
      var inner = (g.items && g.items.length ? tableWrap(g.items) : '') +
        subs.map(function (s) { return nodeAcc(s, depth + 1); }).join('');
      return '<details class="' + cls + '"><summary>' + gLabel(g.label) +
        ' <span class="pk-count">' + countItems(g) + '</span></summary>' + inner + '</details>';
    }
    function sectionInner(rows) {
      var pre = [], cats = [], A = null, B = null, Cc = null;
      rows.forEach(function (r) {
        if (r.g) {
          if (r.lvl === 'A') { A = { label: r.g, items: [], subs: [] }; cats.push(A); B = Cc = null; }
          else if (r.lvl === 'B') { B = { label: r.g, items: [], subs: [] }; (A ? A.subs : cats).push(B); Cc = null; }
          else { Cc = { label: r.g, items: [], subs: [] }; (B ? B.subs : (A ? A.subs : cats)).push(Cc); }
        } else { (Cc || B || A || { items: pre }).items.push(r); }
      });
      // отбрасываем пустые группы (0 позиций) — артефакты исходного Excel
      cats = cats.filter(function (g) { return countItems(g) > 0; });
      // Если в разделе только один подраздел верхнего уровня и нет «свободных»
      // позиций — убираем избыточную обёртку: содержимое показываем прямо в разделе.
      if (!pre.length && cats.length === 1) {
        cats[0].subs = (cats[0].subs || []).filter(function (g) { return countItems(g) > 0; });
      }
      if (!pre.length && cats.length === 1) {
        var only = cats[0];
        var flat = (only.items && only.items.length ? tableWrap(only.items) : '');
        if (only.subs && only.subs.length)
          flat += only.subs.map(function (g) { return nodeAcc(g, 0); }).join('');
        return flat;
      }
      var html = pre.length ? tableWrap(pre) : '';
      cats.forEach(function (g) { html += nodeAcc(g, 0); });
      return html;
    }
    list.innerHTML = data.map(function (s) {
      var cnt = s.rows.filter(function (x) { return x.t; }).length;
      return '<details class="pk-sec" data-n="' + s.n + '"><summary>' + s.title +
        ' <span class="pk-count">' + cnt + '</span></summary>' + sectionInner(s.rows) + '</details>';
    }).join('');

    resolveDocRefs(docsMount); resolveDocRefs(document.querySelector('.price-note'));

    // при закрытии раздела сворачиваем все его подразделы (чтобы при повторном
    // открытии раздел был в свёрнутом виде, а не с раскрытыми подразделами)
    list.querySelectorAll('details.pk-sec').forEach(function (sec) {
      sec.addEventListener('toggle', function () {
        if (!sec.open) sec.querySelectorAll('details.pk-sub[open]').forEach(function (sub) { sub.open = false; });
      });
    });

    if (quick) quick.querySelectorAll('.pk-q').forEach(function (b) {
      b.addEventListener('click', function () {
        var sec = list.querySelector('details.pk-sec[data-n="' + b.getAttribute('data-n') + '"]');
        if (sec) { sec.style.display = ''; sec.open = true; sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });

    var inp = $('#pk-search');
    if (inp) inp.addEventListener('input', function () { pkSearch(list, inp.value); });

    // переход по ссылке вида preyskurant.html#razdel-6 — раскрыть и прокрутить к разделу
    var hm = (location.hash || '').match(/razdel-(\d+)/i);
    if (hm) {
      var sec = list.querySelector('details.pk-sec[data-n="' + hm[1] + '"]');
      if (sec) { sec.open = true; setTimeout(function () { sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 120); }
    }
  }

  function pkSearch(list, q) {
    q = (q || '').trim().toLowerCase();
    var re = q ? new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig') : null;
    list.querySelectorAll('details.pk-sec').forEach(function (sec) {
      var anyR = false;
      sec.querySelectorAll('tr.pk-item').forEach(function (tr) {
        var nameCell = tr.querySelector('.pk-name');
        var orig = nameCell.getAttribute('data-orig');
        if (!q) { tr.style.display = ''; nameCell.innerHTML = orig; return; }
        if (tr.getAttribute('data-s').indexOf(q) >= 0) {
          tr.style.display = ''; anyR = true;
          nameCell.innerHTML = orig.replace(re, '<mark>$1</mark>');
        } else { tr.style.display = 'none'; }
      });
      sec.querySelectorAll('details.pk-sub').forEach(function (sub) {
        var anyS = [].some.call(sub.querySelectorAll('tr.pk-item'), function (tr) { return tr.style.display !== 'none'; });
        if (q) { sub.style.display = anyS ? '' : 'none'; sub.open = anyS; }
        else { sub.style.display = ''; sub.open = false; }
      });
      sec.querySelectorAll('.pk-subhead').forEach(function (h) { h.style.display = q ? 'none' : ''; });
      if (q) { sec.style.display = anyR ? '' : 'none'; sec.open = anyR; }
      else { sec.style.display = ''; sec.open = false; }
    });
  }

  /* --- РЕНДЕР: отдельная статья (statya.html?id=...) из articles.js --- */
  function renderArticle() {
    var mount = $('#article'); if (!mount) return;
    var A = window.ARTICLES || {};
    var a = A[getParam('id')];
    if (!a) { mount.innerHTML = '<p>Материал не найден.</p>'; return; }
    var t = $('#article-title'); if (t) t.textContent = a.title;
    var c = $('#article-crumb'); if (c) c.innerHTML = buildCrumb(a.crumb || a.title);
    document.title = a.title + ' — ' + (C.orgShort || '');
    mount.innerHTML = a.html;
  }

  /* родительские разделы хлебных крошек → ссылки (последний сегмент = текущая страница, без ссылки) */
  var CRUMB_LINKS = {
    'О центре': 'ob-organizacii.html#razdel-o-centre',
    'Отделы': 'ob-organizacii.html#razdel-otdely',
    'ИЛЦ': 'ilc.html',
    'Орган инспекции': 'organ-inspekcii.html',
    'Консультационный центр по защите прав потребителей': 'zpp.html',
    'Консультационный центр': 'zpp.html',
    'Памятки': 'zpp.html'
  };
  function buildCrumb(crumb) {
    var parts = String(crumb || '').split('/').map(function (s) { return s.trim(); }).filter(Boolean);
    var html = '<a href="index.html">Главная</a>';
    parts.forEach(function (p, i) {
      var isLast = (i === parts.length - 1);
      if (!isLast && CRUMB_LINKS[p]) html += ' / <a href="' + CRUMB_LINKS[p] + '">' + p + '</a>';
      else html += ' / ' + p;
    });
    return html;
  }

  /* --- РЕНДЕР: блоки «Об организации» --- */
  function renderAbout() {
    var a = S.about || {};
    var intro = $('#about-intro'); if (intro) intro.textContent = a.intro || '';
    var sched = $('#about-schedule'); if (sched) sched.textContent = a.schedule || '';

    var dir = $('#about-directions');
    if (dir) dir.innerHTML = (a.directions || []).map(function (d) {
      return '<li class="dir-item"><span class="dir-mark"></span>' + d + '</li>';
    }).join('');

    var dep = $('#about-departments');
    if (dep) dep.innerHTML = (S.departments || []).map(function (d) {
      var name = (typeof d === 'string') ? d : d.name;
      if (d && d.id)
        return '<li class="dir-item"><a class="dep-link" href="statya.html?id=' + d.id + '">' +
          '<span class="dir-mark"></span>' + name + '<span class="dep-arrow">→</span></a></li>';
      return '<li class="dir-item"><span class="dir-mark"></span>' + name + '</li>';
    }).join('');

    var br = $('#about-branches');
    if (br) br.innerHTML = (S.branches || []).map(function (b) {
      var icon = '<span class="lead-photo" style="background-image:url(\'' + (b.photo || AVATAR_SVG) + '\');width:68px;height:68px"></span>';
      return '<a class="branch-card reveal" href="filial.html?id=' + b.id + '">' + icon +
        '<div><strong style="display:block;font-size:14px">' + b.name + '</strong>' +
        (b.head ? '<span class="branch-head">' + b.head + '</span><br>' : '') +
        '<span class="card-hint">График, контакты, структура →</span>' +
        '</div></a>';
    }).join('');

    var lead = $('#about-leadership');
    if (lead) lead.innerHTML = (S.leadership || []).map(function (p) {
      var img = '<div class="lead-photo" style="background-image:url(\'' + (p.photo || AVATAR_SVG) + '\')"></div>';
      return '<a class="lead-card reveal" href="rukovoditel.html?id=' + p.id + '">' + img +
        '<div class="lead-body"><strong>' + p.name + '</strong><span class="lead-post">' + p.post + '</span>' +
        '<span class="lead-rec">Биография и контакты →</span></div></a>';
    }).join('');
  }

  /* --- РЕНДЕР: телефонный справочник по отделам (kontakty.html) --- */
  function renderPhoneDirectory() {
    var mount = $('#phone-directory'); if (!mount) return;
    mount.innerHTML = (S.phoneDirectory || []).map(function (g) {
      var rows = (g.items || []).map(function (it) {
        return '<div class="struct-row"><div class="struct-left">' +
          '<span class="struct-role">' + it.role + '</span></div>' +
          '<div class="struct-phones">' + phoneLinks(it.phone) + '</div></div>';
      }).join('');
      return '<div class="struct-group"><h3>' + g.dept + '</h3>' + rows + '</div>';
    }).join('');
  }

  /* --- РЕНДЕР: время работы (карточка на kontakty.html) — единый стиль с «Как связаться» --- */
  function renderWorkSchedule() {
    var mount = $('#work-schedule'); if (!mount) return;
    var items = S.workSchedule || [];
    mount.innerHTML = '<div class="contacts-grid">' + items.map(function (it) {
      return '<div class="contact-item"><span class="contact-icon" data-ico="' + (it.ico || 'clock') + '"></span>' +
        '<div><strong>' + it.label + '</strong><span>' + it.value + '</span></div></div>';
    }).join('') + '</div>';
  }

  /* --- РЕНДЕР: противодействие коррупции --- */
  function renderAnticorruption() {
    var ac = S.anticorruption || {};
    var intro = $('#ak-intro'); if (intro) intro.textContent = ac.intro || '';
    var hot = $('#ak-hotline'); if (hot) hot.textContent = ac.hotline || '';
    renderDocListInto($('#ak-list'), ac.docs);
  }

  /* --- РЕНДЕР: страница руководителя (rukovoditel.html?id=...) --- */
  function getParam(name) {
    var m = new RegExp('[?&]' + name + '=([^&]+)').exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, '%20')) : '';
  }
  /* разбивает строку с одним или несколькими телефонами на отдельные кликабельные номера (каждый — своей строкой) */
  function phoneLinks(raw) {
    if (!raw) return '';
    var s = raw.replace(/тел\.?\s*\/?\s*факс\.?:?/gi, ' ')
               .replace(/тел\.?:?/gi, ' ').replace(/факс\.?:?/gi, ' ')
               .replace(/[\/;]/g, ' ').replace(/\s+/g, ' ');
    var nums = s.match(/\(\s*\d[\d\s-]*\)\s*[\d-]+|8[\d-]{9,}|\d[\d-]{4,}/g) || [s];
    var seen = {};
    nums = nums.map(function (n) { return n.replace(/\s+/g, ' ').trim(); })
               .filter(function (n) {
                 if (!n) return false;
                 var key = n.replace(/^\(\s*\d[\d\s-]*\)\s*/, '').replace(/\D/g, ''); // номер без кода города
                 if (seen[key]) return false;
                 seen[key] = 1; return true;
               });
    return nums.map(function (n) {
      var tel = n.replace(/[^+\d]/g, '');
      return '<a class="struct-phone" href="tel:' + tel + '">' + n + '</a>';
    }).join('<br>');
  }
  function renderPerson() {
    var mount = $('#person'); if (!mount) return;
    var id = getParam('id');
    var p = (S.leadership || []).filter(function (x) { return x.id === id; })[0] || (S.leadership || [])[0];
    if (!p) { mount.innerHTML = '<p>Информация не найдена.</p>'; return; }
    var crumb = $('#person-crumb'); if (crumb) crumb.textContent = p.post;
    var ttl = $('#person-title'); if (ttl) ttl.textContent = p.post;
    var img = '<div class="bio-photo" style="background-image:url(\'' + (p.photo || AVATAR_SVG) + '\')"></div>';
    mount.innerHTML =
      '<div class="bio-layout">' + img +
      '<div class="bio-body"><h2 class="bio-name">' + p.name + '</h2>' +
      '<div class="bio-post">' + p.post + '</div>' +
      (p.contact ? '<div class="bio-contact">' + p.contact + '</div>' : '') +
      (p.bio || []).map(function (par) { return '<p>' + par + '</p>'; }).join('') +
      '</div></div>';
  }

  /* единый плейсхолдер-аватар, когда нет фото */
  var AVATAR_SVG = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23e8f2fc"/><circle cx="50" cy="38" r="18" fill="%23a9c7e8"/><path d="M18 88c0-18 14-30 32-30s32 12 32 30z" fill="%23a9c7e8"/></svg>');

  /* --- РЕНДЕР: страница филиала (filial.html?id=...) --- */
  function renderFilial() {
    var mount = $('#filial'); if (!mount) return;
    var id = getParam('id');
    var b = (S.branches || []).filter(function (x) { return x.id === id; })[0] || (S.branches || [])[0];
    if (!b) { mount.innerHTML = '<p>Филиал не найден.</p>'; return; }
    var ttl = $('#filial-title'); if (ttl) ttl.textContent = b.fullName || b.name;
    var crumb = $('#filial-crumb');
    if (crumb) crumb.innerHTML = '<a href="index.html">Главная</a> / ' +
      '<a href="ob-organizacii.html">Об организации</a> / ' +
      '<a href="ob-organizacii.html#razdel-filialy">Филиалы</a> / ' + b.name;
    var photo = b.photo || AVATAR_SVG;
    var img = '<div class="bio-photo" style="background-image:url(\'' + photo + '\')"></div>';

    var structure = (b.structure || []).map(function (g) {
      // схлопываем строки с одинаковыми адресом и телефоном, объединяя роли
      var order = [], byKey = {};
      (g.items || []).forEach(function (it) {
        var key = (it.place || '') + '|' + (it.phone || '');
        if (byKey[key] === undefined) { byKey[key] = { place: it.place, phone: it.phone, roles: [] }; order.push(byKey[key]); }
        if (it.role && byKey[key].roles.indexOf(it.role) < 0) byKey[key].roles.push(it.role);
      });
      var rows = order.map(function (m) {
        var roleTxt = m.roles.join(', ');
        var left = (roleTxt ? '<span class="struct-role">' + roleTxt + '</span>' : '') +
                   (m.place ? '<span class="struct-place">' + m.place + '</span>' : '');
        var tel = (m.phone || '').replace(/факс/gi, '').replace(/[^+\d]/g, '');
        var ph = m.phone ? '<div class="struct-phones">' + phoneLinks(m.phone) + '</div>' : '';
        return '<div class="struct-row"><div class="struct-left">' + left + '</div>' + ph + '</div>';
      }).join('');
      return '<div class="struct-group"><h3>' + g.dept + '</h3>' + rows + '</div>';
    }).join('');

    mount.innerHTML =
      '<div class="bio-layout">' + img +
      '<div class="bio-body"><h2 class="bio-name">' + b.name + '</h2>' +
      (b.head ? '<div class="bio-post">' + b.head + '</div>' : '') +
      '<div class="contacts-grid" style="margin:18px 0">' +
        '<div class="contact-item"><span class="contact-icon" data-ico="pin"></span><div><strong>Адрес</strong><span>' + (b.address || '') + '</span></div></div>' +
        '<div class="contact-item"><span class="contact-icon" data-ico="phone"></span><div><strong>Телефон</strong>' + phoneLinks(b.phone) + '</div></div>' +
        (b.email ? '<div class="contact-item"><span class="contact-icon" data-ico="mail"></span><div><strong>Email</strong><a href="mailto:' + b.email + '">' + b.email + '</a></div></div>' : '') +
        '<div class="contact-item"><span class="contact-icon" data-ico="clock"></span><div><strong>Время работы</strong><span>' + (b.schedule || '') + '</span></div></div>' +
      '</div></div></div>' +
      (b.reception ? '<div class="ak-hotline">' + b.reception + '</div>' : '') +
      (structure ? '<h2 class="section-title" style="font-size:20px;margin-top:24px">Структура и контактные телефоны</h2><div class="struct-wrap">' + structure + '</div>' : '') +
      (b.doc ? '<p class="price-note"><a class="link-more" href="' + b.doc + '" download>Положение о филиале ↓</a></p>' : '');
  }

  /* --- РЕНДЕР: горячие линии --- */
  function renderHotlines(mount) {
    if (!mount) return;
    mount.innerHTML = (S.hotlines || []).map(function (h) {
      return '<div class="hl-card"><span class="label-tag">' + h.tag + '</span>' +
        '<a class="hl-phone" href="tel:' + h.phone.replace(/[^+\d]/g, '') + '">' + h.phone + '</a>' +
        '<span class="hl-desc">' + h.desc + '</span></div>';
    }).join('');
  }

  /* --- РЕНДЕР: FAQ --- */
  function renderFaq(mount) {
    if (!mount) return;
    mount.innerHTML = (S.faq || []).map(function (f) {
      return '<div class="faq-item"><button class="faq-q">' + f.q + '</button><div class="faq-a"><p>' + f.a + '</p></div></div>';
    }).join('');
    mount.querySelectorAll('.faq-q').forEach(function (b) {
      b.addEventListener('click', function () {
        var item = b.parentNode, a = item.querySelector('.faq-a');
        var open = item.classList.toggle('open');
        a.style.maxHeight = open ? a.scrollHeight + 'px' : 0;
      });
    });
  }

  /* --- ЛЕНТА ВК (страница новостей) --- */
  function renderVk(mount) {
    if (!mount) return;
    if (!C.vkAppId) {
      mount.innerHTML = '<div class="vk-note">💡 Авто-лента из ВКонтакте включается так: получите бесплатный ID приложения на <b>vk.com/dev</b> и впишите его в <b>content.js → config.vkAppId</b>. После этого здесь автоматически появятся ваши посты из сообщества. Пока ниже — список из content.js.</div><div id="news-fallback"></div>';
      return renderNews($('#news-fallback', document));
    }
    var s1 = document.createElement('script');
    s1.src = 'https://vk.com/js/api/openapi.js?169';
    s1.onload = function () {
      try {
        window.VK.init({ apiId: C.vkAppId });
        mount.innerHTML = '<div id="vk_groups"></div>';
        window.VK.Widgets.Group('vk_groups', { mode: 4, width: 'auto', height: 800, color1: 'FFFFFF', color2: '0d3b7a', color3: '1a5cb5' }, C.vkGroupId);
      } catch (e) { mount.innerHTML = '<div id="news-fallback"></div>'; renderNews($('#news-fallback', document)); }
    };
    s1.onerror = function () { mount.innerHTML = '<div id="news-fallback"></div>'; renderNews($('#news-fallback', document)); };
    document.body.appendChild(s1);
  }

  /* --- ПОДСТАНОВКА КОНТАКТОВ В ТЕКСТ --- */
  function fillBindings() {
    document.querySelectorAll('[data-bind]').forEach(function (n) {
      var key = n.getAttribute('data-bind');
      if (C[key] != null) {
        if (key === 'phone') { n.textContent = C.phone; n.setAttribute('href', 'tel:' + C.phoneHref); }
        else if (key === 'email') { n.textContent = C.email; n.setAttribute('href', 'mailto:' + C.email); }
        else if (key === 'vkUrl') { n.setAttribute('href', C.vkUrl); }
        else { n.textContent = C[key]; }
      }
    });
  }

  /* --- АНИМАЦИЯ ПОЯВЛЕНИЯ --- */
  function reveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e, i) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* --- ЗАПУСК --- */
  document.addEventListener('DOMContentLoaded', function () {
    buildHeader();
    buildFooter();
    fillBindings();
    renderServices($('#services-grid'), $('#services-grid') && $('#services-grid').getAttribute('data-limit') | 0 || null);
    renderNews($('#news-grid'), $('#news-grid') && $('#news-grid').getAttribute('data-limit') | 0 || null);
    renderPrices($('#price-list'));
    renderDocs($('#doc-list'));
    renderHotlines($('#hotlines'));
    renderFaq($('#faq'));
    renderAbout();
    renderAnticorruption();
    renderPhoneDirectory();
    renderWorkSchedule();
    renderPerson();
    renderFilial();
    renderInfoPage();
    renderArticle();
    renderPreyskurant();
    renderUsluga();
    resolveDocRefs(document);
    renderVk($('#vk-feed'));
    enhanceCollapsibleCards(document);
    enhanceReadMore();
    reveal();
  });

  /* Карточки консультационного центра/пунктов (.kc-cards):
     первая (Мурманск) — главная, всегда раскрыта и выделена; остальные пункты
     ниже под подзаголовком, сворачиваемые (клик по заголовку раскрывает выбранную). */
  function makeCardCollapsible(card) {
    if (card.classList.contains('is-collapsible')) return;
    var h = card.querySelector('.ilc-card-h');
    if (!h) return;
    card.classList.add('is-collapsible');
    h.setAttribute('role', 'button');
    h.setAttribute('tabindex', '0');
    var toggle = function () { card.classList.toggle('open'); };
    h.addEventListener('click', toggle);
    h.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  }
  /* Длинное вступление (ИЛЦ, Орган инспекции): показываем первые `keep` абзацев,
     остальной ТЕКСТ — по кнопке. Блоки «Контакты»/«Документы»/карточки в конце
     остаются видимыми (сворачивается только сплошной текст до них). */
  function makeReadMore(body, keep) {
    if (!body || body.classList.contains('rm-done')) return;
    var kids = [].slice.call(body.children);
    var stopSel = '.ilc-cards, .info-sec, .struct-acc, .doc-list, .link-cards';
    var run = [];
    for (var i = keep; i < kids.length; i++) {
      if (kids[i].matches && kids[i].matches(stopSel)) break;
      run.push(kids[i]);
    }
    if (run.length < 2) return;
    body.classList.add('rm-done');
    var wrap = document.createElement('div');
    wrap.className = 'rm-extra';
    body.insertBefore(wrap, run[0]);
    run.forEach(function (el) { wrap.appendChild(el); });
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'rm-toggle';
    btn.textContent = 'Показать полностью ↓';
    btn.addEventListener('click', function () {
      var open = body.classList.toggle('rm-open');
      btn.textContent = open ? 'Свернуть ↑' : 'Показать полностью ↓';
    });
    body.insertBefore(btn, wrap.nextSibling);
  }
  function enhanceReadMore() {
    var conf = { ilc: 3, inspection: 4 };
    Object.keys(conf).forEach(function (key) {
      makeReadMore($('#page-body[data-page-key="' + key + '"] .article-body'), conf[key]);
    });
  }

  function enhanceCollapsibleCards(root) {
    (root || document).querySelectorAll('.kc-cards').forEach(function (group) {
      if (group.classList.contains('kc-enhanced')) return;
      group.classList.add('kc-enhanced');
      var cards = [].slice.call(group.querySelectorAll('.ilc-card'));
      cards.forEach(function (card, i) {
        if (i === 0) { card.classList.add('kc-main'); return; }  // главный — всегда раскрыт
        makeCardCollapsible(card);
      });
      if (cards.length > 1) {
        var sub = document.createElement('h3');
        sub.className = 'kc-subhead';
        sub.textContent = 'Консультационные пункты в городах области';
        group.insertBefore(sub, cards[1]);
      }
    });
  }
})();
