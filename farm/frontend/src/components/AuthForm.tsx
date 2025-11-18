import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { authApi } from '../Backend/api/todoApi';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/farmer-portrait.jpg';

interface AuthFormProps {
  onAuthSuccess: (user: any) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const { t } = useLanguage();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    try {
      const response = await authApi.register(email, password, name);
      onAuthSuccess(response.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await authApi.login(email, password);
      onAuthSuccess(response.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={heroImage}
          alt="AgroArmor farmer portal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white space-y-4">
          <h2 className="text-4xl font-bold">{t('authWelcome')}</h2>
          <p className="text-lg text-white/90 max-w-lg">{t('authSubtitle')}</p>
          <div className="grid grid-cols-2 gap-4 text-sm text-white/80">
            <div className="space-y-1">
              <h3 className="font-semibold uppercase tracking-wide">{t('awareness')}</h3>
              <p>- Disease alerts & preventive checklists</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold uppercase tracking-wide">{t('hygieneTest')}</h3>
              <p>- Interactive hygiene assessments</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold uppercase tracking-wide">{t('marketplace')}</h3>
              <p>- Trusted marketplace for farm essentials</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold uppercase tracking-wide">{t('todoList')}</h3>
              <p>- Smart reminders for daily tasks</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-10 py-12">
        <div className="flex justify-end mb-6">
          <LanguageSelector />
        </div>
        <Card className="w-full max-w-lg mx-auto shadow-xl border-border/60">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-3xl font-semibold">{t('authWelcome')}</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              {t('authSubtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mode === 'register' ? (
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="register-name">{t('nameLabel')}</Label>
                  <Input
                    id="register-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Asha Patil"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">{t('emailLabel')}</Label>
                  <Input
                    id="register-email"
                    name="email"
                    type="email"
                    required
                    placeholder="farmer@example.com"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">{t('passwordLabel')}</Label>
                  <Input
                    id="register-password"
                    name="password"
                    type="password"
                    required
                    placeholder="Create a secure password"
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-md p-2">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? `${t('registerTab')}...` : t('createAccountAction')}
                </Button>
                <div className="text-sm text-center text-muted-foreground space-y-2">
                  <p>{t('haveAccount')}</p>
                  <Button
                    type="button"
                    variant="link"
                    className="text-primary"
                    onClick={() => {
                      setError('');
                      setMode('login');
                    }}
                  >
                    {t('loginTab')}
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email">{t('emailLabel')}</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    placeholder="farmer@example.com"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">{t('passwordLabel')}</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-md p-2">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? `${t('loginTab')}...` : t('signInAction')}
                </Button>
                <div className="text-sm text-center text-muted-foreground space-y-2">
                  <p>{t('noAccount')}</p>
                  <Button
                    type="button"
                    variant="link"
                    className="text-primary"
                    onClick={() => {
                      setError('');
                      setMode('register');
                    }}
                  >
                    {t('registerTab')}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
