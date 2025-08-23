import { defineType, defineField } from 'sanity'

export const investmentNextSteps = defineType({
  name: 'investmentNextSteps',
  title: 'Investment Next Steps Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'YOUR JOURNEY WITH ME'
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
      initialValue: 'from hello to forever'
    }),
    defineField({
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Step Number',
              type: 'number',
              validation: Rule => Rule.min(1).max(4)
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'text',
              rows: 3
            }
          ]
        }
      ],
      validation: Rule => Rule.length(4)
    })
  ]
})
