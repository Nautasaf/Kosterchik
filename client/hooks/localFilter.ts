
type Event = {
    id: number;
    title: string;
    description: string;
    eventType: string; // вместо eventType
    price: number;
    ageRestriction: number;
    duration: number;
    district: string;
    format: string;
    language: string;
    rating: number;
    popularity: number;
    organizer: string;
    accessibility: boolean;
    date: string;
    availableSeats: number;
  };
  
export const filterEvents = (events: Event[], filters: any) => {

  return events.filter((event) => {
    return (
      (!filters.date || event.date === filters.date) &&
      (!filters.eventType || event.eventType === filters.eventType) &&
      (!filters.price || event.price <= Number(filters.price)) &&
      (!filters.ageRestriction || event.ageRestriction === filters.ageRestriction) &&
      (!filters.duration || event.duration <= Number(filters.duration)) &&
      (!filters.district || event.district.toLowerCase().includes(filters.district.toLowerCase())) &&
      (!filters.format || event.format === filters.format) &&
      (!filters.upcomingDays || new Date(event.date) <= new Date(Date.now() + filters.upcomingDays * 86400000)) &&
      (!filters.language || event.language === filters.language) &&
      (!filters.availableSeats || event.availableSeats >= Number(filters.availableSeats)) &&
      (filters.accessibility === undefined || event.accessibility === filters.accessibility) &&
      (!filters.rating || event.rating >= Number(filters.rating)) &&
      (!filters.organizer || event.organizer.toLowerCase().includes(filters.organizer.toLowerCase())) &&
      (!filters.popularity || event.popularity === filters.popularity)
    );
  });
};