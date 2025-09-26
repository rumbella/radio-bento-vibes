import React from 'react';
import { events } from '../data/events';

const EventsTicker: React.FC = () => {
  return (
    <div className="events-ticker-container w-full h-64 overflow-hidden relative">
      <div className="events-ticker-content animate-scroll-up">
        {events.map((event) => (
          <div key={event.id} className="flex items-center p-4 border-b border-gray-700">
            <img src={event.imageUrl} alt={event.title} className="w-16 h-16 object-cover mr-4"/>
            <div>
              <h3 className="font-bold text-lg">{event.title}</h3>
              <p className="text-sm">{event.description}</p>
            </div>
          </div>
        ))}
        {/* Duplicate the events to create a seamless loop */}
        {events.map((event) => (
          <div key={`${event.id}-duplicate`} className="flex items-center p-4 border-b border-gray-700">
            <img src={event.imageUrl} alt={event.title} className="w-16 h-16 object-cover mr-4"/>
            <div>
              <h3 className="font-bold text-lg">{event.title}</h3>
              <p className="text-sm">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsTicker;