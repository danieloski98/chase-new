import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import illustration from "@/assets/svg/sign-in-illustration-2.svg"
import playStore from "@/assets/images/play-store.png"
import appleStore from "@/assets/images/apple-store.png"
import { ONBOARDING_FOOTER } from "@/constants"
import TermsAndConditions from "@/components/onboarding/TermsAndConditions"
import { PATH_NAMES } from "@/constants/paths.constant"
import LoginForm from "@/components/onboarding/LoginForm"
import { GoogleIcon } from "../../../components/Svgs"
import { toast, useToast } from "react-toastify"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth, googleAuthProvider } from "../../../config/firebase"
import { useMutation, useQuery } from "react-query"
import httpService from "@/utils/httpService"
import { AUTH_URL, SIGN_IN_WITH_CREDENTIALS } from "@/constants/endpoints.constant"
import { Input, Spinner } from "@chakra-ui/react"
import { useAuth } from "@/context/authContext"
import OverlayWrapper from "@/components/OverlayWrapper"
import { UPDATE_PROFILE } from "@/constants/endpoints.constant"

const Onboarding = () => {
  const [showTerms, setShowTerms] = useState(false)
  const { login } = useAuth();
  const [showModal, setShowModal] = React.useState(false)
  const [Loading, setLoading] = React.useState(false)
  const [FirstName, setFirstName] = React.useState("")
  const [CheckUsername, setCheckUsername] = React.useState("")
  const [LastName, setLastName] = React.useState("")
  const [UserName, setUserName] = React.useState("") 

  const toggleTermsVisibility = () => setShowTerms(state => !state);

  const [checkData, setCheckData] = React.useState({})

  const navigate = useNavigate()

  // react-querry
  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => httpService.get(`${SIGN_IN_WITH_CREDENTIALS}`, {
      headers: {
        Authorization: `Bearer ${data}`,
      }
    }),
    onSuccess: (data) => {
      console.log(data.data);
      localStorage.setItem('token', data?.data?.access_token);
      toast.success('Signin Successful');
      if(!data?.data?.firstName){ 
        setShowModal(true)
      }  
      setCheckData(data?.data)
    },
    onError: (error) => {
      console.log(error);
      toast.error('An error occured');
    }
  })

  React.useEffect(() => {
    if(checkData?.user_id){
      if(!checkData?.firstName){
        setShowModal(true)
      } else { 
        login(checkData); 
      }
    }
  }, [checkData])

  const signInWithGoogle = React.useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider) 
      const credential = GoogleAuthProvider.credentialFromResult(result); 
      if (credential) { 
        mutate(credential.idToken);
      }
    } catch (error) {
      toast.error(error)
    }
  }, [])

  const handleToast = () => {
    toast.info('Coming soon');
  }

  const {} = useQuery(['username'+UserName], () => httpService.get('/auth/username-check?username='+UserName), {
    onError: (error) => {
        toast.error(error.response?.data);
    }, 
    onSuccess: (data) => { 
      console.log(data?.data?.message); 
      if(data?.data?.message === "Username already exists."){
        setCheckUsername(data?.data?.message)
      } else {
        setCheckUsername("")
      }
    }
  })  
  const changeHandler =async(item)=> {
    // const {} = useQuery(['username'], () => httpService.get('/auth/username-check?username='+item), {
    //     onError: (error) => {
    //         toast.error(error.response?.data);
    //     }, 
    //     onSuccess: (data) => { 
    //       console.log(data);
    //     }
    // })  
  }

  const clickHandler =async()=> {
    setLoading(true); 
    if(!FirstName){
      toast.error("Enter First Name")
    } else if(!LastName) {
      toast.error("Enter Last Name")
    } else if(!UserName) {
      toast.error("Enter User Name")
    } else {  
        const response = await httpService.put(UPDATE_PROFILE, {
          firstName: FirstName,
          lastName: LastName,
          username: UserName,
        }) 
        if (response) { 
          toast.success('Profile updated successfully!'); 
          localStorage.setItem('firstName', FirstName);

          let newObj = {...checkData, firstName: FirstName}

          login(newObj); 
          // navigate("/explore")
        } else {
          toast.error('Something went wrong!');
        } 

    }
    setLoading(false);
  } 

  return (
    <>
      {showTerms ? (
        <TermsAndConditions handleClose={toggleTermsVisibility} />
      ) : (
        <div
          className="flex flex-col gap-10 items-center justify-between pt-16 pb-16 lg:pb-0 w-full"
          style={{ minHeight: "100vh" }}
        >
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-4 items-center justify-between w-full max-w-5xl">
            <div className="px-4 flex flex-col items-center w-full gap-12">
              <div className="w-full max-w-sm h-80">
                <img src={illustration} alt="" className="w-full" />
              </div>
              <div className="w-full max-w-[400px] flex flex-col gap-2">
                <p className="text-2xl md:text-3xl font-medium text-center text-chasescrollDarkBlue">
                  Your well-tailored virtual Community.
                </p>
                <p className="text-2xl md:text-2xl text-center">
                  An efficient ecosystem for event management.
                </p>
              </div>
              <div className="flex gap-5 justify-center flex-wrap">
                <a onClick={handleToast} target="_blank" >
                  <img src={playStore} alt="" />
                </a>
                <a onClick={handleToast} target="_blank" >
                  <img src={appleStore} alt="" />
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full items-center p-4">
              <div className="flex flex-col gap-8 border rounded-b-3xl rounded-tl-3xl p-6 w-full max-w-[463px]">
                <h2 className="text-2xl lg:text-4xl text-chasescrollDarkBlue font-bold text-center">
                  Chasescroll
                </h2>
                <p className="text-md font-normal text-center">
                  Welcome back, login to your account
                </p>
                <LoginForm />
              </div>
              <button
                onClick={signInWithGoogle}
                className="flex gap-4 bg-gray-200 items-center justify-center rounded-lg px-12 py-2.5 font-bold text-sm cursor-pointer"
              >
                {
                  isLoading && <Spinner />
                }
                { !isLoading && (
                  <>
                    <GoogleIcon />
                    Sign in with Google
                  </>
                )}
              </button>
              <small className="text-chasescrollTextGrey text-center">
                <span className="font-bold">Create a page</span> for events,
                Community and Business.
              </small>
            </div>
          </div>
          <div className="hidden lg:flex flex-col gap-4 w-full pb-4">
            <div className="w-full border"></div>
            <div className="flex gap-4 justify-center items-center text-sm text-center text-chasescrollTextGrey">
              {ONBOARDING_FOOTER.map((item, index) =>
                item.path === "/" ? (
                  <a
                    key={index}
                    href={item.path}
                    className="text-chasescrollBlue"
                  >
                    {item.label}
                  </a>
                ) : (
                  <a key={index}
                    href={item.path}
                    className="hover:text-chasescrollBlue"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>
          {showModal && ( 
            <OverlayWrapper>
            <div className=" w-[500px] bg-white rounded-lg " >
              <div className=" w-full bg-white rounded-lg flex flex-col gap-4 px-6 py-5" >
                <p className=" font-semibold text-xl " >Add User Information To Continue</p>
                <div className=" w-full flex flex-col gap-2 mt-6 " >
                  <p>First Name</p>
                  <Input onChange={(e)=> setFirstName(e?.target?.value)} />
                </div>
                <div className=" w-full flex flex-col gap-2  " >
                  <p>Last Name</p>
                  <Input onChange={(e)=> setLastName(e?.target?.value)} />
                </div>
                <div className=" w-full flex flex-col gap-2  " >
                  <p>Username</p>
                  <Input onChange={(e)=> setUserName(e?.target?.value)} />
                  {CheckUsername && 
                    <p className=" text-sm text-chasescrollRed -mt-1 " >{CheckUsername}</p>
                  }
                </div>
                <button disabled={(!FirstName || !LastName || UserName?.length < 3 || CheckUsername) ? true : false} onClick={()=> clickHandler()} className=" w-full h-[45px] bg-chasescrollBlue text-white disabled:opacity-25 rounded-md mt-6 font-semibold " >{Loading ? "Loading..." : "Update Information"}</button>
              </div>
            </div>
          </OverlayWrapper>
          )}
        </div>
      )}
    </>
  )
}

export default Onboarding
