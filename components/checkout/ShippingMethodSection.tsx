import React, { useState } from "react";

import { RadioGroup } from "@headlessui/react";
import {
  CheckoutDetailsFragment,
  useCheckoutShippingMethodUpdateMutation,
} from "../../saleor/api";
import { Button } from "../Button";
import ShippingMethodDisplay from "./ShippingMethodDisplay";
import { ShippingMethodOption } from "./ShippingMethodOption";
import { PencilIcon } from "@heroicons/react/outline";

export interface ShippingMethodSectionProps {
  checkout: CheckoutDetailsFragment;
  active: boolean;
  setCheckout: any;
}

export const ShippingMethodSection: React.VFC<ShippingMethodSectionProps> = ({
  checkout,
  active,
  setCheckout
}) => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    checkout.shippingMethod
  );
  const [editing, setEditing] = useState(!checkout.shippingMethod);

  const [checkoutShippingMethodUpdate] =
    useCheckoutShippingMethodUpdateMutation({});

  const handleChange = async (method: any) => {
    const { data } = await checkoutShippingMethodUpdate({
      variables: {
        token: checkout.token,
        shippingMethodId: method.id,
      },
    });
    // if (!!data?.checkoutShippingMethodUpdate?.errors.length) {
    //   // todo: handle errors
    //   console.error(data?.checkoutShippingMethodUpdate?.errors);
    //   return;
    // }
    setCheckout({
      ...checkout,
      shippingMethod: data
    })
    setSelectedDeliveryMethod(method);
    setTimeout(() => {
      setEditing(false);
    }, 2000)
    
  };

  const availableShippingMethods =
    checkout.availableShippingMethods.filter((m) => !!m) || [];
  console.log(!checkout.shippingMethod)
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
          Shipping Method
        </h2>
      </div>
      {active && (
        <>
          {editing ? (
            <>
              <RadioGroup
                value={selectedDeliveryMethod}
                onChange={handleChange}
                className="py-8"
              >
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {/* {availableShippingMethods.map((method) => {
                    if (!!method)
                      // todo: Investigate why filter did not excluded non existing methods
                      return (
                        <ShippingMethodOption method={method} key={method.id} />
                      );
                  })} */}
                  <ShippingMethodOption method={{
                    id: "30074937589345",
                    name: "Standard",
                    __typename: "ShippingMethod",
                    maximumDeliveryDays: 20,
                    minimumDeliveryDays: 2,
                    price: {
                      __typename: "Money",
                      amount: 14.99,
                      currency: "$",
                      localizedAmount: "$19.45"
                    }
                }} />
                </div>
              </RadioGroup>
            </>
          ) : (
            <section className="flex justify-between items-center mb-4">
              {checkout.shippingMethod && (
                  <ShippingMethodDisplay method={checkout.shippingMethod} />
              )}
              <div className="flex justify-between items-center">
                <Button onClick={() => setEditing(true)}>
                  <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                  Change
                </Button>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};
