import {
  CheckoutDetailsFragment,
  useCheckoutBillingAddressUpdateMutation,
} from "../../saleor/api";
import React, { useState } from "react";
import { Button } from "../Button";
import AddressDisplay from "./AddressDisplay";
import { AddressForm, AddressFormData } from "./AddressForm";
import { PencilIcon } from "@heroicons/react/outline";

export interface BillingAddressSection {
  active: boolean;
  checkout: CheckoutDetailsFragment;
  setCheckout: any;
}

export const BillingAddressSection: React.VFC<BillingAddressSection> = ({
  active,
  checkout,
  setCheckout
}) => {
  const [editing, setEditing] = useState(!checkout.billingAddress);
  const [checkoutBillingAddressUpdate] =
    useCheckoutBillingAddressUpdateMutation({});

  const updateMutation = async (formData: AddressFormData) => {
    const { data } = await checkoutBillingAddressUpdate({
      variables: {
        address: {
          ...formData,
        },
        token: checkout.token,
      },
    });
    setCheckout({
      ...checkout,
      billingAddress: data
    })
    return data?.checkoutBillingAddressUpdate?.errors.filter((e) => !!e) || [];
  };

  const updateFormValues = () => {
    checkout = {
      ...checkout,
      billingAddress: true
    };
  }

  return (
    <>
      <div className="mt-4 mb-4">
        <h2
          className={
            active
              ? "checkout-section-header-active"
              : "checkout-section-header-disabled"
          }
        >
          Billing Address
        </h2>
      </div>
      {active && (
        <>
          {editing ? (
            <AddressForm
              existingAddressData={checkout.billingAddress || undefined}
              toggleEdit={() => setEditing(false)}
              updateAddressMutation={updateMutation}
            />
          ) : (
            <section className="flex justify-between items-center mb-4">
              {!!checkout.billingAddress && (
                <AddressDisplay address={checkout.billingAddress} />
              )}
              <Button onClick={() => setEditing(true)}>
                <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                Change
              </Button>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default BillingAddressSection;
