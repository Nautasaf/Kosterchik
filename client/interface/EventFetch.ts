export interface Event {
    id: number;
    title: string;
    description: string;
    city: string;
    date: string;
    userId: number;
    people: number;
    maxPeople: number | null
    createdAt: string;
    updatedAt: string;
    imageUrl?: string; 
  }
  
  
   export interface EventsState {
    events: Event[];
    loading: boolean;
    error: string | null;
  }

  export interface SearchState {
    events: Event[];
    loading: boolean;
    error: string | null;
    filters: {
      city: string;
      date: string;
      title: string;
    };
  }