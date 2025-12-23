import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Services/api";

export const subscriptionPlanList = createAsyncThunk("subscription/subscriptionPlanList",
    async(params = {}, { rejectWithValue }) => {
      try {
           const queryParams = new URLSearchParams();
           if (params.search) queryParams.append("search", params.search);
           if (params.status !== undefined && params.status !== "") queryParams.append("status", params.status);
           
           const queryString = queryParams.toString();
           const url = queryString ? `/subscription-plans/list?${queryString}` : "/subscription-plans/list";
           const { data } = await api.get(url);

           return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Something Went Wrong");
        }   
    }
);

export const createCheckoutSession = createAsyncThunk("subscription/createCheckoutSession",
  async ({ planId, price, userId }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/subscription/create-checkout-session", {
        planId,
        price,
        userId,
      });

      return data;
    } catch (err) {

      return rejectWithValue(err.response?.data?.message || "Failed to create session");
    }
  }
);

export const verifyPayment = createAsyncThunk("subscription/verifyPayment",
  async (sessionId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/subscription/verify-payment?sessionId=${sessionId}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to verify payment");
    }
  }
);


const subscriptionPlanSlice = createSlice({
    name: "subscriptionPlan",
    initialState: {
        list: [],
        loading: false,
        error: null, 
        paymentUrl: null,
        paymentLoading: false,
        paymentError: null,
        paymentVerification: null,
        verificationLoading: false,
        verificationError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(subscriptionPlanList.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(subscriptionPlanList.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload.data || [];
        })
        .addCase(subscriptionPlanList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
      // payment ckeckout session
        .addCase(createCheckoutSession.pending, (state) => {
            state.paymentLoading = true;
            state.paymentError = null;
            state.paymentUrl = null;
        })
        .addCase(createCheckoutSession.fulfilled, (state, action) => {
            state.paymentLoading = false;
            state.paymentUrl = action.payload?.data?.url || null;
        })
        .addCase(createCheckoutSession.rejected, (state, action) => {
            state.paymentLoading = false;
            state.paymentError = action.payload;
        })
        // payment verification
        .addCase(verifyPayment.pending, (state) => {
            state.verificationLoading = true;
            state.verificationError = null;
            state.paymentVerification = null;
        })
        .addCase(verifyPayment.fulfilled, (state, action) => {
            state.verificationLoading = false;
            state.paymentVerification = action.payload?.data || null;
        })
        .addCase(verifyPayment.rejected, (state, action) => {
            state.verificationLoading = false;
            state.verificationError = action.payload;
        });
    }
})

export default subscriptionPlanSlice.reducer;