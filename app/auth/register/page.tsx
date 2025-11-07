'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building2 } from 'lucide-react';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
            <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center space-y-3">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                        Create Your Account
                    </CardTitle>
                    <p className="text-gray-600">Choose your role to get started</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Link href="/auth/register/student">
                        <Button
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2 py-3 bg-white/90 hover:bg-blue-50 border-blue-200" 
                        >
                            <Users className="w-5 h-5 text-red-600" />
                            Register as Student
                        </Button>
                    </Link>
                    <Link href="/auth/register/club">
                        <Button
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2 py-3 bg-white/90 hover:bg-purple-50 border-purple-200" 
                        >
                            <Building2 className="w-5 h-5 text-blue-600" />
                            Register as Club
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}