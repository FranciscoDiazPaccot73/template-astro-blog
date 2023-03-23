import React, { useState } from 'react';

import './selectors.scss';

const getDateLabels = (date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth()

  const months = {
    1: "ENE",
    2: "FEB",
    3: "MAR",
    4: "ABR",
    5: "MAY",
    6: "JUN",
    7: "JUL",
    8: "AGO",
    9: "SEP",
    10: "OCT",
    11: "NOV",
    12: "DIC",
  
  }

  return {month: months[month + 1] || '', day};
}

const getSelectorPosition = (array, year) => array.indexOf(year) * 75;

const Selector = ({ listOfYears, posts }) => {
  const [activeYear, setActiveYear] = useState(new Date().getFullYear())
  const [selectorPosition, setSelectorPosition] = useState(getSelectorPosition(listOfYears, activeYear));
  const postsToShow = posts.get(activeYear) && posts.get(activeYear);

  const handleNewSelector = year => {
    if (year !== activeYear) {
      setActiveYear(year)
      const newPosition = getSelectorPosition(listOfYears, year);
      setSelectorPosition(newPosition)
    }
  }

  return (
    <div>
      <section className='w-full flex selector-container'>
        <div className='flex selector-container__content'>
          <div className='selector' style={{ left: `${selectorPosition}px` }} />
          {listOfYears.map(y => (
            <div onClick={() => handleNewSelector(y)} key={`selector-${y}`} className='selector-container__item'>{y}</div>
          ))}
        </div>
      </section>
      <ul className="flex gap-8 flex-col">
        <li>
          {postsToShow.map((post) => {
            const description = post.data.description ?? '';
            const { month, day } = getDateLabels(post?.data?.pubDate)

            return (
              <div style={{ gridTemplateColumns: "20% 50% 30%" }} key={post.slug} className="grid overflow-hidden w-full items-center py-4 px-1 h-28 gap-2 grid-cols-custom">
                <div className="w-20 dark:text-gray-300 text-center font-semibold text-lg">
                  <div>{day}</div>
                  <div>{month}</div>
                </div>
                <div className="flex flex-col">
                  <a className="dark:text-white font-bold" href={`/blog/${post.slug}/`}>{post.data.title}</a>
                  <a
                    className="overflow-hidden whitespace-nowrap text-ellipsis dark:text-gray-400 text-sm"
                    href={`/blog/${post.slug}/`}
                    title={description.toString()}
                  >
                    {post.data.description}
                  </a>
                </div>
                {post.data.image &&
                  <img className="object-contain" width={720} height={360} src={post.data.image} alt="" />
                }
              </div>
            )
          })}
        </li>
      </ul>
    </div>
  )
}

export default Selector;
