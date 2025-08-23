import { defineType, defineField } from 'sanity'

export const portfolioGallery = defineType({
  name: 'portfolioGallery',
  title: 'Portfolio Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title (Optional)',
      type: 'string',
      description: 'Used for content organization in Sanity Studio - not displayed on the website',
      initialValue: 'Portfolio Gallery'
    }),
    defineField({
      name: 'weddingImages',
      title: 'Wedding Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required()
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for accessibility'
            },
            {
              name: 'caption',
              title: 'Caption (Optional)',
              type: 'string'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'lifestyleImages',
      title: 'Lifestyle Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required()
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for accessibility'
            },
            {
              name: 'caption',
              title: 'Caption (Optional)',
              type: 'string'
            }
          ]
        }
      ]
    })
  ]
})
