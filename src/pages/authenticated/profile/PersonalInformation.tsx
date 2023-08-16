/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import { ChevronLeft } from "@/components/Svgs";
import { previousPage } from "@/constants/index";
import { useAuth } from "../../../context/authContext";
import { useFetch } from "../../../hooks/useFetch";
import { toast } from "react-toastify";
import ButtonSpinner from "../../../components/ButtonSpinners";
import { UPDATE_PROFILE } from "../../../constants/endpoints.constant";
import { useMutation, useQuery } from "react-query";
import httpService from "@/utils/httpService";
import { useForm } from "../../../hooks/useForm";
import { personinforSchema } from "@/services/validations";
import { CustomInput } from "@/components/Form/CustomInput";
import { CustomSelect } from "@/components/Form/CustomSelect";
import SubmitButton from "@/components/Form/SubmitButton";
import { IUser } from "src/models/User";
import { AxiosError, AxiosResponse } from "axios";
import { Button, Select } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import DatePicker from "../../../components/Form/DatePicker";

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

function PersonalInfoForm() {
  const [user, setUser] = React.useState<IUser | null>(null);
  const { token, userId } = useAuth(); 

  const { isLoading: updateLoading, mutate } = useMutation({
    mutationFn: (data: any) => httpService.put('/user/update-profile', data),
    onError: (error: AxiosError<any, any>) => {
      toast.error(error.response?.data);
    },
    onSuccess: (data: AxiosResponse<any>) => {
      console.log(data?.data);
    }
  });
  const dateRef: any = React.useRef(null);

  const { isLoading: profileLoading } = useQuery(
    ["getUserDetails", userId],
    () => httpService.get(`/user/publicprofile/${userId}`),
    {
      onError: (error: AxiosError<any, any>) => {
        toast.error(error.response?.data);
      },
      onSuccess: (data) => {
        setUser(data.data); 
      },
    }
  );

  // React.useState(()=> {
  //   if(data?.data?.dob){
  //     let curr = new Date(data?.data?.dob);

  //     curr.setDate(curr.getDate() + 3);
  //     let date = curr?.toISOString()?.substring(0,10);
  //     console.log(date);
  //   }
  // },[data])
  
  // form
  const { renderForm } = useForm({
    defaultValues: {
      email: user?.email,
      phone: user?.data?.mobilePhone?.value || "",
      gender: user?.data?.gender?.value || "",
      dob: user?.dob || "",  
    },
    validationSchema: personinforSchema,
    submit: (data) => {
      console.log(data);
      
      const obj = {
        // email: user?.email,
        data: {
          mobilePhone: {
            objectPublic: true,
            value: data.phone || user?.data?.mobilePhone?.value ,
          },
          gender: {
            objectPublic: true,
            value: data.gender || user?.data?.gender?.value,
          },
        },
        dob: data?.dob
      };
      mutate(obj);
    },
  });

  // const handleSubmit = async event => {
  //   event.preventDefault()
  //   const data = await sendRequest(
  //     UPDATE_PROFILE,
  //     "PUT",
  //     {
  //       publicProfile: isPhonePublic || isEmailPublic,
  //       email,
  //       data: {
  //         mobilePhone: {
  //           objectPublic: isPhonePublic,
  //           value: phone
  //         },
  //         gender: {
  //           value: gender
  //         },
  //         webAddress: {
  //           objectPublic: isEmailPublic,
  //           value: email
  //         },
  //       }
  //     },
  //     { Authorization: `Bearer ${token}` }
  //   )
  //   if (data) toast.success('Profile updated successfully!');
  // }

  return renderForm(
    <PageWrapper>
      {() => (
        <div className=" w-full items-center justify-center flex flex-col p-4 bg-white">
          <div className="flex items-center w-full mb-4 p-2 ">
            <span
              className="pr-6 text-gray-500 cursor-pointer"
              onClick={() => previousPage()}
            >
              {" "}
              {ChevronLeft()}{" "}
            </span>
            <p className="text-gray-700 text-lg">Personal Information</p>
          </div>

          <div className="w-full sm:w-1/2 overflow-auto">
            <CustomInput name="email" disable={true} placeholder={user?.email ? user?.email : "Email"} type="email" />
            <div className="h-5" />
            <CustomInput name="phone" placeholder={user?.data?.mobilePhone?.value ? user?.data?.mobilePhone?.value : "Phone Number"} type="text" />
            <div className="h-5" /> 
            <CustomSelect
              name="gender"
              option={["Male", "Female", "Other"]}
              placeholder={user?.data?.gender?.value ? user?.data?.gender?.value : "Gender"} 
            />
            <div className="h-5" /> 
            {/* <CustomInput name="dob" 
              placeholder={user?.dob ? user?.dob : "Date of Birth"} type="date" /> */}
            <DatePicker user={user} /> 
            <div className="h-5" />
            <Button
              type="submit"
              w="100%"
              bg="brand.chasescrollButtonBlue"
              color="white"
              height="50px"
              isLoading={updateLoading}
            >
              Save
            </Button>
          </div>

          {/* <form onSubmit={handleSubmit} className="w-full sm:w-1/2 overflow-auto">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="border border-gray-400 p-2 rounded-lg w-full"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                className="border border-gray-400 p-2 rounded-lg w-full"
                placeholder="Enter your phone"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="website"
                className="block font-medium text-gray-700 mb-2"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={handleGenderChange}
                className="  border border-gray-400 p-2 rounded-lg w-full focus:outline-none focus:shadow-outline"
              >
                {GENDERS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-4 bg-blue-">
              <input
                type="date"
                id="name"
                name="name"
                className="border border-gray-400 p-2 rounded-lg w-full bg-blue-100 bg-opacity-50"
                placeholder="Enter your name"
              />
            </div>
           
            

            <div className="my-4">
              <button
                type="submit"
                className="w-full bg-white border border-blue-500 text-blue-500 py-2 px-4 rounded-lg"
              >
                {isLoading ? <ButtonSpinner /> : "Done"}
              </button>
            </div>
          </form> */}
        </div>
      )}
    </PageWrapper>
  );
}

export default PersonalInfoForm;
