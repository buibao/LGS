"use client";

import { ReactNode } from "react";
import { AlertCircle, CalendarDays, Mail, Phone, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function FieldShell({
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
    <label className={cn("space-y-2.5", className)}>
      <span className="flex items-center gap-1.5 text-[0.95rem] font-semibold text-slate-700">
        {label}
        {required ? <span className="text-rose-600">*</span> : null}
      </span>
      {children}
      {error ? (
        <span className="flex items-start gap-2 text-[0.92rem] leading-6 text-rose-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </span>
      ) : helperText ? (
        <span className="block text-[0.82rem] leading-6 text-slate-500">{helperText}</span>
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
    <FieldShell label={label} required={required} helperText={helperText} error={error} className={className}>
      <div className="relative">
        {icon ? <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">{icon}</span> : null}
        <Input {...props} className={cn(icon ? "pl-10" : undefined, error ? "border-rose-300 focus-visible:ring-rose-200" : undefined, inputClassName)} />
      </div>
    </FieldShell>
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
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
}) {
  return (
    <FieldShell label={label} required={required} helperText={helperText} error={error} className={className}>
      <Select {...props} className={cn(error ? "[&_select]:border-rose-300" : undefined)}>
        {children}
      </Select>
    </FieldShell>
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
    <FieldShell label={label} required={required} helperText={helperText} error={error} className={className}>
      <Textarea {...props} className={cn(error ? "border-rose-300 focus-visible:ring-rose-200" : undefined, textareaClassName)} />
    </FieldShell>
  );
}

export function DateTimeField(props: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
}) {
  return <TextInputField {...props} type="datetime-local" icon={<CalendarDays className="h-4 w-4" />} />;
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
    <Button {...props} disabled={isSubmitting || props.disabled} className={className}>
      {isSubmitting ? submittingLabel : idleLabel}
    </Button>
  );
}
