import CreateOrderForm from "@/app/components/order/orderForm";

export default function PaymentDetail(){
    const selectedTicket = {}; // Replace with actual ticket data or logic to fetch it

    return(
        <div>
            <CreateOrderForm ticket={selectedTicket} />
        </div>
    )
}