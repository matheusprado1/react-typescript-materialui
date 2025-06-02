import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface ICityListing {
  id: number;
  name: string;
}

export interface ICityDetail {
  id: number;
  name: string;
}

type ICitiesWithTotalCount = {
  data: ICityListing[];
  totalCount: number;
};

const getAll = async (page = 1, filter = ''): Promise<ICitiesWithTotalCount | Error> => {
  try {
    const relativeUrl = `/cities?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&name_like=${filter}`;

    const { data, headers } = await Api.get(relativeUrl);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMIT_OF_LINES),
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<ICityDetail | Error> => {
  try {
    const { data } = await Api.get(`/cities/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro');
  }
};

const create = async (cityData: Omit<ICityDetail, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<ICityDetail>('/cities', cityData);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro');
  }
};

const updateById = async (id: number, cityData: ICityDetail): Promise<void | Error> => {
  try {
    await Api.put(`/cities/${id}`, cityData);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cities/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro');
  }
};

export const CitiesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
