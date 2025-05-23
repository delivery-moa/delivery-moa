import supabase from "../../config/supabaseClient";
import { useEffect, useState } from "react";
import Chat from "./ChatCard";

export default function ChatList({ room_id }) {
    const [chats, setChats] = useState([]);
    useEffect(() => {
        if (!chats.length) {
            const { data: chats, error} = supabase
                .from("chat")
                .select("*")
                .eq("room_id", room_id)
                .order("created_at", { ascending: true });
                // ascending: true 이므로 오래된 순으로 정렬
            if (error) {
                console.error("Error fetching chat list:", error);
            }
            if (chats) {
                setChats(chats);
            }
        }
        const chatSubscribe = supabase
            .channel("realtime:chat")
            .on(
                "postgress_changes", 
                { event: '*', schema: 'public', table: 'chat' },(payload) => {
                const { data: chats, error } = supabase
                    .from("chat")
                    .select("*")
                    .eq("room_id", room_id)
                    .order("created_at", { ascending: true });
                    // ascending: true 이므로 오래된 순으로 정렬
                if (error) {
                    console.error("Error fetching chat list:", error);
                }
                if (chats) {
                    setChats(chats);
                }
            })
            .subscribe();
        const roomSubscribe = supabase
            .channel("realtime:room")
            .on(
                "postgress_changes", 
                { event: '*', schema: 'public', table: 'room' },(payload) => {
                const { data: chats, error } = supabase
                    .from("chat")
                    .select("*")
                    .eq("room_id", room_id)
                    .order("created_at", { ascending: true });
                    // ascending: true 이므로 오래된 순으로 정렬
                if (error) {
                    console.error("Error fetching chat list:", error);
                }
                if (chats) {
                    setChats(chats);
                }
            })
            .subscribe();
        return () => {
            supabase.removeChannel(chatSubscribe);
            supabase.removeChannel(roomSubscribe);
        }
    }, [chatList]);
    

    if (error) {
        console.error("Error fetching chat list:", error);
        return <div>Error loading chat list</div>;
    }

    return (
        <div>
            {chatList.map((chat) => (
                <Chat
                    key={`${chat.room_id}-${chat.id}`}
                    id={chat.id}
                    user_id={chat.user_id}
                    chat={chat.chat}
                    created_at={chat.created_at}
                />
            ))}
        </div>
    );
}
