import React from 'react'

const componentName = () => {
  return (
//     <div className="w-full h-full flex">
//     {!showChat ? (
//       <>
//         {showMedia && (
//           <OverlayWrapper handleClose={toggleMediaVisibility}>
//             <img
//               alt="image preview"
//               src={previewMedia}
//               className="max-w-xl rounded-lg"
//             />
//           </OverlayWrapper>
//         )}
//         <div className="lg:basis-4/12 bg-white w-full h-full mt-4 border-r">
//           <div className="flex flex-col">
//             <div className="p-4 border-gray-200 flex items-center justify-between">
//               <h1 className="text-2xl text-chasescrollBlue font-bold">
//                 Chats
//               </h1>
//               <Link
//                 to={PATH_NAMES.createGroup}
//                 className="text-chasescrollPurple text-sm "
//               >
//                 {/* <AddIcon /> */}
//                 Create Group Chat
//               </Link>
//             </div>
//             <div
//               className="p-4 overflow-auto flex flex-col gap-4 h-full"
//               style={{ maxHeight: "calc(100vh - 161px)" }}
//             >
//               <div className={`hidden lg:flex flex-col h-fit ${isLoading ? 'items-center justify-center' : ''}`}>
//                 {chatList?.map(thread => (
//                   <div
//                     key={thread.id}
//                     onClick={() => {
//                       fetchChatMessages(thread.id)
//                       setCurrentUser(thread)
//                     }}
//                     className={`flex items-center gap-4 border-b py-2 border-gray-100 cursor-pointer hover:bg-slate-50`}
//                   >
//                     <div className={`${thread?.type !== 'ONE_TO_ONE' ? 'border-l-4 border-chasescrollBlue pl-0.5 rounded-b-full rounded-tl-full cursor-pointer' : ''}`}>
//                       <ProfilePhoto image={thread?.data?.imgMain?.objectPublic ? `${CONFIG.RESOURCE_URL}${thread?.data?.imgMain?.value}}` : `https://ui-avatars.com/api/?background=random&name=${thread?.otherUser?.firstName}&length=1`} />
//                     </div>
//                     <div className="flex flex-col">
//                       <p className="font-bold text-sm text-gray-800 cursor-pointer">
//                         {thread?.type !== "ONE_TO_ONE" ? thread?.name : `${thread?.otherUser?.firstName} ${thread?.otherUser?.lastName}`}
//                       </p>
//                       <small className="text-xs text-gray-400 truncate w-72">
//                         {`${thread.lastMessage}`}
//                       </small>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="lg:hidden">
//                 {chatList?.map(thread => (
//                   <div
//                     key={thread.id}
//                     onClick={() => toggleChatVisibility(thread.id)}
//                     className={`flex items-center gap-4 border-b py-2 border-gray-100 cursor-pointer hover:bg-slate-50`}
//                   >
//                     <div className={`${thread?.type !== 'ONE_TO_ONE' ? 'border-l-4 border-chasescrollBlue pl-0.5 rounded-b-full rounded-tl-full cursor-pointer' : ''}`}>
//                       <ProfilePhoto image={thread?.data?.imgMain?.objectPublic ? `${CONFIG.RESOURCE_URL}${thread?.data?.imgMain?.value}}` : `https://ui-avatars.com/api/?background=random&name=${thread?.otherUser?.firstName}&length=1`} />
//                     </div>
//                     <div className="flex flex-col">
//                       <p className="font-bold text-sm text-gray-800 cursor-pointer">
//                         {thread?.type !== "ONE_TO_ONE" ? thread?.name : `${thread?.otherUser?.firstName} ${thread?.otherUser?.lastName}`}
//                       </p>
//                       <small className="text-xs text-gray-400 truncate w-72">
//                         {`${thread.lastMessage}`}
//                       </small>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="hidden lg:block basis-8/12 bg-[url('/src/assets/images/chat-bg.png')] w-full h-full relative pl-4 pt-[76px] pb-[72px]">
//           <div
//             className="flex flex-col gap-4 overflow-auto"
//             style={{ maxHeight: "calc(100vh - 242px)" }}
//           >
//             <p className="w-full p-4 text-center bg-transparent text-xs text-chasescrollTextGrey">
//               {formatTimeAgo(currentUser?.lastMessageUpdate)}
//             </p>
//             <div className={`flex flex-col gap-4 pr-4 ${isLoading ? 'justify-center items-center' : ''}`}>
//               {chatMessages?.map(message => (
//                 <div
//                   key={message?.id}
//                   ref={containerRef}
//                   className={`rounded-t-xl p-3 text-sm w-fit max-w-[300px] ${message?.createdBy?.userId === userId || message?.self
//                     ? "bg-chasescrollBlue text-white rounded-bl-xl self-end"
//                     : "bg-white text-gray-800 rounded-br-xl self-start"
//                     }`}
//                 >
//                   {message?.media !== null ? (
//                     <div className="flex flex-col gap-2">
//                       <img
//                         src={`${CONFIG.RESOURCE_URL}${message?.media}`}
//                         alt="media"
//                         className="cursor-pointer"
//                         onClick={() => toggleMediaVisibility(`${CONFIG.RESOURCE_URL}${message?.media}`)}
//                       />
//                       {message?.message ? message?.message : ''}
//                     </div>
//                   ) : message?.message}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="absolute top-0 left-0 w-full p-4 bg-white flex justify-between items-center z-10">
//             <div className="flex items-center gap-4">
//               <span className="cursor-pointer">
//                 <ProfilePhoto image={currentUser?.data?.imgMain?.objectPublic ? `${CONFIG.RESOURCE_URL}${currentUser?.data?.imgMain?.value}` : `https://ui-avatars.com/api/?background=random&name=${currentUser?.otherUser?.firstName}&length=1`} />
//               </span>
//               <div className="flex flex-col">
//                 <p className="text-chasescrollBlue font-bold cursor-pointer">
//                   {currentUser?.type !== "ONE_TO_ONE" ? currentUser?.name : `${currentUser?.otherUser?.firstName} ${currentUser?.otherUser?.lastName}`}
//                 </p>
//                 {/* <small className="text-xs">online</small> */}
//               </div>
//             </div>
//             <Popover className="relative w-fit self-end">
//               <Popover.Button className="flex outline-none">
//                 <div className="flex self-end text-chasescrollBlue">
//                   <span className="cursor-pointer p-1 -mr-1">
//                     <img src={info} alt="" />
//                   </span>
//                 </div>
//               </Popover.Button>
//               <Transition
//                 enter="transition duration-100 ease-out"
//                 enterFrom="transform scale-95 opacity-0"
//                 enterTo="transform scale-100 opacity-100"
//                 leave="transition duration-75 ease-out"
//                 leaveFrom="transform scale-100 opacity-100"
//                 leaveTo="transform scale-95 opacity-0"
//               >
//                 <Popover.Panel className="absolute z-10 right-0 bg-white w-32 border border-gray-200 rounded-lg shadow-lg">
//                   {MESSAGE_MENU.map((item, index) => (
//                     <div
//                       key={item.id}
//                       className={`text-center text-sm w-full px-2 py-3 cursor-pointer border-gray-200
//                     ${index !== MESSAGE_MENU.length - 1
//                           ? "border-b"
//                           : "border-none"
//                         } ${isEven(index) ? "text-black" : "text-red-500"}`}
//                     >
//                       {item.label}
//                     </div>
//                   ))}
//                 </Popover.Panel>
//               </Transition>
//             </Popover>

//           </div>
//           <input
//             id="file"
//             type="file"
//             onChange={handleFileInputChange}
//             className="hidden"
//           />
//           <div className="absolute bottom-0 left-0 w-full p-4 bg-transparent flex gap-4 items-center">
//             <div className="flex gap-4 items-center">
//               <label
//                 htmlFor="file"
//                 className="rounded-md"
//               >
//                 <div className="flex items-center gap-2">
//                   <img
//                     src={selector}
//                     alt=""
//                     className="cursor-pointer w-8 h-8"
//                   />
//                   {selectedImage && <img
//                     src={selectedImage}
//                     alt=""
//                     className="cursor-pointer w-8 h-8 rounded-sm"
//                   />}
//                 </div>

//               </label>
//               {/* <img src={smiley} alt="" /> */}
//             </div>
//             <div className="flex gap-4 items-center bg-white rounded-xl w-full pr-4">
//               <input
//                 type="text"
//                 className="outline-none px-4 rounded-l-xl w-full text-sm text-chasescrollBlue"
//                 placeholder="Say Something..."
//                 value={message}
//                 onChange={handleChange}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     sendChatMessage(currentUser?.id)
//                   }
//                 }}
//               />
//               <img
//                 alt=""
//                 src={send}
//                 className="cursor-pointer"
//                 onClick={() => sendChatMessage(currentUser?.id)}
//               />
//             </div>
//           </div>
//         </div>
//       </>
//     ) : (
//       <div
//         className={`${showChat ? "block" : "hidden lg:block"
//           } lg:block lg:basis-8/12 bg-[url('/src/assets/images/chat-bg.png')] w-full h-full relative pl-4 pt-[76px] pb-[72px]`}
//       >
//         <div
//           className="flex flex-col gap-4 overflow-auto"
//           style={{ maxHeight: "calc(100vh - 242px)" }}
//         >
//           <p className="w-full p-4 text-center bg-transparent text-xs text-chasescrollTextGrey">
//             {formatTimeAgo(currentUser?.lastMessageUpdate)}
//           </p>
//           <div className={`flex flex-col gap-4 pr-4 ${isLoading ? 'justify-center items-center' : ''}`}>
//             {chatMessages?.map(message => (
//               <div
//                 key={message?.id}
//                 ref={containerRef}
//                 className={`rounded-t-xl p-3 text-sm w-fit max-w-[300px] ${message?.createdBy?.userId === userId || message?.self
//                   ? "bg-chasescrollBlue text-white rounded-bl-xl self-end"
//                   : "bg-white text-gray-800 rounded-br-xl self-start"
//                   }`}
//               >
//                 {message?.media !== null ? (
//                   <div className="flex flex-col gap-2">
//                     <img
//                       src={`${CONFIG.RESOURCE_URL}${message?.media}`}
//                       alt="media"
//                       className="cursor-pointer"
//                       onClick={() => toggleMediaVisibility(`${CONFIG.RESOURCE_URL}${message?.media}`)}
//                     />
//                     {message?.message ? message?.message : ''}
//                   </div>
//                 ) : message?.message}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="absolute top-0 left-0 w-full p-4 bg-white flex justify-between items-center z-10">
//           <div className="flex items-center gap-4">
//             <ProfilePhoto image={currentUser?.data?.imgMain?.objectPublic ? `${CONFIG.RESOURCE_URL}${currentUser?.data?.imgMain?.value}` : `https://ui-avatars.com/api/?background=random&name=${currentUser?.otherUser?.firstName}&length=1`} />
//             <div className="flex flex-col">
//               <p className="text-chasescrollBlue font-bold">
//                 {currentUser?.type !== "ONE_TO_ONE" ? currentUser?.name : `${currentUser?.otherUser?.firstName} ${currentUser?.otherUser?.lastName}`}
//               </p>
//               {/* <small className="text-xs">online</small> */}
//             </div>
//           </div>
//           <Popover className="relative w-fit self-end">
//             <Popover.Button className="flex outline-none">
//               <div className="flex self-end text-chasescrollBlue">
//                 <span className="cursor-pointer p-1 -mr-1">
//                   <img src={info} alt="" />
//                 </span>
//               </div>
//             </Popover.Button>
//             <Transition
//               enter="transition duration-100 ease-out"
//               enterFrom="transform scale-95 opacity-0"
//               enterTo="transform scale-100 opacity-100"
//               leave="transition duration-75 ease-out"
//               leaveFrom="transform scale-100 opacity-100"
//               leaveTo="transform scale-95 opacity-0"
//             >
//               <Popover.Panel className="absolute z-10 right-0 bg-white w-32 border border-gray-200 rounded-lg shadow-lg">
//                 {MESSAGE_MENU.map((item, index) => (
//                   <div
//                     key={item.id}
//                     className={`text-center text-sm w-full px-2 py-3 cursor-pointer border-gray-200
//                     ${index !== MESSAGE_MENU.length - 1
//                         ? "border-b"
//                         : "border-none"
//                       } ${isEven(index) ? "text-black" : "text-red-500"}`}
//                   >
//                     {item.label}
//                   </div>
//                 ))}
//               </Popover.Panel>
//             </Transition>
//           </Popover>
//         </div>
//         <div className="absolute bottom-0 left-0 w-full p-4 bg-transparent flex gap-4 items-center">
//           <div className="flex gap-4 items-center">
//             <img src={image} alt="" />
//             <img src={smiley} alt="" />
//           </div>
//           <div className="flex gap-4 items-center bg-white rounded-xl w-full pr-4">
//             <input
//               type="text"
//               className="outline-none px-4 rounded-l-xl w-full text-sm text-chasescrollBlue"
//               placeholder="Say Something..."
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   sendChatMessage(currentUser?.id)
//                 }
//               }}
//             />
//             <img src={send} alt="" />
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
<></>
  )
}

export default componentName
