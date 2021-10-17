import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const authen = req.session.get('authen')
  console.log('Authen API', authen);
  if (authen) {
    res.status(200).json({
      isLoggedIn: true,
      ...authen,
    })
  } else {
    res.status(200).json({
      isLoggedIn: false,
    })
  }
})
