import OverlayWrapper from "@/components/OverlayWrapper"
import { THREAD_DATA } from "@/constants"
import ProfilePhoto from "@/components/ProfilePhoto"
import Home from "@/pages/authenticated/home"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { REPORT_TYPE, CLOSE_ENTITY } from "@/constants"

const ReportUser = () => {
  const [reportType, setReportType] = useState("")
  const [extraInformation, setExtraInformation] = useState("")
  const [count, setCount] = useState(extraInformation.length)
  const navigate = useNavigate()

  const handleReportTypeChange = ({ target: { value } }) => {
    setReportType(value)
  }
  const handleExtraInformationChange = ({ target: { value } }) => {
    setExtraInformation(value)
  }
  const closeShareModal = () => navigate("/home")

  useEffect(() => {
    setCount(extraInformation.length)
  }, [extraInformation])

  return (
    <>
      <Home />
      <OverlayWrapper handleClose={closeShareModal}>
        <div className="relative flex flex-col items-center mx-4 gap-3 px-6 border border-opacity-10 bg-white shadow-lg pt-8 pb-6 w-full max-w-xl rounded-lg h-96">
          <div className="bg-white absolute rounded-t-lg flex flex-col gap-2 px-6 py-2 top-0 left-0 w-full">
            <div className=" w-full flex items-stretch">
              <div className="basis-1/4 py-1.5 flex justify-start items-center">
                <span
                  className="cursor-pointer px-2 -ml-2"
                  onClick={closeShareModal}
                >
                  {CLOSE_ENTITY}
                </span>
              </div>
              <div className="basis-2/4 py-3 flex justify-center font-bold">
                Report a User
              </div>
              <div className="basis-1/4 py-3 flex items-center justify-end font-bold text-xs text-chasescrollBlue">
                <span className="cursor-pointer">Select All</span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 max-w-sm w-full h-full">
            <select
              className="outline-none w-full border border-chasescrollPurple border-opacity-30 rounded-md px-4 py-2 text-sm"
              value={reportType}
              onChange={handleReportTypeChange}
            >
              <option value="">-- Report Type --</option>
              {REPORT_TYPE.map(type => (
                <option value={type}>{type}</option>
              ))}
            </select>
            <textarea
              value={extraInformation}
              maxLength={300}
              onChange={handleExtraInformationChange}
              placeholder="Please provide some details"
              className="outline-none w-full h-full border border-chasescrollPurple border-opacity-30 rounded-md px-4 py-2 text-sm"
            />
            <div className="flex w-full justify-end text-chasescrollBlue text-sm">{`${count}/300`}</div>
            <button className="bg-chasescrollBlue font-bold py-2.5 rounded-lg w-full text-white">
              Submit Report
            </button>
          </div>
        </div>
      </OverlayWrapper>
    </>
  )
}

export default ReportUser
