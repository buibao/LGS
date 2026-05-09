"use client";

import { ReactNode } from "react";
import { AlertCircle, Mail, Phone, Type } from "lucide-react";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function FieldHint({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-[0.82rem] leading-6 text-[var(--muted-foreground)]", className)}>
      {children}
    </p>
  );
}

export function FieldError({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("flex items-start gap-2 text-[0.92rem] leading-6 text-rose-600", className)}>
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

export function FormFieldWrapper({
  label,
  required,
  helperText,
  error,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("grid gap-2.5", className)}>
      <span className="flex items-center gap-1.5 text-[0.95rem] font-semibold text-slate-700">
        {label}
        {required ? <span className="text-rose-600">*</span> : null}
      </span>
      {children}
      {error ? (
        <FieldError>{error}</FieldError>
      ) : helperText ? (
        <FieldHint>{helperText}</FieldHint>
      ) : null}
    </label>
  );
}

export function TextInputField({
  label,
  required,
  helperText,
  error,
  icon,
  className,
  inputClassName,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  icon?: ReactNode;
  className?: string;
  inputClassName?: string;
}) {
  return (
    <FormFieldWrapper label={label} required={required} helperText={helperText} error={error} className={className}>
      <div className="relative">
        {icon ? <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">{icon}</span> : null}
        <Input
          {...props}
          className={cn(
            icon ? "pl-10" : undefined,
            error ? "border-rose-300 focus-visible:ring-rose-200" : undefined,
            inputClassName,
          )}
        />
      </div>
    </FormFieldWrapper>
  );
}

export function PhoneInputField(props: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
}) {
  return <TextInputField {...props} type="tel" icon={<Phone className="h-4 w-4" />} />;
}

export function EmailInputField(props: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
}) {
  return <TextInputField {...props} type="email" icon={<Mail className="h-4 w-4" />} />;
}

export function SelectField({
  label,
  required,
  helperText,
  error,
  className,
  options,
  placeholder,
  value,
  onChange,
  disabled,
}: {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <FormFieldWrapper label={label} required={required} helperText={helperText} error={error} className={className}>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className={cn(error ? "border-rose-300 focus-visible:ring-rose-200" : undefined)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormFieldWrapper>
  );
}

export function TextareaField({
  label,
  required,
  helperText,
  error,
  className,
  textareaClassName,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  textareaClassName?: string;
}) {
  return (
    <FormFieldWrapper label={label} required={required} helperText={helperText} error={error} className={className}>
      <Textarea {...props} className={cn(error ? "border-rose-300 focus-visible:ring-rose-200" : undefined, textareaClassName)} />
    </FormFieldWrapper>
  );
}

export function DateTimeField({
  label,
  required,
  helperText,
  error,
  className,
  value,
  onChange,
  disabled,
  placeholder,
  dateLabel,
  timeLabel,
  clearLabel,
  todayLabel,
  noValueLabel,
}: {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder: string;
  dateLabel: string;
  timeLabel: string;
  clearLabel: string;
  todayLabel: string;
  noValueLabel: string;
}) {
  return (
    <FormFieldWrapper label={label} required={required} helperText={helperText} error={error} className={className}>
      <DateTimePicker
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        dateLabel={dateLabel}
        timeLabel={timeLabel}
        clearLabel={clearLabel}
        todayLabel={todayLabel}
        noValueLabel={noValueLabel}
      />
    </FormFieldWrapper>
  );
}

export function PlainTextField(props: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
}) {
  return <TextInputField {...props} type="text" icon={<Type className="h-4 w-4" />} />;
}

export function SubmitButton({
  isSubmitting,
  idleLabel,
  submittingLabel,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isSubmitting: boolean;
  idleLabel: string;
  submittingLabel: string;
}) {
  return (
    <button
      {...props}
      disabled={isSubmitting || props.disabled}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary-foreground)] shadow-[0_12px_24px_-18px_rgba(15,95,115,0.7)] transition hover:bg-[#0b5162] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
    >
      {isSubmitting ? submittingLabel : idleLabel}
    </button>
  );
}
