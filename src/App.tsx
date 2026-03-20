/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Producto from './pages/Producto';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import Favoritos from './pages/Favoritos';
import Contacto from './pages/Contacto';
import Agente from './pages/Agente';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="producto/:id" element={<Producto />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Auth />} />
          <Route path="registro" element={<Auth />} />
          <Route path="favoritos" element={<Favoritos />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="agente" element={<Agente />} />
          <Route path="perfil" element={<Auth />} />
        </Route>
      </Routes>
    </Router>
  );
}
