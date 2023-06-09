import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    response: null,
    error: null,
    isLoading: false
}

export const loginRequest = createAsyncThunk(
    "login/userLogin",
    async (data) => {
        try {
            const response = await fetch('http://localhost:5050/login',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            return responseData
        } catch (error) {
            console.log("Errore: " + error);
            if (error) throw new Error ("Errore durante ricezione dati") 
        }
    }
)

const loginSlice = createSlice({
    name: "login",
    initialState,
    extraReducers: builder => {
        builder
        .addCase(loginRequest.pending, state => {
            state.isLoading = true
        })
        .addCase(loginRequest.fulfilled, (state, action) => {
            state.isLoading = false
            state.response = action.payload.message

            if (action.payload.statusCode === 200){
                localStorage.setItem("loggedIn", JSON.stringify(action.payload))
            }
        })
        .addCase(loginRequest.rejected, state => {
            state.isLoading = false
            state.error ="Errore durante login"
        })
    }
})

export const loginResponse = state => state.loginState.response 
export const loginLoading = state => state.loginState.isLoading 

export default loginSlice.reducer