
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="w-full py-4 px-6 md:px-8 bg-white shadow-sm flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-donation-purple">Heart Compass</span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <Button 
            variant="ghost"
            size="sm"
            className="rounded-full h-10 w-10 p-0 flex items-center justify-center"
          >
            <span className="bg-donation-purple text-white rounded-full h-8 w-8 flex items-center justify-center font-medium">
              JD
            </span>
          </Button>
        ) : (
          <Button 
            variant="ghost"
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            size="sm"
            className="text-gray-600"
          >
            Войти
          </Button>
        )}

        <Button 
          className="bg-donation-purple hover:bg-donation-dark-purple text-white"
        >
          Пожертвовать
        </Button>
      </div>
    </header>
  );
};

export default Header;
