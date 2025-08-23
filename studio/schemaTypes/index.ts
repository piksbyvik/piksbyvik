import { type SchemaTypeDefinition } from 'sanity'
import { heroSection } from './heroSection'
import { approachSection } from './approachSection'
import { aboutSection } from './aboutSection'
import { gallerySection } from './gallerySection'
import { testimonial } from './testimonial'
import { bookingSection } from './bookingSection'

// Investment page schemas
import { investmentHero } from './investmentHero'
import { investmentValueProps } from './investmentValueProps'
import { investmentBanner } from './investmentBanner'
import { investmentPackages } from './investmentPackages'
import { investmentNextSteps } from './investmentNextSteps'

// Portfolio page schemas
import { portfolioGallery } from './portfolioGallery'
import { contactPage } from './contactPage'

// About page schema
import { aboutPage } from './aboutPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Landing page schemas
    heroSection,
    approachSection,
    aboutSection,
    gallerySection,
    testimonial,
    bookingSection,
    
    // Investment page schemas
    investmentHero,
    investmentValueProps,
    investmentBanner,
    investmentPackages,
    investmentNextSteps,
    
    // Portfolio page schemas
    portfolioGallery,
    contactPage,
    
    // About page schema
    aboutPage
  ],
}
