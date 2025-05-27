import { Page } from '@/payload-types'
import Image from 'next/image'

type HeroProps = Extract<Page['layout'][0], { blockType: 'hero' }>

export default function HeroBlock({ block }: { block: HeroProps }) {
  return (
    <div>
      <h1>{block.heading}</h1>
      <p>{block.subheading}</p>
      {/* <RichText data={block.subheading} /> */}
      {typeof block?.image === 'object' && block.image.url && (
        <Image src={block.image.url} alt={block.image.alt} width={800} height={600} priority />
      )}
      <a href={block.cta_button.url}>{block.cta_button.label}</a>
    </div>
  )
}
