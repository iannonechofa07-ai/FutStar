/* FutStar — app del jugador (maqueta). Navegación por #pantalla y estado en memoria. */
(function () {
  var D = window.FS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var byId = {}; D.contenidos.forEach(function (c) { byId[c.id] = c; });
  var sitById = {}; D.situaciones.forEach(function (s) { sitById[s.id] = s; });

  var S = {
    nick: 'Tomi', mod: 'psico', sit: null, video: 'v1', receta: 'r1',
    favs: ['v1', 'r1', 'v14'], vistos: { psico: 8, nutri: 5, fin: 2 },
    topic: 'Club y colegio',
    consultas: [
      { q: '¿Cuánta agua tengo que tomar en un entrenamiento?', est: 'revision', cuando: 'Hace 2 horas' },
      { q: 'El DT no me pone hace tres partidos y no sé si preguntarle por qué.', est: 'resuelta', cuando: 'Ayer',
        r: 'Preguntarle está bien y muestra compromiso. Elegí un momento tranquilo, después del entrenamiento, y preguntá qué podés mejorar. Te dejo el video “Cómo hablar con el DT”.',
        prof: 'Lic. Paula Ferreyra · M.N. 45.218' }
    ],
    stack: []
  };

  /* ---------- Utilidades ---------- */
  function ic(id, cls) { return '<svg class="fs-i ' + (cls || '') + '"><use href="#' + id + '"/></svg>'; }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); }
  function badgeNew(txt) { return '<span class="fs-badge fs-badge--new">' + ic('i-star') + (txt || 'Nuevo este trimestre') + '</span>'; }
  function durTxt(c) { return c.tipo === 'receta' ? c.dur + ' min · Receta' : c.dur + ' min'; }
  function modIcon(c) { return D.modulos[c.mod].icon; }
  function thumb(c, opts) {
    opts = opts || {};
    return '<div class="fs-thumb ph ' + (c.ph || '') + '" data-img="' + c.img + '">' +
      '<svg class="ph-ico"><use href="#' + modIcon(c) + '"/></svg>' +
      (opts.badge && c.nuevo ? badgeNew(opts.short ? 'Nuevo' : null) : '') +
      '<span class="dur">' + (c.tipo === 'receta' ? 'Receta' : c.dur + ' min') + '</span></div>';
  }
  function byline(c) {
    var e = D.especialistas[c.esp];
    return '<span class="fs-byline"><span class="fs-avatar">' + e.ini + '</span><span><span class="who">' + e.nombre + '</span> · ' + e.mat + '</span></span>';
  }
  function bigCard(c, cls) {
    return '<a class="fs-video ' + (cls || '') + '" href="#' + (c.tipo === 'receta' ? 'receta' : 'video') + '" data-open="' + c.id + '">' +
      thumb(c, { badge: true }) + '<span class="title">' + c.t + '</span>' + byline(c) + '</a>';
  }
  function rowCard(c) {
    var e = D.especialistas[c.esp];
    var on = S.favs.indexOf(c.id) > -1;
    return '<div class="row" style="gap:6px;align-items:flex-start">' +
      '<a class="fs-video fs-video--row" style="flex:1;min-width:0" href="#' + (c.tipo === 'receta' ? 'receta' : 'video') + '" data-open="' + c.id + '">' +
      thumb(c) + '<span class="vid-meta">' + (c.nuevo ? badgeNew('Nuevo') : '') + '<span class="title">' + c.t + '</span>' +
      '<span class="fs-caption">' + e.nombre + ' · ' + e.mat + '</span></span></a>' +
      '<button class="save-btn' + (on ? ' is-on' : '') + '" data-fav="' + c.id + '" aria-pressed="' + on + '" aria-label="Guardar ' + esc(c.t) + '">' + ic('i-bookmark') + '</button></div>';
  }
  function photos(root) {
    $$('[data-img]', root).forEach(function (el) {
      if (el.dataset.loaded) return;
      el.dataset.loaded = '1';
      var src = '../assets/img/fotos/' + el.dataset.img + '.jpg';
      var im = new Image();
      im.onload = function () { el.style.setProperty('--img', 'url("' + src + '")'); el.classList.add('has-photo'); };
      im.src = src;
    });
  }
  var tt;
  function toast(msg) {
    var t = $('#toast'); $('span', t).textContent = msg; t.classList.add('is-on');
    clearTimeout(tt); tt = setTimeout(function () { t.classList.remove('is-on'); }, 2200);
  }
  function setNick() {
    $$('[data-nick]').forEach(function (n) { n.textContent = S.nick; });
    $$('[data-ini]').forEach(function (n) { n.textContent = S.nick.charAt(0).toUpperCase(); });
  }

  /* ---------- Render por pantalla ---------- */
  function renderInicio() {
    $('#sit-grid').innerHTML = D.situaciones.map(function (s) {
      return '<button class="fs-sit" data-sit="' + s.id + '"><span class="ico">' + ic(s.icon) + '</span>' + s.label + '</button>';
    }).join('');
    $('#new-row').innerHTML = D.contenidos.filter(function (c) { return c.nuevo; }).map(function (c) { return bigCard(c, 'card-new'); }).join('');
    $('#mod-grid').innerHTML = Object.keys(D.modulos).map(function (k) {
      var m = D.modulos[k];
      return '<button class="mod ' + m.clase + '" data-mod="' + k + '">' + ic(m.icon) + '<span>' + m.nombre + '<small>' + m.total + ' contenidos</small></span></button>';
    }).join('');
  }
  function renderBiblioteca() {
    $('#lib-mods').innerHTML = Object.keys(D.modulos).map(function (k) {
      var m = D.modulos[k];
      return '<button class="mod ' + m.clase + '" data-mod="' + k + '" style="flex-direction:row;align-items:center;min-height:0;gap:14px">' + ic(m.icon) +
        '<span style="flex:1">' + m.nombre + '<small>' + m.total + ' contenidos · ' + m.nuevos + ' nuevos</small></span>' + ic('i-chevron', 'sm') + '</button>';
    }).join('');
    $('#lib-new').innerHTML = D.contenidos.filter(function (c) { return c.nuevo; }).map(function (c) { return bigCard(c, 'card-new'); }).join('');
    $('#lib-specs').innerHTML = Object.keys(D.especialistas).map(function (k) {
      var e = D.especialistas[k];
      return '<div class="spec-mini"><span class="fs-avatar fs-avatar--lg">' + e.ini + '</span><b>' + e.nombre + '</b><span>' + e.rol + '</span><span class="fs-mat" style="align-self:center">' + ic('i-shield') + e.mat + '</span></div>';
    }).join('');
  }
  function renderModulo() {
    var m = D.modulos[S.mod];
    $('#mod-ttl').textContent = m.nombre;
    var head = $('#mod-head');
    head.style.background = m.color;
    head.innerHTML = ic(m.icon) + '<h2 class="fs-h1">' + m.nombre + '</h2><p>' + m.bajada + '</p>' +
      '<span class="counter"><span>' + m.total + ' contenidos</span>' + badgeNew(m.nuevos + ' nuevos este trimestre') + '</span>';
    var items = D.contenidos.filter(function (c) { return c.mod === S.mod; });
    var sits = [];
    items.forEach(function (c) { c.sit.forEach(function (s) { if (sits.indexOf(s) < 0) sits.push(s); }); });
    sits.sort(function (a, b) { return D.situaciones.indexOf(sitById[a]) - D.situaciones.indexOf(sitById[b]); });
    if (S.sit && sits.indexOf(S.sit) < 0) sits.unshift(S.sit);
    $('#mod-filters').innerHTML = '<button class="fs-filter' + (S.sit ? '' : ' is-on') + '" data-filter="">Todos</button>' +
      sits.map(function (s) { return '<button class="fs-filter' + (S.sit === s ? ' is-on' : '') + '" data-filter="' + s + '">' + sitById[s].label + '</button>'; }).join('');
    var list = items.filter(function (c) { return !S.sit || c.sit.indexOf(S.sit) > -1; });
    list.sort(function (a, b) { return (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0); });
    var html = '';
    if (!list.length) {
      html = '<div class="fs-card fs-card--flat fs-empty"><span class="ring">' + ic('i-library', 'lg') + '</span><span class="fs-h3">Todavía no hay contenido de esto en ' + m.nombre + '</span><p>Mirá en los otros módulos o consultá anónimo con un profesional.</p><a class="fs-btn fs-btn--secondary fs-btn--sm" href="#consultar">Consultar anónimo</a></div>';
    } else {
      html = bigCard(list[0]) + list.slice(1).map(rowCard).join('');
    }
    $('#mod-list').innerHTML = html;
    var also = '';
    if (S.sit) {
      Object.keys(D.modulos).forEach(function (k) {
        if (k === S.mod) return;
        var n = D.contenidos.filter(function (c) { return c.mod === k && c.sit.indexOf(S.sit) > -1; }).length;
        if (n) also += '<div class="also"><span>También en <b>' + D.modulos[k].nombre + '</b>: ' + n + (n > 1 ? ' contenidos' : ' contenido') + '</span><button class="fs-btn fs-btn--secondary fs-btn--sm" data-mod="' + k + '" data-keep-sit>Ver</button></div>';
      });
    }
    $('#mod-also').innerHTML = also;
  }

  var timer = null, pos = 0;
  function stopPlayer() { clearInterval(timer); timer = null; $('#player').classList.remove('is-playing'); }
  function fmt(s) { s = Math.round(s); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
  function renderVideo() {
    var c = byId[S.video] || byId.v1;
    stopPlayer(); pos = 0;
    var ph = $('#player-ph');
    ph.className = 'ph ' + (c.ph || ''); ph.dataset.img = c.img; delete ph.dataset.loaded; ph.style.removeProperty('--img');
    ph.innerHTML = '<svg class="ph-ico" style="display:none"><use href="#' + modIcon(c) + '"/></svg>';
    $('#bar').style.width = '0%'; $('#t-now').textContent = '0:00'; $('#t-tot').textContent = c.dur + ':00';
    $('#player-cap').textContent = c.cap || '“' + c.t + '”';
    $('#v-badge').innerHTML = c.nuevo ? badgeNew() : '';
    $('#v-title').textContent = c.t;
    $('#v-meta').textContent = c.dur + ' min · ' + D.modulos[c.mod].nombre;
    syncSave();
    var e = D.especialistas[c.esp];
    $('#v-spec').innerHTML = '<div class="head"><span class="fs-avatar fs-avatar--lg">' + e.ini + '</span><div><div class="name">' + e.nombre + '</div><div class="role">' + e.rol + '</div></div></div>' +
      '<span class="fs-mat">' + ic('i-shield') + e.matLarga + '</span><p class="fs-small fs-muted">' + e.bio + '</p>' +
      '<span class="fs-caption">' + e.n + ' contenidos en la biblioteca</span>';
    var rel = D.contenidos.filter(function (x) { return x.id !== c.id && x.sit.some(function (s) { return c.sit.indexOf(s) > -1; }); });
    if (rel.length < 3) rel = rel.concat(D.contenidos.filter(function (x) { return x.mod === c.mod && x.id !== c.id && rel.indexOf(x) < 0; }));
    $('#v-rel').innerHTML = rel.slice(0, 3).map(rowCard).join('');
  }
  function play() {
    var p = $('#player'), c = byId[S.video] || byId.v1, total = c.dur * 60;
    if (timer) { stopPlayer(); return; }
    p.classList.add('is-playing');
    timer = setInterval(function () {
      pos = Math.min(total, pos + total / 120);
      $('#bar').style.width = (pos / total * 100) + '%';
      $('#t-now').textContent = fmt(pos);
      if (pos >= total) { stopPlayer(); S.vistos[c.mod]++; toast('Video terminado. Lo sumamos a tu progreso.'); }
    }, 200);
  }
  function syncSave() {
    var c = byId[S.video] || byId.v1, on = S.favs.indexOf(c.id) > -1, b = $('#v-save');
    b.classList.toggle('fs-btn--secondary', !on);
    $('span', b).textContent = on ? 'Guardado' : 'Guardar';
    b.setAttribute('aria-pressed', on);
    var r = byId[S.receta] || byId.r1, onr = S.favs.indexOf(r.id) > -1, br = $('#r-save');
    br.classList.toggle('fs-btn--secondary', onr);
    $('span', br).textContent = onr ? 'Receta guardada' : 'Guardar receta';
  }
  function renderReceta() {
    var c = byId[S.receta] || byId.r1, r = D.recetas[c.id], e = D.especialistas[c.esp];
    var ph = $('#r-ph'); ph.dataset.img = c.img; delete ph.dataset.loaded; ph.classList.remove('has-photo'); ph.style.removeProperty('--img');
    $('#r-badge').innerHTML = c.nuevo ? badgeNew() : '';
    $('#r-title').textContent = c.t;
    $('#r-meta').innerHTML = ['<span class="fs-pill fs-pill--plain">' + ic('i-clock', 'sm') + c.dur + ' min</span>', '<span class="fs-pill fs-pill--plain">' + r.porciones + '</span>', '<span class="fs-pill fs-pill--plain">' + r.extra + '</span>'].join('');
    $('#r-ing').innerHTML = r.ing.map(function (i, n) { return '<label><input type="checkbox" id="ing-' + n + '"><span>' + i + '</span></label>'; }).join('');
    $('#r-steps').innerHTML = r.pasos.map(function (p) { return '<li>' + p + '</li>'; }).join('');
    $('#r-when').textContent = r.cuando;
    $('#r-by').innerHTML = '<span class="fs-avatar">' + e.ini + '</span><span><span class="who">' + e.nombre + '</span> · ' + e.rol + ' · ' + e.mat + '</span>';
    syncSave();
  }
  var TOPICS = ['Cuerpo técnico', 'Familia', 'Lesión', 'Comida', 'Plata', 'Club y colegio', 'Otro'];
  function renderConsultar() {
    $('#q-topics').innerHTML = TOPICS.map(function (t) { return '<button type="button" class="fs-filter' + (S.topic === t ? ' is-on' : '') + '" data-topic="' + t + '">' + t + '</button>'; }).join('');
  }
  function renderPerfil() {
    var favs = S.favs.map(function (id) { return byId[id]; });
    $('#fav-n').textContent = favs.length ? favs.length + ' guardados' : '';
    $('#favs').innerHTML = favs.length ? favs.map(function (c) {
      return '<a class="fs-video" style="width:150px" href="#' + (c.tipo === 'receta' ? 'receta' : 'video') + '" data-open="' + c.id + '">' + thumb(c) + '<span class="title" style="font-size:13px;line-height:17px">' + c.t + '</span></a>';
    }).join('') : '<div class="fs-card fs-card--flat fs-empty" style="width:calc(100% - 40px)"><span class="ring">' + ic('i-bookmark', 'lg') + '</span><span class="fs-h3">Todavía no guardaste nada</span><p>Guardá videos y recetas para tenerlos a mano.</p></div>';
    var max = 20;
    $('#progress').innerHTML = Object.keys(D.modulos).map(function (k) {
      var m = D.modulos[k], n = S.vistos[k];
      return '<div class="prog"><div class="row between"><span>' + m.nombre + '</span><span class="fs-muted">' + n + ' vistos</span></div><div class="bar"><i style="width:' + Math.min(100, n / max * 100) + '%;background:' + m.color + '"></i></div></div>';
    }).join('');
    $('#consults').innerHTML = S.consultas.map(function (c, i) {
      var pill = c.est === 'resuelta' ? '<span class="fs-pill fs-pill--ok">Respondida</span>' : '<span class="fs-pill fs-pill--wait">En revisión</span>';
      return '<div class="consult-item"><div class="row between"><span class="fs-caption">' + c.cuando + '</span>' + pill + '</div><p class="q">' + esc(c.q) + '</p>' +
        (c.r ? '<div class="a"><b style="display:block;font-size:13px;margin-bottom:4px">' + c.prof + '</b>' + c.r + '</div>' : '<p class="fs-caption">Un profesional la está revisando.</p>') + '</div>';
    }).join('');
  }

  /* ---------- Asistente ---------- */
  var chatStarted = false;
  function msg(html, me) {
    var el = document.createElement('div');
    el.className = 'msg' + (me ? ' me' : '');
    el.innerHTML = html;
    var chat = $('#chat');
    if (!me) { var w = document.createElement('div'); w.className = 'who-ai'; w.innerHTML = '<span class="ai-dot">' + ic('i-assistant') + '</span>Asistente FutStar'; chat.appendChild(w); }
    chat.appendChild(el); photos(el);
    var sc = $('#screens'); sc.scrollTop = sc.scrollHeight;
  }
  function vidInChat(c) {
    return '<a class="fs-video fs-video--row" href="#' + (c.tipo === 'receta' ? 'receta' : 'video') + '" data-open="' + c.id + '">' + thumb(c) +
      '<span class="vid-meta"><span class="title">' + c.t + '</span><span class="fs-caption">' + durTxt(c) + ' · ' + D.especialistas[c.esp].nombre + ' · ' + D.especialistas[c.esp].mat + '</span></span></a>';
  }
  var helpBtn = '<a class="fs-btn fs-btn--help-soft fs-btn--sm" href="#ayuda">' + ic('i-help', 'sm') + 'Necesito hablar con alguien</a>';
  function startChat() {
    if (chatStarted) return; chatStarted = true;
    msg('Hola, ' + esc(S.nick) + '. Contame qué estás atravesando y te busco algo que te sirva.');
    msg('Mi viejo me grita en cada partido y ya no tengo ganas de jugar.', true);
    msg('<span>Eso pesa. Hay un video sobre presión familiar que te puede servir:</span>' + vidInChat(byId.v3));
    msg('<span>Si preferís hablarlo con una persona, te conecto con el equipo profesional.</span>' + helpBtn);
    quick(['Ver más videos', 'Consultar anónimo', 'Necesito hablar con alguien']);
  }
  function quick(arr) {
    $('#quick').innerHTML = arr.map(function (t) { return '<button type="button" class="fs-filter" data-quick="' + t + '">' + t + '</button>'; }).join('');
  }
  var KEYS = [
    ['riesgo', /(morir|matarme|suicid|no quiero vivir|lastimarme|hacerme da|no le encuentro sentido)/],
    ['lesion', /(lesi|rodilla|tobillo|dolor|desgarr|operaci)/], ['familia', /(viejo|vieja|pap|mam|familia|hermano)/],
    ['dt', /(\bdt\b|t[eé]cnico|entrenador|no me pone|suplente|banco)/], ['rendimiento', /(presi[oó]n|nervio|rendir|partido|ansie|miedo a errar)/],
    ['libre', /(libre|no siguen|me dejan|prueba|quedar afuera)/], ['comer', /(comer|comida|desayun|dieta|peso|almuerz)/],
    ['redes', /(redes|instagram|tiktok|comentario|me bardean)/], ['plata', /(plata|sueldo|dinero|contrato|representante|ahorr)/],
    ['futuro', /(futuro|si no llego|otra cosa|estudiar una carrera|trabajo)/], ['colegio', /(colegio|escuela|examen|prueba de|tarea|estudi)/]
  ];
  function reply(text) {
    var t = text.toLowerCase(), hit = null;
    for (var i = 0; i < KEYS.length; i++) { if (KEYS[i][1].test(t)) { hit = KEYS[i][0]; break; } }
    var chat = $('#chat'), ty = document.createElement('div');
    ty.className = 'msg typing'; ty.innerHTML = '<i></i><i></i><i></i>'; chat.appendChild(ty);
    setTimeout(function () {
      ty.remove();
      if (hit === 'riesgo') {
        msg('<span>Gracias por contármelo. Esto es importante y merece que lo hables con una persona ahora.</span>' +
          '<a class="fs-btn fs-btn--help fs-btn--sm" href="#ayuda">' + ic('i-help', 'sm') + 'Necesito hablar con alguien</a>' +
          '<span class="fs-caption">Si estás en peligro ahora, llamá al 911.</span>');
        quick(['Necesito hablar con alguien']);
      } else if (hit) {
        var c = D.contenidos.filter(function (x) { return x.sit.indexOf(hit) > -1; })[0];
        msg('<span>Te entiendo. Esto te puede servir:</span>' + vidInChat(c));
        msg('<span>Si querés que te responda un profesional, podés consultar anónimo. Nadie del club lo ve.</span><a class="fs-btn fs-btn--secondary fs-btn--sm" href="#consultar">Consultar anónimo</a>');
        quick(['Ver más de esto', 'Necesito hablar con alguien']);
        S.lastSit = hit;
      } else {
        msg('<span>No tengo un video justo para eso, pero un profesional te puede responder.</span><a class="fs-btn fs-btn--secondary fs-btn--sm" href="#consultar">Consultar anónimo</a>' + helpBtn);
        quick(['Ver la biblioteca', 'Necesito hablar con alguien']);
      }
    }, 900);
  }
  function onQuick(t) {
    if (t === 'Necesito hablar con alguien') { go('ayuda'); return; }
    if (t === 'Consultar anónimo') { go('consultar'); return; }
    if (t === 'Ver la biblioteca') { go('biblioteca'); return; }
    msg(esc(t), true);
    if (t === 'Ver más videos') {
      var c1 = byId.v4, c2 = byId.v10;
      setTimeout(function () { msg('<span>Estos dos también hablan de la presión de afuera:</span>' + vidInChat(c1) + vidInChat(c2)); quick(['Consultar anónimo', 'Necesito hablar con alguien']); }, 600);
    } else if (t === 'Ver más de esto') {
      S.sit = S.lastSit || null; S.mod = sitById[S.sit] ? sitById[S.sit].mod : 'psico'; go('modulo');
    }
  }

  /* ---------- Navegación ---------- */
  var ROUTES = {
    bienvenida: 's-bienvenida', apodo: 's-apodo', privacidad: 's-privacidad', inicio: 's-inicio', biblioteca: 's-biblioteca',
    modulo: 's-modulo', psicologia: 's-modulo', nutricion: 's-modulo', finanzas: 's-modulo', video: 's-video', receta: 's-receta',
    consultar: 's-consultar', enviada: 's-enviada', asistente: 's-asistente', ayuda: 's-ayuda', 'ayuda-ok': 's-ayuda-ok',
    perfil: 's-perfil', 'perfil-consultas': 's-perfil'
  };
  var GUIDE = { bienvenida: 1, apodo: 1, privacidad: 2, inicio: 3, biblioteca: 4, modulo: 4, psicologia: 4, nutricion: 4, finanzas: 4, video: 5, receta: 6, consultar: 7, enviada: 7, asistente: 8, ayuda: 9, 'ayuda-ok': 9, perfil: 10, 'perfil-consultas': 10 };
  var current = null;
  function go(r) { if (('#' + r) === location.hash) render(r); else location.hash = r; }
  function render(r) {
    if (!ROUTES[r]) r = 'bienvenida';
    if (r === 'psicologia') { S.mod = 'psico'; S.sit = null; }
    if (r === 'nutricion') { S.mod = 'nutri'; S.sit = null; }
    if (r === 'finanzas') { S.mod = 'fin'; S.sit = null; }
    if (current && current !== r) S.stack.push(current);
    current = r;
    stopPlayer();
    $$('.scr').forEach(function (s) { s.hidden = true; });
    $$('.sheet-back').forEach(function (s) { s.hidden = true; });
    var scr = document.getElementById(ROUTES[r]);
    scr.hidden = false;
    if (r === 'inicio') renderInicio();
    if (r === 'biblioteca') renderBiblioteca();
    if (ROUTES[r] === 's-modulo') renderModulo();
    if (r === 'video') renderVideo();
    if (r === 'receta') renderReceta();
    if (r === 'consultar') renderConsultar();
    if (r === 'asistente') startChat();
    if (ROUTES[r] === 's-perfil') renderPerfil();
    setNick();
    $('#device').classList.toggle('is-dark', scr.hasAttribute('data-dark'));
    $('#tabbar').hidden = scr.dataset.chrome === 'none';
    $$('.fs-tab').forEach(function (t) { t.classList.toggle('is-on', t.dataset.tab === scr.dataset.tab); });
    $$('#guide a').forEach(function (a, i) { a.classList.toggle('is-on', i + 1 === GUIDE[r]); });
    var sc = $('#screens');
    sc.style.scrollBehavior = 'auto';
    sc.scrollTop = r === 'perfil-consultas' ? $('#mis-consultas').offsetTop - 70 : (r === 'asistente' ? sc.scrollHeight : 0);
    sc.style.scrollBehavior = '';
    photos(scr);
  }
  window.addEventListener('hashchange', function () { render(location.hash.slice(1)); });

  /* ---------- Eventos ---------- */
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest('[data-open],[data-sit],[data-mod],[data-filter],[data-fav],[data-topic],[data-quick],[data-back],[data-close],#v-save,#r-save,#play,#play-small,#btn-exception,#logout,#send-ok,#help-go,.sheet-back');
    if (!t) return;
    if (t.classList.contains('sheet-back')) { if (ev.target === t) t.hidden = true; return; }
    if (t.dataset.open) {
      ev.preventDefault();
      var c = byId[t.dataset.open];
      if (c.tipo === 'receta') { S.receta = c.id; go('receta'); } else { S.video = c.id; go('video'); }
      return;
    }
    if (t.dataset.sit) { S.sit = t.dataset.sit; S.mod = sitById[S.sit].mod; go('modulo'); return; }
    if (t.dataset.mod) { if (!t.hasAttribute('data-keep-sit')) S.sit = null; S.mod = t.dataset.mod; go('modulo'); return; }
    if (t.hasAttribute('data-filter')) { S.sit = t.dataset.filter || null; renderModulo(); photos($('#s-modulo')); return; }
    if (t.dataset.fav) {
      var id = t.dataset.fav, i = S.favs.indexOf(id);
      if (i > -1) S.favs.splice(i, 1); else S.favs.push(id);
      t.classList.toggle('is-on', i < 0); t.setAttribute('aria-pressed', i < 0);
      toast(i < 0 ? 'Guardado en favoritos' : 'Quitado de favoritos');
      return;
    }
    if (t.id === 'v-save' || t.id === 'r-save') {
      var cid = t.id === 'v-save' ? S.video : S.receta, j = S.favs.indexOf(cid);
      if (j > -1) S.favs.splice(j, 1); else S.favs.push(cid);
      syncSave(); toast(j < 0 ? 'Guardado en favoritos' : 'Quitado de favoritos');
      return;
    }
    if (t.dataset.topic) { S.topic = S.topic === t.dataset.topic ? null : t.dataset.topic; renderConsultar(); return; }
    if (t.dataset.quick) { onQuick(t.dataset.quick); return; }
    if (t.hasAttribute('data-back')) { var prev = S.stack.pop(); current = null; go(prev || 'inicio'); return; }
    if (t.hasAttribute('data-close')) { var sb = t.closest('.sheet-back'); if (sb) sb.hidden = true; return; }
    if (t.id === 'play' || t.id === 'play-small') { play(); return; }
    if (t.id === 'btn-exception') { $('#sheet-exception').hidden = false; return; }
    if (t.id === 'logout') { $('#sheet-logout').hidden = false; return; }
    if (t.id === 'send-ok') {
      S.consultas.unshift({ q: $('#q').value.trim(), est: 'revision', cuando: 'Recién' });
      $('#q').value = ''; go('enviada');
      return;
    }
    if (t.id === 'help-go') {
      var via = $('input[name="via"]:checked').value;
      $('#ok-via').textContent = via === 'wa' ? 'Un profesional te va a escribir por WhatsApp. Hiciste bien en pedirlo.' : 'Un profesional te va a escribir por chat en la app. Hiciste bien en pedirlo.';
      go('ayuda-ok');
    }
  });
  $$('input[name="via"]').forEach(function (r) { r.addEventListener('change', function () { $('#wa-field').hidden = r.value !== 'wa' || !r.checked; }); });

  $('#f-code').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var inp = $('#code'), v = inp.value.trim().toUpperCase(), hint = $('#code-hint');
    inp.value = v;
    if (!/^[A-Z0-9]{3}-[A-Z0-9]{4}$/.test(v) || /0000$/.test(v)) {
      inp.classList.add('is-error'); hint.classList.add('is-error');
      hint.innerHTML = ic('i-info') + 'Ese código no existe o ya se usó. Pedile uno nuevo a tu coordinador.';
      return;
    }
    inp.classList.remove('is-error'); hint.classList.remove('is-error'); hint.textContent = 'Te lo da tu coordinador.';
    go('apodo');
  });
  $('#f-nick').addEventListener('submit', function (ev) { ev.preventDefault(); S.nick = $('#nick').value.trim() || 'Tomi'; go('privacidad'); });
  $('#f-consult').addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (!$('#q').value.trim()) { $('#q').classList.add('is-error'); $('#q').focus(); return; }
    $('#q').classList.remove('is-error');
    $('#sheet-send').hidden = false;
  });
  $('#f-chat').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var v = $('#chat-in').value.trim(); if (!v) return;
    msg(esc(v), true); $('#chat-in').value = ''; reply(v);
  });

  $('#q').value = 'Me cuesta estudiar los días que entreno doble turno. ¿Cómo me organizo?';
  render(location.hash.slice(1) || 'bienvenida');
})();
