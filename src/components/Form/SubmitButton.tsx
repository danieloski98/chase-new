import React from 'react'

function SubmitButton({
    isDisabled = false
}: {
    isDisabled?: boolean
}) {
  return (
    <button
    disabled={isDisabled}
    className={`${isDisabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer"
        } bg-chasescrollBlue text-white py-2.5 text-center rounded-lg font-bold text-xl`}
    >
    Sign Up
     </button>
  )
}

export default SubmitButton