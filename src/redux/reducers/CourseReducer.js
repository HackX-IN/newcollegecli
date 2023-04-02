import { createReducer } from "@reduxjs/toolkit";


export const courseReducer=createReducer({courses:[],lectures:[]},{
    aIR:(state)=>{
        state.loading=true;

    },
    aIS:(state,action)=>{
        state.loading=false;
        state.courses=action.payload;
       
        
    },
    aIF:(state,action)=>{
        state.loading=false;

        state.error=action.payload;
        
    },

    getCourseR:(state)=>{
        state.loading=true;

    },
    getCourseS:(state,action)=>{
        state.loading=false;
        state.lectures=action.payload;
       
        
    },
    getCourseF:(state,action)=>{
        state.loading=false;

        state.error=action.payload;
        
    },

    AddtoPlaylistRequest:(state)=>{
        state.loading=true;

    },
    AddtoPlaylistSuccees:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
       
        
    },
    AddtoPlaylistFail:(state,action)=>{
        state.loading=false;

        state.error=action.payload;
        
    },
    clearError:(state)=>{
        state.error=null;
    },
    clearMessage:(state)=>{
        state.message=null
    }
  
  
  
})