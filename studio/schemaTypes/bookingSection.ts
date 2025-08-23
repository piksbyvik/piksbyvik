import { defineType, defineField } from 'sanity'

export const bookingSection = defineType({
  name: 'bookingSection',
  title: 'Booking Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "Let\'s Create Magic Together"',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title || 'Booking Section'
      }
    }
  }
})
