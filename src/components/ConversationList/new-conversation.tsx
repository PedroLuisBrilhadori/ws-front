import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Icon } from "../ui/icon";
import { Input } from "@/components/ui";
import { MessageSquarePlus, Phone } from "lucide-react";
import {
  removeTelephoneMask,
  telephoneMask,
  validNumber,
} from "@/lib/telephone";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentMetaAccount } from "@/store/current-meta-account";
import { useToast } from "../ui/use-toast";

type PhoneDto = {
  number: string;
};

export const NewConversation = () => {
  const [open, setOpen] = useState(false);
  const numberRef = useRef<HTMLInputElement>(null);
  const metaAccount = useSelector(selectCurrentMetaAccount);
  const navigate = useNavigate();
  const { toast } = useToast();

  const defaultValues: PhoneDto = {
    number: "",
  };

  const form = useForm<PhoneDto>({ defaultValues });

  const onSubmit = form.handleSubmit(async (data) => {
    const number = numberRef.current?.value;

    if (!number) {
      toast({
        title: "Número inválido",
        description: "Por favor, digite um número válido",
        variant: "destructive",
      });

      return;
    }

    if (!metaAccount.id) {
      toast({
        title: "Nenhuma conta foi selecionada",
        description: "Por favor, selecione uma conta para iniciar uma conversa",
        variant: "destructive",
      });
      return;
    }

    if (!validNumber(number)) return;

    const num = removeTelephoneMask(number);

    navigate(`conversa/${metaAccount.id}/${num}`);
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Icon className="bg-primary">
          <MessageSquarePlus className="text-primary-foreground" />
        </Icon>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-md w-[350px] bg-card">
        <AlertDialogHeader>
          <AlertDialogTitle>Nova conversa</AlertDialogTitle>
          <AlertDialogDescription>
            Digite um número para iniciar uma nova conversa
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row gap-x-4 h-fit items-center">
                    <Phone className="text-card-foreground" />
                    <Input
                      ref={numberRef}
                      placeholder="Número"
                      maxLength={20}
                      onChange={(e) => {
                        if (!e.target.value) return;

                        const num = telephoneMask(e.target.value);

                        e.target.value = num;
                      }}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => onSubmit()}>
              Iniciar
            </AlertDialogAction>
          </AlertDialogFooter>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
