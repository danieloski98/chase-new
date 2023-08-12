import React from 'react'
import { Modal, ModalOverlay, ModalBody, ModalContent, ModalCloseButton, ModalHeader, Heading, Input, VStack, Avatar, Text, Box, Spinner, Button } from '@chakra-ui/react'
import { Chat } from '../../../../models/Chat'
import CONFIG from '../../../../config';
import { useMutation, useQueryClient } from 'react-query';
import httpService from '../../../../utils/httpService';
import { UPDATE_CHAT, UPLOAD_IMAGE } from '../../../../constants/endpoints.constant';
import { toast } from 'react-toastify';

interface IProps {
    chat: Chat;
    isOpen: boolean;
    onClose: () => void
}

function EditModal({ chat, isOpen, onClose }: IProps) {
    const [image, setImage] = React.useState(chat.image);
    const [name, setName] = React.useState(chat.name);
    const filePicker = React.useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();

    const uploadImage = useMutation({
        mutationFn: (data: FormData) => httpService.post(`${UPLOAD_IMAGE}/${chat.id}`, data),
        onSuccess: (data) => {
            setImage(data.data.fileName);
        },
        onError: (errror) => {
            console.log(errror);
            toast.error('An error occured while uploading image');
        }
    });

    const update = useMutation({
        mutationFn: (data: any) => httpService.put(`${UPDATE_CHAT}`, data),
        onSuccess: (data) => {
            toast.success("Chat updated");
            queryClient.invalidateQueries(['getGroupInfo']);
            onClose();
        }
    });

    const handleFilePicked = React.useCallback((file: FileList) => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file[0]);
            uploadImage.mutate(formData);
        }
    }, [uploadImage]);

    const handleUpdate = React.useCallback(() => {
        if (uploadImage.isLoading || update.isLoading) return;
        const obj = {
            chatID: chat.id,
            image,
            name,
        }
        update.mutate(obj);
    }, [chat.id, image, name, update, uploadImage.isLoading]);
  return (
   <Modal isOpen={isOpen} onClose={() => onClose()} isCentered>
    <ModalOverlay />
    <ModalContent>
        <ModalCloseButton />
        <ModalHeader> 
            <Heading size='md'>Edit "{chat.name}" group chat</Heading>
        </ModalHeader>
        <ModalBody>
            <input ref={filePicker} type="file" accept='image/*' hidden id='filePicker' onChange={(e) => handleFilePicked(e.target.files as FileList)} />
            <VStack alignItems='center'>
                <Box width='100px' height='100px' borderRadius='50px' overflow='hidden'>
                    {
                        !uploadImage.isLoading && (
                            <Avatar
                                onClick={() => filePicker.current?.click()}
                                cursor='pointer'
                                size='2xl'
                                name={`${chat.name}`} 
                                src={`${CONFIG.RESOURCE_URL}${image}`} width='100%' height='100%' 
                            />
                        )
                    }
                    {
                        uploadImage.isLoading && (
                            <VStack justifyContent='center' alignItems='center'>
                                <Spinner color="brand.chasescrollBlue" size='md' />
                            </VStack>
                        )
                    }
                </Box>
               <VStack width='100%' alignItems='flex-start'>
                <Text>Group name</Text>
                <Input width='100%' height="50px" value={name} onChange={(e) => setName(e.target.value)} />
                <Button type='button' onClick={handleUpdate} isLoading={update.isLoading} width='100%' height='50px' bg='brand.chasescrollBlue' color='white' >Update</Button>
               </VStack>
            </VStack>
        </ModalBody>
    </ModalContent>
   </Modal>
  )
}

export default EditModal