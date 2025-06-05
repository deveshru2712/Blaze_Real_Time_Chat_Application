import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  type: "email" | "password" | "text";
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type,
}: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <FormItem>
        <FormLabel className="text-lg font-semibold">{label}</FormLabel>
        <FormControl>
          <Input
            className={`p-3 text-lg font-semibold ${
              fieldState.error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }`}
            placeholder={placeholder}
            type={type}
            {...field}
          />
        </FormControl>
        <FormMessage className="text-red-500 text-sm mt-1" />
        {fieldState.error && (
          <p className="text-red-500 text-sm mt-1">
            {fieldState.error.message}
          </p>
        )}
      </FormItem>
    )}
  />
);

export default FormField;
