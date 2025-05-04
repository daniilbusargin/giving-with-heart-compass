
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12 py-8 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-donation-purple">Compassio</h3>
            <p className="text-sm text-gray-600">
              Человеко-ориентированная платформа рекомендаций для пожертвований. Помогаем вам делать осознанный выбор и поддерживать то, что действительно важно.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">О нас</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-donation-purple transition-colors">
                  Наша миссия
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-gray-600 hover:text-donation-purple transition-colors">
                  Как работают наши рекомендации
                </Link>
              </li>
              <li>
                <Link to="/transparency" className="text-sm text-gray-600 hover:text-donation-purple transition-colors">
                  Политика прозрачности
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-donation-purple transition-colors">
                  Условия использования
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                Email: info@compassio.org
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-donation-purple transition-colors">
                  Форма контакта
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-donation-purple transition-colors">
                  Часто задаваемые вопросы
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Compassio. Все права защищены.
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-700">
              Политика конфиденциальности
            </Link>
            <Link to="/cookie-policy" className="text-xs text-gray-500 hover:text-gray-700">
              Политика использования файлов cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
