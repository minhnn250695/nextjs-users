import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
} = {}) {
  const { data: authen, mutate: mutateUser } = useSWR('/api/authen', url => fetch(url).then(res => res.json()));

    useEffect(() => {
      if (!redirectTo || !authen) return

      if (
        (redirectTo && !redirectIfFound && !authen?.isLoggedIn) ||
        (redirectIfFound && authen?.isLoggedIn)
      ) {
        Router.push(redirectTo)
      }
    }, [authen, redirectIfFound, redirectTo])

  return { authen: authen, mutateUser }
}
