require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

const stripe = require("stripe")(process.env.STRIPE_KEY)

exports.handler = (event, context, callback) => {
    const charge = stripe.charges.create({
        amount: 999,
        currency: "usd",
        source: "tok_visa",
        receipt_email: "jenny.rosen@example.com",
    })

    console.log(charge)

    callback(null, {
        statusCode: 200,
        body: {message: "💳 payment received!", charge},
    })
}
