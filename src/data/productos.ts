import { Product } from '../types';

export const productos: Product[] = [
  {
    id: '1',
    nombre: 'Taladro Percutor Inalámbrico 20V',
    marca: 'DeWalt',
    categoria: 'Taladros',
    precio: 245000,
    descripcion: 'Taladro percutor inalámbrico con motor sin escobillas (Brushless) para mayor eficiencia y durabilidad. Ideal para trabajos en concreto, madera y metal.',
    especificaciones: {
      'Voltaje': '20V MAX',
      'Velocidad sin carga': '0-500 / 0-1750 RPM',
      'Impactos por minuto': '0-8500 / 0-29750 IPM',
      'Mandril': '1/2" (13mm)',
      'Peso': '1.2 kg'
    },
    imagenUrl: 'https://picsum.photos/seed/taladro-dewalt/400/400',
    rating: 4.8,
    stock: 15
  },
  {
    id: '2',
    nombre: 'Amoladora Angular 4 1/2" 820W',
    marca: 'SKIL',
    categoria: 'Amoladoras',
    precio: 65000,
    descripcion: 'Amoladora angular compacta y potente, ideal para cortes y desbastes en metal y mampostería. Diseño ergonómico para mayor comodidad.',
    especificaciones: {
      'Potencia': '820W',
      'Diámetro del disco': '4 1/2" (115mm)',
      'Velocidad sin carga': '11000 RPM',
      'Eje': 'M14',
      'Peso': '1.7 kg'
    },
    imagenUrl: 'https://picsum.photos/seed/amoladora-skil/400/400',
    rating: 4.5,
    stock: 22
  },
  {
    id: '3',
    nombre: 'Sierra Circular 7 1/4" 1500W',
    marca: 'Bosch',
    categoria: 'Sierras',
    precio: 185000,
    descripcion: 'Sierra circular profesional con motor de alta potencia. Base de aluminio para cortes precisos y durabilidad extrema.',
    especificaciones: {
      'Potencia': '1500W',
      'Diámetro del disco': '7 1/4" (184mm)',
      'Velocidad sin carga': '6000 RPM',
      'Capacidad de corte a 90°': '64 mm',
      'Peso': '3.7 kg'
    },
    imagenUrl: 'https://picsum.photos/seed/sierra-bosch/400/400',
    rating: 4.9,
    stock: 8
  },
  {
    id: '4',
    nombre: 'Lijadora Roto Orbital 300W',
    marca: 'Total',
    categoria: 'Lijadoras',
    precio: 52000,
    descripcion: 'Lijadora roto orbital con sistema de recolección de polvo integrado. Acabados perfectos en madera y metal sin marcas de remolino.',
    especificaciones: {
      'Potencia': '300W',
      'Diámetro del plato': '5" (125mm)',
      'Velocidad sin carga': '12000 RPM',
      'Órbitas por minuto': '24000 OPM',
      'Peso': '1.4 kg'
    },
    imagenUrl: 'https://picsum.photos/seed/lijadora-total/400/400',
    rating: 4.3,
    stock: 30
  },
  {
    id: '5',
    nombre: 'Rotomartillo SDS Plus 800W',
    marca: 'Bosch',
    categoria: 'Taladros',
    precio: 210000,
    descripcion: 'Rotomartillo electroneumático para perforación rápida en hormigón. 3 modos de operación: perforación, perforación con percusión y cincelado.',
    especificaciones: {
      'Potencia': '800W',
      'Energía de impacto': '2.7 J',
      'Velocidad nominal': '0-900 RPM',
      'Encastre': 'SDS Plus',
      'Peso': '2.8 kg'
    },
    imagenUrl: 'https://picsum.photos/seed/rotomartillo-bosch/400/400',
    rating: 4.7,
    stock: 12
  },
  {
    id: '6',
    nombre: 'Atornillador de Impacto 20V',
    marca: 'DeWalt',
    categoria: 'Herramientas manuales',
    precio: 195000,
    descripcion: 'Atornillador de impacto compacto con 3 luces LED para máxima visibilidad. Diseño ligero para trabajar en espacios reducidos.',
    especificaciones: {
      'Voltaje': '20V MAX',
      'Torque máximo': '170 Nm',
      'Velocidad sin carga': '0-2800 RPM',
      'Impactos por minuto': '0-3200 IPM',
      'Encastre': '1/4" Hexagonal'
    },
    imagenUrl: 'https://picsum.photos/seed/atornillador-dewalt/400/400',
    rating: 4.9,
    stock: 18
  },
  {
    id: '7',
    nombre: 'Sierra Caladora 650W',
    marca: 'SKIL',
    categoria: 'Sierras',
    precio: 78000,
    descripcion: 'Sierra caladora con acción pendular de 4 etapas para cortes más rápidos. Sistema de cambio de hoja sin herramientas.',
    especificaciones: {
      'Potencia': '650W',
      'Velocidad sin carga': '800-3000 CPM',
      'Capacidad de corte en madera': '85 mm',
      'Capacidad de corte en aluminio': '15 mm',
      'Peso': '2.2 kg'
    },
    imagenUrl: 'https://picsum.photos/seed/caladora-skil/400/400',
    rating: 4.4,
    stock: 25
  },
  {
    id: '8',
    nombre: 'Set de Brocas y Puntas 100 piezas',
    marca: 'Total',
    categoria: 'Accesorios',
    precio: 35000,
    descripcion: 'Completo set de accesorios para taladrar y atornillar. Incluye brocas para madera, metal, mampostería y puntas de atornillar.',
    especificaciones: {
      'Cantidad de piezas': '100',
      'Material': 'Acero HSS / Cromo Vanadio',
      'Estuche': 'Plástico de alto impacto',
      'Uso': 'Multiuso'
    },
    imagenUrl: 'https://picsum.photos/seed/set-brocas-total/400/400',
    rating: 4.6,
    stock: 40
  },
  {
    id: '9',
    nombre: 'Lijadora de Banda 900W',
    marca: 'Bosch',
    categoria: 'Lijadoras',
    precio: 165000,
    descripcion: 'Lijadora de banda de alta potencia para remoción rápida de material. Diseño robusto con rodillos de aluminio.',
    especificaciones: {
      'Potencia': '900W',
      'Velocidad de la banda': '200-330 m/min',
      'Superficie de lijado': '75 x 130 mm',
      'Tamaño de la banda': '75 x 533 mm',
      'Peso': '3.4 kg'
    },
    imagenUrl: 'https://picsum.photos/seed/lijadora-banda-bosch/400/400',
    rating: 4.8,
    stock: 10
  },
  {
    id: '10',
    nombre: 'Amoladora Recta 600W',
    marca: 'DeWalt',
    categoria: 'Amoladoras',
    precio: 145000,
    descripcion: 'Amoladora recta para trabajos de desbaste y pulido en lugares de difícil acceso. Cuello largo para mayor alcance.',
    especificaciones: {
      'Potencia': '600W',
      'Velocidad sin carga': '25000 RPM',
      'Diámetro de boquilla': '1/4" (6mm)',
      'Diámetro máximo de muela': '38 mm',
      'Peso': '1.7 kg'
    },
    imagenUrl: 'https://picsum.photos/seed/amoladora-recta-dewalt/400/400',
    rating: 4.7,
    stock: 14
  },
  {
    id: '11',
    nombre: 'Taladro de Banco 350W',
    marca: 'Total',
    categoria: 'Taladros',
    precio: 180000,
    descripcion: 'Taladro de banco con 5 velocidades para perforaciones precisas en madera, metal y plástico. Mesa de trabajo inclinable.',
    especificaciones: {
      'Potencia': '350W',
      'Velocidades': '5 (580-2650 RPM)',
      'Mandril': '13 mm',
      'Recorrido del husillo': '50 mm',
      'Altura total': '580 mm'
    },
    imagenUrl: 'https://picsum.photos/seed/taladro-banco-total/400/400',
    rating: 4.5,
    stock: 5
  },
  {
    id: '12',
    nombre: 'Sierra Ingletadora 10" 1800W',
    marca: 'SKIL',
    categoria: 'Sierras',
    precio: 290000,
    descripcion: 'Sierra ingletadora compuesta para cortes precisos en ángulos. Incluye láser para mayor precisión y bolsa recolectora de polvo.',
    especificaciones: {
      'Potencia': '1800W',
      'Diámetro del disco': '10" (254mm)',
      'Velocidad sin carga': '4500 RPM',
      'Capacidad de corte a 90°': '75 x 130 mm',
      'Peso': '14 kg'
    },
    imagenUrl: 'https://picsum.photos/seed/ingletadora-skil/400/400',
    rating: 4.6,
    stock: 7
  },
  {
    id: '13',
    nombre: 'Medidor Láser 50m',
    marca: 'Bosch',
    categoria: 'Herramientas manuales',
    precio: 115000,
    descripcion: 'Medidor de distancia láser preciso y fácil de usar. Calcula áreas y volúmenes automáticamente. Pantalla iluminada.',
    especificaciones: {
      'Rango de medición': '0.15 - 50 m',
      'Precisión': '± 1.5 mm',
      'Tiempo de medición': '< 0.5 s',
      'Protección': 'IP54',
      'Alimentación': '2 pilas AAA'
    },
    imagenUrl: 'https://picsum.photos/seed/medidor-laser-bosch/400/400',
    rating: 4.9,
    stock: 20
  },
  {
    id: '14',
    nombre: 'Batería 20V 5.0Ah',
    marca: 'DeWalt',
    categoria: 'Accesorios',
    precio: 135000,
    descripcion: 'Batería de iones de litio de alta capacidad para mayor tiempo de funcionamiento. Indicador de carga LED de 3 luces.',
    especificaciones: {
      'Voltaje': '20V MAX',
      'Capacidad': '5.0 Ah',
      'Tipo de celda': 'Ion de litio',
      'Compatibilidad': 'Toda la línea 20V MAX',
      'Peso': '0.6 kg'
    },
    imagenUrl: 'https://picsum.photos/seed/bateria-dewalt/400/400',
    rating: 4.8,
    stock: 35
  },
  {
    id: '15',
    nombre: 'Pistola de Calor 2000W',
    marca: 'Total',
    categoria: 'Herramientas manuales',
    precio: 45000,
    descripcion: 'Pistola de calor con 2 niveles de temperatura y flujo de aire. Ideal para decapar pintura, moldear plásticos y descongelar tuberías.',
    especificaciones: {
      'Potencia': '2000W',
      'Temperatura 1': '350°C',
      'Temperatura 2': '550°C',
      'Flujo de aire': '300 / 500 L/min',
      'Accesorios': 'Incluye 4 boquillas'
    },
    imagenUrl: 'https://picsum.photos/seed/pistola-calor-total/400/400',
    rating: 4.4,
    stock: 28
  },
  {
    id: '16',
    nombre: 'Nivel Láser de Líneas Cruzadas',
    marca: 'SKIL',
    categoria: 'Herramientas manuales',
    precio: 85000,
    descripcion: 'Nivel láser autonivelante que proyecta líneas horizontales y verticales brillantes. Incluye trípode de aluminio.',
    especificaciones: {
      'Alcance': '15 m',
      'Precisión': '± 0.5 mm/m',
      'Rango de autonivelación': '± 4°',
      'Diodo láser': '635 nm, < 1 mW',
      'Clase de láser': '2'
    },
    imagenUrl: 'https://picsum.photos/seed/nivel-laser-skil/400/400',
    rating: 4.5,
    stock: 16
  },
  {
    id: '17',
    nombre: 'Amoladora Angular 9" 2200W',
    marca: 'Bosch',
    categoria: 'Amoladoras',
    precio: 255000,
    descripcion: 'Amoladora angular grande para trabajos pesados de corte y desbaste. Motor Champion de alta potencia y protección contra rearranque.',
    especificaciones: {
      'Potencia': '2200W',
      'Diámetro del disco': '9" (230mm)',
      'Velocidad sin carga': '6500 RPM',
      'Eje': 'M14',
      'Peso': '5.2 kg'
    },
    imagenUrl: 'https://picsum.photos/seed/amoladora-9-bosch/400/400',
    rating: 4.8,
    stock: 9
  },
  {
    id: '18',
    nombre: 'Cepillo Eléctrico 82mm',
    marca: 'DeWalt',
    categoria: 'Herramientas manuales',
    precio: 175000,
    descripcion: 'Cepillo eléctrico con motor potente para cortes suaves y precisos en maderas duras. Ajuste de profundidad calibrado.',
    especificaciones: {
      'Potencia': '600W',
      'Ancho de corte': '82 mm',
      'Profundidad de corte': '0 - 1.5 mm',
      'Velocidad sin carga': '15000 RPM',
      'Peso': '2.8 kg'
    },
    imagenUrl: 'https://picsum.photos/seed/cepillo-dewalt/400/400',
    rating: 4.7,
    stock: 11
  },
  {
    id: '19',
    nombre: 'Disco de Corte Diamantado 4 1/2"',
    marca: 'Total',
    categoria: 'Accesorios',
    precio: 12000,
    descripcion: 'Disco diamantado segmentado para corte rápido en concreto, ladrillo y mampostería. Larga vida útil.',
    especificaciones: {
      'Diámetro': '4 1/2" (115mm)',
      'Eje': '22.2 mm',
      'Tipo': 'Segmentado',
      'Uso': 'Corte en seco',
      'RPM máximo': '13300 RPM'
    },
    imagenUrl: 'https://picsum.photos/seed/disco-diamantado-total/400/400',
    rating: 4.6,
    stock: 100
  },
  {
    id: '20',
    nombre: 'Sierra Sable Inalámbrica 20V',
    marca: 'SKIL',
    categoria: 'Sierras',
    precio: 160000,
    descripcion: 'Sierra sable inalámbrica para cortes rápidos en madera, metal y plástico. Cambio de hoja sin herramientas y zapata pivotante.',
    especificaciones: {
      'Voltaje': '20V MAX',
      'Longitud de carrera': '25 mm',
      'Velocidad sin carga': '0-3000 CPM',
      'Capacidad en madera': '100 mm',
      'Peso (sin batería)': '1.8 kg'
    },
    imagenUrl: 'https://picsum.photos/seed/sierra-sable-skil/400/400',
    rating: 4.5,
    stock: 13
  }
];
