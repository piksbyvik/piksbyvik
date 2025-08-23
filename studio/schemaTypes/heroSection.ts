import { defineType, defineField } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'typewriterText',
      title: 'Typewriter Text',
      type: 'string',
      description: 'Main typewriter text (e.g., "WEDDING | LIFESTYLE PHOTOGRAPHER")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'locationText',
      title: 'Location Text',
      type: 'string',
      description: 'Location text below typewriter (e.g., "BASED IN NYC")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'backgroundImages',
      title: 'Background Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: Rule => Rule.required()
            })
          ]
        }
      ],
      validation: Rule => Rule.min(1).max(5).required(),
      description: 'Background images for slideshow (recommended: 3-5 images)'
    })
  ],
  preview: {
    select: {
      title: 'typewriterText',
      subtitle: 'locationText'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Hero Section',
        subtitle: subtitle || 'No location set'
      }
    }
  }
})
