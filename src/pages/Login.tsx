import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, DEMO_CREDENTIALS } from '@/contexts/AuthContext';
import { Package, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login({ email, password });
    
    setIsLoading(false);

    if (result.success) {
      if (email === DEMO_CREDENTIALS.admin.email) {
        navigate('/admin');
      } else {
        navigate('/employee');
      }
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const fillDemoCredentials = (role: 'admin' | 'employee') => {
    setEmail(DEMO_CREDENTIALS[role].email);
    setPassword(DEMO_CREDENTIALS[role].password);
    setError('');
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ background: 'hsl(var(--primary))' }} />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ background: 'hsl(var(--accent))' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
          style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))' }} />
      </div>

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))' }} />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 flex flex-col justify-center px-16 text-primary-foreground">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20 animate-float">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold">IT Asset Manager</h1>
              <p className="text-primary-foreground/60 text-sm tracking-wider uppercase">Enterprise Solution</p>
            </div>
          </div>
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Manage your<br />IT assets with<br />
            <span className="text-primary-foreground/80">confidence</span>
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-md leading-relaxed">
            Track, assign, and maintain your organization's IT equipment 
            efficiently with our comprehensive asset management system.
          </p>
          
          <div className="mt-14 grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10">
              <div className="text-3xl font-extrabold">500+</div>
              <div className="text-sm text-primary-foreground/60 mt-1">Assets Tracked</div>
            </div>
            <div className="p-5 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10">
              <div className="text-3xl font-extrabold">99.9%</div>
              <div className="text-sm text-primary-foreground/60 mt-1">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))' }}>
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-foreground">IT Asset Manager</h1>
              <p className="text-sm text-muted-foreground">Enterprise Solution</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-foreground mb-2">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 glass-card p-4">
            <p className="text-sm font-semibold text-foreground mb-3">Demo Credentials</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="btn-primary flex-1 text-sm py-2"
              >
                Fill Admin
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('employee')}
                className="btn-secondary flex-1 text-sm py-2"
              >
                Fill Employee
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 text-destructive text-sm border border-destructive/20">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full h-12 text-base"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            This is a demo application. Use the buttons above to fill in demo credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
