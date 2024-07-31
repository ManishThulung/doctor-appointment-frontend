import classNames from "classnames";
import get from "lodash.get";

import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
  FieldValues,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FormErrorMessage } from "../atoms/form-error-message";
import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export type SelectProps = {
  id: string;
  name: string;
  label: string;
  className?: string;
} & Omit<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  "size"
>;

export type FormSelectProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  options: { value: string; label: string }[];
} & Omit<SelectProps, "name" | "type">;

export const FormSelect = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  options,
  ...props
}: FormSelectProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={classNames("", className)} aria-live="polite">
      <label className="text-gray-800 font-semibold mb-2 block">{props.label}</label>
      <select
        name={name}
        aria-invalid={hasError}
        className={classNames({
          "w-[305px] transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600":
            hasError,
        })}
        {...(register && register(name, rules))}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }: { message: string }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </div>
  );
};
