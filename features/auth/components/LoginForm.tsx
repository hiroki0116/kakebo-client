import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import {
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firabase';
import { IconDatabase } from '@tabler/icons';
import { ShieldCheckIcon } from '@heroicons/react/solid';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { useForm, yupResolver } from '@mantine/form';
import { AuthForm } from '@/types/auth';
import Layout from '@/components/widgets/Layout';
import {
  Alert,
  Anchor,
  Button,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { saveUserAndToken, setCookie } from '@/lib/authFunctions';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('No email provided.'),
  password: Yup.string()
    .required('No password provided.')
    .min(5, 'Password is too short - should be 5 chars minimum.'),
});

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');
  const form = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isRegistered) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
          email: form.values.email,
          password: form.values.password,
        });
      }

      await setPersistence(auth, browserLocalPersistence);
      const { user } = await signInWithEmailAndPassword(
        auth,
        form.values.email,
        form.values.password,
      );
      const idTokenRes = await user.getIdTokenResult();
      setCookie('token', idTokenRes.token);
      setError('');
      form.reset();
      router.push('/dashboard');
    } catch (e: any) {
      if (e.code === 'auth/user-not-found') {
        setError(
          'We cannot find an account associated with this email. Please register.',
        );
        return;
      }
      if (e.code === 'auth/too-many-requests') {
        setError(e.message);
        return;
      }
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout title="Auth">
      <h1 className="font-bold">Ka Ke-Bo</h1>
      <ShieldCheckIcon className="h-16 w-16 text-blue-500" />
      {error && (
        <Alert
          my="md"
          variant="filled"
          icon={<ExclamationCircleIcon />}
          color="red"
          radius="md"
        >
          {error}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          mt="md"
          id="email"
          label="Email*"
          placeholder="example@gmail.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          mt="md"
          id="password"
          placeholder="Password"
          {...form.getInputProps('password')}
          description="Must be min 5 char"
          label="Password*"
        />
        <Group mt="xl" position="apart">
          <Anchor
            component="button"
            type="button"
            size="xs"
            className="text-gray-300"
            onClick={() => {
              setIsRegistered(!isRegistered);
              setError('');
            }}
          >
            {isRegistered ? 'Have an account? Login' : "Don't have an account"}
          </Anchor>
          <Button
            leftIcon={<IconDatabase size={14} />}
            type="submit"
            loading={loading}
            color="cyan"
          >
            {isRegistered ? 'Register' : 'Login'}
          </Button>
        </Group>
      </form>
    </Layout>
  );
}
