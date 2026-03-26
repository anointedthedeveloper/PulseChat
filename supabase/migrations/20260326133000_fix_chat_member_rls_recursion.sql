CREATE OR REPLACE FUNCTION public.is_chat_room_member(target_room_id UUID, target_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.chat_members
    WHERE chat_room_id = target_room_id
      AND user_id = target_user_id
  );
$$;

REVOKE ALL ON FUNCTION public.is_chat_room_member(UUID, UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_chat_room_member(UUID, UUID) TO authenticated;

DROP POLICY IF EXISTS "Members can view their chat rooms" ON public.chat_rooms;
CREATE POLICY "Members can view their chat rooms" ON public.chat_rooms
FOR SELECT TO authenticated
USING (public.is_chat_room_member(id));

DROP POLICY IF EXISTS "Members can view chat members" ON public.chat_members;
CREATE POLICY "Members can view chat members" ON public.chat_members
FOR SELECT TO authenticated
USING (public.is_chat_room_member(chat_room_id));

DROP POLICY IF EXISTS "Members can view messages" ON public.messages;
CREATE POLICY "Members can view messages" ON public.messages
FOR SELECT TO authenticated
USING (public.is_chat_room_member(chat_room_id));

DROP POLICY IF EXISTS "Members can send messages" ON public.messages;
CREATE POLICY "Members can send messages" ON public.messages
FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = sender_id
  AND public.is_chat_room_member(chat_room_id)
);

DROP POLICY IF EXISTS "Users can update their own messages read status" ON public.messages;
CREATE POLICY "Users can update their own messages read status" ON public.messages
FOR UPDATE TO authenticated
USING (public.is_chat_room_member(chat_room_id));
