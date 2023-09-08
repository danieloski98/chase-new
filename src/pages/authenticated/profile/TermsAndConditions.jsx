import React from "react"
import { TERMS_OF_USE } from "@/constants"
import PageWrapper from "@/components/PageWrapper"
import { useNavigate } from "react-router-dom"

const TermsAndConditions = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      {() => (
         <div className=" w-full flex flex-col font-normal text-[#1E1E1E] leading-[211.7%] py-8 lg:px-20 px-0 lg:py-20 " >
         <div className=" flex justify-center relative mb-4" >
             <p className=" text-2xl font-bold " >TERMS AND CONDITIONS FOR CHASESCROLL</p>
             <svg className=" absolute z-20 right-0 " onClick={()=> navigate(-1)} role="button" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <g id="close">
                 <path id="Vector" d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="black"/>
                 </g>
             </svg>
         </div><br/><br/>
         These terms and conditions (the “Terms and Conditions”) govern the use of “the Site/App” owned and operated by Chasescroll.
         By using this Site/App, you indicated that you have read these Terms and Conditions and agree to abide by them at all times.
         <br/><br/>
         <span className=" font-bold text-lg " >1. Definitions and Interpretation</span>
         <br/>
         1.1 In this Terms and Conditions:
         <br/>
         1.1.1 “Content” means any information contained within the Site and includes, art, graphics, words;
         <br/>
         1.1.2 “T & C” means these Terms and Conditions for services advertised by Chasescroll and third parties and as may be amended, modified, or supplemented from time to time on the Site/app;
         <br/>
         1.1.3 “User” means a person who opts to use any service on the Chasescroll site.
         <br/>
         1.2 The headings in this T & C are inserted only for convenience and shall not affect its construction.
         <br/>
         1.3 Where appropriate, words denoting a singular number only shall include the plural and vice versa and the words importing one gender shall include the other gender.
         <br/>
         1.4 Reference to any statute or statutory provision includes a reference to the statute or statutory provisions as from time to time amended or extended.
         <br/><br/>
         <span className=" font-bold text-lg " >2. Intellectual Property</span>
         <br/>
         2.1 All Content published and made available on our Site is the property of Chasescroll and the Site’s creators. This includes, but is not limited to images, text, logos, documents files, and anything that contributes to the composition of our Site/App.
         <br/>
         2.2 Users may post the following information on our Site:
         <br/>
         2.2.1 Photos
         <br/>
         2.2.2 Videos; and
         <br/>
         2.2.3 Public comment
         <br/>
         2.3 By posting publicly on our Site, you agree not to act illegally or violate these Terms and Conditions
         <br/>
         3. Accounts
         <br/>
         3.1 Where you create an account on our Site, you agree to the following:
         <br/>
         3.1.1 You are solely responsible for your accounts and the security and privacy of your account, including passwords or sensitive information attached to that account: and
         <br/>
         3.1.2 All personal information you provide to us through your account is up-to-date, and truthful and you will update your personal information if it changes.
         <br/>
         3.2 Chasescroll reserves the right to suspend or terminate your account if you are using our Site illegally or if you violate these Terms and Conditions.
         <br/><br/>
         <span className=" font-bold text-lg " >4 Chasescroll Rules for Users</span><br/>
         Accessing the Chasescroll site means that you have accepted the following terms and conditions;
         <br/>
         4.1.1 You may download and use the Chasescroll application ("Chasescroll app") only for your own use. You must read these Terms and Conditions; and by clicking on the "I Accept" button while installing, downloading, and/or using the Site/App. You agree to the terms and conditions of this Agreement.
         <br/>
         4.1.2 Accessing, downloading, installing, using or copying of the Chasescroll app by you or a third-party on your behalf indicates your agreement to be bound by these Terms and Conditions. If you do not agree to these Terms and Conditions, do not access, download, install, use, or copy the Chasescroll app. In the absence of this Agreement, you have no rights.
         <br/>
         Except as specifically agreed in writing, you shall not:
         <br/> 
         4.1.3 copy, modify, sell or transfer any part of the Chasescroll site/app;
         <br/>
         4.1.4 sublicense or permit simultaneous use of the Chasescroll site/app by more than one user;
         <br/>
         4.1.5 distribute, transfer, or otherwise provide the Chasescroll site/app to a third-party; or
         <br/>
         4.1.6 reverse engineer, decompile, or disassemble the Chasescroll site/app.
         <br/>
         4.1.7 you may not distribute any portion of the Chasescroll site/app.
         <br/><br/>
         <span className=" font-bold text-lg " >5 Payments</span>
         
         <br/>
         3.1 When you provide your payment information, you authorise our use and access to the payment instrument you have chosen and authorise us to charge the amount due to this payment instrument. Should your payment violate any law or these Terms and Conditions, Chasescroll reserves the right to cancel or reverse your transaction.
         <br/><br/>
         <span className=" font-bold text-lg " >3 Refunds</span><br/>
         Refund requests must be made within 48hours of payment and no later than 24hours prior to the event day and a 20% administration fee may apply.
         <br/>
         4 Limitation of Liability
         <br/>
         4.1 In no event shall Chasescroll, its directors, officers, agents, employees, subsidiaries and affiliates be liable for any indirect, incidental, consequential, special or punitive damages of any kind or nature, including, but not limited to, loss of profits or loss of data, for any reason whatsoever, whether such liability is asserted on the basis of contract, tort (including negligence or strict liability), or otherwise.
         <br/>
         4.2 Users are advised not to use any harmful or offensive words when uploading Content. If otherwise, Chasescroll has every right to reject or remove any Content that it considers inappropriate.
         <br/>
         5 Indemnity
         <br/>
         You shall defend, indemnify and hold harmless Chasescroll and their respective directors, officers, agents, employees and volunteers from and against any and all claims, suits, losses, damages, costs, fees and expenses arising out of your use of our Site or your violation of these Terms and Conditions.
         <br/>
         6 User Submissions
         <br/>
         11.1 You agree that you are above 18 years old. You agree to share your number for verification and checking your favorites from contacts purposes. You agree that any material, information, or other communication relating to the Site/App, including all data and other things embodied therein, that you transmit will be considered non-confidential ("Communications").
         <br/>
         11.2 Chasescroll will have no confidentiality obligations with respect to the Communications. You agree that Chasescroll and its designees will be free to copy, modify, create derivative works, publicly display, disclose, distribute, license and sublicense through multiple tiers of distribution and incorporate and otherwise use the Communications, including derivative works thereto, for any and all commercial or non-commercial purposes without compensation or other obligation and that Chasescroll is the sole and exclusive owner of any and all such modifications and derivative works.
         <br/>
         7 Term of the Terms and Conditions
         <br/>
         These Terms and Conditions will commence on the date that you download and install the app.
         <br/>
         3.1 Chasescroll may terminate your right to use the Site immediately should you materially breach any of its provisions or take any action in derogation of the rights to the Chasescroll site/app, including, but not limited to disclosing, modifying, decompiling, translating, disassembling or reverse engineering the Site/App.
         <br/>
         3.2 Upon any termination of this Agreement, you agree to immediately stop using the Site/App and uninstall it from your device.
         <br/>
         4 Severability
         <br/>
         13.1 If any of the terms, or portions thereof, of these Terms and Conditions are invalid or unenforceable under any applicable statute or rule of law, the court will reform the contract to include an enforceable term as close to the intent of the original term as possible; all other terms will remain unchanged. The waiver or failure of either party to exercise in any respect any right provided for in these Terms and Conditions will not be deemed a waiver of any further or future right under these Terms and Conditions.
         <br/>
         These Terms and Conditions will inure to the benefit of, and is freely assignable to, Chasescroll’ s successors and assignees of rights in the Site/App.
         <br/>
         3 Applicable Law
         <br/>
         These Terms and Conditions are governed by the laws of location where the event is scheduled to be held.
         <br/><br/>
         <span className=" font-bold text-lg " >15. Dispute Resolution</span><br/>
         15.1 Subject to any exceptions specified in these Terms and Conditions, if you and Chasescroll are unable to resolve any dispute through informal discussions, then you and Chasescroll agree to submit the issue before a Mediator jointly appointed. The cost will be borne by the losing party.
         <br/>
         15.2 Notwithstanding any other provision in these Terms and Conditions, you and Chasescroll agree that you both retain the right to bring an action before any competent court of law of the location of the event and bring an action for injunctive relief or intellectual property infringement.
         <br/><br/>
         <span className=" font-bold text-lg " >16. Changes</span><br/>
         These Terms and Conditions may be amended from time to time in order to maintain compliance with the law and to reflect any changes to the way we operate our Site and the way we expect users to behave. We may notify users by email of changes to these Terms and Conditions or post a notice on the Site.
         <div className=" w-full flex justify-end mt-8 " >
             <button onClick={()=> navigate(-1)}  className=" w-full lg:w-[225px] h-[55px] border border-[#5D70F9] bg-[#D0D4EB45] rounded text-[#3C41F0] font-semibold text-lg " >Back </button>
         </div>
     </div>
      )}
    </PageWrapper>
  )
}

export default TermsAndConditions
