import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const registrationSchema = z.object({
  name: z.string().min(2).max(50),
  companyName: z.string().min(2).max(100),
  jobTitle: z.string().min(2).max(100),
  mobileNumber: z.string().min(4).regex(/^[\+]?[1-9][\d\s\-\(\)]{3,15}$/),
  officePhone: z.string().regex(/^[\+]?[1-9][\d\s\-\(\)]{3,15}$/).optional().or(z.literal("")),
  email: z.string().email(),
  website: z.string().optional().or(z.literal("")),
  officeAddress: z.string().min(10).max(200),
  country: z.string().min(2).max(50),
  industry: z.string().min(2).max(50),
  sourceEvent: z.string().min(2).max(100),
  followUpDate: z.string().optional().or(z.literal("")),
  followUp: z.boolean(),
  comment: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = registrationSchema.parse(body);
    
    // Check if email already exists
    const existingRegistration = await prisma.registration.findUnique({
      where: { email: validatedData.email }
    });
    
    if (existingRegistration) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    // Create new registration
    const registration = await prisma.registration.create({
      data: {
        name: validatedData.name,
        companyName: validatedData.companyName,
        jobTitle: validatedData.jobTitle,
        mobileNumber: validatedData.mobileNumber,
        officePhone: validatedData.officePhone || null,
        email: validatedData.email,
        website: validatedData.website || null,
        officeAddress: validatedData.officeAddress,
        country: validatedData.country,
        industry: validatedData.industry,
        sourceEvent: validatedData.sourceEvent,
        followUpDate: validatedData.followUpDate || null,
        followUp: validatedData.followUp,
        comment: validatedData.comment || null,
      },
    });
    
    return NextResponse.json(
      { 
        message: 'Registration successful',
        id: registration.id 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.issues 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}