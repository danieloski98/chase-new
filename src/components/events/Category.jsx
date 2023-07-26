const Category = ({ category, filter, setFilter }) => {
  return (
    <div className="overflow-auto flex gap-2 items-center py-4 px-6"> 
      <button 
        className={`bg-${!filter ? "chasescrollBlue" : "[#989292]"
          } text-${!filter ? "white" : "black"
          } lg:text-[15px] text-[13px] px-6 h-[45px] rounded-lg font-semibold transition w-auto min-w-max flex items-center `}
        onClick={() => setFilter("")}
      >
        All Events
      </button>
      {category.map((menu, index) => {
        return (
          <button
            key={index}
            className={`bg-${menu === filter ? "chasescrollBlue" : "[#989292]"
              } text-${menu === filter ? "white" : "black"
              } lg:text-[15px] text-[13px] px-6 h-[45px] rounded-lg font-semibold transition over:text-black hover:bg-opacity-50 w-auto min-w-max flex items-center `}
            onClick={() => setFilter(menu)}
          >
            {menu?.split("_")?.join(" ")}
          </button>
        )
      })}
    </div>
  )
}

export default Category
