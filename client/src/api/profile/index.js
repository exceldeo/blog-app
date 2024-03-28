import { apiClient } from "../apiClient";

export const getProfile = async () => {
  try {
    const response = await apiClient.get("/getProfile/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useUpdateProfile = async (profile) => {
  const data = {
    first_name: profile.fname,
    last_name: profile.lname,
    photo: profile.photo,
  };
  try {
    const response = await apiClient.post("/updateProfile/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (password) => {
  const data = {
    old_password: password.oldPassword,
    new_password: password.newPassword,
    confirm_password: password.confirmPassword,
  };
  try {
    const response = await apiClient.post("/changePassword/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useUpdateProfilePhoto = async (formData) => {
  console.log(formData);
  try {
    const response = await apiClient.post("/updateProfilePhoto/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
