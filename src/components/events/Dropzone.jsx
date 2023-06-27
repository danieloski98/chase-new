import { useDropzone } from "react-dropzone"
import { VideoCameraIcon, PictureIcon } from "@/components/Svgs"

function Dropzone({ open }) {
  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({})

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  return (
    <div className="grid gap-4 py-8">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="text-center ">
          {isDragActive ? (
            <p className="dropzone-content">Release to drop the files here</p>
          ) : (
            <div className="grid place-items-center gap-4">
              <p className="dropzone-content text-sm md:text-sm">
                Drag and Drop Image/Video
              </p>
              <div className="flex items-center justify-center gap-2">
                <VideoCameraIcon />
                <PictureIcon />
              </div>
            </div>
          )}
        </div>
      </div>

      <aside>
        <ul>{files}</ul>
      </aside>
      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={open}
          className="border py-2 px-2 rounded-md text-xs md:text-sm"
        >
          Upload Image/Video
        </button>
      </div>
    </div>
  )
}

export default Dropzone
