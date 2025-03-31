"use client"
import React, { useState } from 'react'

interface CategoriesProps {
  categories: {uuid: string; name:string}[]
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  // State for the currently selected category
  const [activeCategory, setActiveCategory] = useState<string>('All')

  return (
    <div className="flex gap-4 overflow-x-auto py-2">
      {categories.map((category) => (
        <button
          key={category.uuid}
          onClick={() => setActiveCategory(category.name)}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap 
            ${
              activeCategory === category.name
                ? 'bg-secondary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default Categories
