'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, MapPin, Users, Mail, Calendar, Clock } from 'lucide-react';

// 🧩 20 Example Clubs
const clubsData = [
  {
    id: 0,
    name: 'Android Developers Club',
    description: 'Learn Android app development with Kotlin and Compose.',
    type: 'Mobile',
    location: 'Tech Building 101',
    university: 'Tech University',
    email: 'android@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1599305445671-1ff7f74c27c8?w=800',
  },
  {
    id: 1,
    name: 'AI & Machine Learning Club',
    description: 'Explore the world of AI, deep learning, and data science.',
    type: 'AI',
    location: 'Innovation Center, Room 204',
    university: 'Tech University',
    email: 'ai@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
  },
  {
    id: 21,
    name: 'Cloud Computing Club',
    description: 'Learn about AWS, Azure, and cloud infrastructure.',
    type: 'Cloud',
    location: 'Research Lab 3',
    university: 'Tech University',
    email: 'cloud@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
  },
  {
    id: 6,
    name: 'Cybersecurity Club',
    description: 'Ethical hacking, CTF challenges, and digital forensics.',
    type: 'Security',
    location: 'Lab 7, CS Department',
    university: 'Tech University',
    email: 'cyber@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800',
  },
  {
    id: 5,
    name: 'Data Science Club',
    description: 'Dive into data analysis, visualization, and statistics.',
    type: 'Data',
    location: 'Analytics Center',
    university: 'Tech University',
    email: 'data@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
  },
  {
    id: 2,
    name: 'Web Developers Club',
    description: 'Master React, Next.js, and modern web technologies.',
    type: 'Web',
    location: 'Lab 5, Engineering Hall',
    university: 'Tech University',
    email: 'web@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?w=800',
  },
  {
    id: 7,
    name: 'AR/VR Club',
    description: 'Build immersive AR/VR experiences with Unity.',
    type: 'Innovation',
    location: 'Design Studio 2',
    university: 'Tech University',
    email: 'arvr@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=800',
  },
  {
    id: 8,
    name: 'Open Source Club',
    description: 'Collaborate on real open-source projects.',
    type: 'Community',
    location: 'Library Hall 1',
    university: 'Tech University',
    email: 'oss@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
  },
  {
    id: 9,
    name: 'UI/UX Design Club',
    description: 'Learn design thinking, Figma, and UX principles.',
    type: 'Design',
    location: 'Art Studio 4',
    university: 'Tech University',
    email: 'design@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800',
  },
  {
    id: 10,
    name: 'Robotics Club',
    description: 'Build and program robots using Arduino and Raspberry Pi.',
    type: 'Engineering',
    location: 'Robotics Lab',
    university: 'Tech University',
    email: 'robotics@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc1?w=800',
  },
  {
    id: 11,
    name: 'Blockchain Club',
    description: 'Understand blockchain and build decentralized apps.',
    type: 'FinTech',
    location: 'Finance Innovation Hub',
    university: 'Tech University',
    email: 'blockchain@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1620729842236-5b1de9cf8b25?w=800',
  },
  {
    id: 12,
    name: 'Game Development Club',
    description: 'Develop games using Unity and Unreal Engine.',
    type: 'Entertainment',
    location: 'Lab 12, Game Studio',
    university: 'Tech University',
    email: 'games@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=800',
  },
  {
    id: 3,
    name: 'Entrepreneurship Club',
    description: 'Build startups, pitch ideas, and learn business fundamentals.',
    type: 'Business',
    location: 'Innovation Center, Hall 5',
    university: 'Tech University',
    email: 'startup@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
  },
  {
    id: 14,
    name: 'AI for Good Club',
    description: 'Use artificial intelligence to solve social problems.',
    type: 'AI',
    location: 'Lab 3, Innovation Hub',
    university: 'Tech University',
    email: 'aiforgood@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
  },
  {
    id: 15,
    name: 'Women in Tech Club',
    description: 'Empowering women in STEM through mentorship and events.',
    type: 'Community',
    location: 'Room 108, Tech Hall',
    university: 'Tech University',
    email: 'wit@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
  },
  {
    id: 16,
    name: 'DevOps Club',
    description: 'Learn CI/CD, Docker, Kubernetes, and automation tools.',
    type: 'Cloud',
    location: 'Cloud Lab 2',
    university: 'Tech University',
    email: 'devops@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800',
  },
  {
    id: 17,
    name: 'Ethical Hacking Club',
    description: 'Learn penetration testing and cybersecurity fundamentals.',
    type: 'Security',
    location: 'Cyber Lab 4',
    university: 'Tech University',
    email: 'hacking@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
  },
  {
    id: 18,
    name: 'IoT Club',
    description: 'Connect the physical world using IoT sensors and networks.',
    type: 'Technology',
    location: 'Engineering Lab 1',
    university: 'Tech University',
    email: 'iot@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
  },
  {
    id: 19,
    name: 'Quantum Computing Club',
    description: 'Dive into quantum algorithms and Qiskit programming.',
    type: 'Research',
    location: 'Physics Building, Room 7',
    university: 'Tech University',
    email: 'quantum@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1618588507085-c79565432917?w=800',
  },
  {
    id: 20,
    name: 'Software Engineering Club',
    description: 'Best practices in coding, architecture, and teamwork.',
    type: 'Technology',
    location: 'CS Dept, Room 201',
    university: 'Tech University',
    email: 'se@techuniv.edu',
    image: 'https://images.unsplash.com/photo-1581092334573-0114c7cc273a?w=800',
  },
];

export default function ClubDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [club, setClub] = useState(null);

  useEffect(() => {
    const found = clubsData.find((c) => c.id === Number(id));
    setTimeout(() => {
    setClub(found || null);
      
    }, 0);
  }, [id]);

  if (!club) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-gray-600 mb-4">Club not found.</p>
        <Button onClick={() => router.push('/clubs')}>Back to Clubs</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/clubs">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{club.name}</h1>
        </div>

        <Card className="overflow-hidden shadow-xl">
          <img
            src={club.image}
            alt={club.name}
            className="w-full h-60 object-cover"
          />
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">{club.description}</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {club.location}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" /> {club.university}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> {club.email}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="about" className="w-full">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>About the Club</CardTitle>
                <CardDescription>{club.type} | {club.university}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  {club.description} Our club organizes weekly sessions, workshops, and hackathons to help members learn and grow.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2, 3].map((e) => (
                <Card key={e}>
                  <CardHeader>
                    <CardTitle>{club.type} Workshop #{e}</CardTitle>
                    <CardDescription>
                      {new Date(2025, 10, e + 5).toDateString()} | Main Hall
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Join us to explore {club.type?.toLowerCase()} with hands-on learning and teamwork!</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="posts" className="mt-4">
            {[1, 2].map((p) => (
              <Card key={p}>
                <CardHeader>
                  <CardTitle>Post #{p}: Exciting Update</CardTitle>
                  <CardDescription>Published recently</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    {club.name} just hosted another successful event! Stay tuned for our next meetup.
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
