// import classNames from "classnames";
// import get from "lodash.get";

// import {
//   RegisterOptions,
//   DeepMap,
//   FieldError,
//   UseFormRegister,
//   Path,
//   FieldValues,
//   ValidationRule,
// } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
// import { Input, InputProps } from "../atoms/input";
// import { FormErrorMessage } from "../atoms/form-error-message";

// export type FormInputProps<TFormValues extends FieldValues> = {
//   name: Path<TFormValues>;
//   rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
//   register?: UseFormRegister<TFormValues>;
//   errors?: Partial<DeepMap<TFormValues, FieldError>>;
// } & Omit<InputProps, "name">;;

// export const FormInput = <TFormValues extends Record<string, unknown>>({
//   name,
//   register,
//   rules,
//   errors,
//   className,
//   ...props
// }: FormInputProps<TFormValues>): JSX.Element => {
//   // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
//   const errorMessages = get(errors, name);
//   const hasError = !!(errors && errorMessages);

//   return (
//     <div className={classNames("", className)} aria-live="polite">
//       <label className="text-gray-800 text-sm mb-2 block">{props.label}</label>
//       <Input
//         name={name}
//         aria-invalid={hasError}
//         className={classNames({
//           "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600":
//             hasError,
//         })}
//         {...props}
//         {...(register && register(name, rules))}
//       />
//       <ErrorMessage
//         errors={errors}
//         name={name as any}
//         render={({ message }: { message: string }) => (
//           <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
//         )}
//       />
//     </div>
//   );
// };


import classNames from "classnames";
import get from "lodash.get";
import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
  FieldValues,
  ValidationRule,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Input, InputProps } from "../atoms/input";
import { FormErrorMessage } from "../atoms/form-error-message";

// Define FormInputProps to ensure compatibility with InputProps and RegisterOptions.
export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, "name">;

export const FormInput = <TFormValues extends FieldValues>({
  name,
  register,
  rules,
  errors,
  className,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={classNames("", className)} aria-live="polite">
      <label className="text-gray-800 text-sm mb-2 block">{props.label}</label>
      <Input
        name={name} // Input name from useForm
        aria-invalid={hasError} // Handle error state
        className={classNames({
          "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600":
            hasError,
        })}
        {...props}
        {...(register && register(name, rules))} // Handle form registration
      />
      <ErrorMessage
        errors={errors}
        name={name as any} // Type assertion to handle dynamic field names
        render={({ message }: { message: string }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </div>
  );
};
