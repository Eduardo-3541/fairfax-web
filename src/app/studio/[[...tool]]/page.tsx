// Hard-block access to Sanity Studio in all environments
// by returning a 404 for any /studio route.
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

export default function StudioPage() {
  notFound()
}
