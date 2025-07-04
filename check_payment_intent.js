#!/usr/bin/env node

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function getPaymentIntentDetails(paymentIntentId) {
  try {
    console.log(`Looking up payment intent: ${paymentIntentId}`);
    
    // Get the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ['latest_charge', 'invoice', 'invoice.lines']
    });
    
    console.log('\n=== Payment Intent Details ===');
    console.log(`ID: ${paymentIntent.id}`);
    console.log(`Amount: $${(paymentIntent.amount / 100).toFixed(2)}`);
    console.log(`Status: ${paymentIntent.status}`);
    console.log(`Description: ${paymentIntent.description}`);
    console.log(`Created: ${new Date(paymentIntent.created * 1000).toISOString()}`);
    
    // Check metadata
    if (paymentIntent.metadata && Object.keys(paymentIntent.metadata).length > 0) {
      console.log('\n=== Metadata ===');
      for (const [key, value] of Object.entries(paymentIntent.metadata)) {
        console.log(`${key}: ${value}`);
      }
    }
    
    // Check if there's an associated invoice
    if (paymentIntent.invoice) {
      console.log('\n=== Invoice Details ===');
      const invoice = paymentIntent.invoice;
      console.log(`Invoice ID: ${invoice.id}`);
      
      if (invoice.lines && invoice.lines.data) {
        console.log('\n=== Line Items ===');
        invoice.lines.data.forEach((item, index) => {
          console.log(`Item ${index + 1}:`);
          console.log(`  Description: ${item.description}`);
          console.log(`  Price ID: ${item.price ? item.price.id : 'N/A'}`);
          console.log(`  Amount: $${(item.amount / 100).toFixed(2)}`);
          console.log(`  Quantity: ${item.quantity}`);
          if (item.metadata && Object.keys(item.metadata).length > 0) {
            console.log('  Metadata:');
            for (const [key, value] of Object.entries(item.metadata)) {
              console.log(`    ${key}: ${value}`);
            }
          }
        });
      }
    }
    
    // Check the latest charge
    if (paymentIntent.latest_charge) {
      console.log('\n=== Latest Charge ===');
      const charge = paymentIntent.latest_charge;
      console.log(`Charge ID: ${charge.id}`);
      console.log(`Description: ${charge.description}`);
      
      if (charge.metadata && Object.keys(charge.metadata).length > 0) {
        console.log('Charge Metadata:');
        for (const [key, value] of Object.entries(charge.metadata)) {
          console.log(`  ${key}: ${value}`);
        }
      }
    }
    
    // Try to get checkout session if this was created via Checkout
    try {
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntentId,
        limit: 1
      });
      
      if (sessions.data.length > 0) {
        const session = sessions.data[0];
        console.log('\n=== Checkout Session ===');
        console.log(`Session ID: ${session.id}`);
        
        // Get line items from the checkout session
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ['data.price']
        });
        
        if (lineItems.data.length > 0) {
          console.log('\n=== Checkout Line Items ===');
          lineItems.data.forEach((item, index) => {
            console.log(`Item ${index + 1}:`);
            console.log(`  Description: ${item.description}`);
            console.log(`  Price ID: ${item.price.id}`);
            console.log(`  Amount: $${(item.amount_total / 100).toFixed(2)}`);
            console.log(`  Quantity: ${item.quantity}`);
            
            // Check if this price ID matches any of our known Freudian Tank sizes
            const freudianTankPrices = {
              "price_1Rf628Ap2D4XT14xcynwN9k0": "Black - Small",
              "price_1Rf628Ap2D4XT14x2YwO9h13": "Black - Medium", 
              "price_1Rf628Ap2D4XT14xoWhwVJKb": "Black - Large",
              "price_1Rf629Ap2D4XT14xnRkc53ul": "Black - X-Large"
            };
            
            if (freudianTankPrices[item.price.id]) {
              console.log(`  *** SIZE: ${freudianTankPrices[item.price.id]} ***`);
            }
          });
        }
      }
    } catch (checkoutError) {
      console.log('\nNo checkout session found for this payment intent');
    }
    
  } catch (error) {
    console.error('Error retrieving payment intent:', error.message);
  }
}

// Get payment intent ID from command line argument
const paymentIntentId = process.argv[2] || 'pi_3RfRBWAp2D4XT14x05bQ69Tk';

getPaymentIntentDetails(paymentIntentId);