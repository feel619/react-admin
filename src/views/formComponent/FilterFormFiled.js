import React, {useState} from "react";
import {Form, FormGroup, Input, Label} from "reactstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {useSelector} from "react-redux";
import {Field} from "formik";

const   RangeDatePicker = (props) => {
    return (
        <>
            <FormGroup>
                <Label for={props.prop.id} className="">{props.prop.label}</Label>
                <DateRangePicker onCancel={() => {
                    props.onChangeTextName.setFieldValue(props.prop.fx_start_date,'');
                    props.onChangeTextName.setFieldValue(props.prop.fx_end_date,'');
                }

                } onCallback={(start, end, label) => {
                    let startDate = start.format('YYYY-MM-DD');
                    let endDate = end.format('YYYY-MM-DD');
                    props.onChangeTextName.setFieldValue(props.prop.fx_start_date,startDate);
                    props.onChangeTextName.setFieldValue(props.prop.fx_end_date,endDate);
                }}
                                 initialSettings={{
                                     autoUpdateInput: false,
                                     locale: {
                                         cancelLabel: 'Clear',
                                     },
                                     maxDate: new Date()
                                 }}
                >
                    <input type="text" name={props.prop.name} id={props.prop.id}
                           className="form-control"
                           placeholder="Date"
                           onChange={props.onChangeTextName.handleChange}
                           value={(props.onChangeTextName.values[props.prop.fx_start_date]) ? props.onChangeTextName.values[props.prop.fx_start_date]+'-'+props.onChangeTextName.values[props.prop.fx_end_date] : ''}
                    />
                </DateRangePicker>
            </FormGroup>
        </>
    )
};

const  YearDatePicker = (props) => {
    return (
        <>
            <FormGroup>
                <Label for={props.prop.id} className="">{props.prop.label}</Label>
                <DatePicker
                    className="form-control"
                    selected={(props.onChangeTextName.values[props.prop.fx_start_year]) ? props.onChangeTextName.values[props.prop.fx_start_year] : ''}
                    onChange={(date) => {
                        props.onChangeTextName.setFieldValue(props.prop.fx_start_year,date);
                    }}
                    maxDate={new Date()}
                    showYearPicker
                    dateFormat="yyyy"
                />
            </FormGroup>
        </>
    )
};

const StatusPicker = (formik) => {
    const AuthReducers = useSelector(state => state.AuthReducers);
    return (
        <>
            <FormGroup>
                <Label for="fx_status">Status</Label>
                <Input type="select" name="fx_status" id="fx_status"
                       value={formik.onSelectStatus.values.fx_status} onChange={formik.onSelectStatus.handleChange}
                       onBlur={formik.onSelectStatus.handleBlur} className="col-sm-12">
                    <option value="">All</option>
                    {
                        AuthReducers?.user?.success
                        && AuthReducers.user?.response.status_list.map((statusData, index) => (
                            <option hidden={!statusData.is_visible} key={`role-opt-${index}`} data-privileges={statusData.id}
                                    value={statusData.id}>{statusData.status}</option>
                        ))
                    }
                </Input>
            </FormGroup>
        </>
    )
};

const TextBox = (props) => {
    console.log(" TextBoxvprops ",props);
    return (
        <>
            <FormGroup>
                <Label for={props.prop.id} className={props.prop.class}>{props.prop.label}</Label>
                <Input
                    id={props.prop.id}
                    name={props.prop.name}
                    type="text"
                    onChange={props.onChangeTextName.handleChange}
                    onBlur={props.onChangeTextName.handleBlur}
                    value={props.onChangeTextName.values[props.prop.name]}
                    placeholder={props.prop.label}
                />
            </FormGroup>
        </>
    )
};

const SelectBox = (props) => {
    console.log(props.onSelect.values,"props.onSelect.values[props.prop.name]")
    console.log(props.result,"props.props.onSelect",props.prop.id)
    return (
        <>
            <FormGroup>
                <Label for={props.onSelect.id}>{props.prop.label}</Label>
                <Input type="select" name={props.prop.name} id={props.prop.id}
                       value={props.onSelect.values[props.prop.name]} onChange={props.onSelect.handleChange}
                       onBlur={props.onSelect.handleBlur} className="col-sm-12">
                    <option  value="">All</option>
                    {
                        props.result?.success
                        && props.result?.response.map((Data, index) => (
                            <option hidden={Data?.status === 2} key={`select-opt-${index}`}
                                    value={Data[props?.resultRender?.id]}>{Data[props?.resultRender?.name]}</option>
                        ))
                    }
                </Input>
            </FormGroup>
        </>
    )
};

const nFormatter = (num, digits) => {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
        //console.log(num >= item.value," num >= item.value ",num, ">=", item.value);
        return Math.abs(num) >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : parseInt(0);
};

const convertTZ = (date) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const AuthReducers = useSelector(state => state.AuthReducers);
    //
    return date.toLocaleString("en-US", {timeZone: AuthReducers?.static?.response?.settings?.timezone_name });
};

const convertTZDate = (date) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const AuthReducers = useSelector(state => state.AuthReducers);
    return date.toISOString().split('T')[0];
    //return date.toLocaleString("en-US", {timeZone: AuthReducers?.static?.response?.settings?.timezone_name });
};

export {
    TextBox,
    SelectBox,
    StatusPicker,
    RangeDatePicker,
    YearDatePicker,
    nFormatter,
    convertTZ,
    convertTZDate
};
