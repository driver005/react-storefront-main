import {
  CheckoutDetailsFragment,
  CountryCode,
  useCheckoutShippingAddressUpdateMutation,
} from "../../saleor/api";
import React, { useState } from "react";
import { Button } from "../Button";
import AddressDisplay from "./AddressDisplay";
import { AddressForm, AddressFormData } from "./AddressForm";
import { PencilIcon } from "@heroicons/react/outline";

export interface ShippingAddressSectionProps {
  active: boolean;
  checkout: CheckoutDetailsFragment;
  setCheckout?: any;
}

export const ShippingAddressSection: React.VFC<ShippingAddressSectionProps> = ({
  active,
  checkout,
  setCheckout
}) => {
  const [editing, setEditing] = useState(!checkout.shippingAddress);
  const [shippingAddressUpdateMutation] =
    useCheckoutShippingAddressUpdateMutation({});

  const billingAddress = checkout.billingAddress;

  const onSameAsBilling = async () => {
    if (!billingAddress) {
      return;
    }
    const { data } = await shippingAddressUpdateMutation({
      variables: {
        address: {
          firstName: billingAddress.firstName || "",
          lastName: billingAddress.lastName || "",
          phone: billingAddress.phone || "",
          country:
            (billingAddress?.country?.code as CountryCode) || CountryCode.Pl,
          streetAddress1: billingAddress.streetAddress1 || "",
          city: billingAddress.city || "",
          postalCode: billingAddress.postalCode || "",
        },
        token: checkout.token,
      },
    });
    // if (!!data?.checkoutShippingAddressUpdate?.errors.length) {
    //   // todo: add error handling
    //   return;
    // }

    setCheckout({
      ...checkout,
      shippingAddress: data
    })

    // // Successfully updated the shipping address
    setEditing(false);
  };
  const updateMutation = async (formData: AddressFormData) => {
    const { data } = await shippingAddressUpdateMutation({
      variables: {
        address: {
          ...formData,
        },
        token: checkout.token,
      },
    });
    setCheckout({
      ...checkout,
      shippingAddress: data
    })
    return data?.checkoutShippingAddressUpdate?.errors.filter((e) => !!e) || [];
  };

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
          Shipping Address
        </h2>
      </div>
      {active && (
        <>
          {editing ? (
            <>
              <div className="col-span-full">
                <button
                  className="btn-checkout-section"
                  onClick={onSameAsBilling}
                >
                  Use the same address as billing
                </button>
              </div>
              <AddressForm
                existingAddressData={checkout.shippingAddress || undefined}
                toggleEdit={() => setEditing(false)}
                updateAddressMutation={updateMutation}
              />
            </>
          ) : (
            <section className="flex justify-between items-center mb-4">
              {!!checkout.shippingAddress && (
                <AddressDisplay address={checkout.shippingAddress} />
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

export default ShippingAddressSection;
