import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { GraduationCap, Lock, Mail, ArrowRight, ShieldCheck, Key } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const AdminLogin = () => {
  const { login, loading } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/admin22/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await login(email, password);
    if (res.success) {
      addToast(`Welcome back, ${res.user.name}!`, 'success');
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Invalid credentials. Please verify your email and password.');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@xyzschool.edu');
    setPassword('Admin@123456');
    setError('');
  };

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-brand-border shadow-elevated p-8 sm:p-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-brand-navy flex items-center justify-center text-white mx-auto shadow-md">
            <GraduationCap className="w-9 h-9 text-brand-cyan" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-brand-navy font-display">
              XYZ School Portal
            </h1>
            <p className="text-xs text-brand-muted mt-1 uppercase font-semibold tracking-wider">
              Administrative &amp; Faculty Login
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-fade-in">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@xyzschool.edu"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-border bg-slate-50/50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
              Secret Key / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-border bg-slate-50/50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Quick-Fill Helper */}
        <div className="p-4 rounded-2xl bg-brand-light border border-brand-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-brand-navy flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-brand-blue" />
              <span>Default Administrator Account</span>
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-bold text-brand-blue hover:underline cursor-pointer"
            >
              Fill Demo Credentials
            </button>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
            Email: admin@xyzschool.edu<br />
            Password: Admin@123456
          </p>
        </div>

        {/* Public Website Return */}
        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-slate-500 hover:text-brand-blue font-semibold">
            ← Return to Public School Website
          </Link>
        </div>
      </div>
    </div>
  );
};
