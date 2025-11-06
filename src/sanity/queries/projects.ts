import { groq } from 'next-sanity'

export const PROJECT_CARD_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  subtitle,
  location,
  heroImage{..., alt}
`

export const PROJECT_FULL_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  subtitle,
  location,
  description,
  heroImage{..., alt},
  gallery[]{..., alt},
  highlights[]{heading, copy}
`

export const ALL_PROJECT_SLUGS = groq`*[_type == "project" && defined(slug.current)].slug.current`

export const ALL_PROJECTS = groq`*[_type == "project"] | order(_createdAt desc){ ${PROJECT_CARD_FIELDS} }`

export const PROJECT_BY_SLUG = groq`*[_type == "project" && slug.current == $slug][0]{ ${PROJECT_FULL_FIELDS} }`

export type SanityImageWithAlt = {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export type ProjectCard = {
  _id: string
  slug: string
  title: string
  subtitle?: string
  location?: string
  heroImage?: SanityImageWithAlt
}

export type ProjectFull = ProjectCard & {
  description?: string
  gallery?: SanityImageWithAlt[]
  highlights?: { heading?: string; copy?: string }[]
}

