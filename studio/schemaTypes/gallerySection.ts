import { defineType, defineField } from 'sanity'

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'document',
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "Featured Galleries"',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'galleryItems',
      title: 'Gallery Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Gallery Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'caption',
              title: 'Image Caption',
              type: 'string',
              validation: Rule => Rule.required()
            })
          ]
        }
      ],
      validation: Rule => Rule.min(1).max(6)
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' }
                ]
              }
            })
          ]
        }
      ],
      validation: Rule => Rule.max(2)
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'backgroundImage'
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'Gallery Section',
        media
      }
    }
  }
})
