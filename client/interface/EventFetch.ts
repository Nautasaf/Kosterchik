export interface Event {
  id: number;
  title: string;
  description: string;
  city: string;
  start_date: string;
  end_date: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  background?: string;
  requirements?: string;
  price?: number;
  event_type?: string;
  age_restriction?: number;
  duration?: number;
  district?: string;
  format?: string;
  available_seats?: number;
  language?: string;
  accessibility?: boolean;
  rating?: number;
  organizer?: string;
  popularity?: number;
}
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