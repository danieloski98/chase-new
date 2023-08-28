import OverlayWrapper from "../../components/OverlayWrapper"
import Home from "../../pages/authenticated/home"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { CLOSE_ENTITY } from "../../constants"
import { useMutation } from "react-query"
import httpService from "../../utils/httpService"
import { toast } from "react-toastify"
import { Spinner, Button } from '@chakra-ui/react'
import { useForm } from "../../hooks/useForm"
import { reportSchema } from "../../services/validations"
import { CustomInput } from "../../components/Form/CustomInput"
import { CustomTextArea } from "../../components/Form/CustomTextarea"

const reports = [
  'REPORT_BUG', 
  'REPORT_USER', 
  'REPORT_ENHANCEMENT', 
  'REPORT_COMMUNITY',
]

const ReportUser = () => {
  const [reportType, setReportType] = useState("")
  const [title, setTitle] = useState("")
  const [extraInformation, setExtraInformation] = useState("")
  const [count, setCount] = useState(extraInformation.length)
  const navigate = useNavigate()
  const { id } = useParams();

  const { renderForm, values, watch } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    submit: (data: any) => {
      if (reportType === '') {
        toast.warning('You have to select a report type');
        return;
      }

      if (values.description.length > 300) {
        toast.warning('Description must be less than 300 characters');
        return;
      }
      const obj = {
        title: data.title,
        description: data.description,
        reportType,
        typeID: id
      }
      mutate(obj);
    },
    validationSchema: reportSchema
  });

  // mutation
  const { isLoading, mutate } = useMutation({
    mutationFn: (data: any) => httpService.post(`/report/report`, data),
    onSuccess: (data) => {
      console.log(data);
      toast.success('Report posted');
      navigate(-1);
    },
    onError: (error: any) => {
      toast.error('An error occured while sending report, please try again');
    }
  });

  const handleReportTypeChange = ({ target: { value } }) => {
    setReportType(value)
  }
  const closeShareModal = () => navigate(-1)

  useEffect(() => {
    setCount(extraInformation.length)
  }, [extraInformation]);

  return renderForm(
    <>
      <Home />
      <OverlayWrapper handleClose={closeShareModal}>
        <div className="relative flex flex-col items-center mx-4 gap-3 px-6 border border-opacity-10 bg-white shadow-lg pt-8 pb-6 w-full max-w-xl rounded-lg h-auto">
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
                Submit a Report
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
              {reports.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <CustomInput name='title' type="text" isPassword={false} placeholder='Report title' />
            <CustomTextArea name="description" placeholder="Please provide some details" />
            
            <div className="flex w-full justify-end text-chasescrollBlue text-sm">{`${watch('description').length}/300`}</div>
            <Button type="submit" backgroundColor="brand.chasescrollButtonBlue" color='white' isLoading={isLoading}>Submit report</Button>
            
          </div>
        </div>
      </OverlayWrapper>
    </>
  )
}

export default ReportUser
