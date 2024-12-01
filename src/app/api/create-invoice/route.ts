// /pages/api/create-payment.ts
import { NextResponse } from 'next/server';
import midtransClient from "midtrans-client";

export async function POST(request: Request) {
  try {
    const { amount, items, paymentMethods, customer } = await request.json();

    // Inisialisasi API Midtrans
    let coreApi = new midtransClient.CoreApi({
      isProduction: false, // Gunakan false untuk sandbox, true untuk produksi
      serverKey: process.env.MIDTRANS_SERVER_KEY || process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || "",
      clientKey: process.env.MIDTRANS_CLIENT_KEY || process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
    });

    // Setup order
    let parameter = {
      transaction_details: {
        order_id: `order-${Date.now()}`,
        gross_amount: amount,
        currency: "USD", // Gunakan mata uang USD
      },
      customer_details: {
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
      },
      item_details: items.map((item: any) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        name: item.name,
      })),
      payment_methods: paymentMethods,
    };

    // Membuat transaksi dan mendapatkan token Snap
    const chargeResponse = await coreApi.createTransaction(parameter);

    // Mengembalikan token transaksi
    return NextResponse.json({
      token: chargeResponse.token,
      redirect_url: chargeResponse.redirect_url,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Midtrans API Error:', error.message);
    return NextResponse.json(
      { message: 'Failed to create payment', error: error.message },
      { status: 500 }
    );
  }
}
