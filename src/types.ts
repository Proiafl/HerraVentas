export interface Product {
  id: string;
  nombre: string;
  marca: 'Bosch' | 'DeWalt' | 'Total' | 'SKIL';
  categoria: string;
  precio: number;
  descripcion: string;
  especificaciones: Record<string, string>;
  imagenUrl: string;
  rating: number;
  stock: number;
}

export interface CartItem extends Product {
  cantidad: number;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: 'admin' | 'cliente' | 'client';
}
