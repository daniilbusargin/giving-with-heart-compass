
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const handleDonateClick = () => {
    setIsDonationDialogOpen(true);
  };

  const handleDonationSubmit = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Пожалуйста, введите корректную сумму пожертвования");
      return;
    }
    // Here would be the actual donation processing logic
    toast.success(`Спасибо за ваше пожертвование в размере ${amount}₽!`);
    setIsDonationDialogOpen(false);
  };

  return (
    <header className="w-full py-4 px-6 md:px-8 bg-white shadow-sm flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-donation-purple">Compassio</span>
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
          onClick={handleDonateClick}
        >
          Пожертвовать
        </Button>
      </div>

      <Dialog open={isDonationDialogOpen} onOpenChange={setIsDonationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Сделать общее пожертвование</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="donation-amount" className="text-sm font-medium block mb-2">
                Сумма пожертвования (₽)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₽</span>
                <Input
                  id="donation-amount"
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7"
                  placeholder="Введите сумму"
                />
              </div>
            </div>
            <Button
              className="w-full bg-donation-purple hover:bg-donation-dark-purple"
              onClick={handleDonationSubmit}
            >
              Подтвердить пожертвование
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
