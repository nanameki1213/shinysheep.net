import { ContentBlock } from '@/app/types/posts'

// 繰り返しフィールドの各ブロックを1つの HTML 文字列に結合する。
// richEditor はサニタイズ済み HTML、html は入力されたままの生 HTML（<details> など）。
export function blocksToHtml(blocks: ContentBlock[] | null | undefined): string {
  if (!Array.isArray(blocks)) return ''
  return blocks.map((block) => (block.fieldId === 'html' ? block.html : block.richEditor)).join('\n')
}
