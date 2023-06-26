import { Inter } from 'next/font/google';
import LoginForm from '@/features/auth/components/LoginForm';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen items-center justify-center ${inter.className}`}
    >
      <LoginForm />
    </main>
  );
}
