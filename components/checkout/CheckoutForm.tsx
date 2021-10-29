import { CheckoutDetailsFragment } from "../../saleor/api";
import React, { useState } from "react";
import { ShippingMethodSection } from "./ShippingMethodSection";
import BillingAddressSection from "./BillingAddressSection";
import ShippingAddressSection from "./ShippingAddressSection";
import { EmailSection } from "./EmailSection";
import PaymentSection from "./payments/PaymentSection";

interface CollapsedSections {
  billingAddress: boolean;
  shippingAddress: boolean;
  shippingMethod: boolean;
  payment: boolean;
}

const sectionsManager = (
  checkout?: CheckoutDetailsFragment
): CollapsedSections => {
  console.log(checkout)
  console.log(checkout?.isShippingRequired && !checkout?.shippingAddress)
  // Will hide sections which cannot be set yet during the checkout
  // Start with all the sections hidden
  const state: CollapsedSections = {
    billingAddress: true,
    shippingAddress: true,
    shippingMethod: true,
    payment: true,
  };
  if (!checkout || !checkout.email) {
    return state;
  }
  state.billingAddress = false;
  if (!checkout.billingAddress) {
    return state;
  }
  state.shippingAddress = false;
  if (checkout.isShippingRequired && !checkout.shippingAddress) {
    return state;
  }
  state.shippingMethod = false;
  if (checkout.isShippingRequired && !checkout.shippingMethod) {
    return state;
  }
  state.payment = false;
  return state;
};

export const CheckoutForm = ({
  checkoutData,
}: {
  checkoutData?: CheckoutDetailsFragment;
}) => {
  const [checkout, setCheckout] = useState(checkoutData)
  
  const collapsedSections = sectionsManager(checkout);

  
  console.log(checkout)
  if (!checkout) {
    return <></>;
  }
  console.log(collapsedSections.shippingAddress)
  return (
    <section className=" border-r flex flex-auto flex-col overflow-y-auto px-32 pt-10 space-y-4 pb-4">
      <div className="checkout-section-container">
        <EmailSection checkout={checkout} />
      </div>
      <div className="checkout-section-container">
        <BillingAddressSection
          active={!collapsedSections.billingAddress}
          checkout={checkout}
          setCheckout={setCheckout}
        />
      </div>

      {checkout.isShippingRequired && (
        <div className="checkout-section-container">
          <ShippingAddressSection
            active={!collapsedSections.shippingAddress}
            checkout={checkout}
            setCheckout={setCheckout}
          />
        </div>
      )}
      {checkout.isShippingRequired && (
        <div className="checkout-section-container">
          <ShippingMethodSection
            active={!collapsedSections.shippingMethod}
            checkout={checkout}
            setCheckout={setCheckout}
          />
        </div>
      )}
      <div className="checkout-section-container border-none">
        <PaymentSection
          active={!collapsedSections.payment}
          checkout={checkout}
        />
      </div>
    </section>
  );
};
