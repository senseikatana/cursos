import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Coffee } from 'lucide-react';

export default function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contrasenas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setError('La contrasena debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    const result = await signUp(email, password);
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
          <p className="auth-subtitle">Crea tu cuenta para ordenar</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div>
            <label htmlFor="signup-email" className="auth-label">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label htmlFor="signup-password" className="auth-label">
              Contrasena
            </label>
            <input
              id="signup-password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              placeholder="Minimo 6 caracteres"
            />
          </div>
          <div>
            <label htmlFor="signup-confirm" className="auth-label">
              Confirmar Contrasena
            </label>
            <input
              id="signup-confirm"
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="auth-input"
              placeholder="Repite tu contrasena"
            />
          </div>
          <button type="submit" disabled={loading} className="auth-submit">
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="auth-footer">
          Ya tienes cuenta?{' '}
          <a href="/signin" className="auth-link">
            Iniciar sesion
          </a>
        </p>
      </div>
    </div>
  );
}
