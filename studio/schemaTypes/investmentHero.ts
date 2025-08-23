import { defineType, defineField } from 'sanity'

export const investmentHero = defineType({
  name: 'investmentHero',
  title: 'Investment Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      initialValue: 'INVESTMENT'
    }),
    defineField({
      name: 'description',
      title: 'Description Text',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Images',
      type: 'object',
      fields: [
        {
          name: 'mainImage',
          title: 'Main Large Image',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'topSmallImage',
          title: 'Top Small Image',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'bottomSmallImage',
          title: 'Bottom Small Image',
          type: 'image',
          options: { hotspot: true }
        }
      ]
    }),
    defineField({
      name: 'quoteOverlay',
      title: 'Quote Overlay',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Quote Text',
          type: 'string'
        },
        {
          name: 'author',
          title: 'Quote Author',
          type: 'string'
        }
      ]
    }),
    defineField({
      name: 'propImage',
      title: 'Decorative Prop Image',
      type: 'image',
      options: { hotspot: true }
    })
  ]
})
