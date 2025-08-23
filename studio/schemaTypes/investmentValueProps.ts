import { defineType, defineField } from 'sanity'

export const investmentValueProps = defineType({
  name: 'investmentValueProps',
  title: 'Investment Value Props Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'object',
      fields: [
        {
          name: 'preText',
          title: 'Pre-highlighted Text',
          type: 'string',
          initialValue: 'More Than Just'
        },
        {
          name: 'highlightedText',
          title: 'Highlighted Text',
          type: 'string',
          initialValue: 'Pretty Photos'
        }
      ]
    }),
    defineField({
      name: 'valueCards',
      title: 'Value Proposition Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Card Title',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Card Description',
              type: 'text',
              rows: 4
            },
            {
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Blue', value: 'blue' },
                  { title: 'Brown Medium', value: '#8B7D6B' },
                  { title: 'Brown Dark', value: 'brown-one' }
                ]
              }
            }
          ]
        }
      ],
      validation: Rule => Rule.max(3)
    })
  ]
})
