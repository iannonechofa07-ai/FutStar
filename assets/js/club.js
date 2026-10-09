/* FutStar — panel del club (maqueta). */
(function () {
  var D = window.FS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var role = 'coord', cat = '7ma';
  var fmt = function (n) { return n.toLocaleString('es-AR'); };

  function toast(m) {
    var t = $('#toast'); $('span', t).textContent = m; t.classList.add('is-on');
    clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove('is-on'); }, 2400);
  }

  /* Gráficos */
  function cols() {
    var max = 1200;
    $('#cols').innerHTML = '<div class="y"><span>1.200</span><span>900</span><span>600</span><span>300</span><span>0</span></div>' +
      '<div class="plot">' + D.vistasMes.map(function (m, i) {
        return '<span class="col' + (i === D.vistasMes.length - 1 ? ' is-now' : '') + '" style="--h:' + (m[1] / max * 100) + '%" tabindex="0" aria-label="' + m[0] + ': ' + fmt(m[1]) + ' vistas"><span class="tip">' + m[0] + ' · ' + fmt(m[1]) + ' vistas</span></span>';
      }).join('') + '</div><div class="x">' + D.vistasMes.map(function (m) { return '<span>' + m[0] + '</span>'; }).join('') + '</div>';
    var tmax = D.topContenidos[0][1];
    $('#top-content').innerHTML = D.topContenidos.map(function (c) {
      return '<div class="fs-bar"><span>' + c[0] + '</span><span class="track"><i class="fill" style="width:' + (c[1] / tmax * 100) + '%"></i></span><span class="v">' + c[1] + '</span></div>';
    }).join('');
  }
  var TEMAS = {
    oct: { data: D.temasMes, big: 6, head: 'jugadores consultaron sobre presión familiar este mes', sub: 'Es el tema más consultado de octubre. En septiembre fueron menos de 5.', title: 'Temas consultados en octubre' },
    sep: { data: [['Qué comer', 6], ['Presión por rendir', 5], ['Presión familiar', 4], ['Miedo a quedar libre', 3], ['Lesión', 3], ['Club y colegio', 1]], big: 6,
      head: 'jugadores consultaron sobre qué comer en septiembre', sub: 'Coincidió con el inicio del torneo y los entrenamientos en doble turno.', title: 'Temas consultados en septiembre' }
  };
  function trends() {
    var m = TEMAS[$('#t-mes').value], c = $('#t-cat').value;
    $('#t-body').hidden = !!c; $('#t-empty').hidden = !c;
    if (c) return;
    $('#t-big').textContent = m.big; $('#t-head').textContent = m.head; $('#t-sub').textContent = m.sub; $('#t-title').textContent = m.title;
    var max = m.data[0][1];
    $('#t-bars').innerHTML = m.data.map(function (t) {
      var low = t[1] < 5;
      return '<div class="fs-bar' + (low ? ' is-low' : '') + '"><span>' + t[0] + '</span><span class="track"><i class="fill" style="width:' + (low ? 45 : t[1] / max * 100) + '%"></i></span><span class="v">' + (low ? 'menos de 5' : t[1] + ' jugadores') + '</span></div>';
    }).join('');
  }

  /* Jugadores */
  var PILL = { ok: '<span class="fs-pill fs-pill--ok">Activo</span>', wait: '<span class="fs-pill fs-pill--wait">Pendiente</span>', off: '<span class="fs-pill fs-pill--off">Inactivo</span>' };
  var extra = [];
  function players() {
    $('#cats').innerHTML = D.categorias.map(function (k) {
      return '<button class="cat' + (k.c === cat ? ' is-on' : '') + '" data-cat="' + k.c + '"><b>' + k.c + '</b><span>' + k.act + ' de ' + k.cupo + ' activos</span><span class="m"><i style="width:' + (k.act / k.cupo * 100) + '%"></i></span><span>' + k.pen + ' pendientes</span></button>';
    }).join('');
    var q = $('#p-search').value.trim().toLowerCase(), st = $('#p-state').value;
    var rows = extra.concat(D.jugadores).filter(function (r) {
      return r[1] === cat && (!st || r[3] === st) && (!q || (r[0] + ' ' + r[2]).toLowerCase().indexOf(q) > -1);
    });
    $('#p-count').textContent = rows.length + ' jugadores en ' + cat + ' (muestra)';
    $('#p-rows').innerHTML = rows.map(function (r) {
      var act = r[3] === 'wait' ? '<button class="linkbtn" data-copy="' + r[2] + '"><svg class="fs-i sm"><use href="#i-copy"/></svg>Copiar código</button>'
        : r[3] === 'off' ? '<button class="linkbtn" data-reactivate="' + r[0] + '">Reactivar</button>' : '<span class="fs-caption">—</span>';
      return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td class="mono">' + (r[2] || '<span class="fs-caption">anulado</span>') + '</td><td>' + PILL[r[3]] + '</td><td>' + act + '</td></tr>';
    }).join('') || '<tr><td colspan="5" class="fs-muted">No hay jugadores con ese filtro.</td></tr>';
  }
  function invoices() {
    $('#inv-rows').innerHTML = D.facturas.map(function (f) {
      return '<tr><td>' + f[0] + '</td><td>' + f[1] + '</td><td class="num">$' + fmt(D.club.precio) + '</td><td><span class="fs-pill fs-pill--ok">Pagada</span></td><td><button class="linkbtn" data-invoice="' + f[0] + '"><svg class="fs-i sm"><use href="#i-download"/></svg>Descargar factura</button></td></tr>';
    }).join('');
  }

  /* Navegación y rol */
  var PAGES = ['inicio', 'tendencias', 'reporte', 'jugadores', 'suscripcion'];
  function render() {
    var r = location.hash.slice(1);
    if (PAGES.indexOf(r) < 0) r = role === 'dir' ? 'reporte' : 'inicio';
    if (role === 'dir' && ['reporte', 'suscripcion'].indexOf(r) < 0) r = 'reporte';
    $('#modal-codes').hidden = true;
    PAGES.forEach(function (p) { $('#p-' + p).hidden = p !== r; });
    $$('[data-nav]').forEach(function (a) { a.classList.toggle('is-on', a.dataset.nav === r); });
    window.scrollTo(0, 0);
  }
  function setRole(r) {
    role = r;
    $$('[data-role]').forEach(function (b) { b.classList.toggle('is-on', b.dataset.role === r); });
    $$('[data-coord]').forEach(function (a) { a.classList.toggle('is-locked', r === 'dir'); });
    $$('[data-dir-only]').forEach(function (e) { e.hidden = r !== 'dir'; });
    $('#who-role').innerHTML = r === 'dir' ? '<b>Comisión Directiva</b> · solo lectura' : '<b>Coordinador de inferiores</b>';
    render();
    toast(r === 'dir' ? 'Viendo como directivo: solo reporte y suscripción' : 'Viendo como coordinador');
  }
  window.addEventListener('hashchange', render);

  function code() {
    var A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', s = '';
    for (var i = 0; i < 4; i++) s += A[Math.floor(Math.random() * A.length)];
    return $('#mc-cat').value.toUpperCase().replace('Á', 'A').slice(0, 3) + '-' + s;
  }
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest('[data-role],[data-download],[data-cat],[data-copy],[data-reactivate],[data-invoice],[data-close],#gen-codes,#add-players,#mc-go,#mc-copy,#t-all,.modal-back');
    if (!t) return;
    if (t.classList.contains('modal-back')) { if (ev.target === t) t.hidden = true; return; }
    if (t.dataset.role) { if (t.dataset.role !== role) setRole(t.dataset.role); return; }
    if (t.hasAttribute('data-download')) { toast('Reporte T3 2026 descargado (demo)'); return; }
    if (t.dataset.cat) { cat = t.dataset.cat; players(); return; }
    if (t.dataset.copy) {
      var done = function () { toast('Código ' + t.dataset.copy + ' copiado'); };
      if (navigator.clipboard) navigator.clipboard.writeText(t.dataset.copy).then(done, done); else done();
      return;
    }
    if (t.dataset.reactivate) { toast(t.dataset.reactivate + ' vuelve a estar pendiente con un código nuevo'); return; }
    if (t.dataset.invoice) { toast('Factura ' + t.dataset.invoice + ' descargada (demo)'); return; }
    if (t.hasAttribute('data-close')) { $('#modal-codes').hidden = true; return; }
    if (t.id === 'gen-codes') { $('#mc-step1').hidden = false; $('#mc-step2').hidden = true; $('#modal-codes').hidden = false; return; }
    if (t.id === 'add-players') { toast('Carga de jugadores: nombre y categoría (demo)'); return; }
    if (t.id === 'mc-go') {
      var n = Math.max(1, Math.min(25, +$('#mc-n').value || 1)), list = [];
      for (var i = 0; i < n; i++) list.push(code());
      $('#mc-codes').innerHTML = list.map(function (c) { return '<span>' + c + '</span>'; }).join('');
      list.forEach(function (c, i) { extra.unshift(['Jugador nuevo ' + (i + 1), $('#mc-cat').value, c, 'wait']); });
      cat = $('#mc-cat').value; players();
      $('#mc-step1').hidden = true; $('#mc-step2').hidden = false;
      return;
    }
    if (t.id === 'mc-copy') {
      var txt = $$('#mc-codes span').map(function (s) { return s.textContent; }).join('\n');
      var ok = function () { toast('Códigos copiados'); };
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(ok, ok); else ok();
      return;
    }
    if (t.id === 't-all') { $('#t-cat').value = ''; trends(); }
  });
  $('#t-mes').addEventListener('change', trends);
  $('#t-cat').addEventListener('change', trends);
  $('#p-search').addEventListener('input', players);
  $('#p-state').addEventListener('change', players);

  cols(); trends(); players(); invoices(); render();
})();
