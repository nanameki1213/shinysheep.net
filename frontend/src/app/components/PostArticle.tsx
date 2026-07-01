import { Heading, Flex, Text, Box, Grid, Badge, Separator } from '@radix-ui/themes'
import styles from './PostArticle.module.css'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import ShareButtons from '@/app/components/ShareButtons'
import TableOfContents from '@/app/components/TableOfContents'
import { extractHeadings, addHeadingIds } from '@/app/lib/headings'
import Post from '@/app/types/posts'

export default function PostArticle({ post }: { post: Post }) {
  const contentWithIds = addHeadingIds(post.content)
  const hasHeadings = extractHeadings(post.content).length > 0

  const breadcrumbs = [...(post.category ? [{ label: post.category.name, href: '#' }] : []), { label: post.title }]

  return (
    <Grid columns={{ initial: '1', md: '1fr 280px' }} gap="8" width="100%">
      <Box>
        <Breadcrumbs items={breadcrumbs} />

        <article>
          <Heading as="h1" size="8" mb="4" style={{ lineHeight: 1.2 }}>
            {post.title}
          </Heading>

          <Flex gap="3" align="center" mb="6">
            {post.publishedAt && (
              <Text size="2" color="gray">
                {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
              </Text>
            )}
            {post.category && (
              <Badge color="violet" variant="soft">
                {post.category.name}
              </Badge>
            )}
          </Flex>

          <Separator size="4" my="6" />

          <div className={styles.content} dangerouslySetInnerHTML={{ __html: contentWithIds }} />

          <Separator size="4" my="8" />

          <ShareButtons title={post.title} />
        </article>
      </Box>

      {hasHeadings && (
        <Box display={{ initial: 'none', md: 'block' }}>
          <TableOfContents content={post.content} />
        </Box>
      )}
    </Grid>
  )
}
