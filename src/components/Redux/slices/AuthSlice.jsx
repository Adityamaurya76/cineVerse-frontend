import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Services/api";

export const loginUser = createAsyncThunk("auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/user/login", formData);
      
      return data;
    } catch (error) {
        return rejectWithValue(error.response.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk("auth/registerUser",
  async (formData, { rejectWithValue }) => {
      try {
        const { data } = await api.post("/auth/register", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
        });
        
        return data;
      } catch (error) {
          return rejectWithValue(error.response?.data?.message || "Registration failed");
      }
  }
);

export const userLogout = createAsyncThunk("auth/userLogout", 
  async(_, {rejectWithValue}) => {
    try {
      const { data } = await api.post("/auth/logout");

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const userDetails = createAsyncThunk("auth/userDetails",
  async(id, {rejectWithValue}) => {
    try{
      const { data } = await api.get(`user/details/${id}`)

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "User Details fetch failed");
    }
  }
);

export const userUpdate = createAsyncThunk("auth/userUpdate", 
  async({id, formData}, {rejectWithValue}) => {
    try{
      const { data } = await api.put(`user/update/${id}`, formData)
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to Update User Data");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
    initialState: {
        user: localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")) : null,
        isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
        selectedPlan: localStorage.getItem("selectedPlan") ? JSON.parse(localStorage.getItem("selectedPlan")) : null,
        isSubscribed: localStorage.getItem("isSubscribed") === "true",
        isOnboarded: localStorage.getItem("isOnboarded") === "true",
        loading: false,
        error: null, 
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("authUser");
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("selectedPlan");
            localStorage.removeItem("isSubscribed");
            localStorage.removeItem("isOnboarded");
            localStorage.removeItem("token");
            state.user = null;
            state.isAuthenticated = false;
            state.selectedPlan = null;
            state.isSubscribed = false;
            state.isOnboarded = false;
        },
        setSelectedPlan: (state, action) => {
            state.selectedPlan = action.payload;
            localStorage.setItem("selectedPlan", JSON.stringify(action.payload));
            if (action.payload?.id) {
                localStorage.setItem("planId", action.payload.id);
            }
        },
        setSubscribed: (state, action) => {
            state.isSubscribed = action.payload;
            localStorage.setItem("isSubscribed", action.payload.toString());
        },
        setOnboarded: (state, action) => {
            state.isOnboarded = action.payload;
            localStorage.setItem("isOnboarded", action.payload.toString());
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            const userData = action.payload?.user || action.payload?.data?.user || action.payload;
            const accessToken = action.payload?.data?.accessToken || action.payload?.accessToken || action.payload?.token;
    
            state.user = userData;
            state.isAuthenticated = true;
            
            localStorage.setItem("isAuthenticated", "true");
            
            if (userData && typeof userData === 'object') {
                localStorage.setItem("authUser", JSON.stringify(userData));
            }
            
            if (accessToken) {
                localStorage.setItem("token", accessToken);
            }
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const userData = action.payload?.user || action.payload?.data?.user || action.payload;
        const accessToken = action.payload?.data?.accessToken || action.payload?.accessToken || action.payload?.token;
        state.user = userData;
        state.isAuthenticated = true;
        
        // Always set isAuthenticated when login succeeds
        localStorage.setItem("isAuthenticated", "true");
        
        if (userData && typeof userData === 'object') {
          localStorage.setItem("authUser", JSON.stringify(userData));
        }
        
        if (accessToken) {
          localStorage.setItem("token", accessToken);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("authUser");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("authUser");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
      })
      .addCase(userDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        state.user =
          payload?.data ||
          payload?.user ||
          payload;
        if (state.user && typeof state.user === "object") {
          localStorage.setItem("authUser", JSON.stringify(state.user));
        }
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload?.user || action.payload;
        state.user = updatedUser;
        if (updatedUser) {
          localStorage.setItem("authUser", JSON.stringify(updatedUser));
        }
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
});

export const { logout, setSelectedPlan, setSubscribed, setOnboarded } = authSlice.actions;
export default authSlice.reducer;

