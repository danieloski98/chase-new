import  { useState }  from 'react'
import { toast } from "react-toastify" 
import { ClosedEyeIcon, OpenEyeIcon, PictureIcon } from '../../../components/Svgs'
import React from 'react'
import httpService from '../../../utils/httpService'
import { GET_EVENTS_TYPES } from '../../../constants/endpoints.constant'
import { useQuery } from 'react-query'
import { Input, Radio, Select, Textarea } from "@chakra-ui/react"
import CONFIG from '../../../config'

interface Props {
        formData: any,
        handleChange: any,
        handleFileChange: any, 
        handleContinue: any, 
        SaveToDraft: any,
        loading:any
    }

function CreateEventTheme(props: Props) {
    const {
        formData,
        handleChange,
        handleFileChange, 
        handleContinue,  
        loading
    } = props

    const [types, setTypes] = useState([] as any)
     
    const [selectedImageFile, setSelectedImageFile] = React.useState('');   

    const handleImageChange = (e: any ) => {

        const selected = e.target.files[0]; 
        const TYPES = ["image/png", "image/jpg", "image/jpeg" ];        
        if (selected && TYPES.includes(selected.type)) { 
            handleFileChange(e)
            const reader: any = new FileReader();
            reader.onloadend= () => {  
                setSelectedImageFile(reader.result)
            }
            reader.readAsDataURL(selected)
        } else {
            console.log('Error')
        }   
    }  


  const {  } = useQuery(['getEventType'], () => httpService.get(GET_EVENTS_TYPES),{
        onError: (error: any) => {
        toast.error(error.response?.data);
        },
        onSuccess: (data: any) => {  
            setTypes(data?.data)
        }
    });
  
    const clickHandler =()=> {
        if(!formData?.eventName){
            toast.error("Enter Event Name")
        } else if(!formData?.eventType){
            toast.error("Enter Event Type")
        } else if(!formData?.eventDescription){
            toast.error("Enter Event Description")
        } else {
            handleContinue()
        }
    }

    console.log(formData);

    const handleChangeLimit =(e: any,  limit: any)=>{
        if((e.target.value).length <= limit){
            handleChange(e)
        }
    }
    

    return (
        <div className="px-4 mx-auto pt-10 ">
            <div className=' w-full flex flex-col items-center ' >  
                <div className=' lg:max-w-[1000px] w-full' >
                    <h1 className="text-base md:text-xl font-bold">Event Cover Image</h1>
                    <h3 className="text-xs md:text-base md:opacity-50 ">
                        Add photos/posters that describes details of your events. you can add
                        upto 10 images
                    </h3>
                </div>
                <div className=' lg:max-w-[1000px] w-full flex lg:flex-row flex-col items-center justify-center gap-12 py-6 ' >
                    <div className=' w-full flex flex-col gap-4 ' >
                        <div className="flex flex-col items-center gap-4">
                            <div role='button' className="flex justify-center items-center border border-dashed rounded-2xl border-chasescrollPalePurple w-full max-w-[361px] h-[228px]"> 
                                {(!selectedImageFile && !formData?.currentPicUrl) && (
                                    <label role='button' htmlFor="image" className="grid w-full h-full place-items-center gap-4">
                                        <div>
                                            <p className="dropzone-content text-sm md:text-sm">  Click to upload image</p>
                                            <div className="flex justify-center mt-3 gap-2">
                                                {/* <VideoCameraIcon /> */}
                                                <PictureIcon />
                                            </div>
                                        </div> 
                                        <input
                                            type="file"
                                            id="image"
                                            className="hidden"
                                            onChange={handleImageChange}
                                            />
                                    </label>
                                )}  
                                {(selectedImageFile || formData?.currentPicUrl) && (
                                    <label role='button' htmlFor="image" className="w-full h-full  rounded-2xl"> 
                                        <img alt='eventimage' src={!selectedImageFile? CONFIG.RESOURCE_URL+formData?.currentPicUrl : selectedImageFile} className=' rounded-2xl object-cover h-full w-full ' />
                                        <input
                                            type="file"
                                            id="image"
                                            className="hidden"
                                            onChange={handleImageChange}
                                            />
                                    </label>
                                )} 
                            </div>
                            <div className="text-xs text-center text-chasescrollGray flex justify-between w-full">
                                <div>
                                    <h3>Image size:</h3>
                                    <h3>2160 x 1080px</h3>
                                </div>
                                <div>
                                    <h3>Max. file size:</h3>
                                    <h3>10MB</h3>
                                </div>
                                <div>
                                    <h3>Image type:</h3>
                                    <h3>JPEG/PNG</h3>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-base md:text-lg font-bold">
                            Basic Event Details
                            </h1>
                            <h3 className="text-xs md:text-sm text-chasescrollTextGray">
                            This section highlights details that should attract attendees to your event
                            </h3>
                        </div>
                        <div className=' w-full flex flex-col gap-1 ' >
                            <label className=" font-medium text-chasescrollTextGrey "> Event Title <span className="text-chasescrollRed"> *</span></label>
                            <Input
                                name="eventName"
                                onChange={(e)=> handleChangeLimit(e, 50)}
                                value={formData?.eventName} />
                            <p className=' text-sm ' >{formData?.eventName?.length+"/"+50}</p>
                        </div>
                    </div>
                    <div className=' w-full  flex flex-col gap-4 lg:mt-0 mt-4 ' >
                        <div className=' w-full flex flex-col gap-1 ' >
                            <label className=" font-medium text-chasescrollTextGrey "> Event Type</label>
                            <Select 
                                name="eventType"
                                id="eventType"
                                onChange={handleChange}
                                value={formData?.eventType}
                                placeholder='Select Event Type' >
                                {types?.map((type: any) => (
                                    <option value={type}>
                                        {type.split("_").join(" ")}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className=' w-full flex flex-col gap-1 ' >
                            <label className=" font-medium text-chasescrollTextGrey "> Event Description</label>
                            <Textarea
                                id="eventDescription"
                                name="eventDescription"
                                value={formData?.eventDescription}
                                onChange={(e)=> handleChangeLimit(e, 150)}
                                className="outline-none w-full h-20 text-sm"
                            />
                            <p className=' text-sm ' >{formData?.eventDescription?.length+"/"+150}</p>
                        </div>
                        <div className="grid gap-2 ">
                            <h2 className="font-bold text-sm px-0">Join Type</h2>
                            <label htmlFor="publicSetting" className="flex justify-between border-b text-sm p-2 cursor-pointer">
                                <p className="text-sm">
                                    Public
                                </p>
                                <Radio
                                    type="radio"
                                    id="publicSetting"
                                    name="joinSetting"
                                    value="public"
                                    onChange={handleChange}
                                    isChecked={formData?.joinSetting === "public"}

                                />
                            </label>
                            <label htmlFor="privateSetting" className="flex justify-between border-b text-sm p-2 cursor-pointer">
                                <p className="text-sm">
                                    Private
                                </p>
                                <Radio
                                    type="radio"
                                    id="privateSetting"
                                    name="joinSetting"
                                    value="private"
                                    onChange={handleChange}
                                    isChecked={formData?.joinSetting === "private"}
                                />
                            </label>
                        </div>
                        <div className="grid gap-2 ">
                            <h2 className="font-bold text-sm px-0">Event Visibility</h2>
                            <label htmlFor="publicVisibility" className="flex justify-between border-b text-sm p-2 cursor-pointer">
                                <p className="text-sm">
                                    Public
                                </p>
                                <Radio
                                    type="radio"
                                    id="publicVisibility"
                                    name="isPublic"
                                    value={"true"}
                                    onChange={handleChange}
                                    isChecked={formData?.isPublic}
                                />
                            </label>
                            <label htmlFor="privateVisibility" className="flex justify-between border-b text-sm p-2 cursor-pointer">
                                <p className="text-sm">
                                    Private
                                </p>
                                <Radio
                                    type="radio"
                                    id="privateVisibility"
                                    name="isPublic"
                                    value={"false"}
                                    onChange={handleChange}
                                    isChecked={!formData?.isPublic}
                                />
                            </label>
                        </div>
                    </div>
                </div> 
                <div className="grid lg:max-w-[1000px] w-full mb-10 ">
                    <h2 className="font-bold text-sm px-2 mb-3">Attendee Visibility</h2>
                    <div className="flex justify-between">
                        <label htmlFor="showAttendees" className={`flex justify-between rounded w-32 px-4 py-2 cursor-pointer ${formData?.attendeesVisibility ? "bg-chasescrollGray bg-opacity-[45%]" : "border"}`}>
                            <div className="grid">
                                <OpenEyeIcon />
                                <h3>Show</h3>
                            </div> 
                            <Radio
                                type="radio"
                                id="showAttendees"
                                name="attendeesVisibility"
                                value={"true"}
                                onChange={handleChange}
                                isChecked={formData?.attendeesVisibility}
                            />
                        </label>
                        <label htmlFor="hideAttendees" className={`flex justify-between rounded w-32 px-4 py-2 cursor-pointer ${!formData?.attendeesVisibility ? "bg-chasescrollGray bg-opacity-[45%]" : "border"}`}>
                            <div className="grid">
                                <ClosedEyeIcon />
                                <h3>Hide</h3>
                            </div> 
                            <Radio
                                id="hideAttendees"
                                type="radio"
                                name="attendeesVisibility"
                                value={"false"}
                                onChange={handleChange}
                                isChecked={!formData?.attendeesVisibility}
                            />
                        </label>
                    </div>
                </div> 
                <div className="flex items-center justify-center  text-base md:text-lg font-bold my-4">
                    {/* <button onClick={handleBack}>Back</button> */}
                    <button
                    type="submit"
                    className={`hover:text-xl ${!formData?.eventName || 
                        !formData?.eventType ||
                        !formData?.eventDescription ||
                        !formData?.joinSetting ||
                        !formData?.attendeesVisibility
                        ? "text-red-500 transition animate-pulse cursor-not-allowed"
                        : "text-chasescrollBlue"
                        }`}
                    onClick={clickHandler} 
                    id="continueButton"
                    >
                        {loading? "Loading..." : "Continue"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateEventTheme
