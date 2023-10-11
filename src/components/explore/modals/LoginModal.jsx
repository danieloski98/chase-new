import React from 'react'
import OverlayWrapper from '../../../components/OverlayWrapper'
import LoginForm from '../../../components/onboarding/LoginForm'
import { Input, Spinner } from '@chakra-ui/react'
import { GoogleIcon } from '../../../components/Svgs'
import { useAuth } from '../../../context/authContext'
import httpService from '../../../utils/httpService'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from 'react-query'
import { auth, googleAuthProvider } from "../../../config/firebase"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { SIGN_IN_WITH_CREDENTIALS, UPDATE_PROFILE } from '../../../constants/endpoints.constant'

function LoginModal(props) {

    const {
        modal,
        handleClose
    } = props

    const [showModal, setShowModal] = React.useState(false)
    const { login } = useAuth();

    const [checkData, setCheckData] = React.useState({})
    const [UserName, setUserName] = React.useState("") 
    const [Loading, setLoading] = React.useState(false)
    const [CheckUsername, setCheckUsername] = React.useState("")
    const [FirstName, setFirstName] = React.useState("") 
    const [LastName, setLastName] = React.useState("") 

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
            if (!data?.data?.firstName) {
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
        if (checkData?.user_id) {
            if (!checkData?.firstName) {
                setShowModal(true)
            } else {
                login(checkData);
                handleClose()
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

    const { } = useQuery(['username' + UserName], () => httpService.get('/auth/username-check?username=' + UserName), {
        onError: (error) => {
            console.error(error.response?.data);
        },
        onSuccess: (data) => {
            console.log(data?.data?.message);
            if (data?.data?.message === "Username already exists.") {
                setCheckUsername(data?.data?.message)
            } else {
                setCheckUsername("")
            }
        }
    })

    const clickHandler = async () => {
        setLoading(true);
        if (!FirstName) {
            toast.error("Enter First Name")
        } else if (!LastName) {
            toast.error("Enter Last Name")
        } else if (!UserName) {
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

                let newObj = { ...checkData, firstName: FirstName }

                login(newObj);
                // navigate("/explore")
                handleClose()
            } else {
                toast.error('Something went wrong!');
            }

        }
        setLoading(false);
    }
    return (
        <OverlayWrapper handleClose={handleClose} >

            {!showModal && (
                <div className=' w-[500px] bg-white ' >
                    <div className="flex flex-col gap-4 w-full items-center p-4">
                        <div className="flex flex-col gap-8 border rounded-b-3xl rounded-tl-3xl p-6 w-full max-w-[463px]">
                            <h2 className="text-2xl lg:text-4xl text-chasescrollDarkBlue font-bold text-center">
                                Chasescroll
                            </h2>
                            <p className="text-md font-normal text-center">
                                Welcome back, login to your account
                            </p>
                            <LoginForm modal={false} close={handleClose} />
                        </div>
                        <button
                            onClick={signInWithGoogle}
                            className="flex gap-4 bg-gray-200 items-center justify-center rounded-lg px-12 py-2.5 font-bold text-sm cursor-pointer"
                        >
                            {
                                isLoading && <Spinner />
                            }
                            {!isLoading && (
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
            )}

            {showModal && (
                <div className=" w-[500px] bg-white rounded-lg " >
                    <div className=" w-full bg-white rounded-lg flex flex-col gap-4 px-6 py-5" >
                        <p className=" font-semibold text-xl " >Add User Information To Continue</p>
                        <div className=" w-full flex flex-col gap-2 mt-6 " >
                            <p>First Name</p>
                            <Input onChange={(e) => setFirstName(e?.target?.value)} />
                        </div>
                        <div className=" w-full flex flex-col gap-2  " >
                            <p>Last Name</p>
                            <Input onChange={(e) => setLastName(e?.target?.value)} />
                        </div>
                        <div className=" w-full flex flex-col gap-2  " >
                            <p>Username</p>
                            <Input onChange={(e) => setUserName(e?.target?.value)} />
                            {CheckUsername &&
                                <p className=" text-sm text-chasescrollRed -mt-1 " >{CheckUsername}</p>
                            }
                        </div>
                        <button disabled={(!FirstName || !LastName || UserName?.length < 3 || CheckUsername) ? true : false} onClick={() => clickHandler()} className=" w-full h-[45px] bg-chasescrollBlue text-white disabled:opacity-25 rounded-md mt-6 font-semibold " >{Loading ? "Loading..." : "Update Information"}</button>
                    </div>
                </div>
            )}
        </OverlayWrapper>
    )
}

export default LoginModal
