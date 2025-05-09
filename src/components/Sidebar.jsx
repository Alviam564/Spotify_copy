import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RiCloseLine } from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi'
import { logo } from '../assets'
import { links } from '../assets/constants'

const NavLinks = ({ handleClick}) => (
  <div className='mt-10'>
    {links.map((items) => (
      <NavLink to={items.to}
      key={items.name}
      className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-green-500"
        onClick={() => handleClick && handleClick()}
      >
        <items.icon className='=w-6 h-6 mr-2' />
        {items.name}
      </NavLink>
    ))}
  </div>
)


const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState (false) 

  return (
    <>
      <div className="md:flex hidden flex-col w-[230px] py-10 px-4 bg-[#121212]">
        <img src={logo} alt='logo' className='w-full h-[58px] object-contain' />
        <NavLinks />
      </div>

      <div className="absolute md:hidden blocked top-[68px] right-[33px] z-50">
        {mobileMenuOpen ? (
        <RiCloseLine className='w-[30px] h-[30px] text-white mr-2' onClick={() => setMobileMenuOpen(false)} />
        ) : <HiOutlineMenu className='w-[30px] h-[30px] text-white mr-2' onClick={() => setMobileMenuOpen(true)} />}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl [#121212] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={logo} alt='logo' className='w-full h-[58px] object-contain' />
        <NavLinks handleClick={() => setMobileMenuOpen (false)} />
      </div>
    </>
  )

};

export default Sidebar;
