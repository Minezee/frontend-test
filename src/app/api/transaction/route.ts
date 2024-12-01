import { NextResponse } from 'next/server';
import createTransaction from '@/lib/midtrans/transaction';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const { amount, customer } = await request.json();
  const generateUniqueOrderId = () => {
    const timestamp = Date.now();
    const randomString = uuidv4().slice(0, 8);
    return `order-${timestamp}-${randomString}`;
  };

  try {
    const params = {
      transaction_details: {
        order_id: generateUniqueOrderId(),
        gross_amount: amount,
      },
      customer_details: {
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
      },
    };

    const transaction = await new Promise<{ token: string, redirect_url: string }>((resolve, reject) => {
      createTransaction(params, (transaction: { token: string, redirect_url: string }) => {
        if (transaction) {
          resolve(transaction);
        } else {
          reject(new Error('Transaction creation failed'));
        }
      });
    });

    return NextResponse.json(
      {
        token: transaction.token,
        redirect_url: transaction.redirect_url,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Midtrans API Error:', error.message);
    return NextResponse.json(
      { message: 'Failed to create payment', error: error.message },
      { status: 500 }
    );
  }
}
