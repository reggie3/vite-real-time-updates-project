import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/todos')({
  component: () => <div>Hello from tasks!</div>
})