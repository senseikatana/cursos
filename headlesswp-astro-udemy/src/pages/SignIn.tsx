import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Coffee } from 'lucide-react';

export default function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await signIn(email, password);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Coffee className="text-gold" size={32} />
          </div>
          <h1 className="auth-title">CoffeeShop</h1>
          <p className="auth-subtitle">Inicia sesion para ordenar</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div>
            <label htmlFor="signin-email" className="auth-label">
              Email
            </label>
            <input
              id="signin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label htmlFor="signin-password" className="auth-label">
              Contrasena
            </label>
            <input
              id="signin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading} className="auth-submit">
            {loading ? 'Iniciando sesion...' : 'Iniciar Sesion'}
          </button>
        </form>

        <p className="auth-footer">
          No tienes cuenta?{' '}
          <a href="/signup" className="auth-link">
            Crear cuenta
          </a>
        </p>
      </div>
    </div>
  );
}
