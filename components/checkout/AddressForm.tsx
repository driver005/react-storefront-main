import {
  AddressDetailsFragment,
  CheckoutError,
  CountryCode,
} from "../../saleor/api";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "components/Input";

export interface AddressFormData {
  firstName: string;
  lastName: string;
  phone: string;
  country: CountryCode;
  streetAddress1: string;
  city: string;
  postalCode: string;
}

export interface AddressFormProps {
  existingAddressData?: AddressDetailsFragment;
  toggleEdit: () => void;
  updateAddressMutation: (address: AddressFormData) => Promise<CheckoutError[]>;
}

export const AddressForm: React.VFC<AddressFormProps> = ({
  existingAddressData,
  toggleEdit,
  updateAddressMutation,
}) => {
  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    formState: { errors: errorsAddress },
    setError: setErrorAddress,
    getValues,
  } = useForm<AddressFormData>({
    defaultValues: {
      firstName: existingAddressData?.firstName || "",
      lastName: existingAddressData?.lastName || "",
      phone: existingAddressData?.phone || "",
      country: CountryCode.Pl,
      streetAddress1: existingAddressData?.streetAddress1 || "",
      city: existingAddressData?.city || "",
      postalCode: existingAddressData?.postalCode || "",
    },
  });

  const onAddressFormSubmit = handleSubmitAddress(
    async (formData: AddressFormData) => {
      const errors = await updateAddressMutation(formData);

      // Assign errors to the form fields
      // if (errors.length > 0) {
      //   errors.forEach((e) =>
      //     setErrorAddress(e.field as keyof AddressFormData, {
      //       message: e.message || "",
      //     })
      //   );
      //   return;
      // }
      
      // Address updated, we can exit the edit mode
      toggleEdit();
    }
  );
  return (
    <form onSubmit={onAddressFormSubmit}>
      <div className="grid grid-cols-12 gap-4 w-full">
        <Input
          divclass="col-span-full"
          htmlfor="address"
          labelclass="block text-sm font-medium text-gray-700"
          label="Phone"
          type="text"
          id="phone"
          inputclass="w-full border-gray-300 rounded-md shadow-sm text-sm"
          hook={registerAddress("phone", {
                required: true,
                pattern: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i,
          })}
          iserror={errorsAddress.phone}
          errormessage={errorsAddress.phone?.message}
        />

        <Input
          divclass="col-span-full sm:col-span-6"
          htmlfor="province"
          labelclass="block text-sm font-medium text-gray-700"
          label="First Name"
          type="text"
          id="firstName"
          inputclass="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          hook={registerAddress("firstName", {
            required: true,
          })}
          iserror={errorsAddress.firstName}
          errormessage={errorsAddress.firstName?.message}
        />

        <Input
          divclass="col-span-full sm:col-span-6"
          htmlfor="province"
          labelclass="block text-sm font-medium text-gray-700"
          label="Last Name"
          type="text"
          id="lastName"
          inputclass="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          hook={registerAddress("lastName", {
            required: true,
          })}
          iserror={errorsAddress.lastName}
          errormessage={errorsAddress.lastName?.message}
        />

        <Input
          divclass="col-span-full"
          htmlfor="address"
          labelclass="block text-sm font-medium text-gray-700"
          label="Address"
          type="text"
          id="streetAddress1"
          inputclass="w-full border-gray-300 rounded-md shadow-sm text-sm"
          hook={registerAddress("streetAddress1", {
            required: true,
          })}
          iserror={errorsAddress.streetAddress1}
          errormessage={errorsAddress.streetAddress1?.message}
        />

        <Input
          divclass="col-span-full sm:col-span-6"
          htmlfor="city"
          labelclass="block text-sm font-medium text-gray-700"
          label="City"
          type="text"
          id="city"
          inputclass="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          hook={registerAddress("city", {
            required: true,
          })}
          iserror={errorsAddress.city}
          errormessage={errorsAddress.city?.message}
        />

        {/* <Input
          divclass="col-span-full sm:col-span-4"
          htmlfor="province"
          labelclass="block text-sm font-medium text-gray-700"
          label="Province"
          type="text"
          id="province"
          inputclass="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        /> */}
        
        <Input
          divclass="col-span-full sm:col-span-6"
          htmlfor="postal-code"
          labelclass="block text-sm font-medium text-gray-700"
          label="Postal code"
          type="text"
          id="postal-code"
          autoComplete="postal-code"
          inputclass="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          hook={registerAddress("postalCode", {
            required: true,
          })}
          iserror={errorsAddress.postalCode}
          errormessage={errorsAddress.postalCode?.message}
        />
        
        <div className="col-span-full">
          <button
            className="btn-checkout-section"
            onClick={onAddressFormSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
