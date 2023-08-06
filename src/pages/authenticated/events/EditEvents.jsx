import React, { useState } from "react"
import CreateEventsHeader from "@/components/events/CreateEventsHeader"
import EventTheme from "@/components/events/EventTheme"
import EventTicket from "@/components/events/EventTicket"
import EventInfo from "@/components/events/EventInfo"
import { CREATE_EVENT_HEADER } from "@/constants/index"
import { useAuth } from "../../../context/authContext"
import { useFetch } from "../../../hooks/useFetch"
import {
  CREATE_EVENT,
  CREATE_TICKET,
  UPLOAD_IMAGE,
} from "../../../constants/endpoints.constant"
import { toast } from "react-toastify"

const EditEvents = () => {
  const [activeStep, setActiveStep] = useState(0)
  const { userName, userId, token, eventData } = useAuth()
  const { sendRequest } = useFetch()
  const [formData, setFormData] = useState({
    picUrls: [
      ""
    ],
    eventType: "",
    eventName: "",
    eventDescription: "",
    joinSetting: "public",
    locationType: "",
    currency: "NGN",
    currentPicUrl: "",
    eventFunnelGroupID: "",
    mediaType: "",
    currentVideoUrl: "",
    isPublic: true,
    isExclusive: false,
    mask: false,
    attendeesVisibility: true,
    minPrice: "",
    maxPrice: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    // expirationDate: "",
    location: {
      link: "",
      address: "",
      locationDetails: "",
      latlng: "",
      placeIds: ""
    },
    productTypeData: [
      // first is always standard
      {
        totalNumberOfTickets: null,
        ticketPrice: null,
        ticketType: "", 
        minTicketBuy: null,
        maxTicketBuy: null
      },
    ]
  })
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState('') 

  const handleContinue = () => {
    setActiveStep(prevStep => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    const fd = new FormData();
    fd.append("file", image);

    if (image !== null) {
      const response = await sendRequest(
        `${UPLOAD_IMAGE}${userId}`,
        "POST",
        fd,
        { Authorization: `Bearer ${token}` },
        true
      ) 
      let newObj = {...formData, picUrls: [response?.fileName]}
      handlerPayload(newObj)
    }
  } 

  const handlerPayload = async (item) => { 
    const response = await sendRequest(
      CREATE_EVENT,
      "POST",
      item,
      { Authorization: `Bearer ${token}` }
    ) 
  }

  const handleChange = (index, name, value) => {
    const clone = {...formData}
    if(clone.productTypeData.length-1 < index){
      clone.productTypeData = [...clone.productTypeData, {
        totalNumberOfTickets: null,
        ticketPrice: null,
        ticketType: "", 
        minTicketBuy: null,
        maxTicketBuy: null
      },]
    }
    clone.productTypeData[index][name] = value 

    setFormData(clone)
  }; 

  const handleChangeOther = ({ target: { name, value, type } }) => { 
    if(name === "isPublic" ||name === "attendeesVisibility"){ 
      setFormData(data => ({
        ...data,
        [name]: value === "true" ? true: false
      }));
    } else {
      setFormData(data => ({
        ...data,
        [name]: value
      }));
    }
  };  

  const handleChangeRadio = ({ name, value }) => {  
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  const HandleDeleteTicket =(item)=> {  
    
    let myArr = [...formData?.productTypeData]

    var index = myArr.findIndex(function(o){
      return o.ticketType === item;
    })
    myArr.splice(index, 1);
    setFormData(data => ({
      ...data,
      productTypeData: myArr
    }))
  } 

  const HandleAddTicket =(index)=> {  
    
    let myArr = [...formData?.productTypeData] 
    myArr[index] =  {
      totalNumberOfTickets: null,
      ticketPrice: null,
      ticketType: "", 
      minTicketBuy: null,
      maxTicketBuy: null
    }

    setFormData(data => ({
      ...data,
      productTypeData: myArr
    }))
  } 

  const HandleDeleteAllTicket =(name, price)=> { 
    setFormData(data => ({
      ...data,
      productTypeData: [{
        totalNumberOfTickets: null,
        ticketPrice: price,
        ticketType: name, 
        minTicketBuy: null,
        maxTicketBuy: null
      }]
    }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    console.log({ file });
    if (file) {
      setImage(file)
      setSelectedImage(file.name);
    }
  }


  return (
    <div className="flex flex-col gap-2 md:px-16 pt-8">
      <CreateEventsHeader
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        formData={formData}
      />
      <div className="w-full">
        {activeStep === 0 && (
          <div>
            <EventTheme
              formData={formData}
              handleChange={handleChangeOther}
              handleChangeRadio={handleChangeRadio}
              handleFileChange={handleFileChange}
              handleContinue={handleContinue}
              setImage={setImage}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </div>
        )}
        {activeStep === 1 && (
          <div>
            <EventInfo
              handleChange={handleChangeOther}
              formData={formData}
              handleContinue={handleContinue}
              handleBack={handleBack}
              setFormData={setFormData}
            />
          </div>
        )}
        {activeStep === 2 && (
          <div>
            <EventTicket
              loading={loading}
              HandleDeleteAllTicket={HandleDeleteAllTicket}
              handleChange={handleChange}
              handleChangeOther={handleChangeOther}
              formData={formData}
              HandlerDeleteTicket={HandleDeleteTicket}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              HandleAddTicket={HandleAddTicket}
              handleBack={handleBack}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default EditEvents
