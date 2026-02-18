const Stripe = require('stripe');

/**
 * Vercel Serverless Function – creates a Stripe Checkout Session for a template
 * purchase. The price is validated against the catalog to prevent tampering.
 */

/* ── Template catalog (mirrored from src/data/websiteTemplates.js) ── */
const TEMPLATE_PRICES = {
    '1-Insurance': 49,
    '2-Portfolio': 79,
    '3-Law': 49,
    '4-TechStartup': 99,
    '5-Luxury': 99,
    '6-CreativeAgency': 99,
    '7-SportsNews': 49,
    '8-SaaS': 99,
    '9-RealEstate': 79,
    '10-TradeWork': 49,
    '01-startup-landing': 39,
    '02-restaurant-bistro': 39,
    '03-portfolio-creative': 39,
    '04-fitness-gym': 39,
    '06-medical-clinic': 39,
    '07-ecommerce-fashion': 39,
    '08-education-academy': 39,
    '09-travel-adventure': 39,
    '10-tech-blog': 39,
};

module.exports = async function handler(req, res) {
    /* Only allow POST */
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { templateId, templateName } = req.body || {};

    if (!templateId || !templateName) {
        return res.status(400).json({ error: 'Missing templateId or templateName' });
    }

    /* Validate the template exists in our catalog */
    const catalogPrice = TEMPLATE_PRICES[templateId];
    if (catalogPrice == null) {
        return res.status(400).json({ error: 'Unknown template' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
        const origin = req.headers.origin || req.headers.referer || 'https://www.stratasoftwaregroup.com';

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${templateName} Template`,
                            description: `Premium website template by Strata Software Group`,
                        },
                        unit_amount: catalogPrice * 100, // Stripe expects cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/checkout/success?template=${encodeURIComponent(templateId)}`,
            cancel_url: `${origin}/checkout/cancel?template=${encodeURIComponent(templateId)}`,
            metadata: {
                templateId,
                templateName,
            },
        });

        return res.status(200).json({ url: session.url });
    } catch (err) {
        console.error('Stripe error:', err);
        return res.status(500).json({ error: 'Failed to create checkout session' });
    }
};
