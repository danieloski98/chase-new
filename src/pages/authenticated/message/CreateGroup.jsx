import React, { useEffect, useState } from "react"
import PageWrapper from "../../../components/PageWrapper"
import { ArrowRight, CaretLeftIcon } from "../../../components/Svgs"
import { CLOSE_ENTITY } from "../../../constants"
import { PATH_NAMES } from "../../../constants/paths.constant"
import profilePhoto from "../../../assets/images/avatar.png"
import { Link } from "react-router-dom"
import ProfilePhoto from "../../../components/ProfilePhoto"
import { useAuth } from "../../../context/authContext"
import { useFetch } from "../../../hooks/useFetch"
import { GET_CHAT, GET_USER_CONNECTION_LIST, UPLOAD_IMAGE } from "../../../constants/endpoints.constant"
import CONFIG from "../../../config"
import { toast } from "react-toastify"

const CreateGroup = () => {
  const [showMembers, setShowMembers] = useState(false)
  const [members, setMembers] = useState([])
  const [image, setImage] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedMembers, setSelectedMembers] = useState([])
  const [users, setUsers] = useState(selectedMembers?.map(member => member?.userId))
  const [groupInfo, setGroupInfo] = useState({
    image: "",
    name: "",
    type: "GROUP",
    users: []
  })

  const toggleMembers = () => setShowMembers(state => !state)
  const handleSelect = (checked, id) => {
    setMembers(members.map(member => member?.userId === id ? ({
      ...member,
      isChecked: checked
    }) : member))
  }
  const handleChange = ({ target: { name, value } }) => {
    setGroupInfo(info => ({
      ...info,
      [name]: value
    }))
  }

  const { token, userId } = useAuth()
  const { sendRequest } = useFetch()

  const getConnections = async () => {
    const data = await sendRequest(
      `${GET_USER_CONNECTION_LIST}${userId}`,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) setMembers(data?.map(member => ({
      ...member,
      isChecked: false
    })))
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  }

  const createGroupChat = () => {
    const formData = new FormData();
    formData.append("file", image);

    sendRequest(
      `${UPLOAD_IMAGE}${userId}`,
      "POST",
      formData,
      { Authorization: `Bearer ${token}` },
      true
    ).then((response) => {
      setGroupInfo(info => ({
        ...info,
        image: response?.fileName
      }))
      sendRequest(
        GET_CHAT,
        "POST",
        groupInfo,
        { Authorization: `Bearer ${token}` }
      ).then(() => {
        toast.success("Group chat created successfully")
        setTimeout(() => {
          window.location.pathname = PATH_NAMES.message
        }, 2000)
      })
    })
  }

  useEffect(() => {
    getConnections()
  }, [])

  useEffect(() => {
    setSelectedMembers(members?.filter(member => member.isChecked))
  }, [members])

  useEffect(() => {
    setGroupInfo(info => ({
      ...info,
      users: selectedMembers?.map(member => member?.userId)
    }))
  }, [selectedMembers])

  return (
    <PageWrapper>
      {() => (
        <div className="p-8 h-full w-full">
          {showMembers ? (
            <div className="w-full h-full flex justify-center items-center">
              <div className="p-8 w-full max-w-lg shadow-lg h-80 rounded-lg overflow-auto">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center text-xl">
                    <div className="flex gap-6 text-xl">
                      <p className="cursor-pointer" onClick={toggleMembers}>
                        {CLOSE_ENTITY}
                      </p>
                      <p className="">New Group Chat</p>
                    </div>
                    {selectedMembers?.length > 0 && (
                      <p
                        className="cursor-pointer font-semibold text-chasescrollBlue p-2 text-xs"
                        onClick={toggleMembers}
                      >
                        Done
                      </p>
                    )}
                  </div>
                  <input
                    type="text"
                    className="border rounded-lg "
                    placeholder="Search"
                  />
                  <div className="flex gap-2 items-center flex-wrap">
                    {selectedMembers?.map(profile => (
                      <div key={profile?.userId} className="rounded-full flex items-center gap-1 p-1 bg-chasescrollNavyLight border border-chasescrollBlue">
                        <img
                          src={`${CONFIG.RESOURCE_URL}${profile?.data?.imgMain?.value}`}
                          alt="profile icon"
                          className="w-6 h-6 rounded-full"
                        />
                        <small className="text-[10px]">{profile?.username}</small>
                      </div>
                    ))}
                  </div>
                  {members?.map(profile => (
                    <div
                      className="flex justify-between items-center gap-2"
                      key={profile?.userId}
                    >
                      <Link
                        to={`${PATH_NAMES.profile}/${profile.userId}`}
                        className="flex gap-2 items-center"
                      >
                        <img
                          src={`${CONFIG.RESOURCE_URL}${profile?.data?.imgMain?.value}`}
                          className="rounded-b-full rounded-tl-full object-cover w-12 h-12 border border-chasescrollBlue"
                          alt="connection"
                        />
                        <div className="inline-flex flex-col">
                          <p className="text-l text-black-800">
                            {profile?.firstName} {profile?.lastName}
                          </p>
                          <small className="text-gray-500">@{profile?.username}</small>
                        </div>
                      </Link>
                      <input
                        type="checkbox"
                        checked={profile?.isChecked}
                        onChange={(event) => handleSelect(event.target.checked, profile?.userId)}
                        className="w-5 h-5 accent-purple-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-20">
              <div className="flex w-full text-xl relative text-center">
                <Link to={PATH_NAMES.message} className="absolute top-0 left-0">
                  <CaretLeftIcon />
                </Link>
                <div className="text-center w-full">Create Group Chat</div>
              </div>
              <input
                id="file"
                type="file"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <div className="flex flex-col w-full items-center gap-4">
                <div className="w-24 h-24 border-4 border-chasescrollBlue rounded-b-full rounded-tl-full">
                  {selectedImage ? <img
                    src={selectedImage}
                    alt="group image"
                    className="object-cover w-full h-full rounded-b-full rounded-tl-full"
                  /> : (
                    <div className="object-cover w-full h-full rounded-b-full rounded-tl-full bg-slate-500" />
                  )}
                </div>
                <label
                  htmlFor="file"
                  className="rounded-md"
                >
                  <p className="text-chasescrollBlue font-semibold text-lg cursor-pointer">
                    Add Photo
                  </p>
                </label>
                <small className="text-xs text-chasescrollTextGrey">
                  Fill group details
                </small>
                <input
                  type="text"
                  className="w-full max-w-sm border border-purple-500 rounded-xl shadow-sm"
                  placeholder="Group Name"
                  name="name"
                  value={groupInfo.name}
                  onChange={handleChange}
                />
                {/* <input
                  type="text"
                  className="w-full max-w-sm border border-purple-500 rounded-xl shadow-sm h-10"
                  placeholder="we share so many goodies available "
                /> */}
                <div
                  onClick={toggleMembers}
                  className="cursor-pointer items-center flex justify-between text-chasescrollBlue w-full max-w-sm border border-purple-500 rounded-xl shadow-sm px-4 py-2"
                >
                  {selectedMembers?.length > 0
                    ? selectedMembers?.length === 1
                      ? `${selectedMembers?.length} member selected`
                      : `${selectedMembers?.length} members selected`
                    : 'Select members'}
                  <ArrowRight />
                </div>
                <button onClick={createGroupChat} className="bg-chasescrollBlue p-2.5 rounded-xl text-white w-full max-w-sm">
                  Create group Chat
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  )
}

export default CreateGroup
