import React from 'react'
import OverlayWrapper from '../OverlayWrapper'
import { Box, Heading, Avatar, VStack, Button, HStack, Text, Switch } from '@chakra-ui/react'
import { ICommunity } from '../../models/Communitty'
import CONFIG from '../../config'
import httpService from '../../utils/httpService'
import { UPDATE_GROUP, UPLOAD_IMAGE } from '../../constants/endpoints.constant'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

interface IProps {
    community: ICommunity;
    onClose: () => void
}



const EditCommunity = ({ community, onClose }: IProps) => {
    const [name, setName] = React.useState(community.data.name);
    const [image, setImage] = React.useState(community.data.imgSrc);
    const [description, setDescription] = React.useState(community.data.description);
    const [isCheck, setIsChecked] = React.useState(community.data.isPublic);
    const queryClient = useQueryClient();

    // refs
    const filePickerRef = React.useRef<HTMLInputElement>();
    const fileReader = React.useRef<FileReader>(new FileReader());

    const uploadImage = useMutation({
        mutationFn: (data: FormData) => httpService.post(`${UPLOAD_IMAGE}/${community?.id}`, data),
        onSuccess: (data) => {
            console.log(data.data);
            toast.success("Image uploaded");
            setImage(data.data.fileName);
            
        }
    });

    const updateGroup = useMutation({
        mutationFn: () => httpService.put(`${UPDATE_GROUP}`, {
            groupID: community.id,
            groupData: {
                ...community.data,
                name,
                imgSrc: image,
                description,
                isPublic: isCheck,
                picUrls: [
                    image
                  ],
            }
        }),
        onSuccess: (data) => {
            toast.success(data.data.message);  
            queryClient.invalidateQueries(['GetCom'])
            onClose();      
        }
    });

    React.useEffect(() => {
        const ref = fileReader.current;
        fileReader.current.onload = () => {
            setImage(fileReader.current.result as string);
        }
        return () => ref.removeEventListener('load', () => {
            console.log(`removed`);
        });
    }, []);

    const handleFilePicked = React.useCallback((file: FileList) => {
        fileReader.current.readAsDataURL(file[0]);

        // upload the image
        const formData = new FormData();
        formData.append('file', file[0]);
        uploadImage.mutate(formData);
    }, [uploadImage]);

    const openPicker = React.useCallback(() => {
        filePickerRef.current?.click();
    }, []);

    const updateGroupdInfo = () => {
        updateGroup.mutate()
    }

  return (
    <OverlayWrapper handleClose={onClose}>
        <input type='file' hidden accept='image/*' ref={filePickerRef as any} onChange={(e) => handleFilePicked(e.target.files as FileList)} />
        <VStack padding='20px' width={['100%', '30%']} height='auto' bg='white' shadow='md'>
            <Heading size='md'>Edit Community</Heading>

            <Avatar 
                src={`${CONFIG.RESOURCE_URL}/${image}`}
                name={community?.data.name}
                size='lg'
                cursor='pointer'
                onClick={openPicker}
            />
            <HStack>
                <Text>Make the community Public?</Text>
                <Switch isChecked={isCheck} onChange={() => setIsChecked(prev =>!prev)}></Switch>
            </HStack>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full border border-gray-400 rounded-md mt-6' />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className='w-full border border-gray-400 rounded-md mt-6' />
            <Button onClick={updateGroupdInfo} bg="brand.chasescrollButtonBlue" color='white' width='100%' isLoading={updateGroup.isLoading}>Update</Button>
        </VStack>
    </OverlayWrapper>
  )
}

export default EditCommunity
