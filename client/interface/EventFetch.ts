export interface Event {
  markerIcon: any;
  longitude: any;
  latitude: any;
  id: number ;
  title: string;
  description: string;
  city: string;
  date?: string;
  start_date: string;
  end_date: string;
  userId: number;
  maxPeople: number | undefined
  createdAt?: string;
  updatedAt?: string;
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
  category:string;
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

  export interface Favorite {
    id: number;
    userId: number;
    eventId: number;
    createdAt: string;
    updatedAt: string;
  }

  export interface IEventUser {
    id: number;
    userId: number;
    eventId: number;
    createdAt: string;
    updatedAt: string;
  }