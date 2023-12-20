import { findMetaAccounts } from "@/services";
import { MetaAccount } from "@/models";
import { MetaAccountForm } from "./";
import { useEffect, useState } from "react";
import { useCheckPermission, useUserHeaders } from "@/hooks";

export function RestrictedForms() {
  const { user, headers } = useUserHeaders();
  const [metaAccounts, setMetaAccounts] = useState<MetaAccount[]>([]);

  const read = useCheckPermission("READ_COMPANY");
  const update = useCheckPermission("UPDATE_COMPANY");

  useEffect(() => {
    if (user) {
      findMetaAccounts({ headers, companyId: user?.company?.id }).then(
        (response) => {
          setMetaAccounts(response);
        }
      );
    }
  }, [user]);

  if (metaAccounts.length === 0) return;

  return (
    <div className="flex flex-wrap h-fit w-full gap-4 place-content-evenly">
      {read &&
        metaAccounts?.map((account, key) => (
          <MetaAccountForm
            key={key}
            metaAccount={account}
            updatePermission={update}
          />
        ))}
    </div>
  );
}
