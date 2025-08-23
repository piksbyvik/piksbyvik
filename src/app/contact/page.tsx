import { client } from "@/sanity/lib/client";
import { CONTACT_PAGE_QUERY, type ContactPageData } from "@/sanity/queries";
import ContactHero from "@/components/contact/ContactHero";
import BookingForm from "@/components/landing/booking-form/booking-form";
import Footer from "@/components/shared/footer";

const options = { 
  next: { 
    revalidate: process.env.NODE_ENV === 'production' ? 3600 : 60 // 1 hour in production, 1 min in dev
  } 
};

export default async function ContactPage() {
   try {
    const data = await client.fetch<ContactPageData>(CONTACT_PAGE_QUERY, {}, options);

    return (
      <div className="w-screen relative">
        <ContactHero data={data?.contactPage} />
        <BookingForm />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching contact data:', error);
    
    // Fallback to component without Sanity data
    return (
      <div className="w-screen relative">
        <ContactHero />
        <BookingForm />
        <Footer />
      </div>
    );
  }
}