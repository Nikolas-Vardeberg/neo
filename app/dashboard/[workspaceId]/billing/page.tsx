import { getPaymentInfo } from "@/actions/user"


export default async function Page() {
    const payment = await getPaymentInfo();
    
    return(
        <div className="bg-[#1d1d1d] flex flex-col gap-y-8 p-5 rounded-xl">
            <div>
                <h2 className="text-2xl">Current plan</h2>
                <p className="text-[#9d9d9d]">Your Payment History</p>
            </div>
            <div>
                <h2 className="text-2xl">
                    {payment?.data?.subscription?.plan === "PRO" ? "99" : "0"}/month
                </h2>
            </div>
        </div>
    )
}