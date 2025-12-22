import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">FORGE</h1>
          <nav className="nav">
            <button className="nav-btn">Home</button>
            <button className="nav-btn">Services</button>
            <button className="nav-btn">About</button>
            <button className="nav-btn">Contact</button>
          </nav>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 FORGE - Personal Engineering Advisor</p>
      </footer>
    </div>
  );
};
