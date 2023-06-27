import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import OverlayWrapper from "../OverlayWrapper"
import {
  CaretLeftIcon,
  EmojiIcon,
  GalleryIcon,
  ThumbsUp,
  VideoIcon,
} from "../Svgs"
import profilePhoto from "@/assets/svg/profile-photo.svg"
import { CREATE_POST, UPLOAD_IMAGE, UPLOAD_VIDEO } from "../../constants/endpoints.constant"
import { useFetch } from "../../hooks/useFetch"
import { useAuth } from "../../context/authContext"
import { compressFile } from "./FileCompressor"
import { toast } from "react-toastify"
import { videoConfig } from "../../constants"

const UploadImage = ({ toggleFileUploader }) => {
  const [imageSrc, setImageSrc] = useState(null)
  const [videoSrc, setVideoSrc] = useState(null)
  const [caption, setCaption] = useState("")
  const [showCaption, setShowCaption] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [count, setCount] = useState(caption.length ?? 0)
  const [postFile, setPostFile] = useState(null)
  const { sendRequest } = useFetch()
  const { userName, userId, token } = useAuth()
  // const ReactS3Client = new S3(videoConfig);

  const handleChange = ({ target: { value } }) => {
    setCaption(value)
  }

  const toggleCaption = () => setShowCaption(state => !state)

  const createPost = async () => {
    // const compressedFile = await compressFile(postFile)
    const formData = new FormData();
    formData.append("file", postFile);
    console.log({ postFile });

    const mediaType = postFile.type;

    if (mediaType.startsWith('video/')) {
      sendRequest(
        `${UPLOAD_VIDEO}${userId}`,
        "POST",
        formData,
        { Authorization: `Bearer ${token}` },
        true
      ).then((data) => {
        sendRequest(
          CREATE_POST,
          "POST",
          {
            text: caption,
            mediaRef: data?.fileName,
            sourceId: userId,
            type: "WITH_VIDEO_POST"
          },
          { Authorization: `Bearer ${token}` },
        ).then(() => {
          setSubmitted(state => !state)
          toast.success("Post created successfully!")
        })
      })
    } else if (mediaType.startsWith('image/')) {
      sendRequest(
        `${UPLOAD_IMAGE}${userId}`,
        "POST",
        formData,
        { Authorization: `Bearer ${token}` },
        true
      ).then((data) => {
        sendRequest(
          CREATE_POST,
          "POST",
          {
            text: caption,
            mediaRef: data?.fileName,
            sourceId: userId,
            type: "WITH_IMAGE"
          },
          { Authorization: `Bearer ${token}` },
        ).then(() => {
          setSubmitted(state => !state)
          toast.success("Post created successfully!")
        })
      })
    } else {
      toast.error('File is not an image or video.');
    }
  }

  useEffect(() => {
    setCount(caption.length)
  }, [caption])

  function handleFileInputChange(event) {
    const file = event.target.files[0]
    setPostFile(file)

    const mediaType = file.type;

    if (mediaType.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setVideoSrc(null);
      setImageSrc(imageUrl);
      console.log({ imageUrl });
    } else if (mediaType.startsWith('video/')) {
      const videoUrl = URL.createObjectURL(file);
      setImageSrc(null);
      setVideoSrc(videoUrl);
      console.log({ videoUrl });
    }
  }

  const goBack = () => setImageSrc("")

  return (
    <OverlayWrapper handleClose={toggleFileUploader}>
      <div className="p-4">
        {submitted ? (
          <div className="flex flex-col rounded-xl bg-white">
            <p className="text-center p-2.5 rounded-t-xl border-t border-x border-opacity-30 text-chasescrollTextGrey">
              Shared
            </p>
            <div className="text-chasescrollTextGrey border-x border-b flex items-center justify-center border border-opacity-30 w-full max-w-sm px-20 py-16 rounded-b-xl shadow-lg">
              <div className="w-full max-w-[184px] flex flex-col items-center justify-center gap-4">
                <div className="flex">
                  <ThumbsUp />
                </div>
                <p className="text-center">Your post is live</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {imageSrc || videoSrc ? (
              <div className="w-full max-w-[434px] min-h-[350px] rounded-lg flex flex-col shadow-xl border-t border-opacity-30">
                <div className="flex justify-between items-center rounded-t-lg bg-white pl-3 pr-5 py-3 border-x">
                  <span
                    className="p-1 cursor-pointer basis-1/4 flex justify-start"
                    onClick={showCaption ? toggleCaption : goBack}
                  >
                    <CaretLeftIcon />
                  </span>
                  {
                    <p className="basis-2/4 flex justify-center text-center">
                      Create Post
                    </p>
                  }
                  {!showCaption ? (
                    <button
                      onClick={toggleCaption}
                      className="basis-1/4 flex justify-end text-sm text-chasescrollBlue cursor-pointer"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={createPost}
                      className="basis-1/4 flex justify-end text-sm text-chasescrollBlue cursor-pointer"
                    >
                      Create
                    </button>
                  )}
                </div>
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt="Selected file"
                    className={`w-full ${showCaption ? "h-80" : "h-full"
                      } object-cover ${!showCaption && "rounded-b-lg"}`}
                  />
                )}
                {videoSrc && (
                  <video controls src={videoSrc} className="w-full h-80"></video>
                )}

                {showCaption && (
                  <div className="flex flex-col gap-2 px-5 pt-3 pb-4 bg-white rounded-b-lg">
                    <div className="flex gap-2 items-center">
                      <img
                        src={profilePhoto}
                        alt=""
                        className="rounded-full w-14"
                      />
                      <h1 className="text-xl font-medium">{userName}</h1>
                    </div>
                    <textarea
                      className="py-2 outline-none text-sm"
                      value={caption}
                      onChange={handleChange}
                      maxLength={500}
                      cols={4}
                      placeholder="Write something about  your post"
                    />
                    <div className="flex justify-between items-center text-chasescrollGrey">
                      <EmojiIcon />
                      <p className="text-xs">{`${count}/500`}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-chasescrollTextGrey flex items-center justify-center bg-white border border-opacity-30 w-full max-w-sm p-16 rounded-xl shadow-lg">
                <div className="w-full max-w-[200px] flex flex-col items-center justify-center gap-4">
                  <div className="flex">
                    <GalleryIcon />
                    <VideoIcon />
                  </div>
                  <p className="text-center">
                    You can drag your pictures and video here
                  </p>
                  <label
                    htmlFor="file"
                    className="text-white px-4 py-2.5 w-full rounded-md bg-chasescrollBlue text-sm"
                  >
                    <input
                      id="file"
                      type="file"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    Select from your desktop
                  </label>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </OverlayWrapper>
  )
}

UploadImage.propTypes = {
  toggleFileUploader: PropTypes.func,
}

export default UploadImage
