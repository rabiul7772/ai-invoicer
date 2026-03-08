import { api } from '../../../services/api';

export interface ProfileData {
  _id: string;
  fullName: string;
  email: string;
  businessName: string;
  phoneNumber: string;
  address: string;
  companyLogoUrl: string;
  avatarUrl: string;
}

export const getProfile = async (): Promise<ProfileData> => {
  const { data } = await api.get('/user/profile');
  return data.data; // Backend returns { success: true, data: ... }
};

export const createProfile = async (
  profileData: Omit<ProfileData, '_id'>
): Promise<ProfileData> => {
  const { data } = await api.post('/user/profile', profileData);
  return data.data;
};

export const updateProfile = async (
  profileData: Partial<ProfileData>
): Promise<ProfileData> => {
  const { data } = await api.put('/user/profile', profileData);
  return data.data;
};
