
import React from 'react';

const GemstonesSection = () => {
  const preciousGemstones = [
    { name: "Blue Sapphire (Neelam)", color: "bg-blue-600" },
    { name: "Cats Eye (Vaiduryan)", color: "bg-yellow-600" },
    { name: "Emerald (Maragadham)", color: "bg-green-600" },
    { name: "Hessonite (Gomed)", color: "bg-orange-600" },
    { name: "Pearl (Muthu)", color: "bg-gray-100" },
    { name: "Red Coral (Pavalam)", color: "bg-red-600" },
    { name: "Ruby (Manik)", color: "bg-red-700" },
    { name: "Yellow Sapphire (Pushparag)", color: "bg-yellow-500" }
  ];

  const premiumGemstones = [
    { name: "Alexandrite", color: "bg-purple-600" },
    { name: "Alexandrite Cats Eye", color: "bg-purple-400" },
    { name: "Burmese Ruby", color: "bg-red-800" },
    { name: "Carving Gem Stones", color: "bg-gray-600" },
    { name: "Exclusive Blue Sapphire", color: "bg-blue-800" },
    { name: "Exclusive Cats Eye", color: "bg-yellow-700" },
    { name: "Exclusive Emerald", color: "bg-green-700" },
    { name: "Exclusive Ruby", color: "bg-red-900" },
    { name: "Exclusive Yellow Sapphire", color: "bg-yellow-600" },
    { name: "Padparadscha Sapphire", color: "bg-orange-500" },
    { name: "Tanzanite", color: "bg-indigo-600" }
  ];

  const semiPreciousGemstones = [
    { name: "Agate", color: "bg-gray-500" },
    { name: "Amber", color: "bg-amber-500" },
    { name: "Amethyst", color: "bg-purple-500" },
    { name: "Apatite Cat's Eye", color: "bg-green-400" },
    { name: "Aquamarine", color: "bg-cyan-400" },
    { name: "Aventurine", color: "bg-green-500" },
    { name: "Azurite", color: "bg-blue-700" },
    { name: "Black Tourmaline", color: "bg-gray-900" },
    { name: "Bloodstone", color: "bg-green-800" },
    { name: "Blue Topaz", color: "bg-blue-400" },
    { name: "Carnelian", color: "bg-orange-500" },
    { name: "Chalcedony", color: "bg-gray-400" }
  ];

  const preciousGemstonesCategory = [
    { name: "Green Sapphire", color: "bg-green-600" },
    { name: "Keshi Pearl", color: "bg-gray-200" },
    { name: "Navratna", color: "bg-gradient-to-r from-red-500 to-blue-500" },
    { name: "Pink Sapphire", color: "bg-pink-500" },
    { name: "Pitambari Neelam", color: "bg-yellow-700" },
    { name: "Sapphire", color: "bg-blue-500" },
    { name: "Star Ruby", color: "bg-red-600" },
    { name: "Star Sapphire", color: "bg-blue-700" },
    { name: "White Coral", color: "bg-gray-100" },
    { name: "White Sapphire", color: "bg-gray-50" }
  ];

  const birthstones = [
    { name: "January Birthstone", color: "bg-red-800", gem: "Garnet" },
    { name: "February Birthstone", color: "bg-purple-600", gem: "Amethyst" },
    { name: "March Birthstone", color: "bg-cyan-500", gem: "Aquamarine" },
    { name: "April Birthstone", color: "bg-gray-100", gem: "Diamond" },
    { name: "May Birthstone", color: "bg-green-600", gem: "Emerald" },
    { name: "June Birthstone", color: "bg-gray-200", gem: "Pearl" },
    { name: "July Birthstone", color: "bg-red-700", gem: "Ruby" },
    { name: "August Birthstone", color: "bg-green-400", gem: "Peridot" },
    { name: "September Birthstone", color: "bg-blue-600", gem: "Sapphire" },
    { name: "October Birthstone", color: "bg-pink-400", gem: "Opal" },
    { name: "November Birthstone", color: "bg-yellow-600", gem: "Topaz" },
    { name: "December Birthstone", color: "bg-blue-800", gem: "Turquoise" }
  ];

  const GemstoneCard = ({ name, color, gem }: { name: string; color: string; gem?: string }) => (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className={`w-4 h-4 rounded-full ${color} border border-gray-300`}></div>
      <span className="text-gray-800">{name}</span>
      {gem && <span className="text-gray-500 text-sm">({gem})</span>}
    </div>
  );

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Precious Gemstone Section */}
        <section id="precious-gemstone" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light tracking-wider text-gray-900 mb-4">
              PRECIOUS GEMSTONE
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {preciousGemstones.map((gemstone, index) => (
              <GemstoneCard key={index} name={gemstone.name} color={gemstone.color} />
            ))}
          </div>
        </section>

        {/* Gemstones Section */}
        <section id="gemstones" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light tracking-wider text-gray-900 mb-4">
              GEMSTONES
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Premium Gemstones */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">PREMIUM GEMSTONES</h3>
              <div className="space-y-2">
                {premiumGemstones.map((gemstone, index) => (
                  <GemstoneCard key={index} name={gemstone.name} color={gemstone.color} />
                ))}
              </div>
              <div className="mt-4">
                <button className="text-red-400 text-sm hover:text-red-600">View All</button>
              </div>
            </div>

            {/* Semi-Precious Gemstones */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">SEMI-PRECIOUS GEMSTONES</h3>
              <div className="space-y-2">
                {semiPreciousGemstones.map((gemstone, index) => (
                  <GemstoneCard key={index} name={gemstone.name} color={gemstone.color} />
                ))}
              </div>
              <div className="mt-4">
                <button className="text-red-400 text-sm hover:text-red-600">View All</button>
              </div>
            </div>

            {/* Precious Gemstones Category */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">PRECIOUS GEMSTONES</h3>
              <div className="space-y-2">
                {preciousGemstonesCategory.map((gemstone, index) => (
                  <GemstoneCard key={index} name={gemstone.name} color={gemstone.color} />
                ))}
              </div>
              <div className="mt-4">
                <button className="text-red-400 text-sm hover:text-red-600">View All</button>
              </div>
            </div>
          </div>
        </section>

        {/* Birth Stones Section */}
        <section id="birth-stones" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light tracking-wider text-gray-900 mb-4">
              BIRTHSTONES
            </h2>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {birthstones.map((birthstone, index) => (
                <GemstoneCard 
                  key={index} 
                  name={birthstone.name} 
                  color={birthstone.color} 
                  gem={birthstone.gem}
                />
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="text-red-400 text-sm hover:text-red-600">View All</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GemstonesSection;
