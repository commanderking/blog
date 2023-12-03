import type { MDXComponents } from 'mdx/types'
import { components as defaultComponents } from 'components/MDXComponents'
// import Image from './Image'
// import CustomLink from './Link'

console.log({ defaultComponents })

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...defaultComponents,
    h3: ({ children }) => <h3 className="text-2xl">{children}</h3>,
  }
}
