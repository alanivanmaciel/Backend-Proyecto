function auth(req, res, next) {
    if (req.session?.user?.username === 'Ivan' && req.session?.user?.admin) {
        return next()
    }
    return res.status(401).send('Error de authentication')
}

export default auth