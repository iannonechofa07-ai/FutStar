/* FutStar — set de íconos lineales (24 × 24, trazo 1.75, puntas redondeadas).
   Inyecta un sprite SVG al cargar; se usan con <svg class="fs-i"><use href="#i-home"/></svg>. */
(function () {
  var I = {
    /* Navegación y acciones */
    'i-home': '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-5h4v5"/>',
    'i-library': '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="m10 9 5 3-5 3z"/>',
    'i-assistant': '<path d="M4 5h16v11H9l-5 4z"/><path d="M12 8v4.5M9.75 10.25h4.5"/>',
    'i-consult': '<path d="M4 5h16v11H9l-5 4z"/><rect x="9.25" y="10" width="5.5" height="3.75" rx=".9"/><path d="M10.5 10V8.9a1.5 1.5 0 0 1 3 0V10"/>',
    'i-user': '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    'i-help': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m5.6 5.6 3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/>',
    'i-lock': '<rect x="5" y="10" width="14" height="10" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M12 14v2"/>',
    'i-shield': '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
    'i-eye-off': '<path d="M3 3l18 18"/><path d="M10.6 6.1A9.8 9.8 0 0 1 12 6c5 0 8.5 4.5 9.5 6-.5.8-1.5 2.1-2.9 3.4M6.6 7.6C4.6 9 3.2 10.9 2.5 12c1 1.5 4.5 6 9.5 6 1.6 0 3-.4 4.3-1.1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    'i-bookmark': '<path d="M6 3.5h12V21l-6-4-6 4z"/>',
    'i-play': '<circle cx="12" cy="12" r="9"/><path d="m10 8.5 5.5 3.5-5.5 3.5z"/>',
    'i-send': '<path d="M4 12 20 4l-4 16-4-7z"/><path d="m12 13 8-9"/>',
    'i-check': '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    'i-download': '<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>',
    'i-chevron': '<path d="m9 6 6 6-6 6"/>',
    'i-back': '<path d="m15 6-6 6 6 6"/>',
    'i-clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'i-users': '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c1.8.8 3 2.5 3.5 5.2"/>',
    'i-chart': '<path d="M4 4v16h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
    'i-trend': '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    'i-key': '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l2 2M15 8l2 2"/>',
    'i-card': '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 10h18M7 15h4"/>',
    'i-file': '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    'i-info': '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    'i-alert': '<path d="M12 4 2.5 20h19z"/><path d="M12 10v4M12 17h.01"/>',
    'i-star': '<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/>',
    'i-search': '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    'i-logout': '<path d="M10 4H5v16h5"/><path d="M14 8l4 4-4 4M18 12H9"/>',
    'i-copy': '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
    'i-plus': '<path d="M12 5v14M5 12h14"/>',
    /* Situaciones */
    's-lesion': '<rect x="2.5" y="8" width="19" height="8" rx="4" transform="rotate(-45 12 12)"/><path d="M9.2 9.2l5.6 5.6"/><path d="M10.5 12h.01M12 10.5h.01M13.5 12h.01M12 13.5h.01"/>',
    's-familia': '<circle cx="8" cy="6.5" r="2.8"/><path d="M3.5 20v-4.5a4.5 4.5 0 0 1 9 0V20"/><circle cx="17" cy="10" r="2.2"/><path d="M14 20v-3a3 3 0 0 1 6 0v3"/>',
    's-dt': '<circle cx="9" cy="14.5" r="5"/><path d="M12.6 11 20.5 7.5v4.5h-7"/><path d="M5 5.5l1.5 1.5M9.5 3.5v2.5"/><circle cx="9" cy="14.5" r="1"/>',
    's-rendimiento': '<path d="M3.5 18a8.5 8.5 0 1 1 17 0"/><path d="m12 18 4.5-5.5"/><path d="M6.5 13.5l1 .6M12 7.5v1.2M17.5 13.5l-1 .6"/>',
    's-libre': '<path d="M14 4H6v16h8"/><path d="M11 12h10"/><path d="m17 8 4 4-4 4"/>',
    's-comer': '<path d="M3 11h18c0 5-4 9-9 9s-9-4-9-9z"/><path d="M8.5 7.5c0-1.5 1-2 1-3.5M12.5 7.5c0-1.5 1-2 1-3.5"/>',
    's-redes': '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/><path d="M8.75 10.5c1.8-2.4 4.7-2.4 6.5 0-1.8 2.4-4.7 2.4-6.5 0z"/>',
    's-plata': '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.8"/><path d="M6 9.5v5M18 9.5v5"/>',
    's-futuro': '<path d="M12 3v18"/><path d="M5 5.5h11l3 2.5-3 2.5H5z"/><path d="M19 13H9l-3 2.5L9 18h10z"/>',
    's-colegio': '<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z"/><path d="M12 6.5v13"/>',
    /* Módulos */
    'm-psico': '<path d="M4 4h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M19 9h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1v3l-4-3h-4"/>',
    'm-nutri': '<path d="M12 7.5c-3-2-8-1-8 4.5s4 9 6 9c1 0 1.5-.5 2-.5s1 .5 2 .5c2 0 6-3.5 6-9s-5-6.5-8-4.5z"/><path d="M12 7.5c0-2 1-3.5 3-4.5"/>',
    'm-finanzas': '<ellipse cx="12" cy="6" rx="7" ry="2.5"/><path d="M5 6v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6"/><path d="M5 10v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4"/><path d="M5 14v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4"/>'
  };
  var s = '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">';
  for (var k in I) s += '<symbol id="' + k + '" viewBox="0 0 24 24">' + I[k] + '</symbol>';
  s += '</svg>';
  function inject() { document.body.insertAdjacentHTML('afterbegin', s); }
  if (document.body) inject(); else document.addEventListener('DOMContentLoaded', inject);
  window.FS_ICONS = Object.keys(I);
})();
