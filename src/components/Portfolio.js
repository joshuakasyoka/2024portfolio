'use client';

import React, { useState, useEffect } from 'react';
import { portfolioItems } from '../lib/data';

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const getTileSize = () => {
  const sizes = [
    'col-span-1 row-span-2',
    'col-span-2 row-span-2',
    'col-span-1 row-span-1'
  ];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsWithSizes = portfolioItems.map(item => ({
      ...item,
      size: getTileSize()
    }));
    setItems(itemsWithSizes);
  }, []);

  const filteredItems = items.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  return (
    <div className="min-h-screen bg-white font-['Courier_New',_'Courier',_monospace]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl">SQUASH GREEN</h1>
          
          <nav className="flex gap-8">
            <button
              onClick={() => setFilter('all')}
              className={classNames(
                "hover:opacity-70",
                filter === 'all' && "underline"
              )}
            >
              All
            </button>
            <button
              onClick={() => setFilter('project')}
              className={classNames(
                "hover:opacity-70",
                filter === 'project' && "underline"
              )}
            >
              Projects
            </button>
            <button
              onClick={() => setFilter('article')}
              className={classNames(
                "hover:opacity-70",
                filter === 'article' && "underline"
              )}
            >
              Articles
            </button>
          </nav>
        </div>
      </header>

      {/* Main Grid */}
      <main className="pt-20 px-6">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-5 auto-rows-[200px] gap-6">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={classNames(
                  "group relative overflow-hidden",
                  item.size
                )}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
                  <h2 className="text-sm">{item.title}</h2>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Project/Article Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="max-w-screen-xl mx-auto px-6 py-20">
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
                className="w-[600px] h-[400px] object-cover mb-8"
              />
              <h1 className="text-2xl mb-6">{selectedItem.title}</h1>
              <div className="prose max-w-none">
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