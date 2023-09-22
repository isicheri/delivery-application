require('dotenv').config()

import sgmail from '@sendgrid/mail'

sgmail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendMail =  async (subject,message,send_to) => {
    sgmail.send({
        To: send_to,
        from: process.env.SENDGRID_ACCOUNT,
        subject, 
        html: message
    })
}