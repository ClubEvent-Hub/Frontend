'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/Alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Search, ArrowLeft, MapPin, Clock, Filter, Image } from 'lucide-react';

interface Club {
  id: number;
  name: string;
  email: string;
  description: string;
  clubType?: string;
  clubLocation?: string;
  clubStartDate?: string;
  clubEndDate?: string;
  clubImage?: string;
}

export default function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

 
 useEffect(() => {
  const fetchClubs = async () => {
    try {
      const res = await axios.get('https://sys-multi-agents.onrender.com/auth/clubs');

      // 10 clean fallback images
      const clubImages = [
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1537432376769-00a25b44c2cc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1526378722484-cc6c29e3c52b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1526401485004-2aa7f3b4d91f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      ];

      // ✅ Check if there's a logged-in club with a stored photo
      const storedUser = localStorage.getItem('user');
      let localPhoto: string | null = null;
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser?.photo || parsedUser?.image || parsedUser?.avatar) {
            localPhoto = parsedUser.photo || parsedUser.image || parsedUser.avatar;
          }
        } catch (err) {
          console.warn('Invalid user data in localStorage');
        }
      }

      const enriched = res.data.map((club: Club, index: number) => ({
        id: club.id,
        name: club.name,
        email: club.email,
        description: club.description,
        clubType: ['Technology', 'Web', 'AI', 'Cloud', 'Mobile', 'Data'][index % 6],
        clubLocation: 'University Campus, Main Building',
        clubStartDate: '2025-11-10T10:00:00',
        clubEndDate: '2025-11-10T12:00:00',
        clubImage:
          (localPhoto && storedUser && JSON.parse(storedUser).email === club.email)
            ? localPhoto
            : clubImages[index % clubImages.length],
      }));

      setClubs(enriched);
      setFilteredClubs(enriched);
    } catch (err) {
      setError('Failed to load clubs. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchClubs();
}, []);

  useEffect(() => {
    let filtered = clubs;
    if (searchTerm) {
      filtered = filtered.filter(
        (club: Club) =>
          club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          club.clubLocation?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterType !== 'all') {
      filtered = filtered.filter((club: Club) => club.clubType === filterType);
    }
    setFilteredClubs(filtered);
  }, [searchTerm, filterType, clubs]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      Technology: 'bg-blue-100 text-blue-700 border border-blue-200',
      Cloud: 'bg-green-100 text-green-700 border border-green-200',
      AI: 'bg-purple-100 text-purple-700 border border-purple-200',
      Web: 'bg-orange-100 text-orange-700 border border-orange-200',
      Mobile: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
      Data: 'bg-teal-100 text-teal-700 border border-teal-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  const getIconColor = (type: string) => {
    const colors: { [key: string]: string } = {
      Technology: 'text-blue-500',
      Cloud: 'text-green-500',
      AI: 'text-purple-500',
      Web: 'text-orange-500',
      Mobile: 'text-indigo-500',
      Data: 'text-teal-500',
    };
    return colors[type] || 'text-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading clubs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            {error}
          </Alert>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" className="border-blue-300 hover:bg-blue-50">
                <ArrowLeft className="w-4 h-4 text-blue-600" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-red-600 bg-clip-text text-transparent">
                GDG Clubs
              </h1>
              <p className="text-gray-600 mt-1">Discover developer clubs and tech communities</p>
            </div>
          </div>
        </div>

        <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search clubs by name, description, or location..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-2 focus:border-blue-500 bg-white/90"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="h-12 pl-10 border-2 bg-white/90 focus:border-blue-500">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Cloud">Cloud</SelectItem>
                    <SelectItem value="AI">AI/ML</SelectItem>
                    <SelectItem value="Web">Web Development</SelectItem>
                    <SelectItem value="Mobile">Mobile</SelectItem>
                    <SelectItem value="Data">Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {filteredClubs.length === 0 ? (
          <Card className="text-center py-12 bg-white/80 backdrop-blur-sm">
            <CardContent>
              <p className="text-gray-500 text-lg">No clubs found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club: Club) => (
              <Link key={club.id} href={`/clubs/${club.id}`}>
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg group overflow-hidden bg-white/80 backdrop-blur-sm hover:bg-white/90">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      {club.clubImage ? (
                        <img
                          src={club.clubImage}
                          alt={club.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <Image className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`text-xs px-3 py-1.5 rounded-full font-semibold ${getTypeColor(
                            club.clubType || ''
                          )} backdrop-blur-sm`}
                        >
                          {club.clubType}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {club.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 min-h-[4.5rem]">
                        {club.description}
                      </p>
                      <div className="space-y-2.5 pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Calendar className={`w-4 h-4 flex-shrink-0 ${getIconColor(club.clubType || '')}`} />
                          <span className="truncate">{formatDate(club.clubStartDate || '')}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Clock className={`w-4 h-4 flex-shrink-0 ${getIconColor(club.clubType || '')}`} />
                          <span className="truncate">Until {formatDate(club.clubEndDate || '')}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <MapPin className={`w-4 h-4 flex-shrink-0 ${getIconColor(club.clubType || '')}`} />
                          <span className="truncate">{club.clubLocation}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full group-hover:border-blue-300 transition-all font-semibold bg-white/90 group-hover:bg-blue-50 group-hover:text-blue-700"
                      >
                        View Details →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
