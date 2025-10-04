import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Users from '@/models/Item';
import bcrypt, { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { email, password } = await request.json();

    const user = await Users.findOne({ email });
    console.log('Login attempt for user:', email);
    console.log('User found:', user);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log('Password attempt:', password);
    console.log('Password comparison result:', isMatch);
    
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return NextResponse.json(
      { success: true, token },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}