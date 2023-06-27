import PageWrapper from "@/components/PageWrapper"
import { MENU_OPTIONS, EVENT_IMAGES, PROFILE } from "@/constants/index"
import ProfileDetailsMenu from "@/components/events/ProfileDetailsMenu"
import header from "@/assets/images/headerbanner.jpeg"

const ProfileDetails = () => {
  return (
    <PageWrapper>
      {() => (
        <div className="h-full">
          <div className="bg-chasescrollGray h-1/2 relative">
            <img src={header} className="w-full h-full" />
            <div className="absolute top-64 bg-transparent h-24 w-full">
              <div className="flex justify-between px-8">
                <div className="flex flex-col gap-4 text-white">
                  <h1 className="font-bold text-2xl">{PROFILE[0].name}</h1>
                  <h3 className="font-bold text-sm">{PROFILE[0].email}</h3>
                </div>
                <div className="flex gap-8 items-center justify-center text-sm">
                  <button className="text-white bg-chasescrollBlue px-6 py-2 lg:w-32 rounded-md border border-chasescrollBlue">
                    Connect
                  </button>
                  <button className="bg-white text-chasescrollBlue px-6 py-2 lg:w-32 rounded-md border">
                    {" "}
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-1/2">
            <div className="flex justify-around border hover:text-chasescrollBlue">
              {MENU_OPTIONS.map(({ number, svg, name }) => (
                <ProfileDetailsMenu number={number} svg={svg} name={name} />
              ))}
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-2 place-items-center gap-4 py-4">
              {EVENT_IMAGES.map(({ banner }) => (
                <img src={banner} alt="" />
              ))}
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default ProfileDetails
