import React from "react"
import { TERMS_OF_USE } from "@/constants"
import PageWrapper from "@/components/PageWrapper"

const TermsAndConditions = () => {
  return (
    <PageWrapper>
      {() => (
        <div className="px-4 mb-[100px]">
          <h1 className="w-full text-center text-gray-700 text-2xl my-4">
            Terms And Conditions
          </h1>
          {TERMS_OF_USE.map(({ label, content, id }) => (
            <p className="text-gray-500 my-4" key={id}>
              <span className="text-gray-600">{label} </span>
              {content}
            </p>
          ))}
        </div>
      )}
    </PageWrapper>
  )
}

export default TermsAndConditions
