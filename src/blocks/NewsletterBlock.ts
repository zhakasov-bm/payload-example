import { Block } from 'payload'

export const NewsletterBlock: Block = {
  slug: 'newsletter-form',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
}
