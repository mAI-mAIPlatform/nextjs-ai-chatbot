'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';
import { toast } from '@/components/toast';
import { useSession } from 'next-auth/react';

import { register, type RegisterActionState } from '../actions';

export default function Page() {
  const router = useRouter();
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    {
      status: 'idle',
    },
  );

  const { update: updateSession } = useSession();

  useEffect(() => {
    if (state.status === 'user_exists') {
      toast({ type: 'error', description: 'Un compte avec cet email existe déjà.' });
    } else if (state.status === 'failed') {
      toast({ type: 'error', description: 'Une erreur est survenue.' });
    } else if (state.status === 'invalid_data') {
      toast({
        type: 'error',
        description: 'Les données fournies sont invalides.',
      });
    } else if (state.status === 'success') {
      toast({ type: 'success', description: 'Votre compte a été créé avec succès !' });
      setIsSuccessful(true);
      updateSession();
      router.refresh();
    }
  }, [state, router, updateSession]);

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Créer un compte</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Créez un compte avec votre e-mail et un mot de passe.
          </p>
        </div>

        <AuthForm action={formAction}>
          <SubmitButton isSuccessful={isSuccessful}>{"S'inscrire"}</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {'Vous avez déjà un compte ? '}
            <Link
              href="/login"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Se connecter
            </Link>
            {' à la place.'}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
