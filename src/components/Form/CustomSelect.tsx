import { InputElementProps } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface IProps {
    isPassword: boolean;
    name: string;
    type: 'text' | 'phone' | 'email' | 'date' | 'password'
    placeholder: string;
    option: string[];
}


export const CustomSelect = ({ isPassword = false, name, type, placeholder, option = [] }: IProps) => {
    const { register, formState: { errors } } = useFormContext();
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <>
            <div className="relative w-full">
                
                <select
                    {...register(name)}
                    className="w-full rounded-lg border border-gray-400 outline-chasescrollBlue px-3 py-2 text-chasescrollTextGrey"
                    placeholder={placeholder}
                >
                    {option.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                    ))}
                </select>
               
              </div>
              { errors[name] && <p className='text-red-500 text-sm'>{errors[name]?.message as string}</p> }
        </>
    )
}