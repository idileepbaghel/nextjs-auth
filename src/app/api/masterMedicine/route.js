import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import masterMedicine from '@/models/masterMedicine';

// ✅ CREATE (POST) a new master medicine
export async function POST(request) {
  try {
    await dbConnect();
    console.log('Connected to DB');
    const body = await request.json();

    const {
      name,
      brand_name,
      category,
      dosage_form,
      strength,
      manufacturer,
      description,
      default_selling_price,
      reorder_level,
      status,
    } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Name is required' },
        { status: 400 }
      );
    }

    // Duplicate check
    const existing = await masterMedicine.findOne({
      name: name.trim(),
      brand_name: brand_name?.trim(),
    });
    console.log('Existing medicine check:', existing);
    

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Medicine already exists in master list' },
        { status: 400 }
      );
    }
    console.log('NextResponse:', NextResponse);
    

    const medicine = await masterMedicine.create({
      name,
      brand_name,
      category,
      dosage_form,
      strength,
      manufacturer,
      description,
      default_selling_price,
      reorder_level,
      status,
    });
    console.log('Created medicine:', medicine);
    

    return NextResponse.json({ success: true, medicine }, { status: 201 });
  } catch (error) {
    console.error('POST /api/medicine error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ✅ GET all master medicines
export async function GET() {
  try {
    await dbConnect();
    console.log('Connected to DB');
    const medicines = await masterMedicine.find().sort({ createdAt: -1 });
    console.log('Fetched medicines:', medicines);
    
    return NextResponse.json({ success: true, medicines }, { status: 200 });
  } catch (error) {
    console.error('GET /api/medicine error:', error);
    console.log('Error details:', error);
    
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
