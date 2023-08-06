import PageWrapper from "../../../components/PageWrapper"
import { GET_CHAT } from "../../../constants/endpoints.constant"
import { useQuery } from "react-query"
import httpService from "../../../utils/httpService"
import { HStack } from "@chakra-ui/react"
import DesktopChatView from "./DesktopView"

const Message = () => {

  const getChats = useQuery(['getChats'], () => httpService.get(`${GET_CHAT}`), {
    onSuccess: (data) => {
      console.log(data.data);
    }
  });


  return (
    <PageWrapper>
      {() => (
       <HStack width='100%' height='100%'>
        <DesktopChatView query={getChats} />
       </HStack>
      )}
    </PageWrapper>
  )
}

export default Message
