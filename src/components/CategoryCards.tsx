import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { categoryCardsData } from '../data/storeData';

interface CategoryCardsProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-12 sm:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF4E4] border border-[#DFC17D]/60 text-xs font-bold text-[#886725] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Collections
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#300516] tracking-tight">
            Shop by Category
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Explore authentic Indian ethnic wear, contemporary Western silhouettes, kidswear, and premium cosmetics.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categoryCardsData.map((category) => (
            <div
              key={category.id}
              id={`category-card-${category.id}`}
              className="group relative bg-white rounded-2xl overflow-hidden border border-[#ECE3D8] hover:border-[#C5A059] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container with Hover Zoom & Badge */}
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Item Count Badge */}
                <div className="absolute top-3 right-3 bg-[#300516]/80 backdrop-blur-md text-[#FBF4E4] border border-[#DFC17D]/40 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {category.itemCount}
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif text-xl font-bold text-[#FBF4E4]">
                    {category.title}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-1 mt-0.5">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                  {category.description}
                </p>

                {/* Shop Now Action Button */}
                <button
                  id={`shop-category-btn-${category.id}`}
                  onClick={() => onSelectCategory(category.linkCategory)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F7F2EC] hover:bg-[#480922] text-[#480922] hover:text-[#FBF4E4] font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-[#480922] group-hover:text-[#FBF4E4] cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#886725] group-hover:text-[#DFC17D] transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
