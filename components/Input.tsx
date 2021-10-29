import React from "react";

export interface InputProps {
    divclass?: string;
    htmlfor?: string;
    labelclass?: string;
    label?: string;
    type?: string;
    id?: string;
    inputclass?: string;
    iserror?: any;
    errormessage?: any;
    hook?: any;
    autoComplete?: any;
}

export const Input: React.VFC<InputProps> = ({
    divclass,
    htmlfor,
    labelclass,
    label,
    type,
    id,
    inputclass,
    hook,
    iserror,
    errormessage,
    autoComplete
}) => (
    <div className={divclass}>
        <label
            htmlFor={htmlfor}
            className={labelclass}
        >
            {label}
        </label>
        <div className="mt-1">
            <input
                type={type}
                id={id}
                className={inputclass}
                autoComplete={autoComplete}
                {...hook} />
            {!!iserror && (
                <p>{errormessage}</p>
            )}
        </div>
    </div>
);