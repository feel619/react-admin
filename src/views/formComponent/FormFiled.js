import React, {useState} from "react";
import {Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label} from "reactstrap";

const InputTextBox = (props) => {
    console.log(" InputTextBox  ", props.formik);
    console.log(props.value, " InputTextBoprops.valuex  ", props.formik.touched[props.value]);
    return (
        <>
            <FormGroup className={`mb-3 ${props.classList.formGroup}`}>
                <InputGroup className={`input-group-alternative ${props.classList.inputGroupClass}`}>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className={`${props.classList.iconGroupClass}`}></i>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        id={props.prop.id}
                        name={props.prop.name}
                        type="text"
                        onChange={props.formik.handleChange}
                        onBlur={props.formik.handleBlur}
                        value={props.formik.values[props.prop.name]}
                        placeholder={props.prop.label}
                    />
                </InputGroup>
                {props.formik.touched[props.prop.name] && props.formik.errors[props.prop.name] ? (
                    <div className="text-danger input-error">{props.formik.errors[props.prop.name]}</div>
                ) : null}
            </FormGroup>
        </>
    )
};

const InputSelectBox = (props) => {
    return (
        <>
            <FormGroup className={` ${props.classList.formGroup}`}>
                <InputGroup className={`input-group-alternative ${props.classList.inputGroupClass}`}>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className={`${props.classList.iconGroupClass}`}></i>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input type="select" name={props.prop.name} id={props.prop.id}
                           value={props.formik.values[props.prop.name]} onChange={props.formik.handleChange}
                           onBlur={props.formik.handleBlur} className="col-sm-12">
                        <option value="">All</option>
                        {
                            <>
                                <option value="1">Option</option>
                            </>
                        }
                    </Input>
                </InputGroup>
                {props.formik.touched[props.prop.name] && props.formik.errors[props.prop.name] ? (
                    <div className="text-danger input-error">{props.formik.errors[props.prop.name]}</div>
                ) : null}
            </FormGroup>
        </>
    )
}

export {
    InputTextBox,
    InputSelectBox
};
