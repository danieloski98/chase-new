import React from "react"
import PageWrapper from "@/components/PageWrapper"
import SettingsPage from "./profile/SettingsPage"

const Settings = () => {

  return (
    <>
      <PageWrapper>
        {() => <SettingsPage />}
      </PageWrapper>
    </>
  )
}

export default Settings
