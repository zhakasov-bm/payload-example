import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

type ContentProps = Extract<Page['layout'][0], { blockType: 'content' }>

export default function ContentBlock({ block }: { block: ContentProps }) {
  return (
    <div>
      <h3>{block.heading}</h3>
      <RichText data={block.content} />
    </div>
  )
}
