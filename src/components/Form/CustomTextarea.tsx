import { InputElementProps, Textarea } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface IProps {
    name: string;
    placeholder: string
}


export const CustomTextArea = ({ name, placeholder }: IProps) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            <div className="relative w-full">
                <Textarea
                  {...register(name)} 
                  className="w-full h-40 rounded-lg border border-gray-400 outline-chasescrollBlue px-3 py-2 placeholder:text-chasescrollTextGrey text-chasescrollTextGrey"
                  cols={5}
                  rows={7}
                  lang='pt_BR'
                  placeholder={placeholder}
                  resize='none'
                  size='lg'
                />
                
              </div>
              { errors[name] && <p className='text-red-500 text-sm'>{errors[name]?.message as string}</p> }
        </>
    )
}