import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Users from '@/models/Item';

export async function GET() {
  try {
    await dbConnect();
    const users = await Users.find({});
    // console.log('GET /api/items - Retrieved users:', users);
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const user = await Users.create(body);
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    return NextResponse.json(
      { success: true, data: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}