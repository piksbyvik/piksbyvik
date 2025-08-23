import { defineType, defineField } from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'e.g., "Hi I\'m Victoria"',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      validation: Rule => Rule.min(1).required()
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'polaroidCaption',
      title: 'Polaroid Caption',
      type: 'text',
      description: 'Caption text below the profile image'
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'e.g., "MY STORY"'
    }),
    defineField({
      name: 'decorativeImage',
      title: 'Decorative Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Small decorative image (trees, etc.)'
    })
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'profileImage'
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'About Section',
        media
      }
    }
  }
})
