import { CollectionConfig } from 'payload'
import { HeroBlock } from '@/blocks/HeroBlock'
import { ContentBlock } from '@/blocks/ContentBlock'
import { NewsletterBlock } from '@/blocks/NewsletterBlock'

const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [HeroBlock, ContentBlock, NewsletterBlock],
    },
  ],
}

export default Pages
