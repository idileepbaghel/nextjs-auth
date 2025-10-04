import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Users from '@/models/Item';
// import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await dbConnect();

    const { name, email, password, phone } = await request.json();

    // 1️⃣ Validate input
    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // 2️⃣ Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }

    // 3️⃣ Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log('Hashed Password:', hashedPassword);
    // console.log('Original Password:', password);
    
    // 4️⃣ Create new user
    const user = await Users.create({
      name,
      email,
      password,
      phone,
    });

    // console.log('New User Created:', user);

    // 5️⃣ Send success response
    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      },
      { status: 201 }
    );    
  } catch (error) {
    console.error('Signup API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}