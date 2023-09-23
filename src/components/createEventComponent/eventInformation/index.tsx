import { Checkbox, Input, Select, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { CalendarIcon } from '../../../components/Svgs'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';

interface Props { 
    formData: any, 
    handleChange: any, 
    setFormData: any, 
    handleContinue: any,
    loading?: any
}

function CreateEventInformation(props: Props) {
    const { formData, setFormData, handleContinue } = props 
    const [isLoading, setIsLoading] = useState(false);

    // const [toBeAnnounced, setToBeAnnounced] = useState(false)
    const [selectType, setSelectType] = useState("")

    const handleStartDateSelect = (date: any) => {  
        setFormData((data: any) => ({
        ...data,
        startDate: Date.parse(new Date(date).toJSON()),
        startTime: Date.parse(new Date(date).toJSON())
        }))
    }

    const handleEndDateSelect = (date: any) => {
        console.log(date.toJSON());
        
        setFormData((data: any) => ({
        ...data,
        endDate: Date.parse(new Date(date).toJSON()),
        endTime: Date.parse(new Date(date).toJSON()),
        }))
    } 
    const clickHandler =()=> {
        setIsLoading(true)
        if(!formData?.startDate){
            toast.error("Enter Event Starting Date")
        } else if(!formData?.endDate){
            toast.error("Enter Event Ending Date")
        } else if(!formData?.location?.toBeAnnounced){
            if(!formData?.location?.locationDetails && !formData?.location?.link){
            toast.error("Enter Event Location") 
            }  else {
                handleContinue()
            }
        } else {
            handleContinue()
        } 


        const t2 = setTimeout(() => {
            setIsLoading(false)
            clearTimeout(t2);
        }, 3000);  
    }


    const getValidationInfo =()=> {

        if(!formData?.startDate){
        return true
        } else if(!formData?.endDate){
        return true
        } else if(!formData?.location?.toBeAnnounced){
        if(!formData?.location?.locationDetails && !formData?.location?.link){
        return true
        }
        } else {
        return false || isLoading   
        } 
    }
  
    const handleToBeAnnounced =(event: any)=> {
        if(event?.target?.checked){
            setFormData((data: any) => ({
                ...data,
                location: {
                ...data.location,
                toBeAnnounced: event?.target?.checked,
                link: "",
                locationDetails: ""
            } }))
        } else {
            setFormData((data: any) => ({
                ...data,
                location: {
                ...data.location,
                toBeAnnounced: event?.target?.checked,
                link: "",
                locationDetails: ""
            } }))
        }
    }

    return (
        <div className=' w-full flex flex-col items-center pt-10 px-6 ' > 
            <div className=' lg:max-w-[600px] w-full flex flex-col items-center justify-center gap-4 py-6 ' >
                <div className=' w-full flex lg:flex-row gap-4 flex-col ' > 
                    <div className="w-full flex flex-col gap-2 py-2"> 
                        <p className="text-sm"> 
                            Start <span className="text-[#F04F4F]">*</span>
                        </p>
                        <div className=' flex items-center gap-1 border rounded-lg p-1 px-3 ' >  
                            <CalendarIcon />
                            <DatePicker
                                minDate={new Date()}
                                selected={formData?.startDate? new Date(formData?.startDate):new Date()}
                                onChange={handleStartDateSelect}
                                showTimeSelect 
                                dateFormat="MMM d, yyyy h:mm aa"
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2 py-2"> 
                        <p className="text-sm"> 
                            End <span className="text-[#F04F4F]">*</span>
                        </p>
                        <div className=' flex items-center gap-1 border rounded-lg p-1 px-3 ' >  
                            <CalendarIcon />
                            <DatePicker
                                minDate={new Date(formData?.startDate)}
                                selected={formData?.endDate? new Date(formData?.endDate): new Date()}
                                onChange={handleEndDateSelect}
                                showTimeSelect 
                                dateFormat="MMM d, yyyy h:mm aa"
                            />
                        </div>
                    </div>
                </div>
                <div className=' w-full ' > 
                    {!formData?.location?.toBeAnnounced && (
                        <div className=" w-full ">
                            {/* <h1 className="text-base font-bold">Location Type</h1> */}
                            <div className="">
                                <div className="flex flex-row justify-between items-center py-4 border-t border-b">
                                    <label className="block text-[#667085] font-bold">
                                        Location Type
                                    </label>
                                    <Select
                                        width={"180px"}
                                        h={"45px"}
                                        className="text-sm text-chasescrollDarkBlue" 
                                        onChange={(e)=> setSelectType(e.target.value)}
                                        value={formData?.location?.link ? "Online Location" : formData?.location?.locationDetails ? "Physical Location": ""} >
                                        <option value="">add location</option>
                                        <option>Physical Location</option>
                                        <option>Online Location</option> 
                                    </Select>
                                </div>
                                {(selectType === "Physical Location" || formData?.location?.locationDetails) &&( 
                                    <div className=' w-full mt-4 ' >
                                        <p>Enter Location</p>
                                        <Input
                                            type="text"
                                            h={"45px"}
                                            placeholder="Enter Event Location"
                                            className="border w-full mt-4 text-sm rounded-md text-chasescrollTextGrey p-3"
                                            name="locationDetails"
                                            onChange={({ target: { value } }) => setFormData((data: any) => ({
                                            ...data,
                                            location: {
                                                ...data.location,
                                                locationDetails: value
                                            }
                                            }))}
                                            value={formData?.location?.locationDetails}
                                        />
                                    </div>
                                )} 
                                {(selectType === "Online Location" || formData?.location?.link )&&( 
                                    <div className=' w-full mt-4 ' >
                                        <p className=' mb-2 ' >Enter Location</p>
                                        <Input
                                            type="text"
                                            h={"45px"}
                                            placeholder="Enter Online Link"
                                            className="border w-full text-sm rounded-md text-chasescrollTextGrey p-3"
                                            name="organizer"
                                            onChange={({ target: { value } }) => setFormData((data: any) => ({
                                            ...data,
                                            location: {
                                                ...data.location,
                                                link: value
                                            }
                                            }))}
                                            value={formData?.location?.link}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div> 
                <div className=" w-full flex justify-between border-b py-4 px-2">
                    <label className="text-[#667085]">To be announced</label>
                    <Checkbox
                        type="checkbox"
                        name='toBeAnnounced'
                        className="form-checkbox mt-2 mr-2 h-4 w-4 text-blue-600" 
                        isChecked={formData?.location?.toBeAnnounced}
                        onChange={handleToBeAnnounced}
                    />
                </div> 
                <div className=" w-full mt-3 mb-2">
                    <h1 className="text-base mb-2 font-bold">Venue Details</h1>
                    <Textarea
                        placeholder="Example: Behind Chervon gas station "
                        className="border w-full px-4 py-2 outline-none"
                        rows={4}
                        cols={48}
                        value={formData?.location?.address}
                        onChange={({ target: { value } }) => setFormData((data: any) => ({
                            ...data,
                            location: {
                            ...data.location,
                            address: value
                            }
                        }))}
                    />
                </div> 
                <div className="flex items-center justify-center text-chasescrollBlue  text-base md:text-lg pt-4 font-bold my-4"> 
                    <button
                        type="submit"
                        disabled={getValidationInfo()}
                        className="hover:text-xl disabled:text-red-500 disabled:transition disabled:animate-pulse disabledcursor-not-allowed"
                        onClick={() => clickHandler()}
                        id="continueButton" > 
                        {isLoading ? "Loading..." : "Continue"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateEventInformation
