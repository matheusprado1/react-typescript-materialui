import { AxiosError } from 'axios';

import { Api } from '../axios-config';

interface IAuth {
  accessToken: string;
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    const { data } = await Api().post('/login', { email, password: password });

    if (data) {
      return data;
    }

    return new Error('Erro no login.');
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof AxiosError) {
      return new Error(error.response?.data.errors.message || 'Erro no login.');
    } else {
      return new Error('Erro no login.');
    }
  }
};

export const AuthService = {
  auth,
};
