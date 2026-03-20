import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, UserPlus } from 'lucide-react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useStore } from '../store/useStore';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser, user } = useStore();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create user document
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'client'
        });
      }

      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: userSnap.exists() ? userSnap.data().role : 'client'
      });

      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al iniciar sesión con Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/');
  };

  if (user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
          <h2 className="text-2xl font-black text-[#1B2A4A] mb-2">¡Hola, {user.displayName}!</h2>
          <p className="text-[#5C6B7A] mb-8">{user.email}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-200px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="font-black text-3xl tracking-tighter mb-2">
            <span className="text-[#1B2A4A]">HERRA</span>
            <span className="text-[#1E5FA6]">VENTAS</span>
          </div>
          <p className="text-[#5C6B7A]">Compartimos tu pasión</p>
        </div>

        <h2 className="text-2xl font-black text-[#1B2A4A] mb-6 text-center">
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium mb-6 text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-white border-2 border-gray-200 text-[#1B2A4A] font-bold py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3 mb-6"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          {isLoading ? 'Cargando...' : 'Continuar con Google'}
        </button>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-gray-200 w-full"></div>
          <span className="bg-white px-4 text-sm text-gray-400 absolute">o ingresá con tu email</span>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Por favor, usá el inicio de sesión con Google por ahora.'); }}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Nombre completo</label>
              <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="Juan Pérez" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Email</label>
            <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="ejemplo@correo.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Contraseña</label>
            <input type="password" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="••••••••" />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1E5FA6] text-white font-bold py-4 rounded-xl hover:bg-[#1B2A4A] transition-colors shadow-lg shadow-[#1E5FA6]/30 flex items-center justify-center gap-2 mt-6"
          >
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            {isLogin ? 'Ingresar' : 'Registrarme'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#1E5FA6] font-bold hover:underline"
          >
            {isLogin ? '¿No tenés cuenta? Registrate' : '¿Ya tenés cuenta? Iniciá sesión'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
