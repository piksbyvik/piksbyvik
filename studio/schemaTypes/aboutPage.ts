import { defineType, defineField } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          initialValue: 'MEET VICTORIA'
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: '( I am so glad you are here )'
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'polaroidImage',
          title: 'Polaroid Image',
          type: 'image',
          options: { hotspot: true },
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'polaroidCaption',
          title: 'Polaroid Caption',
          type: 'string',
          initialValue: 'Wedding | Lifestyle photographer'
        })
      ]
    }),

    // Intro Section
    defineField({
      name: 'introSection',
      title: 'Intro Section',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          initialValue: 'I\'m Victoria Rezny'
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: '( MOTHER )'
        }),
        defineField({
          name: 'description',
          title: 'Description Text',
          type: 'string',
          initialValue: 'A detail-obsessed, fantasy-loving, Nature-obsessed festival documentary-style wedding photographer'
        }),
        defineField({
          name: 'paragraphs',
          title: 'Main Content Paragraphs',
          type: 'array',
          of: [{ type: 'text' }],
          validation: Rule => Rule.min(1).max(4)
        }),
        defineField({
          name: 'mainImage',
          title: 'Main Portrait Image (Large)',
          type: 'image',
          options: { hotspot: true },
          validation: Rule => Rule.required(),
          description: 'Main large portrait image displayed prominently'
        }),
        defineField({
          name: 'smallImageTop',
          title: 'Small Portrait Image (Top Right)',
          type: 'image',
          options: { hotspot: true },
          validation: Rule => Rule.required(),
          description: 'Small image displayed in top right on desktop'
        }),
        defineField({
          name: 'smallImageBottom',
          title: 'Small Portrait Image (Bottom Right)',
          type: 'image',
          options: { hotspot: true },
          validation: Rule => Rule.required(),
          description: 'Small image displayed in bottom right on desktop'
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'INQUIRE'
        })
      ]
    }),

    // Approach Section
    defineField({
      name: 'approachSection',
      title: 'Approach Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          initialValue: 'CAPTURING YOUR LOVE, LIKE THE WARM EMBRACE OF AUTUMN.'
        }),
        defineField({
          name: 'paragraphs',
          title: 'Content Paragraphs',
          type: 'array',
          of: [{ type: 'text' }],
          validation: Rule => Rule.min(1).max(5)
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'leftImage',
          title: 'Left Decorative Image',
          type: 'image',
          options: { hotspot: true }
        }),
        defineField({
          name: 'rightImage',
          title: 'Right Decorative Image',
          type: 'image',
          options: { hotspot: true }
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'VIEW PORTFOLIO'
        })
      ]
    }),

    // Passions Section
    defineField({
      name: 'passionsSection',
      title: 'Passions Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'SOME OF MY PASSIONS'
        }),
        defineField({
          name: 'passions',
          title: 'Passion Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Passion Title',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon Image',
                  type: 'image',
                  options: { hotspot: true },
                  validation: Rule => Rule.required(),
                  description: 'Upload the icon image for this passion'
                }),
                defineField({
                  name: 'hasHeart',
                  title: 'Show Heart Icon',
                  type: 'boolean',
                  initialValue: false,
                  description: 'Add heart decoration for this passion'
                })
              ],
              preview: {
                select: {
                  title: 'title',
                  media: 'icon'
                },
                prepare(selection) {
                  return {
                    title: selection.title,
                    media: selection.media
                  }
                }
              }
            }
          ],
          validation: Rule => Rule.min(3).max(6)
        })
      ]
    }),

    // Right Fit Section
    defineField({
      name: 'rightFitSection',
      title: 'Right Fit Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'WE\'RE THE RIGHT FIT IF...'
        }),
        defineField({
          name: 'fitItems',
          title: 'Fit Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Item Title',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'description',
                  title: 'Item Description',
                  type: 'text',
                  validation: Rule => Rule.required()
                })
              ],
              preview: {
                select: {
                  title: 'title',
                  description: 'description'
                },
                prepare(selection) {
                  return {
                    title: selection.title,
                    subtitle: selection.description
                  }
                }
              }
            }
          ],
          validation: Rule => Rule.min(2).max(4)
        }),
        defineField({
          name: 'bottomParagraph',
          title: 'Bottom Paragraph',
          type: 'text',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'sectionImage',
          title: 'Section Image',
          type: 'image',
          options: { hotspot: true },
          validation: Rule => Rule.required()
        })
      ]
    }),

    // Banner Section
    defineField({
      name: 'bannerSection',
      title: 'Banner Section',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Banner Text',
          type: 'text',
          validation: Rule => Rule.required(),
          initialValue: 'If you were nodding along, I think we\'d be a great fit. Let\'s make something beautiful together.'
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
          description: 'Background image for the banner section'
        })
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
        subtitle: 'Page content and settings'
      }
    }
  }
})
