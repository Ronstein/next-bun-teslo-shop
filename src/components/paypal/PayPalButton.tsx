'use client';

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js"
import { paypalCheckPayment, setTransacionId } from "@/actions";

interface Props {
    orderId: string;
    amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
    const [{ isPending }] = usePayPalScriptReducer();
    const roundedAmount = (Math.round(amount * 100)) / 100; // 2 decimales 123.23


    if (isPending) {
        return (
            <div className="animate-pulse mb-16">
                <div className="h-11 bg-gray-300 rounded" />
                <div className="h-11 bg-gray-300 rounded mt-4" />
            </div>
        )
    }

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        currency_code: 'USD',
                        value: `${roundedAmount}`,
                    }
                }
            ]
        });

        // console.log({ transactionId });

        //Todo: guardar el id en la ordern en la base de datos
        // actions/payments/setTransactionId
        const { ok } = await setTransacionId(orderId, transactionId);
        if (!ok) {
            throw new Error("No se pudo actualizar la orden");
        }

        return transactionId;
    }

    const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
        //console.log('onApprove');

        const details = await actions.order?.capture();
        if (!details) return;

        await paypalCheckPayment(details.id!);
    }

    return (
        <div className="relative z-0">
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </div>

    )
}
