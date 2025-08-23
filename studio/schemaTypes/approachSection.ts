import { defineType, defineField } from 'sanity'

export const approachSection = defineType({
  name: 'approachSection',
  title: 'Approach Section',
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
      name: 'whatICaptureTab',
      title: 'What I Capture Tab',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          description: 'e.g., "WHERE MY LENS LEADS"',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string'
        }),
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'text',
          description: 'e.g., "Because these days are worth remembering. ♡"'
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text',
          type: 'string',
          description: 'e.g., "VIEW PACKAGES"'
        }),
        defineField({
          name: 'categories',
          title: 'Photography Categories',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Category Title',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'image',
                  title: 'Category Image',
                  type: 'image',
                  options: {
                    hotspot: true
                  },
                  validation: Rule => Rule.required()
                })
              ]
            }
          ],
          validation: Rule => Rule.min(1).max(3)
        })
      ]
    }),
    defineField({
      name: 'myApproachTab',
      title: 'My Approach Tab',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          description: 'e.g., "THE WAY I WORK"',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'description',
          title: 'Description Paragraphs',
          type: 'array',
          of: [{ type: 'text' }],
          validation: Rule => Rule.min(1)
        }),
        defineField({
          name: 'image',
          title: 'Approach Image',
          type: 'image',
          options: {
            hotspot: true
          },
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text',
          type: 'string'
        }),
        defineField({
          name: 'bottomQuote',
          title: 'Bottom Quote',
          type: 'text'
        }),
        defineField({
          name: 'bottomQuoteBackground',
          title: 'Bottom Quote Background Image',
          type: 'image',
          options: {
            hotspot: true
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'whatICaptureTab.title',
      media: 'backgroundImage'
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'Approach Section',
        media
      }
    }
  }
})
