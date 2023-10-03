import { useToast } from '@chakra-ui/react';
import React from 'react'

type props = {
    type?: boolean,
    hide?: boolean,
    text: string,
}

export default function CopyButtton({ type, text, hide }: props) {

    const [copySuccess, setCopySuccess] = React.useState('');
    const textAreaRef: any = React.useRef(null);
    const toast = useToast()

    function copyToClipboard(item: any) {
        navigator.clipboard.writeText(item)
        // setCopySuccess('Copied!');
        toast({
            title: 'copied successful',
            status: 'success',
            duration: 3000,
            position: "top"
        })
    };

    return (
        <div className=' w-full flex items-center gap-4 ' >
            <textarea
                className=' hidden'
                ref={textAreaRef}
                value={text + ""}
            />
            {!type && (
                <div className=' w-full break-all  lg:gap-0 gap-2 h-[45px] px-4 bg-[#fff] border flex text-sm items-center  border-[#D0D5DD] rounded-lg ' >
                    <p className=' break-all text-[#667085] ' >{text}</p>
                    <div className='  w-fit ml-auto' >

                        <svg role='button' onClick={() => copyToClipboard(text)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="vuesax/linear/copy">
                                <g id="copy">
                                    <path id="Vector" d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="#121212" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path id="Vector_2" d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" stroke="#121212" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </g>
                        </svg> 
                    </div>
                </div>
            )}
        </div>
    )
} 