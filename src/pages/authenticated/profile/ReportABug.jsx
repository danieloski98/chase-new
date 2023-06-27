import React, { useState } from "react"
import { ChevronLeft } from "@/components/Svgs"
import PageWrapper from "@/components/PageWrapper"
import { previousPage } from "@/constants/index"
import ReportBugPopUp from "@/pages/authenticated/profile/modals/ReportBugPopUp"

function ReportABug() {
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [component, setComponent] = useState(null)

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleTextChange = event => {
    setText(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // TODO: Handle form submission
    let appreciation = <ReportBugPopUp />
    setComponent(appreciation)
    setText("")
    setTitle("")
  }

  const isDisabled = !title || !text

  return (
    <PageWrapper>
      {() => (
        <>
          <div className="flex items-center w-full my-4 px-6 ">
            <span
              className="pr-6 text-gray-500 cursor-pointer"
              onClick={() => previousPage()}
            >
              {" "}
              {ChevronLeft()}{" "}
            </span>
          </div>
          <div className="max-w-4xl mx-auto p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="border border-gray-400 p-2 rounded-lg w-full"
                    placeholder="Bug Type"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <textarea
                  id="text"
                  name="text"
                  className="border border-gray-400 p-2 rounded-lg w-full h-48 resize-none"
                  placeholder="Please provide some details"
                  maxLength={300}
                  value={text}
                  onChange={handleTextChange}
                />
                <div className="flex justify-end text-gray-500 text-sm mt-2">
                  {text.length} / 300
                </div>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  disabled={isDisabled}
                  className={`${isDisabled
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-chasescrollBlue hover:bg-blue-600"
                    } w-full text-white py-2 px-4 rounded-lg`}
                  onClick={handleSubmit}
                >
                  Submit Suggestion
                </button>
              </div>
            </form>
          </div>
          {component}
        </>
      )}
    </PageWrapper>
  )
}

export default ReportABug
