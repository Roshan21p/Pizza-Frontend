import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    // Cleanup when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  return (
    <div className="relative">
      {/* Hamburger/Close Icon */}
      <button
        onClick={toggleSidebar}
        className={` bg-[#FF9110] absolute text-white  z-50   ${
          isOpen ? 'left-[163px] sm:left-[213px]  p-2' : 'left-0 p-4'
        } transition-all duration-300`}
      >
        {isOpen ? '✖' : '☰'}
      </button>

      {/* Sidebar */}
      <div
        className={`w-[200px] sm:w-[250px] h-[90%] fixed   left-0 bg-[#FFFFCC] text-[#6B7280] z-40 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300`}
      >
        <div className="p-4">
          {/* Sidebar Links */}
          <ul className="space-y-2 font-semibold">
            <li>
              <Link to={'/admin/all-products'} className="block p-2 hover:bg-orange-200 rounded">
                Products
              </Link>
            </li>
            <li>
              <Link to={'/admin/all-orders'} className="block p-2 hover:bg-orange-200 rounded">
                Orders
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0  opacity-50 z-30" onClick={toggleSidebar}></div>}
    </div>
  );
}

export default Sidebar;
