import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: (user: { name: string; email: string }) => void;
}

export const AuthModal = ({ isOpen, onClose, onAuth }: AuthModalProps) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      onAuth({ 
        name: loginEmail.split('@')[0], 
        email: loginEmail 
      });
      onClose();
      setLoginEmail("");
      setLoginPassword("");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerName && registerEmail && registerPassword) {
      onAuth({ 
        name: registerName, 
        email: registerEmail 
      });
      onClose();
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterPhone("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="User" size={24} className="text-primary" />
            Вход и регистрация
          </DialogTitle>
          <DialogDescription>
            Войдите или создайте аккаунт для размещения объявлений
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Icon name="Mail" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Пароль</Label>
                <div className="relative">
                  <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="button" variant="link" className="px-0 text-sm">
                Забыли пароль?
              </Button>

              <Button type="submit" className="w-full">
                <Icon name="LogIn" size={18} className="mr-2" />
                Войти
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Или войти через
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button type="button" variant="outline">
                  <Icon name="Mail" size={18} className="mr-2" />
                  Google
                </Button>
                <Button type="button" variant="outline">
                  <Icon name="MessageCircle" size={18} className="mr-2" />
                  VK
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Имя</Label>
                <div className="relative">
                  <Icon name="User" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Иван Иванов"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <div className="relative">
                  <Icon name="Mail" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your@email.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-phone">Телефон</Label>
                <div className="relative">
                  <Icon name="Phone" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Пароль</Label>
                <div className="relative">
                  <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Минимум 6 символов"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="mt-1" required />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  Я принимаю условия пользовательского соглашения и политику конфиденциальности
                </label>
              </div>

              <Button type="submit" className="w-full">
                <Icon name="UserPlus" size={18} className="mr-2" />
                Зарегистрироваться
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Или зарегистрироваться через
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button type="button" variant="outline">
                  <Icon name="Mail" size={18} className="mr-2" />
                  Google
                </Button>
                <Button type="button" variant="outline">
                  <Icon name="MessageCircle" size={18} className="mr-2" />
                  VK
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
