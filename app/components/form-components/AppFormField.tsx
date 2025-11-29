import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

interface AppFormFieldProps {
  form: any; 
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  isTextarea?: boolean;
  className?: string;
  disabled?: boolean;
}

export function AppFormField({
  form,
  name,
  label,
  placeholder,
  type = "text",
  isTextarea = false,
  className,
  disabled,
}: AppFormFieldProps) {
  return (
    <form.AppField name={name}>
      {(field: any) => (
        <div className="space-y-1">
          <Label htmlFor={field.name}>
            {label}
          </Label>
          
          {isTextarea ? (
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value || ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className={`resize-none ${className || ""}`}
              placeholder={placeholder}
              disabled={disabled}
            />
          ) : (
            <Input
              id={field.name}
              name={field.name}
              type={type}
              value={field.state.value || ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className={className || ""}
              placeholder={placeholder}
              disabled={disabled}
            />
          )}

          {field.state.meta.errors.length > 0 && (
            <p className="text-red-500 text-xs">
              {field.state.meta.errors[0]}
            </p>
          )}
        </div>
      )}
    </form.AppField>
  );
}