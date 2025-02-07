import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface Filters {
  city: string;
  date?: string | null; 
  title: string;
  price: string;
  event_type: string;
  accessibility: boolean;
  age_restriction: string;
  available_seats: string;
  district: string;
  duration: string;
  format: string;
  language: string;
  organizer: string;
  popularity: string;
  rating: string;
}

interface Event {
  popularity: number;
  organizer: string;
  rating: number;
  accessibility: boolean;
  language: string;
  available_seats: number;
  format: string;
  duration: number;
  age_restriction: number;
  event_type: string;
  price: number;
  id: string | number;
  title: string;
  description: string;
  city: string;
  district?: string; 
  start_date: string;
  end_date?: string;
  maxPeople: number | undefined,
  people: number;
}

// Определим тип состояния
interface SearchState {
  filters: Filters;
  events: Event[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: SearchState = {
  filters: {
    city: "",
    date: "",
    title: "",
    price: "",
    event_type: "",
    accessibility: false,
    age_restriction: "",
    available_seats: "",
    district: "",
    duration: "",
    format: "",
    language: "",
    organizer: "",
    popularity: "",
    rating: "",
  },
  events: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = { ...initialState.filters };
    },
  },
  
});

export const { updateFilters, resetFilters } = searchSlice.actions;
export default searchSlice.reducer;