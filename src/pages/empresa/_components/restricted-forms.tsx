import { findMetaAccounts } from "@/services";
import { MetaAccountForm } from "./";
import { selectMetaAccounts, setMetaAccounts } from "@/store/meta-account";
import { useEffect } from "react";
import { useCheckPermission, useUserHeaders } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";

export function RestrictedForms() {
  const { user, headers } = useUserHeaders();
  const metaAccounts = useSelector(selectMetaAccounts);
  const dispatch = useDispatch();

  const read = useCheckPermission("READ_COMPANY");

  useEffect(() => {
    if (user.id) {
      findMetaAccounts({ headers, companyId: user?.company?.id }).then(
        (accounts) => {
          dispatch(setMetaAccounts(accounts));
        }
      );
    }
  }, [user]);

  if (metaAccounts.length === 0) return;

  return (
    <>
      <div className="flex flex-wrap h-fit w-full gap-4 place-content-evenly">
        {read &&
          metaAccounts?.map((account, key) => (
            <MetaAccountForm key={key} metaAccount={account} />
          ))}
      </div>
    </>
  );
}
