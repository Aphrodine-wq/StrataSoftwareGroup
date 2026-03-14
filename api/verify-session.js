const Stripe = require('stripe');

/**
 * Vercel Serverless Function – verifies a Stripe Checkout Session.
 * Called by the success page to confirm the payment actually went through,
 * preventing users from manually navigating to the success URL.
 */
module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(500).json({ error: 'Payment service is not configured' });
    }

    const sessionId = req.query.session_id;
    if (!sessionId || typeof sessionId !== 'string') {
        return res.status(400).json({ error: 'Missing session_id' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        return res.status(200).json({
            paid: session.payment_status === 'paid',
            templateId: session.metadata?.templateId || null,
            customerEmail: session.customer_details?.email || null,
        });
    } catch (err) {
        console.error('Session verification error:', err.message);
        return res.status(400).json({ error: 'Invalid session', paid: false });
    }
};
