import React from "react"
import PropTypes from "prop-types"

const ProfileDetailsMenu = props => {
  return (
    <button className="grid place-items-center text-chasescrollGray px-2 hover:text-chasescrollBlue active:text-chasescrollBlue">
      <h1 className="font-bold text-2xl">{props.number}</h1>
      <div>{props.svg}</div>
      <h2 className="text-base">{props.name}</h2>
    </button>
  )
}

ProfileDetailsMenu.propTypes = {
  number: PropTypes.number,
  svg: PropTypes.elementType,
  name: PropTypes.string,
}

export default ProfileDetailsMenu
