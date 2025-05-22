import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IPersonListing {
  id: number;
  email: string;
  cityId: number;
  firstName: string;
  lastName: string;
}

export interface IPersonDetail {
  id: number;
  email: string;
  cityId: number;
  firstName: string;
  lastName: string;
}

type IPersonsWithTotalCount = {
  data: IPersonListing[];
  totalCount: number;
};

const getAll = async (page = 1, filter = ''): Promise<IPersonsWithTotalCount | Error> => {
  try {
    const relativeUrl = `/persons?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&firstName_like=${filter}`;

    const { data, headers } = await Api.get(relativeUrl);

    if (data) {
      console.log(data);
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

const getById = async (id: number): Promise<IPersonDetail | Error> => {
  try {
    const { data } = await Api.get(`/persons/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro');
  }
};

const create = async (personData: Omit<IPersonDetail, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IPersonDetail>('/persons', personData);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro');
  }
};

const updateById = async (id: number, personData: IPersonDetail): Promise<void | Error> => {
  try {
    await Api.put(`/persons/${id}`, personData);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/persons/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro');
  }
};

export const PersonsService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
