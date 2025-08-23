import { defineType, defineField } from 'sanity'

export const investmentPackages = defineType({
  name: 'investmentPackages',
  title: 'Investment Packages Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'EXPLORE INVESTMENT'
    }),
    defineField({
      name: 'weddingPackages',
      title: 'Wedding Packages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Package Title',
              type: 'string'
            },
            {
              name: 'price',
              title: 'Package Price',
              type: 'string'
            },
            {
              name: 'image',
              title: 'Package Image',
              type: 'image',
              options: { hotspot: true }
            },
            {
              name: 'features',
              title: 'Package Features',
              type: 'array',
              of: [{ type: 'string' }]
            }
          ]
        }
      ],
      validation: Rule => Rule.max(3)
    }),
    defineField({
      name: 'engagementPackage',
      title: 'Engagement Package',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Package Title',
          type: 'string'
        },
        {
          name: 'price',
          title: 'Package Price',
          type: 'string'
        },
        {
          name: 'image',
          title: 'Package Image',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'features',
          title: 'Package Features',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }),
    defineField({
      name: 'lifestylePackages',
      title: 'Lifestyle Packages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Package Title',
              type: 'string'
            },
            {
              name: 'price',
              title: 'Package Price',
              type: 'string'
            },
            {
              name: 'image',
              title: 'Package Image',
              type: 'image',
              options: { hotspot: true }
            },
            {
              name: 'features',
              title: 'Package Features',
              type: 'array',
              of: [{ type: 'string' }]
            }
          ]
        }
      ],
      validation: Rule => Rule.max(4)
    }),
    defineField({
      name: 'eventsPackage',
      title: 'Events Package',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Package Title',
          type: 'string'
        },
        {
          name: 'price',
          title: 'Package Price',
          type: 'string'
        },
        {
          name: 'image',
          title: 'Package Image',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'features',
          title: 'Package Features',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    })
  ]
})
