export const authorization = (role) => {
    return async (req, res, next) => {
        if (role[0] === 'public') return next()
        if (!req.user) return res.status(401).json({ status: 'error', error: 'Unauthorized' })
        // if (req.user.role !== role) return res.status(403).json({ status: 'error', error: 'Not permissions' })
        if (!role.includes(req.user.role)) return res.status(403).json({ status: 'error', error: 'Not permissions' })
        next()
    }
}