

import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const { username } = await req.body
  const url = `https://api.github.com/users/${username}`

  try {
    const authen = { isLoggedIn: true }
    req.session.set('authen', authen)
    await req.session.save()
    res.status(200).json(authen);

  } catch (error) {

  }
})
