import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface Chat {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  ad: {
    title: string;
    price: number;
    image: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  isRead: boolean;
}

export const MessagesPage = () => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(1);
  const [messageText, setMessageText] = useState("");

  const chats: Chat[] = [
    {
      id: 1,
      user: {
        name: "Алексей Петров",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      },
      ad: {
        title: "iPhone 14 Pro Max 256GB",
        price: 89900,
        image: "https://images.unsplash.com/photo-1678652197950-006b69d0c7d2?w=100&h=100&fit=crop",
      },
      lastMessage: "Можно посмотреть сегодня вечером?",
      lastMessageTime: "14:30",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: 2,
      user: {
        name: "Мария Смирнова",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      },
      ad: {
        title: "MacBook Pro 16 M2 Max",
        price: 289000,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop",
      },
      lastMessage: "Спасибо за информацию!",
      lastMessageTime: "Вчера",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: 3,
      user: {
        name: "Дмитрий Козлов",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      ad: {
        title: "Toyota Camry 2020",
        price: 2450000,
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=100&h=100&fit=crop",
      },
      lastMessage: "Торг уместен?",
      lastMessageTime: "2 дня назад",
      unreadCount: 1,
      isOnline: true,
    },
  ];

  const messages: Message[] = [
    {
      id: 1,
      text: "Здравствуйте! Интересует ваш iPhone. Он в хорошем состоянии?",
      time: "14:15",
      isMine: false,
      isRead: true,
    },
    {
      id: 2,
      text: "Добрый день! Да, телефон в отличном состоянии. Использовался 3 месяца, всегда в чехле.",
      time: "14:18",
      isMine: true,
      isRead: true,
    },
    {
      id: 3,
      text: "Батарея в порядке? И есть ли все документы?",
      time: "14:20",
      isMine: false,
      isRead: true,
    },
    {
      id: 4,
      text: "Батарея на 100%, все документы и коробка на месте. Чек из официального магазина Apple тоже есть.",
      time: "14:22",
      isMine: true,
      isRead: true,
    },
    {
      id: 5,
      text: "Отлично! А где можно посмотреть?",
      time: "14:25",
      isMine: false,
      isRead: true,
    },
    {
      id: 6,
      text: "Я в районе метро Арбатская. Можем встретиться в ТЦ, там удобно.",
      time: "14:27",
      isMine: true,
      isRead: true,
    },
    {
      id: 7,
      text: "Можно посмотреть сегодня вечером?",
      time: "14:30",
      isMine: false,
      isRead: false,
    },
  ];

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 py-6">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
          <Icon name="MessageCircle" size={32} className="text-primary" />
          Сообщения
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="relative">
                <Input
                  placeholder="Поиск по сообщениям..."
                  className="pl-10"
                />
                <Icon
                  name="Search"
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
              </div>
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-280px)]">
              <CardContent className="p-0">
                {chats.map((chat, index) => (
                  <div key={chat.id}>
                    <div
                      className={`p-4 cursor-pointer transition-colors hover:bg-secondary/50 ${
                        selectedChatId === chat.id ? "bg-primary/10" : ""
                      }`}
                      onClick={() => setSelectedChatId(chat.id)}
                    >
                      <div className="flex gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={chat.user.avatar} />
                            <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
                          </Avatar>
                          {chat.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-semibold text-sm truncate">
                              {chat.user.name}
                            </h4>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {chat.lastMessageTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <img
                              src={chat.ad.image}
                              alt={chat.ad.title}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <p className="text-xs text-muted-foreground truncate">
                              {chat.ad.title}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground truncate">
                              {chat.lastMessage}
                            </p>
                            {chat.unreadCount > 0 && (
                              <Badge className="ml-2 bg-primary text-primary-foreground">
                                {chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < chats.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </ScrollArea>
          </Card>

          <Card className="lg:col-span-2 flex flex-col">
            {selectedChat ? (
              <>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={selectedChat.user.avatar} />
                          <AvatarFallback>{selectedChat.user.name[0]}</AvatarFallback>
                        </Avatar>
                        {selectedChat.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{selectedChat.user.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedChat.isOnline ? "Онлайн" : "Был(а) недавно"}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Icon name="MoreVertical" size={20} />
                    </Button>
                  </div>
                </CardHeader>

                <Separator />

                <div className="flex items-center gap-3 p-4 bg-secondary/30">
                  <img
                    src={selectedChat.ad.image}
                    alt={selectedChat.ad.title}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{selectedChat.ad.title}</h4>
                    <p className="text-lg font-bold text-foreground">
                      {selectedChat.ad.price.toLocaleString()} ₽
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon name="ExternalLink" size={16} className="mr-2" />
                    Открыть
                  </Button>
                </div>

                <Separator />

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] ${
                            message.isMine
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground"
                          } rounded-2xl px-4 py-2`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className={`text-xs ${
                              message.isMine ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}>
                              {message.time}
                            </span>
                            {message.isMine && (
                              <Icon
                                name={message.isRead ? "CheckCheck" : "Check"}
                                size={14}
                                className={message.isRead ? "text-blue-300" : "text-primary-foreground/70"}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Separator />

                <div className="p-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Icon name="Paperclip" size={20} />
                    </Button>
                    <Input
                      placeholder="Введите сообщение..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <Icon name="MessageCircle" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">
                    Выберите чат
                  </h3>
                  <p className="text-muted-foreground">
                    Выберите диалог из списка, чтобы начать общение
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
