import {createSlice} from "@reduxjs/toolkit";


const profileCreationSlice = createSlice({
    name:"Profile Creation",
    initialState:{
        nickname:"",
        roles:[],
        rankRange:[],
        ageRange:[], //Age range
        playStyle:[],
        location:[],
        // profile -> user submits picture and short biography,
        profile:{
            imgUrl:"",
            bio:"",
        },
        thirdParty:{
            // third party integration
        }
    }
})