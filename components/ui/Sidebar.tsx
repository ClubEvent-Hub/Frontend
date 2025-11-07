'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  Calendar,
  FileText,
  LogOut,
  Menu,
  X,
  Building2,
  User2,
  Globe,
  LayoutDashboard,
} from 'lucide-react';

export default function Sidebar() {
  const [userType, setUserType] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const updateUser = () => {
      const type = localStorage.getItem('userType');
      const photo = localStorage.getItem('profilePhoto');
      const user = localStorage.getItem('user');
      setUserType(type);
      setProfilePhoto(photo);
      setUserData(user ? JSON.parse(user) : null);
    };

    updateUser();
    window.addEventListener('storage', updateUser);
    window.addEventListener('userTypeChanged', updateUser);
    return () => {
      window.removeEventListener('storage', updateUser);
      window.removeEventListener('userTypeChanged', updateUser);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('userTypeChanged'));
    window.location.href = '/';
  };

  const navItems =
    userType === 'student'
      ? [
          { name: 'Home', href: '/home', icon: Home },
          { name: 'Dashboard', href: '/dashboard/student', icon: LayoutDashboard },
          { name: 'Clubs', href: '/clubs', icon: Users },
          { name: 'Events', href: '/event', icon: Calendar },
          { name: 'Posts', href: '/post', icon: FileText },
        ]
      : userType === 'club'
      ? [
          { name: 'Home', href: '/home', icon: Home },
          { name: 'Dashboard', href: '/dashboard/club', icon: LayoutDashboard },
          { name: 'Clubs', href: '/clubs', icon: Users },
          { name: 'Events', href: '/event', icon: Calendar },
          { name: 'Posts', href: '/post', icon: FileText },
        ]
      : [
          { name: 'Home', href: '/', icon: Home },
          { name: 'Clubs', href: '/auth/register', icon: Users, restricted: true },
          { name: 'Events', href: '/auth/register', icon: Calendar, restricted: true },
          { name: 'Posts', href: '/auth/register', icon: FileText, restricted: true },
        ];

  const LogoIcon = userType === 'club' ? Building2 : userType === 'student' ? User2 : Globe;

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6 text-[#2563EB]" /> : <Menu className="w-6 h-6 text-[#2563EB]" />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-40 flex flex-col p-4 transition-all duration-300 ease-in-out
          ${isDesktop ? (isCollapsed ? 'w-20' : 'w-64') : 'w-64'}
          transform ${!isDesktop && !isOpen ? '-translate-x-full' : 'translate-x-0'}`}
      >
        <div className="flex flex-col items-center mb-6">
          {profilePhoto && profilePhoto.startsWith('data:image') ? (
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover mb-3 border shadow-sm"
            />
          ) : (
            <div className="w-14 h-14 bg-gradient-to-br from-[#2563EB] to-[#00BF63] rounded-2xl flex items-center justify-center mb-3 shadow-md">
              <LogoIcon className="w-7 h-7 text-white" />
            </div>
          )}

          {!isCollapsed && (
            <>
              <h2 className="text-xl font-bold bg-gradient-to-r from-[#2563EB] to-[#00BF63] bg-clip-text text-transparent">
                {userType === 'club'
                  ? 'Club Panel'
                  : userType === 'student'
                  ? 'Student Panel'
                  : 'Visitor'}
              </h2>
              {userData?.name && (
                <p className="text-sm text-gray-600 mt-1">{userData.name}</p>
              )}
              {userData?.email && (
                <p className="text-xs text-gray-500">{userData.email}</p>
              )}
            </>
          )}
        </div>

        <nav className="flex flex-col gap-2 mt-4 flex-grow">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            const restricted = item.restricted && userType === null;

            return (
              <button
                key={item.name}
                onClick={() => {
                  if (restricted) {
                    alert('Please login to access this section.');
                  } else {
                    window.location.href = item.href;
                    if (!isDesktop) setIsOpen(false);
                  }
                }}
                disabled={restricted}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all font-medium w-full text-left
                  ${
                    active
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#00BF63] text-white shadow-md'
                      : restricted
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-[#000000] hover:bg-[#FFCC00]/20 hover:text-[#2563EB]'
                  } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && <span>{item.name}</span>}
              </button>
            );
          })}
        </nav>

        {(userType === 'student' || userType === 'club') && (
          <button
            onClick={handleLogout}
            className={`mt-auto flex items-center gap-3 p-3 rounded-lg text-[#FF0000] hover:bg-[#FF0000]/10 transition ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        )}
      </aside>

      {isOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/30 z-30 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}