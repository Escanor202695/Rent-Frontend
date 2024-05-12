import { createReducer } from "@reduxjs/toolkit";

const initialState = {
};

export const inputsReducer = createReducer(initialState, {
  propertyPurpose: (state, action) => {
    state.propertyPurpose = action.payload;
  },
  propertyType: (state, action) => {
    state.propertyType = action.payload;
  },
  bed: (state, action) => {
    state.bed = action.payload;
  },
  bath: (state, action) => {
    state.bath = action.payload;
  },
  area: (state, action) => {
    state.area = action.payload || [];
  },
  price: (state, action) => {
    state.price = action.payload ? [...action.payload] : [];
  },
  size: (state, action) => {
    state.size = action.payload ? [...action.payload] : [];
  },
  subArea: (state, action) => {
    state.subArea = action.payload || [];
  },
  condition: (state, action) => {
    state.condition = action.payload;
  },
  isSublet: (state, action) => {
    state.isSublet = action.payload;
  },
  sortBy: (state, action) => {
    state.sortBy = action.payload;
  },
  IsFeatured: (state, action) => {
    state.IsFeatured = action.payload;
  },
});
