import { useState, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────
const SESSION_KEY = 'dashboard_auth_v1';
// Change this value to set your admin password.
// Or define VITE_DASHBOARD_PASSWORD in a .env file for production.
const DASHBOARD_PASSWORD =
    (typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env?.VITE_DASHBOARD_PASSWORD) ||
    '';

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'oumarousanda.com');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function useAuth() {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem(SESSION_KEY);
        setAuthenticated(stored === 'true');
    }, []);

    const login = async (password: string): Promise<boolean> => {
        const [inputHash, correctHash] = await Promise.all([
            hashPassword(password),
            hashPassword(DASHBOARD_PASSWORD),
        ]);
        const ok = inputHash === correctHash;
        if (ok) sessionStorage.setItem(SESSION_KEY, 'true');
        return ok;
    };

    const logout = () => {
        sessionStorage.removeItem(SESSION_KEY);
        setAuthenticated(false);
    };

    return { authenticated, login, logout, setAuthenticated };
}

// ─── Protected Route ──────────────────────────────────────────────────────────
export function ProtectedRoute() {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored !== 'true') {
        return <Navigate to="/dashboard/login" replace />;
    }
    return <Outlet />;
}

// ─── Login Page ───────────────────────────────────────────────────────────────
export function DashboardLogin() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const navigate = useNavigate();
    const { login, setAuthenticated } = useAuth();

    // Redirect if already authenticated
    useEffect(() => {
        if (sessionStorage.getItem(SESSION_KEY) === 'true') {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic brute-force protection (client-side)
        if (attempts >= 5) {
            setError('Trop de tentatives. Rechargez la page pour réessayer.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const ok = await login(password);
            if (ok) {
                setAuthenticated(true);
                navigate('/dashboard', { replace: true });
            } else {
                setAttempts((prev) => prev + 1);
                setError('Mot de passe incorrect.');
                setPassword('');
            }
        } catch {
            setError('Une erreur est survenue. Réessayez.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 items-center justify-center text-black font-bold text-2xl mb-4">
                        OS
                    </div>
                    <h1 className="text-white font-bold text-2xl">Accès Admin</h1>
                    <p className="text-white/40 text-sm mt-1">Tableau de bord Oumarou Sanda</p>
                </div>

                {/* Card */}
                <div className="bg-[#0d0e14] border border-white/10 rounded-2xl p-8">
                    <div className="flex items-center gap-2 text-amber-400 mb-6">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-medium">Zone sécurisée</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="dashboard-password" className="block text-sm text-white/60 mb-2">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input
                                    id="dashboard-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    autoComplete="current-password"
                                    required
                                    disabled={loading || attempts >= 5}
                                    className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/40 transition-all disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                                {error}
                            </p>
                        )}

                        {attempts > 0 && attempts < 5 && (
                            <p className="text-amber-400/70 text-xs">
                                {5 - attempts} tentative{5 - attempts > 1 ? 's' : ''} restante{5 - attempts > 1 ? 's' : ''}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !password || attempts >= 5}
                            className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : (
                                'Accéder au tableau de bord'
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-white/20 text-xs mt-6">
                    <a href="/" className="hover:text-white/40 transition-colors">
                        ← Retour au site
                    </a>
                </p>
            </div>
        </div>
    );
}
