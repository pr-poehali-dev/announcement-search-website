import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
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
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { toast } = useToast();

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
      setShowResetForm(false);
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

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetEmail) {
      setResetSent(true);
      toast({
        title: "Письмо отправлено",
        description: `Инструкции по восстановлению пароля отправлены на ${resetEmail}`,
      });
      setTimeout(() => {
        setResetSent(false);
        setResetEmail("");
        setShowResetForm(false);
      }, 3000);
    }
  };

  const handleBackToLogin = () => {
    setShowResetForm(false);
    setResetSent(false);
    setResetEmail("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name={showResetForm ? "KeyRound" : "User"} size={24} className="text-primary" />
            {showResetForm ? "Восстановление пароля" : "Вход и регистрация"}
          </DialogTitle>
          <DialogDescription>
            {showResetForm 
              ? "Введите email для восстановления доступа" 
              : "Войдите или создайте аккаунт для размещения объявлений"}
          </DialogDescription>
        </DialogHeader>

        {showResetForm ? (
          <div className="pt-4">
            {resetSent ? (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <Icon name="CheckCircle" size={18} className="text-green-600" />
                <AlertDescription className="text-green-800 ml-2">
                  Письмо с инструкциями отправлено на {resetEmail}
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <div className="relative">
                    <Icon name="Mail" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="your@email.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Мы отправим вам ссылку для сброса пароля
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleBackToLogin}
                    className="flex-1"
                  >
                    <Icon name="ArrowLeft" size={18} className="mr-2" />
                    Назад
                  </Button>
                  <Button type="submit" className="flex-1">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить
                  </Button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Icon name="Info" size={18} className="text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Проверьте почту</p>
                      <p className="text-xs">
                        Если письмо не пришло в течение 5 минут, проверьте папку "Спам"
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        ) : (
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

                <Button 
                  type="button" 
                  variant="link" 
                  className="px-0 text-sm"
                  onClick={() => setShowResetForm(true)}
                >
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
        )}
      </DialogContent>
    </Dialog>
  );
};
