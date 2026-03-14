const Stripe = require('stripe');

/**
 * Vercel Serverless Function – Stripe webhook handler.
 * Listens for checkout.session.completed events to fulfill template purchases.
 *
 * Setup:
 *   1. In Stripe Dashboard → Webhooks, add endpoint:
 *      https://www.stratasoftwaregroup.com/api/webhook
 *   2. Select event: checkout.session.completed
 *   3. Copy the webhook signing secret to STRIPE_WEBHOOK_SECRET env var in Vercel
 */

function getRawBody(req) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
    });
}

async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
        console.error('Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET');
        return res.status(500).json({ error: 'Webhook not configured' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        const rawBody = await getRawBody(req);
        event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).json({ error: 'Invalid signature' });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const { templateId, templateName } = session.metadata || {};
        const customerEmail = session.customer_details?.email;

        console.log(
            `[Webhook] Order fulfilled: template=${templateId} (${templateName}), ` +
            `customer=${customerEmail}, amount=${session.amount_total}, ` +
            `payment_status=${session.payment_status}`
        );

        /*
         * TODO: Send fulfillment email with download link.
         * Options:
         *   - Integrate SendGrid/Resend to email a signed download URL
         *   - Use Stripe's built-in receipt emails (already enabled by default)
         *   - Store order in a database for a customer portal
         *
         * For now, Stripe's built-in receipt email is sent automatically.
         * The success page directs users to check email or contact support.
         */
    }

    /* Acknowledge receipt — Stripe retries on non-2xx */
    return res.status(200).json({ received: true });
}

module.exports = handler;

/* Disable Vercel's body parser so we can verify the raw Stripe signature */
module.exports.config = {
    api: {
        bodyParser: false,
    },
};
