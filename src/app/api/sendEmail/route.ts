import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  fullName: string;
  email: string;
  eventDate?: string;
  eventLocation: string;
  interests: {
    wedding: boolean;
    engagements: boolean;
    family: boolean;
    newborn: boolean;
    maternity: boolean;
    events: boolean;
  };
  vision?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { fullName, email, eventDate, eventLocation, interests, vision } = body;

    // Validation
    if (!fullName || !email || !eventLocation) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check environment variables
    if (!process.env.EMAILJS_SERVICE_ID || !process.env.EMAILJS_TEMPLATE_ID || 
        !process.env.EMAILJS_PUBLIC_KEY || !process.env.EMAILJS_PRIVATE_KEY) {
      console.error('API Route - Missing EmailJS environment variables');
      return NextResponse.json(
        { error: 'EmailJS configuration is incomplete' },
        { status: 500 }
      );
    }

    // Convert interests object to string
    const selectedInterests = Object.entries(interests)
      .filter(([_, selected]) => selected)
      .map(([interest, _]) => interest)
      .join(", ");

    const templateParams = {
      to_name: "Vik",
      from_name: fullName,
      from_email: email,
      event_date: eventDate || "Not specified",
      event_location: eventLocation,
      interests: selectedInterests || "None specified",
      vision: vision || "No additional details provided",
      submission_date: new Date().toLocaleDateString(),
      submission_time: new Date().toLocaleTimeString(),
    };

    const emailPayload = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: templateParams,
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-App/1.0'
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to send email';
      
      try {
        const responseText = await response.text();
        
        // Handle specific 403 error
        if (response.status === 403 && responseText.includes('non-browser applications')) {
          errorMessage = 'EmailJS API is not enabled for server-side applications. Please enable "Allow EmailJS API for non-browser applications" in your EmailJS dashboard under Account → Security.';
        } else {
          // Try to parse as JSON first
          try {
            const errorData = JSON.parse(responseText);
            errorMessage = errorData.message || errorMessage;
          } catch (parseError) {
            // If not JSON, use the raw text
            if (responseText.length > 0) {
              errorMessage = responseText;
            }
          }
        }
      } catch (textError) {
        console.error('API Route - Error reading EmailJS response:', textError);
      }
      
      console.error('API Route - EmailJS failed:', { status: response.status, errorMessage });
      throw new Error(`EmailJS API error (${response.status}): ${errorMessage}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully!',
      isWeddingOrEngagement: interests.wedding || interests.engagements
    });

  } catch (error) {
    console.error('API Route - Unexpected error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal Server Error' 
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method Not Allowed' },
    { status: 405 }
  );
}
