/* FutStar — datos de ejemplo de la maqueta. Todos ficticios. */
window.FS = {
  trimestre: 'T4 2026',
  club: { nombre: 'Club Social y Deportivo (ejemplo)', sigla: 'CS', jugadores: 150, activos: 128, categorias: 6, precio: 1125000 },

  situaciones: [
    { id: 'lesion', label: 'Estoy lesionado', icon: 's-lesion', mod: 'psico' },
    { id: 'familia', label: 'Presión de mi familia', icon: 's-familia', mod: 'psico' },
    { id: 'dt', label: 'Tensión con el cuerpo técnico', icon: 's-dt', mod: 'psico' },
    { id: 'rendimiento', label: 'Presión por rendir', icon: 's-rendimiento', mod: 'psico' },
    { id: 'libre', label: 'Miedo a quedar libre', icon: 's-libre', mod: 'psico' },
    { id: 'comer', label: 'Qué comer', icon: 's-comer', mod: 'nutri' },
    { id: 'redes', label: 'Redes y exposición', icon: 's-redes', mod: 'psico' },
    { id: 'plata', label: 'Manejo de la plata', icon: 's-plata', mod: 'fin' },
    { id: 'futuro', label: 'Si el fútbol no se da', icon: 's-futuro', mod: 'fin' },
    { id: 'colegio', label: 'Club y colegio', icon: 's-colegio', mod: 'psico' }
  ],

  modulos: {
    psico: { nombre: 'Psicología deportiva', icon: 'm-psico', clase: 'm-psico', color: '#1B7A4A', total: 38, nuevos: 9, ph: '',
      bajada: 'Videos cortos para lo que te pasa adentro y afuera de la cancha.' },
    nutri: { nombre: 'Nutrición', icon: 'm-nutri', clase: 'm-nutri', color: '#B68824', total: 34, nuevos: 8, ph: 't-gold',
      bajada: 'Recetas y recomendaciones simples para entrenar y estudiar.' },
    fin: { nombre: 'Educación financiera', icon: 'm-finanzas', clase: 'm-fin', color: '#3E6FA8', total: 24, nuevos: 7, ph: 't-blue',
      bajada: 'Plata, contratos y qué hacer si el fútbol no se da.' }
  },

  especialistas: {
    pf: { nombre: 'Lic. Paula Ferreyra', ini: 'PF', rol: 'Psicóloga deportiva', mat: 'M.N. 45.218', matLarga: 'Matrícula Nacional 45.218',
      bio: 'Trabaja hace 12 años con juveniles de clubes del ascenso. Se especializa en lesiones, regreso a la competencia y manejo de la presión.', n: 14 },
    da: { nombre: 'Lic. Diego Acuña', ini: 'DA', rol: 'Psicólogo', mat: 'M.N. 51.907', matLarga: 'Matrícula Nacional 51.907',
      bio: 'Acompaña a deportistas adolescentes y a sus familias. Coordina el protocolo de derivación de FutStar.', n: 11 },
    ms: { nombre: 'Lic. Martín Sosa', ini: 'MS', rol: 'Nutricionista', mat: 'M.N. 7.312', matLarga: 'Matrícula Nacional 7.312',
      bio: 'Nutricionista de inferiores durante 8 años. Arma recetas con ingredientes baratos y fáciles de conseguir.', n: 16 },
    ct: { nombre: 'Lic. Carla Torres', ini: 'CT', rol: 'Nutricionista deportiva', mat: 'M.N. 9.845', matLarga: 'Matrícula Nacional 9.845',
      bio: 'Especialista en alimentación para la recuperación de lesiones y en viandas escolares.', n: 12 },
    jr: { nombre: 'Cdora. Julieta Ramos', ini: 'JR', rol: 'Contadora pública', mat: 'CPCE T° 412 F° 88', matLarga: 'CPCE · Tomo 412 Folio 88',
      bio: 'Da talleres de educación financiera para jóvenes. Explica sueldos, ahorro y primeros contratos sin vueltas.', n: 9 },
    lb: { nombre: 'Lic. Lucas Benítez', ini: 'LB', rol: 'Licenciado en Economía', mat: 'CPCE T° 388 F° 12', matLarga: 'CPCE · Tomo 388 Folio 12',
      bio: 'Orienta a jugadores sobre carreras, estudios y trabajo para cuando el fútbol no es el único camino.', n: 8 }
  },

  contenidos: [
    { id: 'v1', tipo: 'video', mod: 'psico', sit: ['lesion'], t: 'Volver después de una lesión', dur: 7, nuevo: true, esp: 'pf', ph: '',
      img: 'entrenamiento-1', cap: '“La lesión no borra lo que entrenaste. Vamos a ver cómo volver sin apurarte.”' },
    { id: 'v2', tipo: 'video', mod: 'psico', sit: ['lesion'], t: 'El miedo a volver a lesionarte', dur: 9, esp: 'pf', ph: 't-night', img: 'detalle-botines' },
    { id: 'v3', tipo: 'video', mod: 'psico', sit: ['familia'], t: 'Cuando tu familia te presiona', dur: 6, nuevo: true, esp: 'da', ph: '', img: 'tribuna-barrio',
      cap: '“Que tu familia quiera lo mejor para vos no significa que tengas que cargar con todo.”' },
    { id: 'v4', tipo: 'video', mod: 'psico', sit: ['familia'], t: 'Hablar con tu viejo sin pelear', dur: 8, esp: 'da', ph: 't-night', img: 'charla' },
    { id: 'v5', tipo: 'video', mod: 'psico', sit: ['dt'], t: 'Cómo hablar con el DT', dur: 7, esp: 'pf', ph: '', img: 'entrenamiento-2' },
    { id: 'v6', tipo: 'video', mod: 'psico', sit: ['rendimiento'], t: 'La cabeza antes del partido', dur: 10, nuevo: true, esp: 'pf', ph: 't-night', img: 'previa' },
    { id: 'v7', tipo: 'video', mod: 'psico', sit: ['libre'], t: 'Si quedás libre: los primeros días', dur: 8, esp: 'da', ph: '', img: 'cancha-vacia' },
    { id: 'v8', tipo: 'video', mod: 'psico', sit: ['redes'], t: 'Lo que leés de vos en redes', dur: 6, nuevo: true, esp: 'da', ph: 't-night', img: 'celular' },
    { id: 'v9', tipo: 'video', mod: 'psico', sit: ['lesion'], t: 'Qué hacer los días que no entrenás', dur: 5, esp: 'da', ph: '', img: 'entrenamiento-3' },
    { id: 'v10', tipo: 'video', mod: 'psico', sit: ['colegio', 'rendimiento'], t: 'Entrenar y estudiar sin quemarte', dur: 7, esp: 'pf', ph: 't-night', img: 'mochila' },
    { id: 'v11', tipo: 'video', mod: 'nutri', sit: ['comer'], t: 'Qué comer antes y después de entrenar', dur: 8, esp: 'ct', ph: 't-gold', img: 'comida-1' },
    { id: 'v12', tipo: 'video', mod: 'nutri', sit: ['comer', 'plata'], t: 'Comer bien con poca plata', dur: 9, nuevo: true, esp: 'ms', ph: 't-gold', img: 'comida-2' },
    { id: 'v13', tipo: 'video', mod: 'nutri', sit: ['lesion', 'comer'], t: 'Qué comer para recuperarte de una lesión', dur: 6, esp: 'ct', ph: 't-gold', img: 'comida-3' },
    { id: 'r1', tipo: 'receta', mod: 'nutri', sit: ['comer', 'rendimiento'], t: 'Tostadas de avena y banana para antes de entrenar', dur: 10, nuevo: true, esp: 'ms', ph: 't-gold', img: 'receta-tostadas' },
    { id: 'r2', tipo: 'receta', mod: 'nutri', sit: ['comer', 'plata'], t: 'Guiso de lentejas para toda la semana', dur: 40, esp: 'ms', ph: 't-gold', img: 'receta-guiso' },
    { id: 'r3', tipo: 'receta', mod: 'nutri', sit: ['comer', 'colegio'], t: 'Vianda para doble turno', dur: 15, nuevo: true, esp: 'ct', ph: 't-gold', img: 'receta-vianda' },
    { id: 'v14', tipo: 'video', mod: 'fin', sit: ['plata'], t: 'Tu primer sueldo: qué hacer con la plata', dur: 6, nuevo: true, esp: 'jr', ph: 't-blue', img: 'billetera' },
    { id: 'v15', tipo: 'video', mod: 'fin', sit: ['libre', 'futuro'], t: 'Contratos y representantes: lo básico', dur: 9, esp: 'lb', ph: 't-blue', img: 'firma' },
    { id: 'v16', tipo: 'video', mod: 'fin', sit: ['futuro'], t: 'Si el fútbol no se da: otros caminos', dur: 10, nuevo: true, esp: 'lb', ph: 't-blue', img: 'camino' },
    { id: 'v17', tipo: 'video', mod: 'fin', sit: ['colegio', 'futuro'], t: 'Terminar el secundario sin dejar el club', dur: 7, esp: 'lb', ph: 't-blue', img: 'mochila' },
    { id: 'v18', tipo: 'video', mod: 'fin', sit: ['plata'], t: 'Ahorrar aunque sea poco', dur: 5, esp: 'jr', ph: 't-blue', img: 'alcancia' }
  ],

  recetas: {
    r1: { porciones: '2 porciones', extra: 'Sin horno',
      ing: ['2 rebanadas de pan (mejor si es integral)', '1 banana madura', '2 cucharadas de avena', '1 cucharadita de miel', 'Canela (opcional)'],
      pasos: ['Tostá el pan en la sartén o la tostadora.', 'Pisá la banana con un tenedor y untala sobre las tostadas.', 'Arriba poné la avena y un hilo de miel.', 'Si tenés, sumá canela. Listo.'],
      cuando: 'Entre 1 hora y 1 hora y media antes de entrenar, si venís directo del colegio y no almorzaste mucho.' },
    r2: { porciones: '6 porciones', extra: 'Se freeza',
      ing: ['500 g de lentejas', '1 cebolla', '1 morrón', '2 zanahorias', '2 papas', '1 lata de tomate', 'Sal, pimentón y laurel'],
      pasos: ['Remojá las lentejas la noche anterior.', 'Picá y rehogá la cebolla y el morrón.', 'Sumá zanahoria, papa, tomate y las lentejas escurridas.', 'Cubrí con agua y cociná 35 minutos a fuego bajo.', 'Separá en porciones para la semana.'],
      cuando: 'Para la cena después de entrenar: recupera energía y rinde para varios días.' },
    r3: { porciones: '1 vianda', extra: 'Se come frío',
      ing: ['1 taza de arroz cocido', '2 huevos duros', '1 tomate', '1 zanahoria rallada', 'Aceite y sal'],
      pasos: ['Cociná el arroz la noche anterior.', 'Herví los huevos 10 minutos.', 'Mezclá el arroz con la zanahoria y el tomate en cubos.', 'Sumá los huevos y condimentá al momento de comer.'],
      cuando: 'Los días de doble turno: se lleva en un táper y aguanta sin heladera hasta el mediodía.' }
  },

  /* Panel del club */
  categorias: [
    { c: '4ta', cupo: 25, act: 22, pen: 2, ina: 1 },
    { c: '5ta', cupo: 25, act: 21, pen: 3, ina: 1 },
    { c: '6ta', cupo: 25, act: 23, pen: 2, ina: 0 },
    { c: '7ma', cupo: 25, act: 20, pen: 4, ina: 1 },
    { c: '8va', cupo: 25, act: 22, pen: 2, ina: 1 },
    { c: '9na', cupo: 25, act: 20, pen: 4, ina: 1 }
  ],
  jugadores: [
    ['Bautista G.', '7ma', '7MA-4K2Q', 'ok'], ['Lautaro M.', '7ma', '7MA-9PZ3', 'wait'], ['Thiago R.', '7ma', '7MA-2WL8', 'ok'],
    ['Santino P.', '7ma', '', 'off'], ['Benjamín A.', '7ma', '7MA-7HJ5', 'ok'], ['Valentín C.', '7ma', '7MA-3QX9', 'wait'],
    ['Joaquín L.', '7ma', '7MA-8MN2', 'ok'], ['Mateo S.', '7ma', '7MA-5RT6', 'ok'], ['Felipe D.', '7ma', '7MA-1BV4', 'wait'],
    ['Agustín F.', '7ma', '7MA-6CK7', 'ok'], ['Ian V.', '7ma', '7MA-4DW1', 'wait'], ['Tomás N.', '7ma', '7MA-9GF8', 'ok']
  ],
  temasMes: [
    ['Presión familiar', 6], ['Miedo a quedar libre', 5], ['Qué comer', 5],
    ['Presión por rendir', 3], ['Club y colegio', 2], ['Lesión', 2], ['Manejo de la plata', 1]
  ],
  vistasMes: [['May', 550], ['Jun', 660], ['Jul', 700], ['Ago', 840], ['Sep', 950], ['Oct', 1060]],
  topContenidos: [['Volver después de una lesión', 214], ['Cuando tu familia te presiona', 187], ['Comer bien con poca plata', 162], ['Tu primer sueldo: qué hacer con la plata', 121]],
  facturas: [['T4 2026', '01/10/2026', 'ok'], ['T3 2026', '01/07/2026', 'ok'], ['T2 2026', '01/04/2026', 'ok'], ['T1 2026', '02/01/2026', 'ok']],

  /* Back office */
  consultas: [
    { id: 'c1', q: 'Mi viejo me grita en cada partido desde afuera y ya no tengo ganas de jugar. No sé cómo decirle.', club: 'Club Social y Deportivo (ejemplo)', cat: '7ma', tema: 'Presión familiar', hace: 'hace 25 min', est: 'nueva' },
    { id: 'c2', q: 'Me dijeron que a fin de año capaz no siguen conmigo. No duermo pensando en eso.', club: 'Atlético Villa Norte (ejemplo)', cat: '5ta', tema: 'Miedo a quedar libre', hace: 'hace 1 h', est: 'revision', prof: 'Lic. Diego Acuña' },
    { id: 'c3', q: '¿Está bien entrenar sin desayunar si llego tarde del colegio?', club: 'Club Social y Deportivo (ejemplo)', cat: '8va', tema: 'Qué comer', hace: 'hace 3 h', est: 'resuelta', prof: 'Lic. Carla Torres',
      r: 'No es lo ideal. Probá con algo rápido como una banana y un yogur de camino. En la biblioteca tenés “Qué comer antes y después de entrenar”.' },
    { id: 'c4', q: 'Últimamente me siento muy mal y no le encuentro sentido a nada, ni al fútbol.', club: 'Deportivo Las Tunas (ejemplo)', cat: '4ta', tema: 'Otro', hace: 'hace 5 h', est: 'derivada', prof: 'Lic. Diego Acuña' },
    { id: 'c5', q: 'Un representante me quiere hacer firmar algo. ¿Qué tengo que mirar?', club: 'Atlético Villa Norte (ejemplo)', cat: '4ta', tema: 'Manejo de la plata', hace: 'ayer', est: 'revision', prof: 'Lic. Lucas Benítez' },
    { id: 'c6', q: 'El DT no me pone hace tres partidos y no sé si preguntarle por qué.', club: 'Club Social y Deportivo (ejemplo)', cat: '7ma', tema: 'Cuerpo técnico', hace: 'ayer', est: 'resuelta', prof: 'Lic. Paula Ferreyra',
      r: 'Preguntarle está bien y muestra compromiso. Elegí un momento tranquilo, después del entrenamiento, y preguntá qué podés mejorar. Te dejo el video “Cómo hablar con el DT”.' }
  ]
};
