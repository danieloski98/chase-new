import { InputElementProps } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface IProps {
    isPassword: boolean;
    name: string;
    type: 'text' | 'phone' | 'email' | 'date' | 'password'
    placeholder: string
}


export const CustomInput = ({ isPassword = false, name, type, placeholder }: IProps) => {
    const { register, formState: { errors } } = useFormContext();
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <>
            <div className="relative w-full">
                <input
                  {...register(name)}
                  className="w-full rounded-lg border border-gray-400 outline-chasescrollBlue px-3 py-2 text-chasescrollTextGrey"
                  placeholder={placeholder}
                  type={isPassword ? (showPassword ? 'text' : 'password') : type}
                />
                {isPassword && (
                    <div
                    className="absolute right-2 top-2 cursor-pointer text-chasescrollTextGrey opacity-70 pt-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                )}
              </div>
              { errors[name] && <p className='text-red-500 text-sm'>{errors[name]?.message as string}</p> }
        </>
    )
}