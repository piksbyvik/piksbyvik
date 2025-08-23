import { defineType, defineField } from 'sanity'

export const investmentBanner = defineType({
  name: 'investmentBanner',
  title: 'Investment Banner Section',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Banner Text',
      type: 'string',
      initialValue: 'Less "say cheese," more "holy crap this is us!"'
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true }
    })
  ]
})
