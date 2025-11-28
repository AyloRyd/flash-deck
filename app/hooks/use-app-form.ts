import { createFormHook } from "@tanstack/react-form";

import { TextField } from "../components/form-components/TextField";
import { Select } from "../components/form-components/Select";
import { TextArea } from "../components/form-components/TextArea";
import { PasswordField } from "../components/form-components/PasswordField";
import { SubscribeButton } from "../components/form-components/SubscribeButton";

import { createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    Select,
    TextArea,
    PasswordField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
