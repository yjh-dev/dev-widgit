export interface GuestMessage {
  id: string;
  name: string;
  text: string;
  date: string;
}

export function createMessage(name: string, text: string): GuestMessage {
  return {
    id: Date.now().toString(36),
    name: name || "익명",
    text,
    date: new Date().toLocaleDateString("ko-KR"),
  };
}
