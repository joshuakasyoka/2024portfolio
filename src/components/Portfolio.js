'use client';

<link rel="stylesheet" href="https://use.typekit.net/exw6euy.css"></link>

import React, { useState, useEffect } from 'react';
import { portfolioItems } from '../lib/data';

const classNames = (...classes) => {
 return classes.filter(Boolean).join(' ');
};

const shuffleArray = (array) => {
 const newArray = [...array];
 for (let i = newArray.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
 }
 return newArray;
};

const getTileSize = (isMobile) => {
 if (isMobile) return 'col-span-1 row-span-1';
 
 const sizes = [
   'col-span-1 row-span-2',
   'col-span-1 row-span-1',
   'col-span-1 row-span-1'
 ];
 return sizes[Math.floor(Math.random() * sizes.length)];
};

const Portfolio = () => {
 const [filter, setFilter] = useState('all');
 const [selectedItem, setSelectedItem] = useState(null);
 const [items, setItems] = useState([]);
 const [isMobile, setIsMobile] = useState(false);
 const [page, setPage] = useState('portfolio');

 useEffect(() => {
   const checkMobile = () => {
     setIsMobile(window.innerWidth < 768);
   };
   
   checkMobile();
   window.addEventListener('resize', checkMobile);
   
   const itemsWithSizes = shuffleArray(portfolioItems).map(item => ({
     ...item,
     size: getTileSize(window.innerWidth < 768)
   }));
   setItems(itemsWithSizes);

   return () => window.removeEventListener('resize', checkMobile);
 }, []);

 const filteredItems = items.filter(item => 
   filter === 'all' ? true : item.type === filter
 );

 return (
  <div className="min-h-screen bg-white font-['Heimat Mono Regular',_'Arial',_monospace]">
  <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
    <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
      <div>
        <h3 className="text-xl text-black hover:text-[#5CE98B] transition-colors duration-300">JOSH GREEN</h3>
        <p className="text-sm">Design. Research. Writing.</p>
      </div>
      <nav className="flex gap-4 md:gap-8">
        <button
          onClick={() => {
            setPage('portfolio');
            setFilter('all');
          }}
          className={classNames(
            "hover:opacity-70",
            page === 'portfolio' && filter === 'all' && "underline"
          )}
        >
          All
        </button>
        <button
          onClick={() => {
            setPage('portfolio');
            setFilter('project');
          }}
          className={classNames(
            "hover:opacity-70",
            page === 'portfolio' && filter === 'project' && "underline"
          )}
        >
          Projects
        </button>
        <button
          onClick={() => {
            setPage('portfolio');
            setFilter('article');
          }}
          className={classNames(
            "hover:opacity-70",
            page === 'portfolio' && filter === 'article' && "underline"
          )}
        >
          Articles
        </button>
        <button
          onClick={() => setPage('about')}
          className={classNames(
            "hover:opacity-70",
            page === 'about' && "underline"
          )}
        >
          About
        </button>
      </nav>
    </div>
  </header>

     <main className="pt-32 md:pt-20 px-4 md:px-6">
       {page === 'portfolio' ? (
         <div className="max-w-screen-2xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-5 auto-rows-[200px] gap-4 md:gap-6 mt-4">
             {filteredItems.map((item) => (
              <button
  key={item.id}
  onClick={() => setSelectedItem(item)}
  className={classNames(
    "group relative overflow-hidden",
    isMobile ? 'col-span-1' : item.size
  )}
>
  <img
    src={item.image}
    alt={item.title}
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200" />
  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
    <h2 className="text-sm group-hover:text-[#5CE98B] transition-colors duration-300">{item.title}</h2>
  </div>
</button>
             ))}
           </div>
         </div>
       ) : (
         <div className="max-w-screen-xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
             <div>
               <img
                 src="/images/image 30.png"
                 alt="About"
                 className="w-full h-[650px] object-cover rounded"
               />
             </div>
             <div>
  <h1 className="text-2xl mb-6">About</h1>
  <p>Hello, I'm Josh. I'm a designer and researcher exploring participatory approaches to technology development and governance. My practice investigates how design can strengthen democratic engagement with emerging technologies, particularly focusing on building tools and methods that help communities shape the technologies affecting their lives.</p>
  
  <p>Through roles at London design studios like Mettle-Studio and Studio Output, as well as social impact organizations including Outlandish and Turinglab, I have developed expertise in creating digital tools that make complex systems more accessible and participatory. My work spans from civil engineering sustainability tools to educational platforms, always centered on building community agency and understanding.</p>
  
  <p>Currently pursuing MA research, I am examining how participatory design methods can enhance civic engagement with AI governance, developing creative approaches that help citizens meaningfully participate in conversations about technology&apos;s role in society. My practice bridges theoretical frameworks around democratic inquiry with practical tools for collective imagination and decision-making.</p>
</div>
           </div>
         </div>
       )}
     </main>

     {selectedItem && (
       <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
         <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-20">
           <button
             onClick={() => setSelectedItem(null)}
             className="fixed top-6 right-6 text-xl"
           >
             ✕
           </button>
           
           <article>
             <img
               src={selectedItem.image}
               alt={selectedItem.title}
               className="w-full md:w-[600px] h-[300px] md:h-[400px] object-cover mb-8"
             />
             <h1 className="text-xl md:text-2xl mb-6">{selectedItem.title}</h1>
             <div className="prose max-w-full md:max-w-96"> 
               {selectedItem.link && (
                 <>
                   <p><a href={selectedItem.link} style={{ color: '#5CE98B', textDecoration: 'underline' }}>{selectedItem.title}</a></p>
                   <br />
                 </>
               )}
               {selectedItem.content}
             </div>
           </article>
         </div>
       </div>
     )}
   </div>
 );
};

export default Portfolio;