import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Cta from '@/components/site/Cta';
import { categoryLabel, formatLongDate, mediaUrl } from '@/lib/site/blog';
import { articleJsonLd, contentReadTime, parseMarkdown, type BlogPostFull } from '@/lib/site/markdown';

type Props = { post: BlogPostFull; sidebar?: ReactNode };

/* Article du blog : fil d'Ariane, titre, repères, couverture en encoche,
   puis le texte et la colonne latérale, et le bandeau d'essai en fin de page */
export default function ArticleView({ post, sidebar }: Props) {
  const cover = mediaUrl(post.cover_image_url);
  const category = categoryLabel(post.category);
  const tags = post.tags ? post.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
  const jsonLd = articleJsonLd(post, cover);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className="page-head post-head">
        <nav className="uc-crumbs" aria-label="Fil d'Ariane">
          <Link href="/blog">Blog</Link><i aria-hidden="true">›</i>
          {post.category && <><Link href={`/blog?category=${encodeURIComponent(post.category)}`}>{category}</Link><i aria-hidden="true">›</i></>}
          <span aria-current="page">Article</span>
        </nav>
        <h1>{post.title}</h1>
        <ul className="uc-facts">
          {post.published_at && <li><i>Publié le</i><b><time dateTime={post.published_at.slice(0, 10)}>{formatLongDate(post.published_at)}</time></b></li>}
          <li><i>Lecture</i><b>{contentReadTime(post.content)}</b></li>
          {post.category && <li><i>Catégorie</i><b>{category}</b></li>}
          {typeof post.views_count === 'number' && <li><i>Lectures</i><b>{post.views_count}</b></li>}
        </ul>
      </section>

      {cover && (
        <section className="section" aria-label="Image de couverture">
          <figure className="post-cover" data-cut>
            <Image src={cover} alt={post.title} width={1600} height={686} sizes="(max-width: 860px) 100vw, 1500px" quality={75} priority />
            <figcaption className="dock dock-bl"><span className="v-live"><i aria-hidden="true"></i>{category || 'Le blog Targetym AI'}</span></figcaption>
          </figure>
        </section>
      )}

      <section className="section" aria-label="Article">
        <div className="post-layout">
          <article className="post-main">
            {post.excerpt && <p className="post-intro">{post.excerpt}</p>}
            <div className="post-body" dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }} />
            {tags.length > 0 && (
              <div className="tags post-tags" aria-label="Mots-clés">
                {tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
            )}
          </article>
          {sidebar}
        </div>
      </section>

      <Cta
        image="/img/blog-2.jpg"
        title={<>Prêt à transformer<br />vos RH&nbsp;?</>}
        text="Essayez Targetym AI gratuitement pendant 15 jours. Sans carte bancaire."
        secondLabel="Tous les articles"
        secondHref="/blog"
      />
    </>
  );
}
