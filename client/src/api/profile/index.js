import { apiClient } from "../apiClient";
import { toast } from "react-toastify";

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
    if (response.status === 200) {
      toast.success("Profile updated successfully");
    } else {
      toast.error("Failed to update profile");
    }
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
    if (response.status === 200) {
      toast.success("Password changed successfully");
    } else {
      toast.error("Failed to change password");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useUpdateProfilePhoto = async (formData) => {
  try {
    const response = await apiClient.post("/updateProfilePhoto/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      toast.success("Profile photo updated successfully");
    } else {
      toast.error("Failed to update profile photo");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
