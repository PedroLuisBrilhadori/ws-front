import { baseUrl } from "@/services";
import { Button, Input } from "@/components/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { LockKeyhole, Mail } from "lucide-react";
import { setCookie } from "nookies";
import { setUser } from "@/store/user";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type LoginDto = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const defaultValues: LoginDto = {
    email: "",
    password: "",
  };

  const form = useForm<LoginDto>({ defaultValues });

  const onSubmitLogin = form.handleSubmit(async (data) => {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    const body = JSON.stringify(data);

    fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers,
      body,
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.status !== 200) throw new Error(data.message[0]);

        setCookie(undefined, "nextauth.whatsapp.token", data.access_token, {
          maxAge: 60 * 60 * 1, // 1 hour
        });

        dispatch(setUser(data));
        navigate("/");
      })
      .catch((error) => {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive",
        });
      });
  });

  return (
    <div className="bg-background-dark flex h-screen justify-center place-items-center text-typography-embedded-dark w-full">
      <div className="bg-component-card flex flex-col gap-4 p-4 rounded-md min-w-[280px] max-w-[350px]">
        <h1 className="font-bold self-center text-typography-embedded-dark text-xl">
          Login
        </h1>

        <p className="text-typography-embedded-dark">
          Realize o login para acessar o sistema
        </p>

        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className="flex flex-col gap-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-typography-embedded-dark">
                    Seu nome
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-row gap-x-4 h-fit items-center">
                      <Mail className="text-icon" />
                      <Input {...field} type={"email"} placeholder="Email" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-typography-embedded-dark">
                    Seu e-mail
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-row gap-x-4 h-fit items-center">
                      <LockKeyhole className="text-icon" />
                      <Input {...field} type={"password"} placeholder="Senha" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button onClick={() => onSubmitLogin()}>Entrar</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
