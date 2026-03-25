import { useCallback, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/hooks/useChat";
import { useWebRTC } from "@/hooks/useWebRTC";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatPanel from "@/components/chat/ChatPanel";
import EmptyChatPanel from "@/components/chat/EmptyChatPanel";
import CallOverlay from "@/components/chat/CallOverlay";
import UserProfilePanel from "@/components/chat/UserProfilePanel";
import { AnimatePresence, motion } from "framer-motion";

const ChatPage = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [secondChatId, setSecondChatId] = useState<string | null>(null);

  const {
    chatRooms, activeChat, activeChatId, setActiveChatId,
    messages, sendMessage, createDirectMessage, createGroupChat,
    isOtherTyping, sendTyping, fetchChatRooms,
  } = useChat();

  const {
    callState, callType, remoteUsername, localStream, remoteStream,
    callDuration, startCall, startGroupCall, acceptCall, rejectCall, endCall, toggleMute, toggleVideo,
  } = useWebRTC();

  const handleCreateDM = useCallback(async (userId: string) => {
    const roomId = await createDirectMessage(userId);
    if (roomId) { setActiveChatId(roomId); setSidebarOpen(false); }
  }, [createDirectMessage, setActiveChatId]);

  const handleCreateGroup = useCallback(async (name: string, memberIds: string[]) => {
    const roomId = await createGroupChat(name, memberIds);
    if (roomId) { setActiveChatId(roomId); setSidebarOpen(false); }
  }, [createGroupChat, setActiveChatId]);

  const handleSelectChat = useCallback((id: string) => {
    setActiveChatId(id);
    setSidebarOpen(false);
    setProfileOpen(false);
  }, [setActiveChatId]);

  const handleStartCall = useCallback((type: "audio" | "video") => {
    if (!activeChat) return;
    if (activeChat.is_group) {
      // Call all group members except self
      const otherMembers = activeChat.members
        .filter((m: any) => m.user_id !== user?.id)
        .map((m: any) => m.user_id);
      if (otherMembers.length > 0) {
        startGroupCall(otherMembers, type, activeChat.id);
      }
    } else {
      const otherMember = activeChat.members.find((m: any) => m.user_id !== user?.id);
      if (otherMember) startCall(otherMember.user_id, type);
    }
  }, [activeChat, user, startCall, startGroupCall]);

  const handleAcceptCall = useCallback(() => {
    const signal = (window as any).__pendingCallSignal;
    if (signal) acceptCall(signal);
  }, [acceptCall]);

  // Open a second chat in split view
  const handleOpenSecondChat = useCallback((id: string) => {
    setSecondChatId(id === secondChatId ? null : id);
  }, [secondChatId]);

  const secondChat = chatRooms.find((c) => c.id === secondChatId) || null;

  return (
    <div className="h-screen flex overflow-hidden bg-background">

      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-30 w-80 shrink-0 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <ChatSidebar
          chats={chatRooms}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          onCreateDM={handleCreateDM}
          onCreateGroup={handleCreateGroup}
          onOpenSecondChat={handleOpenSecondChat}
          secondChatId={secondChatId}
        />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex overflow-hidden min-w-0">
        {/* Primary chat */}
        <div className={`flex flex-col overflow-hidden transition-all duration-300 ${secondChat ? "w-1/2 border-r border-border" : "flex-1"}`}>
          {activeChat ? (
            <ChatPanel
              chat={activeChat}
              messages={messages}
              onSendMessage={(text, fileUrl, fileType, fileName, replyToId, replyToText, replyToSender) =>
                sendMessage(text, fileUrl, fileType, fileName, replyToId, replyToText, replyToSender)}
              onStartCall={handleStartCall}
              onTyping={sendTyping}
              isOtherTyping={isOtherTyping}
              onToggleSidebar={() => setSidebarOpen(true)}
              onToggleProfile={() => setProfileOpen((p) => !p)}
              profileOpen={profileOpen}
            />
          ) : (
            <EmptyChatPanel onToggleSidebar={() => setSidebarOpen(true)} />
          )}
        </div>

        {/* Second chat panel (split view) */}
        <AnimatePresence>
          {secondChat && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "50%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden flex flex-col"
            >
              <ChatPanel
                chat={secondChat}
                messages={[]}
                onSendMessage={() => {}}
                onStartCall={() => {}}
                onToggleSidebar={() => setSecondChatId(null)}
                profileOpen={false}
                isSecondPanel
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile panel */}
        {activeChat && (
          <UserProfilePanel
            chat={activeChat}
            open={profileOpen}
            onClose={() => setProfileOpen(false)}
            onStartCall={handleStartCall}
            onRefresh={fetchChatRooms}
          />
        )}
      </div>

      <AnimatePresence>
        {callState !== "idle" && (
          <CallOverlay
            callState={callState}
            callType={callType}
            remoteUsername={remoteUsername}
            localStream={localStream}
            remoteStream={remoteStream}
            callDuration={callDuration}
            onAccept={handleAcceptCall}
            onEnd={endCall}
            onReject={rejectCall}
            onToggleMute={toggleMute}
            onToggleVideo={toggleVideo}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatPage;
