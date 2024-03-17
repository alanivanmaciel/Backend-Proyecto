import { Router } from "express";

const router = Router()

router.get('/mail', (req, res) => {
    res.send('Email enviado.')
})

export default router