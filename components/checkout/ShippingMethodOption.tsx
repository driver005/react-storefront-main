import { DeliveryMethodFragment } from "../../saleor/api";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { CheckCircleIcon } from "@heroicons/react/solid";

export interface ShippingMethodOptionProps {
  method: DeliveryMethodFragment;
}

export const ShippingMethodOption: React.VFC<ShippingMethodOptionProps> = ({
  method,
}) => {
  return (
    <RadioGroup.Option
      key={method.id}
      value={method}
      className={({ checked, active }) =>
        clsx(
          checked ? "border-transparent" : "border-gray-300",
          active ? "ring-2 ring-purple-600 border-purple-600" : "",
          "bg-white border rounded-md shadow-sm p-4 flex cursor-pointer"
        )
      }
    >
      {({ checked, active }) => (
        <>
          <div className="flex-1 flex ">
            <div className="flex flex-col w-full">
              <RadioGroup.Label
                as="span"
                className="flex flex-wrap h-6 justify-between text-sm font-medium text-gray-900"
              >
                {method.name}
                {active && (
                  <CheckCircleIcon className="h-6 w-6 text-purple-500" aria-hidden="true" />
                )}
              </RadioGroup.Label>
              <RadioGroup.Description
                as="span"
                className="mt-1 flex items-center text-sm text-gray-500"
              >
                {method.minimumDeliveryDays || 2}-
                {method.maximumDeliveryDays || 14} business days
              </RadioGroup.Description>
              <RadioGroup.Description
                as="span"
                className="mt-6 text-sm font-medium text-gray-900"
              >
                {method.price?.localizedAmount}
              </RadioGroup.Description>
            </div>
          </div>
        </>
      )}
    </RadioGroup.Option>
  );
};
