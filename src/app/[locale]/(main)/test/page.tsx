import { getSession } from '@/utils/session'

const TestPage = async () => {
  const { user } = await getSession()

  return <div>Xin chào {user?.email}</div>
}

export default TestPage
