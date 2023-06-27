const Category = ({ category, filter, setFilter }) => {
  return (
    <div className="overflow-auto flex gap-2 items-center py-4">
      {category.map((menu, index) => {
        return (
          <button
            key={index}
            className={`bg-${menu === filter ? "chasescrollBlue" : "chasescrollG"
              } text-${menu === filter ? "white" : "black"
              } text-sm px-4 py-2 rounded-lg border border-white transition hover:border-chasescrollBlue hover:text-black hover:bg-opacity-50 w-auto min-w-max flex items-center `}
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
