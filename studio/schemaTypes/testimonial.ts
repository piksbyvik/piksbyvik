import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "LOVE NOTES"',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
      description: 'e.g., "from my couples ♡"'
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          title: 'Testimonial',
          fields: [
            defineField({
              name: 'text',
              title: 'Testimonial Text',
              type: 'text',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'author',
              title: 'Author Names',
              type: 'string',
              description: 'e.g., "Alexis & Nion"',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'image',
              title: 'Testimonial Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            })
          ],
          preview: {
            select: {
              title: 'author',
              media: 'image'
            }
          }
        }
      ],
      validation: Rule => Rule.min(1).max(5)
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Testimonials',
        subtitle: subtitle || 'No subtitle'
      }
    }
  }
})
