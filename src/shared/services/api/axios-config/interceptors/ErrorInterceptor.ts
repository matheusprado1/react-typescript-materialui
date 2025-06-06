import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão.'));
  }

  if (error.response?.status === 401) {
    localStorage.removeItem('APP_ACCESS_TOKEN');

    if (error.config?.url?.includes('login')) {
      const errorData = error.response.data as { errors?: { default?: string } };
      alert(errorData.errors?.default || 'Erro desconhecido.');
    } else {
      window.location.reload();
    }
  }

  return Promise.reject(error);
};
