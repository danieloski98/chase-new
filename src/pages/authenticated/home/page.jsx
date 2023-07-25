import React from 'react'

function page() {
  return (
    <>
    {showMoreOptions && (
      <ThreadMenu
        handleItemClick={handleItemClick}
        showMoreOptions={showMoreOptions}
        toggleMoreOptions={toggleMoreOptions}
        threadId={threadId}
      />
    )}
    {showFileUploader && (
      <UploadImage toggleFileUploader={toggleFileUploader} />
    )}
    {isThreadMenuOpen && (
      userFeedData?.map(post => (
        <ThreadMenu postID={post?.id} key={post?.id} />
      ))
    )}
    {showShareModal && <Share closeShareModal={toggleShare} />}


    { !isLoading && (
       <div
       className="flex items-center lg:items-start flex-col gap-10 py-9 px-4 lg:px-28 pb-24 h-full w-full overflow-auto"
       ref={threadListRef}
     >
       <div className="hidden md:flex flex-col gap-2 bg-white text-chasescrollBlue bg-opacity-25 w-full max-w-lg rounded-xl p-3 shadow-md">
         <div className="flex items-center bg-chasescrollPalePurple bg-opacity-30 rounded-xl pl-4">
           <div className="w-8 h-7 rounded-b-full rounded-tr-full border border-chasescrollBlue flex items-center justify-center">
             
             <Avatar 
              // src={user.images.value ? user.images.value : ''}
              name={`${user.firstName} ${user.lastName}` || userName }
              className="w-8 h-7 object-cover rounded-b-full rounded-tr-full border border-chasescrollBlue cursor-pointer"
              onClick={() => navigate(`/profile/${userId}`)}
              size='sm'
             />
           </div>
           <input
             type="text"
             placeholder={`Add your thought ${userName}`}
             value={postInput}
             onKeyDown={handleEnterKeyPress}
             onChange={e => setPostInput(e.target.value)}
             className="outline-none bg-transparent w-full px-6 py-2.5"
           />
           <button
             className="w-14 pl-2 pr-6 flex justify-center items-center cursor-pointer border-r border-white"
             onClick={createPost}
           >
            {postLoading ? (
              <Spinner color="brand.chasescrollButtonBlue" />
            ) :  <SendIcon />}
           </button>
         </div>
         <div
           onClick={toggleFileUploader}
           value={postFile}
           onChange={e => setPostFile(e.target.value)}
           className="flex gap-2 items-center text-chasescrollTextGrey cursor-pointer w-fit text-sm"
         >
           <span className="flex justify-center items-center rounded-r-lg">
             <img src={imageIcon} className="" alt="" />
           </span>
           Add Photos/Video to your post
         </div>
       </div>
       {userFeedData?.map(post => (
         <Thread
           key={post?.id}
           postID={post?.id}
           text={post?.text}
           user={post?.user}
           time={post?.time}
           image={post?.mediaRef}
           mediaRef={post?.mediaRef}
           multipleMediaRef={post?.multipleMediaRef}
           shareCount={post?.shareCount}
           likeCount={post?.likeCount}
           commentCount={post?.commentCount}
           toggleMoreOptions={toggleMoreOptions}
           toggleShare={toggleShare}
           setThreadId={setThreadId}
           likeStatus={post?.likeStatus}
           type={post?.type}
         />
       ))}
     </div>
    )}

  </>
  )
}

export default page