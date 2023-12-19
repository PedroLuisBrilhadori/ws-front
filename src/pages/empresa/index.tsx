import { ArrowLeft } from "lucide-react";
import { BaseForm } from "./_components/base-form";
import { findMetaAccounts } from "@/services/meta-business";
import { MetaAccount } from "@/models";
import { RestrictedForm } from "./_components/restricted-form";
import { UpdateUser } from "@/models/user";
import { useCheckPermission } from "@/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserHeaders } from "@/hooks";

export default function Index() {
  const [metaAccounts, setMetaAccounts] = useState<MetaAccount[]>();
  const { user, headers } = useUserHeaders();

  const form = useForm<UpdateUser>({ defaultValues: user });
  const { reset } = form;
  const read = useCheckPermission("READ_COMPANY");
  const update = useCheckPermission("UPDATE_COMPANY");

  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  if (!user) return;

  useEffect(() => {
    if (user) {
      findMetaAccounts({ headers, companyId: user?.company?.id }).then(
        (response) => {
          setMetaAccounts(response);
        }
      );
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-y-4 h-full items-center text-gray-300 w-full">
      <div className="bg-[#111b21] fixed gap-y-2 h-fit px-4 top-0 w-full z-20">
        <h2 className="flex flex-row gap-x-2 min-h-[53px] items-center place-content-between text-[#AEBAC1] w-full">
          <div className="flex flex-row gap-x-4 items-center">
            <ArrowLeft onClick={handleGoBack} />
            <p className="font-semibold text-gray-300 text-lg">Empresa</p>
          </div>
        </h2>
      </div>

      <BaseForm />
      {read &&
        metaAccounts?.map((account, key) => (
          <RestrictedForm
            key={key}
            metaAccount={account}
            updatePermission={update}
          />
        ))}
    </div>
  );
}
