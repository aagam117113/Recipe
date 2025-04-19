import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-orange-400 mb-4">RecipeExplorer</h2>
            <p className="text-gray-300 max-w-md">
              Discover delicious recipes from around the world. 
              Save your favorites and become a better cook.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors">Home</Link></li>
                <li><Link to="/search" className="text-gray-300 hover:text-orange-400 transition-colors">Search</Link></li>
                <li><Link to="/favorites" className="text-gray-300 hover:text-orange-400 transition-colors">Favorites</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/search?q=breakfast" className="text-gray-300 hover:text-orange-400 transition-colors">Breakfast</Link></li>
                <li><Link to="/search?q=lunch" className="text-gray-300 hover:text-orange-400 transition-colors">Lunch</Link></li>
                <li><Link to="/search?q=dinner" className="text-gray-300 hover:text-orange-400 transition-colors">Dinner</Link></li>
                <li><Link to="/search?q=dessert" className="text-gray-300 hover:text-orange-400 transition-colors">Desserts</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} RecipeExplorer. All rights reserved.</p>
          <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart size={14} className="mx-1 text-red-500" /> by RecipeExplorer Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;