import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, FileText, ArrowRight, CheckCircle, TrendingUp, Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
  <div className="min-h-screen bg-filter  from-blue-50 via-indigo-50 to-purple-50">
     
     
      <header className="flex items-center justify-between px-6 md:px-12 py-4 bg-filter backdrop-blur-md shadow sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Component.svg" alt="Logo" width={36} height={36} />
          <div className="flex items-center gap-1 cursor-none">
            <span className="text-blue-600 text-3xl font-bold">G</span>
            <span className="text-red-600 text-3xl font-bold">C</span>
            <span className="text-emerald-500 text-3xl font-bold">L</span>
          </div>
        </Link>
         <div className="flex items-center gap-4">
              <Link href="/auth/login">
                 <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600 hover:shadow-md text-blue-600 ">Sign{' '} <div>In</div></Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-red-600 to-green-600 hover:from-red-600 hover:to-green-600">
                  Get Started
                </Button>
              </Link>
            </div>
      </header>

      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                <Zap className="w-4 h-4"  />
                Welcome to the Future of Campus Life
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r  from-red-600 to-green-600 hover:from-red-600 hover:to-green-600 bg-clip-text text-transparent">
                Club Management
              </span>
              <br />
              <span className="text-gray-900">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Connect, organize, and grow your student community with our modern, all-in-one platform designed for universities
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/auth/register">
                <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r  from-red-600 to-green-600 hover:from-red-600 hover:to-green-600 shadow-xl hover:shadow-2xl transition-all">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
               
               <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2  ">
                Sign In
              </Button>
            
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              ✨ No credit card required • Free for all students
            </p>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything you need in one place
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features to help you manage clubs, organize events, and engage your community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 group overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <CardContent className="pt-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Club Management</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Create and manage student clubs with ease. Track members, activities, and grow your community effortlessly.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                  Easy club creation
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                  Member management
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                  Activity tracking
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 group overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
            <CardContent className="pt-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Event Planning</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Organize workshops, conferences, and social events. Keep your community engaged and informed with ease.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Event scheduling
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  RSVP management
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Automated reminders
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 group overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-500 to-red-600"></div>
            <CardContent className="pt-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Social Feed</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Share updates, announcements, and engage with your community through posts, likes, and comments.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-red-600 mr-2" />
                  Real-time updates
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-red-600 mr-2" />
                  Social interactions
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-red-600 mr-2" />
                  Content sharing
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-gradient-to-r  from-red-600 to-green-600 hover:from-red-600 hover:to-green-600  py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-blue-100 font-medium">Active Clubs</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">5000+</div>
              <div className="text-purple-100 font-medium">Events Hosted</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50k+</div>
              <div className="text-pink-100 font-medium">Students</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">99%</div>
              <div className="text-blue-100 font-medium">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why choose our platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built specifically for universities with features that matter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-gray-600">Intuitive interface designed for students by students. No training required.</p>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your data is encrypted and secure. We take privacy seriously.</p>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Optimized performance for a smooth, lag-free experience.</p>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Always Free</h3>
              <p className="text-gray-600">Free for all students and universities. No hidden costs.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r  from-red-600 to-green-600 hover:from-red-600 hover:to-green-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to transform your campus community?
          </h2>
          <p className="text-xl mb-10 opacity-95">
            Join thousands of students already using our platform to connect and grow
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg shadow-2xl hover:shadow-3xl transition-all font-bold">
                Create Free Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2  hover:bg-white/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-red-600 to-green-600 hover:from-red-600 hover:to-green-600 bg-clip-text text-transparent">
                Club Management
              </h3>
              <p className="text-gray-400 text-sm">
                Empowering student communities worldwide
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 GCL. All rights reserved.</p>
          </div>
        </div>
      </footer>

    
    </div>
  );
}
