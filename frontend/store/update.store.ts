import api from "@/utils/Axios";
import axios from "axios";
import { create } from "zustand";
import authStore from "./auth.store";

type UpdateStateStore = updateStoreState & updateStoreActions;

const updateStore = create<UpdateStateStore>((set, get) => ({
  formValue: null,
  isUpdating: false,
  isUploading: false,
  updateProfile: async (formValue) => {
    const { user } = authStore.getState();
    set({ isUpdating: true });
    try {
      if (!user) {
        return;
      }
      const response = await api.post(`/api/user/update`, formValue, {
        params: { userId: user.id },
      });

      console.log(response.data);

      set({ isUpdating: false, formValue: null });
    } catch (error) {
      console.log("An error while updating the user profile:", error);
      set({ isUpdating: false, formValue: null });
    }
  },
  uploadImage: async (file: File) => {
    set({ isUploading: true });
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      );

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { formValue: CurrentFormValue } = get();

      console.log(response.data.secure_url);
      set({
        isUploading: false,
        formValue: {
          username: CurrentFormValue?.username,
          email: CurrentFormValue?.email,
          password: CurrentFormValue?.password || "",
          profilePicture: response.data.secure_url,
        },
      });
    } catch (error) {
      console.log(error);
      set({ isUploading: false });
    }
  },
}));

export default updateStore;
