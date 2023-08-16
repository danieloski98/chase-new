import React from 'react'
import { useFormContext } from 'react-hook-form';

interface Props {
    user: any
}

function DatePicker(props: Props) {
    const {
        user
    } = props
    
    const dateRef: any = React.useRef(null);
    const { formState: { errors }, setValue } = useFormContext();

    const [value, setNewValue] = React.useState("") 

    React.useEffect(()=> {
        setValue("phone", user?.data?.mobilePhone?.value)
        setValue("gender", user?.data?.gender?.value)
        setValue("dob", user?.dob) 
    },[user])

    const handleChange =(item: any)=> {
        setValue("dob", (Number(new Date(item).getMonth()+1)+"".length > 1 ? "0"+(Number(new Date(item).getMonth()+1)) :(Number(new Date(item).getMonth()+1)))+"/"+(new Date(item).getDate())+"/"+new Date(item).getFullYear())
        setNewValue(item)
    }
    

    return (
        <div className=' relative ' > 
            {user?.dob && 
                <div className={` ${value && " hidden "} w-full border rounded-md z-20 bg-white relative py-[10px] px-4 `} >
                    <label 
                    onClick={() => {
                        dateRef.current.showPicker();
                    }} className=" cursor-pointer relative w-full z-20 bg-white " >
                    {value ? new Date(value).getDate()+"/"+(Number(new Date(value).getMonth()+1)+"".length > 1 ? "0"+(Number(new Date(value).getMonth()+1)) :(Number(new Date(value).getMonth()+1)))+"/"+new Date(value).getFullYear() :user?.dob} 
                    </label>
                </div>
            }
            <input  
                // {...register("dob")} 
                onChange={(e)=> handleChange(e.target?.value)}
                className={` ${(user?.dob && !value) && " absolute top-0 opacity-95 " } w-full rounded-lg border border-gray-400 outline-chasescrollBlue px-3 py-2 text-chasescrollTextGrey`}
                // placeholder={placeholder} 
                data-date="DD MMMM YYYY" type="date" ref={dateRef}   />
            {errors["dob"] && <p className='text-red-500 text-sm'>{errors["dob"]?.message as string}</p> }
        </div>
    )
}

export default DatePicker
