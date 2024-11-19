import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const Nav = styled.nav`
  background-color: rgba(5, 6, 6, 0.7);
  padding: 1rem;
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuButton = styled.button`
  display: block;
  background: none;
  border: none;
  font-size: 1.3rem;
  color: #ffd700;
  text-align: left;
  padding: 0.5rem 0;
  z-index: 1001;
  width: auto;

  @media (min-width: 768px) {
    display: none;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2.5rem; /* Increased font size for bigger close button */
  color: #ffd700; /* Text color */
  cursor: pointer;
  z-index: 1002;

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavContent = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    51,
    51,
    51,
    0.6
  ); /* Dark color for drawer with more transparency */
  backdrop-filter: blur(5px);
  padding: 2rem;
  z-index: 999;

  @media (min-width: 768px) {
    position: static;
    padding: 0;
    background-color: transparent;
    backdrop-filter: none;
  }
`;

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const NavItem = styled(motion.li)`
  margin: 0.5rem 0;

  @media (min-width: 768px) {
    margin: 0 1rem;
  }
`;

const NavLink = styled(Link)`
  font-size: 1.5rem; /* Increased font size for links */
  color: #ffd700; /* Link color */
  text-decoration: none;

  &:hover {
    color: #ffd700; /* Hover color */
  }

  &.active {
    color: #ffd700; /* Active link color */
    font-weight: bold;
  }
`;

const FleetButton = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    color: #ffd700;
    font-size: 1.3rem;
    cursor: pointer;
    z-index: 1001;
    
    &::after {
      content: '→';
      margin-left: 5px;
    }
  }
`;

const drawerVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const closeButtonVariants = {
  open: { opacity: 1, scale: 1 },
  closed: { opacity: 0, scale: 0.8 },
};

function Navigation({ isOpen, setIsOpen }) {
  const toggleMenu = () => setIsOpen(!isOpen);
  const isMobile = window.innerWidth < 768;
  const location = useLocation();
  const navigate = useNavigate();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setIsOpen(false),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleFleetClick = (e) => {
    e.stopPropagation();
    navigate('/our-cars');
  };

  return (
    <Nav>
      <MenuButton onClick={toggleMenu}>☰ Menu</MenuButton>
      {!isOpen && <FleetButton onClick={handleFleetClick}>
        Fleet
      </FleetButton>}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <NavContent
            {...swipeHandlers}
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
          >
            {isOpen && isMobile && (
              <CloseButton
                onClick={toggleMenu}
                variants={closeButtonVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                ✕
              </CloseButton>
            )}
            <NavList>
              {["Home", "Our Cars", "Reservations", "Manage Cars"].map(
                (item, index) => (
                  <NavItem
                    key={item}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    custom={index}
                  >
                    <NavLink
                      to={
                        item === "Home"
                          ? "/"
                          : `/${item.toLowerCase().replace(" ", "-")}`
                      }
                      className={
                        location.pathname ===
                        (item === "Home"
                          ? "/"
                          : `/${item.toLowerCase().replace(" ", "-")}`)
                          ? "active"
                          : ""
                      }
                      onClick={isMobile ? toggleMenu : undefined}
                    >
                      {item}
                    </NavLink>
                  </NavItem>
                )
              )}
            </NavList>
          </NavContent>
        )}
      </AnimatePresence>
    </Nav>
  );
}

export default Navigation;
