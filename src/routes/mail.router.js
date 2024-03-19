import { Router } from "express";
import sendMail from "../utils/sendEmail.js";
import sendSms from "../utils/sendSms.js";


const router = Router()

router.get('/mail', (req, res) => {

    const to = 'alan.maciel@neotel.us'
    const subject = 'Email de prueba'
    const html = '<div><h1>Es es un email de prueba</h1></div>'

    sendMail(to, subject, html)
    //sendSms('Benja', 'Fernandez')

    res.send('Email enviado.')
})

export default router
