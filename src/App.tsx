/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType } from './types';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { ProductView } from './views/ProductView';
import { CartView } from './views/CartView';
import { LabView } from './views/LabView';
import { ReceiptToastModal } from './components/ReceiptToastModal';
import { ProfileModal } from './components/ProfileModal';
import { COAModal } from './components/COAModal';

function MainApp() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isCOAOpen, setIsCOAOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#0a0e13] flex justify-center selection:bg-primary-container selection:text-on-primary-container">
      {/* Mobile Shell Frame Container */}
      <div className="relative w-full max-w-md bg-surface min-h-screen flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.9)] border-x border-[#1c2025]/80 overflow-x-hidden">
        {/* Global Fixed Top App Bar */}
        <Header
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Dynamic Main Body with pt-16 (for header) and pb-20 (for bottom nav) */}
        <main className="flex-1 w-full pt-16 pb-20 bg-surface">
          {currentScreen === 'home' && (
            <HomeView
              onNavigate={setCurrentScreen}
              onOpenCOA={() => setIsCOAOpen(true)}
            />
          )}

          {currentScreen === 'product' && (
            <ProductView onNavigate={setCurrentScreen} />
          )}

          {currentScreen === 'cart' && (
            <CartView onNavigate={setCurrentScreen} />
          )}

          {currentScreen === 'lab' && (
            <LabView
              onNavigate={setCurrentScreen}
              onOpenCOA={() => setIsCOAOpen(true)}
            />
          )}
        </main>

        {/* Global Fixed Bottom Navigation Tab Bar */}
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
        />

        {/* Direct Checkout Toast & Order Receipt Modal */}
        <ReceiptToastModal />

        {/* Athlete Profile Modal */}
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />

        {/* Certificate of Analysis (COA) Inspector Modal */}
        <COAModal
          isOpen={isCOAOpen}
          onClose={() => setIsCOAOpen(false)}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
