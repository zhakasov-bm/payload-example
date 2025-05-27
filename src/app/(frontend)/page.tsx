import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import { Page } from '@/payload-types'

import HeroBlock from './components/HeroBlock'
import ContentBlock from './components/ContentBlock'
import NewsletterBlock from './components/NeswletterBlock'

import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'landing-page' },
    },
  })

  if (!page) {
    return <div>Not Found</div>
  }

  const renderBlocks = (block: Page['layout'][0]) => {
    switch (block.blockType) {
      case 'hero':
        return <HeroBlock block={block} key={block.id} />
      case 'content':
        return <ContentBlock block={block} key={block.id} />
      case 'newsletter-form':
        return <NewsletterBlock block={block} key={block.id} />
      default:
        return null
    }
  }

  return (
    <div>
      {page.title}
      <div className="page">{page.layout?.map((block) => renderBlocks(block))}</div>
    </div>
  )
}
