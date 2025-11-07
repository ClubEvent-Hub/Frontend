'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Calendar, LogOut } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { Club, Event as EventType } from '../types';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('userTypeChanged'));
    window.location.href = '/';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clubsRes, eventsRes] = await Promise.all([
          axios.get('https://sys-multi-agents.onrender.com/auth/clubs'),
          axios.get('https://sys-multi-agents.onrender.com/events/'),
        ]);

        const fallbackImages = [
          'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', // teamwork
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80', // tech workspace
          'https://images.unsplash.com/photo-1522205408450-add114ad53fe?auto=format&fit=crop&w=800&q=80', // meeting room
          'https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=800&q=80', // creative desk
          'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80', // hackathon
          'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80', // collaboration
          'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80', // startup team
          'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=80', // students coding
        ];

        const enrichedClubs = clubsRes.data.map((club:Club, index: number) => ({
          id: club.id,
          clubName: club.name || 'Unnamed Club',
          clubDescription: club.description || 'No description available.',
          clubImage: club.image || fallbackImages[index % fallbackImages.length],
        }));

        const enrichedEvents = eventsRes.data.map((event: EventType, index: number) => ({
          id: event.id,
          title: event.title || 'Untitled Event',
          description: event.description || 'No description available.',
          date: event.date || new Date().toISOString(),
          image:
            event.image ||
            [
              'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80', // tech talk
              'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', // teamwork
              'https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=800&q=80', // coding workshop
              'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', // developer meetup
              'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80', // design thinking
            ][index % 5],
          clubName: event.clubName|| 'Unknown Club',
        }));

        setClubs(enrichedClubs);
        setEvents(enrichedEvents);
      } catch (err) {
        console.error('Error fetching clubs or events:', err);
        setError('Failed to load clubs or events.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredEvents = events.filter((e: EventType) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

   if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-transparent">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
                    <p className="mt-6 text-lg text-gray-600 font-medium">Loading events and clubs...</p>
                </div>
            </div>
        );
    }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden bg-filter">
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-80 h-80 left-[10%] top-[60%] bg-blue-400 opacity-20 mix-blend-multiply rounded-full blur-[100px]" />
        <div className="absolute w-80 h-80 right-[10%] top-[30%] bg-indigo-400 opacity-20 mix-blend-multiply rounded-full blur-[100px]" />
        <div className="absolute w-80 h-80 left-[5%] top-[5%] bg-cyan-400 opacity-10 mix-blend-multiply rounded-full blur-[100px]" />
      </div>

      <header className="flex items-center justify-between px-4 md:px-12 py-4 bg-white/80 backdrop-blur-md shadow sticky top-0 z-20">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
            <Image src="/Component.svg" alt="Logo" width={36} height={36} />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-blue-600 text-3xl font-bold">G</span>
            <span className="text-red-600 text-3xl font-bold">C</span>
            <span className="text-emerald-500 text-3xl font-bold">L</span>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className={`mt-auto flex items-center gap-3 p-3 rounded-lg text-[#FF0000] hover:bg-[#FF0000]/10 transition ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </header>

      <section className="pt-10 pb-10 text-center px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Discover Your Club Community
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-6 text-sm md:text-base">
          Explore tech events, join clubs, and connect with developers and innovators.
        </p>

        <div className="flex justify-center items-center w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search informatique events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            title="Search"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-r-md hover:opacity-90 transition"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Upcoming Events</h2>
        {filteredEvents.length === 0 ? (
          <p className="text-gray-500 text-center">No events found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event: EventType) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-blue-100"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg">{event.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    {new Date(event.date).toLocaleDateString()} –{' '}
                    {new Date(event.date).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      href={`/event/${event.id}`}
                      className="text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded hover:opacity-90 transition"
                    >
                      Register
                    </Link>
                    <span className="text-sm text-gray-500">{event.clubName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-20">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Explore Informatique Clubs</h2>
        {clubs.length === 0 ? (
          <p className="text-gray-500 text-center">No clubs found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {clubs.map((club: Club) => (
              <div
                key={club.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-blue-100"
              >
                <img
                  src={club.clubImage}
                  alt={club.clubName}
                  className="w-full h-36 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800">{club.clubName}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {club.clubDescription}
                  </p>
                  <Link
                    href={`/clubs/${club.id}`}
                    className="inline-block mt-3 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded hover:opacity-90 transition"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="text-center text-gray-600 text-sm py-6 bg-white/70 backdrop-blur-md border-t">
        GCL Hub © 2025. All rights reserved.
      </footer>
    </div>
  );
}
