import React, { useState } from "react"
import { Currencies } from "@/constants"
import { CancelIcon } from "@/components/Svgs"
import PageWrapper from "@/components/PageWrapper"
import { previousPage } from "@/constants"

function CurrencySelectionForm() {
  const [selectedCurrency, setSelectedCurrency] = useState(Currencies[0].code)

  const handleCurrencyChange = event => {
    setSelectedCurrency(event.target.value)
  }

  return (
    <PageWrapper>
      {() => (
        <div className="mb-[100px]">
          <div className="flex items-center mb-4 py-4 px-4">
            <span
              className="pr-6 text-gray-500 cursor-pointer"
              onClick={() => previousPage()}
            >
              {" "}
              {CancelIcon()}{" "}
            </span>
            <p className="text-chasescrollTextGrey text-xl">Select Currency</p>
          </div>
          <div className="px-4 sm:px-6">
            {Currencies.map(({ currencyCode, currencyName, flag }) => (
              <div
                className="flex justify-between my-2 py-2 hover:bg-blue-100 hover:bg-opacity-30 items-center"
                key={currencyCode}
                onClick={() => handleSettingClick()}
              >
                <div className="flex items-center">
                  <span className="mr-4">{flag}</span>
                  <div>
                    <p className="my-0">{currencyCode}</p>
                    <p className="my-0 text-xs text-gray-500 cursor-pointer">
                      {currencyName}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="pr-4 sm:pr-6 text-gray-500 cursor-pointer">
                    <input
                      type="radio"
                      name={currencyCode}
                      value={currencyCode}
                      checked={selectedCurrency === currencyCode}
                      onChange={handleCurrencyChange}
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default CurrencySelectionForm
