'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { WelcomeScreen } from '@/components/chat/WelcomeScreen';
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';
import { SettingsModal } from '@/components/ui/SettingsModal';
import { useSidebar } from '@/hooks/useSidebar';
import { useChat } from '@/hooks/useChat';

export default function Home() {
  const {
    isOpen: isSidebarOpen,
    isMobile,
    toggle: toggleSidebar,
    close: closeSidebar,
  } = useSidebar();

  const {
    messages,
    activeSessionId,
    isDemoActive,
    isLoading,
    sendMessage,
    resetChat,
    toggleDemo,
    selectChat,
  } = useChat();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSelectPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="flex h-screen w-full bg-white text-[#111827] overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        selectedChatId={activeSessionId}
        onSelectChat={(session) => {
          selectChat(session);
          if (isMobile) closeSidebar();
        }}
        onNewChat={resetChat}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isMobile={isMobile}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-white relative overflow-hidden">
        {/* Chat Header */}
        <ChatHeader
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          onResetChat={resetChat}
          isDemoActive={isDemoActive}
          onToggleDemo={toggleDemo}
          onOpenSettings={() => setIsSettingsOpen(true)}
          isMobile={isMobile}
        />

        {/* Dynamic Chat Canvas: Welcome Screen or Message Thread */}
        <div className="flex-1 flex flex-col min-h-0 relative bg-white">
          {messages.length === 0 ? (
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col justify-center bg-white">
              <WelcomeScreen onSelectPrompt={handleSelectPrompt} />
            </div>
          ) : (
            <MessageList messages={messages} />
          )}

          {/* Large Centered Input Box */}
          <div className="shrink-0 w-full pt-1 bg-white">
            <MessageInput onSendMessage={sendMessage} disabled={isLoading} />
          </div>
        </div>
      </main>

      {/* System Settings & Model Configuration Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
