import React from "react"
import OverlayWrapper from "../../../../components/OverlayWrapper"
import { CLOSE_ENTITY } from "../../../../constants"
import httpService from "../../../../utils/httpService"
import { Input, Select } from "@chakra-ui/react"
import axios from "axios"
import { toast } from "react-toastify"

type IProps = {
    amount: string,
    currency: string,
    getData: any
}

const CashOutBtn =(props: IProps)=> {

    const {
        amount,
        currency,
        getData
    } = props


    const [showModal, setShowModal] = React.useState(false)
    const [showModalOTP, setShowModalOTP] = React.useState(false)
    const [otp, setOtp] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [loadingDefault, setLoadingDefault] = React.useState(false)
    const [accountNumber, setAccountNumber] = React.useState("")
    const [transferCode, settransferCode] = React.useState("")
    const [bankName, setbankName] = React.useState("")
    const [data, setData] = React.useState([] as any)

    const Onsubmit =async()=> { 
        setLoadingDefault(true)
        let response: any
        if(currency === "USD") { 
            response = await httpService.get("/payments/account/check") 
        } else { 
            response = await httpService.get("/payments/account/checkPaystack") 
        } 
        if(!response?.data){
            if(currency === "USD"){ 
                const request: any = await httpService.get(`/payments/account/oauthOnboard`)
                console.log(request); 
                if(request?.data?.checkout){
                    window.open(request?.data?.checkout, '_blank') 
                }
            } else {
                setShowModal(true)
            }
        } else { 
            const request: any = await httpService.post(`/payments/account/withdraw?currency=${currency}&amount=${amount}`)
            // console.log(request?.data);
            if(request?.data?.status === "SUCCESS"){
                toast.success("success")
                getData()
            } else if(request?.data?.status === "ok"){
                toast.success("success")
                getData()
            } else if(request?.data?.status === "OTP"){
                settransferCode(request?.transfer_code)
                setShowModalOTP(true)
            } else {
                toast.error("Error Ocurred")
            }
        } 
        setLoadingDefault(false)
    }

    React.useEffect(()=> { 
        async function getBankData(){ 
            const request = await axios.get(`https://api.paystack.co/bank`) 
            setData(request?.data?.data)
        }
        getBankData()
    }, [])



    const closeModal =()=>{
        setShowModal(false)
    }
    const closeModalOTP =()=>{
        setShowModalOTP(false)
    }

    const AddBank =async()=> {
        setLoading(true)
        const request = await httpService.post(`/payments/account/onboardPaystack`,{
            account_number: accountNumber,
            bank_code: bankName
        })
        if(request?.status === 200){
            if(request.data){
                toast.success("Bank Details Added")
            } else {
                toast.error("Error Ocurred")
            }
        } else {
            toast.error("Error Ocurred")
        } 

        setLoading(false)
    }

    const CashOutOTP =async()=> {
        setLoading(true)
        const request = await httpService.post(`/payments/account/withdrawOTP`,{
            "transfer_code": transferCode,
            "otp": otp
        })
        if(request?.status === 200){
            if(request.data){
                toast.success("success")
            } else {
                toast.error("Error Ocurred")
            }
        } else {
            toast.error("Error Ocurred")
        }  
        setLoading(false)
    }


    return( 
        <>
            <button disabled={(amount && !loadingDefault) ? false : true} onClick={Onsubmit} className={` ${amount ? " ": "  bg-opacity-25 "} bg-chasescrollDarkBlue text-white text-base rounded-lg p-2.5`}>
                {loadingDefault? "Loading...":"Withdraw"}
            </button>
            {showModal && 
                <OverlayWrapper handleClose={closeModal}> 
                    <div className="p-4 w-full h-full flex items-center justify-center">
                        <div className="w-full max-w-sm bg-white rounded-md flex flex-col gap-4 p-6 pt-16 shadow-lg relative border border-gray-100">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 left-6 text-2xl text-gray-800"
                            >
                                {CLOSE_ENTITY}
                            </button>  
                            <p className="text-lg font-bold text-center ">Bank Information</p>
                            <p className=" -mb-4 "  >Bank Name</p>
                            <Select onChange={(e)=> setbankName(e.target.value)} placeholder="Select Bank" >
                                {data?.map((item: any, index: number)=> {
                                    return(
                                        <option key={index} value={item?.code} >{item?.name}</option>
                                    )
                                })}
                            </Select>
                            <p className="  -mb-4 "  >Account Number</p>
                            <Input onChange={(e)=> setAccountNumber(e.target.value)} placeholder="0000000000" />
                            <button onClick={AddBank} disabled={(bankName && accountNumber.length > 9 && !loading) ? false : true} className=" w-full text-white bg-chasescrollBlue disabled:opacity-25 h-[40px] rounded-md mt-5 font-bold " >
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </OverlayWrapper>
            }

            {showModalOTP && 
                <OverlayWrapper handleClose={closeModalOTP}> 
                    <div className="p-4 w-full h-full flex items-center justify-center">
                        <div className="w-full max-w-sm bg-white rounded-md flex flex-col gap-4 p-6 pt-16 shadow-lg relative border border-gray-100">
                            <button
                                onClick={closeModalOTP}
                                className="absolute top-4 left-6 text-2xl text-gray-800"
                            >
                                {CLOSE_ENTITY}
                            </button>  
                            <p className="text-lg font-bold text-center "></p>
                            <p className=" -mb-4 "  >Enter OTP</p> 
                            <Input onChange={(e)=> setOtp(e.target.value)} placeholder="oooooo" />
                            <button onClick={CashOutOTP} disabled={(otp && !loading) ? false : true} className=" w-full text-white bg-chasescrollBlue disabled:opacity-25 h-[40px] rounded-md mt-5 font-bold " >
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </OverlayWrapper>
            }
        </>
    )
}

export default CashOutBtn