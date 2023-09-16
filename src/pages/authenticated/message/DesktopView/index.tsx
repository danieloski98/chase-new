import { HStack, VStack, Text, Heading, Skeleton, Input, InputGroup, InputRightElement, Spinner, Image, Flex, Box, InputLeftElement, Textarea } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react'
import { UseQueryResult, useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Chat } from '../../../../models/Chat';
import { PaginatedResponse } from '../../../../models/PaginatedResponse';
import ChatCard from '../Shared/ChatCard';
import ChatHeader from '../Shared/ChatHeader';
import CONFIG from '../../../../config';
import httpService from '../../../../utils/httpService';
import { CREATE_POST, UPLOAD_IMAGE, UPLOAD_VIDEO } from '../../../../constants/endpoints.constant';
import { toast } from 'react-toastify';
import send from "../../../../assets/svg/send-icon.svg"
import selector from "../../../../assets/svg/image.svg"
import Message from '../Shared/Message';
import { FiFileText, FiVideo, FiImage, FiSearch } from 'react-icons/fi';
import Fab, { IList } from '../../../../components/general/Fab';
import PreviewContainer from '../../communities/shared/PreviewContainer';
import PreviewFile from '../../communities/shared/PreviewFile';
import PreviewVideo from '../../communities/shared/PreviewVideo';
import { useSearchParams } from 'react-router-dom'
import useScroller from '../../../../hooks/useScroller';
import { ChatMessage } from '../../../../models/ChatMessage';
import lodash from "lodash"
import TextArea from 'antd/es/input/TextArea';




interface IProps {
    query: UseQueryResult<AxiosResponse<PaginatedResponse<any>>, any>
}

function DesktopChatView({ query }: IProps) {
    const navigate = useNavigate();
    // STATES
    const [chats, setChats] = React.useState<Array<Chat>>([]);
    const [activeChat, setActiveChat] = React.useState<Chat | null>(null);
    const [image, setImage] = useState('');
    const [post, setPost] = useState('');  
    const [search, setSearch] = React.useState(''); 
    const [video, setVideo] = useState('');
    const [file, setFile] =  useState('');
    const [type, setType] = useState('');  
    const [pageNumber, setPageNumber] = React.useState(0);

    // refs
    const filePickerRef = React.useRef<HTMLInputElement>();
    const fileReader = React.useRef<FileReader>(new FileReader());


    // others
    const queryClient = useQueryClient();

    // scroll states
    const [results, setResults] = React.useState<ChatMessage[]>([]);
    const [hasNextPage, setHasNextPage] = React.useState(false);
    const intObserver = React.useRef<IntersectionObserver>();

    React.useEffect(() => {
        setResults([]);
        setPageNumber(0);
        queryClient.invalidateQueries('getmessages');
    }, [activeChat?.id, queryClient])

       // QUERIES
       const getMessages = useQuery(['getMessages', activeChat?.id, pageNumber], () => httpService.get(`/chat/message`, {
        params: {
            chatID: activeChat?.id,
            page: pageNumber,
        }
    }), {
        // refetchInterval: 1000,
        enabled: activeChat !== null,
        onSuccess: (data) => {
            const item: PaginatedResponse<ChatMessage> = data?.data as PaginatedResponse<ChatMessage>
            const arr = [...results, ...item.content];
            setResults(lodash.uniq(arr));
            setHasNextPage(data.data.last ? false:true);
        }
    });


    const [queryParams] = useSearchParams();
    const messageId = queryParams.get('messageId');

    const lastChildRef = React.useCallback((post: any) => {
        if (getMessages.isLoading) return;
        if (intObserver.current) intObserver.current.disconnect();
        intObserver.current = new IntersectionObserver((posts) => {
          if (posts[0].isIntersecting && hasNextPage) {
            setPageNumber(prev => prev + 1); 
          }
        });
        if (post) intObserver.current.observe(post);
       }, [getMessages.isLoading, hasNextPage, setPageNumber]);


    React.useEffect(() => {
        setImage('');
        setPost('');
        setVideo('')
        setFile('');
    }, [activeChat])
    
    
    const ITems: IList[] = [
        {
            title: 'Upload Document',
            action: () => openPicker(),
            icon: <FiFileText fontSize='30px' color='white' />
        },
        {
            title: 'Upload Video',
            action: () => openPicker(),
            icon: <FiVideo fontSize='30px' color='white' />
        },
        {
            title: 'Upload Image',
            action: () => openPicker(),
            icon: <FiImage fontSize='30px' color='white' />
        }
    ];

   

    const getActiveChat = useQuery(['getActiveChat', messageId], () => httpService.get(`/chat/chat`, {
        params: {
            chatID: messageId,
            page: 0,
        }
    }), {
        enabled: messageId !== null && query.isLoading !== true,
        onSuccess: (data) => {
            if (messageId === null) {
                return;
            } else {
                const included = chats.filter((item) => item.id === (data?.data?.content[0] as Chat).id)
                if (included.length > 0) {
                    const newList = chats.filter((item) => item.id !== (data?.data?.content[0] as Chat).id);
                    const arr = [...included, ...newList];
                    setChats(arr);
                } else {
                    const ch = [data?.data?.content[0], ...chats]
                    setChats(ch);
                }
                setActiveChat(data?.data?.content[0]);
            }
        }
    });

    // MUTATIONS

    const videoPost = useMutation({
        mutationFn: () => httpService.post(`/chat/message`, {
            message: post,
            media: video,
            mediaType: 'VIDEO',
            multipleMedia: [
              video,
            ],
            chatID: activeChat?.id,
        }),
        onError: (error) => {
            toast.error(`An error occured`);
        },
        onSuccess: (data) => {
            console.log(data.data)
            toast.success("Message created");
            queryClient.invalidateQueries(['getMessages']);
            queryClient.invalidateQueries(['getChats']);
            setVideo('');
            setPost('');
            setFile('');
            setType('');
            setImage('')
        }
    });

    const filePost = useMutation({
        mutationFn: () => httpService.post(`/chat/message`, {
            message: post,
            media: file,
            mediaType: 'DOCUMENT',
            multipleMedia: [
              file
            ],
            chatID: activeChat?.id,
        }),
        onError: (error) => {
            toast.error(`An error occured`);
        },
        onSuccess: (data) => {
            console.log(data.data)
            toast.success("Message created");
            queryClient.invalidateQueries(['getMessages']);
            queryClient.invalidateQueries(['getChats']);
            setVideo('');
            setPost('');
            setFile('');
            setType('');
            setImage('')
        }
    });

    const Post = useMutation({
        mutationFn: (data: any) => httpService.post(`/chat/message`, data),
        onError: (error) => {
            toast.error(`An error occured`);
        },
        onSuccess: (data) => {
            toast.success("message sent!");
            queryClient.invalidateQueries(['getMessages']);
            queryClient.invalidateQueries(['getChats']);
            setImage('')
            setVideo('');
            setPost('');
            setFile('');
            setType('')
        }
    });

    const uploadImage = useMutation({
        mutationFn: (data: FormData) => httpService.post(`${UPLOAD_IMAGE}/${activeChat?.id}`, data),
        onSuccess: (data) => {
            console.log(data.data);
            toast.success("Image uploaded");
            queryClient.invalidateQueries(['getMessages']);
            setImage(data.data.fileName);
        }
    });

    const uploadVideo = useMutation({
        mutationFn: (data: FormData) => httpService.post(`${UPLOAD_VIDEO}/${activeChat?.id}`, data),
        onSuccess: (data) => {
            console.log(data.data);
            toast.success("Video uploaded");
            queryClient.invalidateQueries(['getMessages']);
            setVideo(data.data.fileName);
            setImage('');
            setFile('')
        }
    });

    const uploadFile = useMutation({
        mutationFn: (data: FormData) => httpService.post(`${UPLOAD_VIDEO}/${activeChat?.id}`, data),
        onSuccess: (data) => {
            console.log(data.data);
            toast.success("File uploaded");
            setFile(data.data.fileName);
            queryClient.invalidateQueries(['getMessages']);
            setImage('');
            setVideo('')
        }
    });


    // EFFECTS
    React.useEffect(() => {
        if (query.isLoading) return;
        if (chats.length < 1 && chats?.length < 1) {
            setChats(query.data?.data.content as Array<Chat>);
        } else {
            setChats(lodash.uniq(query.data?.data.content as Array<Chat>))
            // communities.unshift(...query.data?.data.content as Array<ICommunity>);
            // setCommunities(communities);
        }
    }, [chats, query.data?.data.content, query.isLoading, messageId]);

    // FUNCTIONS
    const openPicker = React.useCallback(() => {
        filePickerRef.current?.click();
    }, []);

    const handleFilePicked = React.useCallback((file: FileList) => {
        if (file[0].type.startsWith('image')) {
            const formData = new FormData();
            formData.append('file', file[0]);
            uploadImage.mutate(formData);
            setType('image');
            return;
        }
        if (file[0].type.startsWith('video')) {
            const formData = new FormData();
            formData.append('file', file[0]);
            uploadVideo.mutate(formData);
            setType('video');
            return;
        }
        if (file[0].type.startsWith('application')) {
            const formData = new FormData();
            formData.append('file', file[0]);
            uploadFile.mutate(formData);
            setType('file');
            return;
        }

        // if (!file[0].type.startsWith('image')) {
        //     toast.warning('You can only upload images');
        // }
        // fileReader.current.readAsDataURL(file[0]);

        // // upload the image
        // const formData = new FormData();
        // formData.append('file', file[0]);
        // uploadImage.mutate(formData);
    }, [uploadFile, uploadImage, uploadVideo]);

    const handlePost = React.useCallback(() => {
        if (Post.isLoading) return;
        if (image === '' && post === '' && video === '' && file === '') return;

        if (type === 'image') {
            const data = image !== '' ? {
                "message": post,
                "media": image,
                "chatID": activeChat?.id,
                "mulitpleMedia": [
                  image
                ],
                "mediaType": "PICTURE"
              } : {
                "message": post,
                "chatID": activeChat?.id,
    
              }
            Post.mutate(data);
        }
        if (type === 'video') {
            videoPost.mutate();
        }
        if (type === 'file') {
            filePost.mutate()
        }

        if (type === '') {
            Post.mutate({
                "message": post,
                "chatID": activeChat?.id,
            })
        }
       
    }, [Post, activeChat?.id, file, filePost, image, post, type, video, videoPost]);

    const chatsCardFilter = React.useCallback(() => {
        return chats
        .filter((item) => {
            if (search === '') {
                return item;
            }
            if (item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || item.otherUser?.username?.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        })
        .sort((a, b) => {
            if (a.lastModifiedDate < b.lastModifiedDate) {
                return 1
            }
            if (a.lastModifiedDate > b.lastModifiedDate) {
                return -1
            }
            return 0;
        })
    }, [chats, search])

  return (
    <HStack display={['none', 'flex']} width='100%' height='100%' gap={0}>

        {/* HIDDEN FILE PICKER */}
        <input className='hidden' type='file' accept='image/*, video/*, application/pdf' ref={filePickerRef as any} onChange={(e) => handleFilePicked(e.target.files as FileList)} />

        {/* SIDEBAR PANEL */}
        <VStack flex={0.3} height='100%' >
            {/* HEADER SECTION */}
            <VStack width='100%' height='auto' paddingBottom='10px' paddingX='20px' borderBottomWidth='1px' borderBottomColor='gray.200'>
                <HStack width='100%' justifyContent='space-between' alignItems='center' height='50px' >
                    <Heading size='md' color='brand.chasescrollButtonBlue'>Chats</Heading>
                    <Text color='brand.chasescrollButtonBlue' cursor='pointer' onClick={() => navigate('create-group')}>Create Group Chat</Text>
                </HStack>

                <InputGroup>
                    <InputLeftElement>
                        <FiSearch fontSize='20px' />
                    </InputLeftElement>

                    <Input type='text' placeholder='Search by group name or username' value={search} onChange={(e) => setSearch(e.target.value)} />
                </InputGroup>
            </VStack>

            {/* HANDLE LOADING STATE */}
            {query.isLoading && (
                    <VStack width='100%' px='20px'>
                        <Skeleton height='100px' width='100%' marginBottom='10px' />
                        <Skeleton height='100px' width='100%' marginBottom='10px' />
                        <Skeleton height='100px' width='100%' marginBottom='10px' />
                        <Skeleton height='100px' width='100%' marginBottom='10px' />
                        <Skeleton height='100px' width='100%' marginBottom='10px' />
                        <Skeleton height='100px' width='100%' marginBottom='10px' />
                    </VStack>
            )}
            <VStack flex={1} height='100%' overflow='auto' width='100%' px='20px'>
                    {
                        chatsCardFilter()
                        .map((chat, i) => (
                            <ChatCard chat={chat} activeChat={activeChat} setSelected={(data: Chat) => setActiveChat(data)} key={i} />
                        ))
                    }
            </VStack>
        </VStack>

        {/* MAIN CHAT AREA */}
        <VStack flex={0.7} id='chatpanel' height='100%' spacing={0} zIndex={1} className='bg-[url("/src/assets/images/chat-bg.png")]'>
        {activeChat === null && (
            <VStack width='100%' height='100%' justifyContent='center' alignItems='center'>
                <Heading color='brand.chasescrollButtonBlue' size='md'>No chat Selected</Heading>
            </VStack>
        )}
        {activeChat !== null && (
            <VStack flex='1' width='100%' height='100%' spacing={0}>
                <ChatHeader chat={activeChat} setActive={(data) => setActiveChat(data)} />

                {/* DESCRRIPTION AND MESSAGE AREA */}
                <Flex flexDirection='column' flex='1' overflow={'auto'} width='100%' height='auto' paddingBottom='100px'  >
                           
                           
                            <Box flex='1' height='100%' width='100%' >
                                {/* <MessagePanel messages={messages} isLoading={getMessages.isLoading} /> */}
                                <Message ref={lastChildRef} isLoading={getMessages.isLoading} messages={results as ChatMessage[]} />
                                
                            </Box>

                            <Box height='100px' />
                        </Flex>

                 {/* INPUT FIELD AREAD */}
                <HStack width='100%' height='70px' alignItems='flex-start' px='20px'>
                    {/* <span className='cursor-pointer mt-3'>
                        <Image src={selector} width='30px' height='30px' onClick={openPicker} />
                    </span> */}
                    <Fab items={ITems} />
                    {/* {
                        uploadImage.isLoading && (
                            <Spinner colorScheme='blue' size='md' />
                        )
                    }
                    { !uploadImage.isLoading && image !== '' && (
                        <Image src={`${CONFIG.RESOURCE_URL}/${image}`} width='60px' height='60px' borderRadius='10px' />
                    )} */}
                            {
                                uploadImage.isLoading && (
                                    <Spinner colorScheme='blue' size='md' marginTop='12px' />
                                )
                            }
                            {
                                uploadVideo.isLoading && (
                                    <Spinner colorScheme='blue' size='md' marginTop='12px' />
                                )
                            }
                             {
                                uploadFile.isLoading && (
                                    <Spinner colorScheme='blue' size='md' marginTop='12px' />
                                )
                            }
                            { !uploadImage.isLoading && image !== '' && (
                                <PreviewContainer src={`${CONFIG.RESOURCE_URL}/${image}`} deleteImg={() => setImage('')} />
                            )}
                            { !uploadVideo.isLoading && video !== '' && (
                                <PreviewVideo src={`${CONFIG.RESOURCE_URL}/${video}`} deleteImg={() => setVideo('')} />
                            )}
                            { !uploadFile.isLoading && file !== '' && (
                                <PreviewFile src={file} deleteImg={() => setFile('')} />
                            )}
                    <InputGroup>
                        <InputRightElement marginRight='10px' marginTop='6px' zIndex={10}>
                            { !Post.isLoading  && <Image src={send} width='30px' height='30px' onClick={handlePost} /> }
                            { Post.isLoading && <Spinner colorScheme='blue' size='md' />}
                        </InputRightElement>
                        {/* <Input value={post} onChange={(e) => setPost(e.target.value)} onKeyDown={(e) => { e.key === 'Enter' && handlePost()}} placeholder='Say something...' flex='1' bg="white" height='55px' borderRadius='20px' /> */}
                        <TextArea value={post} onChange={(e) => setPost(e.target.value)} size='middle' className='rounded-[20px] h-[55px] leading-5 max-h-[110px] pr-16 text-md' onResize={(e) => console.log(e)}  />
                       
                    </InputGroup>
                </HStack>
            </VStack>
        )}
        </VStack>
    </HStack>
  )
}


export default DesktopChatView
